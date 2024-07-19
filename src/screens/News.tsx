import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'react-native-paper';
import { MoviesController } from '../controllers/movies.controller';
import { map } from "lodash";
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.3);

export const News = (props: any) => {

  const { navigation } = props;
  const { getNewsMovies } = MoviesController();
  const { theme } = usePreferences();

  const [movies, setMovies] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [showButtonMore, setShowButtonMore] = useState(true);

  useEffect(() => {
    getNewsMovies(page).then((response) => {
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
      <View style={styles.container} >
        {
          map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))
        }
      </View>
      {
        showButtonMore && (
          <Button
            mode='contained'
            contentStyle={{paddingTop: 10, paddingBottom: 30}}
            style={{backgroundColor:"transparent"}}
            labelStyle={{color: theme === 'dark' ? "#fff": "#000"}}
            onPress={() => setPage(page +1) }
          >
            Cargar más ...
          </Button>
        )
      }
    </ScrollView>
  )
}

const Movie = (props: any) => {

  const { movie, navigation } = props;
  const { id, title, poster_path } = movie;
  const url_img = BASE_PATH_IMG + "/w500" + poster_path;

  const goMovie = () => {
    navigation.navigate("movie", {id});
  }

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie} >
        {
          poster_path ? (
            <Image style={styles.img} source={{uri: url_img}} />
          ) : ( <Text> {title} </Text>)
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap"
    },
    movie: {
      width: width / 2,
      height: 300,
      justifyContent: "center",
      alignContent: "center"
    },
    img: {
      width: "100%",
      height: "100%"
    }
});