import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MoviesController } from '../controllers/movies.controller';
import { Button, Text, Title } from 'react-native-paper';
import { map } from "lodash";
import { BASE_PATH_IMG } from '../utils/constants';
import noImage from "../assets/jpg/default.png";
import { Rating } from 'react-native-ratings';
import usePreferences from '../hooks/usePreferences';
import starDark from "../assets/png/starDark.png";
import starLight from "../assets/png/starLight.png";

export const Popular = (props: any) => {

  const { getPopularMovie } = MoviesController();
  const { theme } = usePreferences();
  const { navigation } = props;

  const [movies, setMovies] = useState<any>(null);
  const [showButtonMore, setShowButtonMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPopularMovie(page).then((response) => {
      const totalPages = response.total_pages;
      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowButtonMore(false);
      }
    });
  }, [page])


  return (
    <ScrollView>
      {
        map(movies, (movie, index) => (
          <Movie key={index} movie={movie} theme={theme} navigation={navigation} />
        ))
      }
      {
        showButtonMore && (
          <Button
            mode="contained"
            contentStyle={styles.buttonMore}
            style={styles.loadMore}
            labelStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
            onPress={() => setPage(page + 1)}
          > Cargar más... </Button>
        )
      }
    </ScrollView>
  )
}

const Movie = (props: any) => {

  const { movie, theme, navigation } = props;
  const { id, poster_path, title, release_date, vote_count, vote_average } = movie;
  const url_img = BASE_PATH_IMG + "/w500" + poster_path;
  
  const goMovie = () => {
    navigation.navigate("movie", {id});
  }

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.viewMovie} >
        <View style={styles.left} >
          <Image style={styles.img} source={
            poster_path ? { uri: url_img } : noImage
          } />
        </View>
        <View style={styles.right}>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating voteCount={vote_count} voteAverage={vote_average} theme={theme} />
        </View>
      </View>
    </TouchableWithoutFeedback>

  )
}

const MovieRating = (props: any) => {
  const { voteCount, voteAverage, theme } = props;
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRating} >
      <Rating
        type='custom'
        ratingImage={theme === "dark" ? starDark : starLight}
        ratingColor='#ffc205'
        ratingBackgroundColor={theme === "dark" ? "#192734" : "#f0f0f0"}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, marginRight: 5 }} >{media}</Text>
      <Text style={{ fontSize: 12, color: "#8697a5" }} >
        {voteCount} votos
      </Text>
    </View>
  )

}

const styles = StyleSheet.create({
  viewMovie: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    width: "60%"
  },
  left: {
    marginRight: 20
  },
  right: {

  },
  img: {
    width: 100,
    height: 150
  },
  viewRating: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10
  },
  buttonMore: {
    paddingTop: 10,
    paddingBottom: 30
  },
  loadMore: {
    backgroundColor: "transparent"
  }
});