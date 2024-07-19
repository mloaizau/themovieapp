import { View, StyleSheet, SafeAreaView, Platform, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MoviesController } from '../controllers/movies.controller';
import { Text, Searchbar } from 'react-native-paper';
import { size, map } from "lodash";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BASE_PATH_IMG } from '../utils/constants';

const { width } = Dimensions.get("window");

export const Search = (props: any) => {

  const { getSearchMovie } = MoviesController();
  const { navigation } = props;

  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (size(search) > 2) {
      getSearchMovie(search).then((response) => {
        setMovies(response.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder='Busca tu película'
        iconColor={Platform.OS === "ios" && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container} >
          {
            map(movies, (movie, index) => (
              <Movie key={index} movie={movie} navigation={navigation} />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Movie = (props: any) => {

  const {movie, navigation} = props;
  const {poster_path, title, id} = movie;
  const url_img = BASE_PATH_IMG + "/w500" + poster_path;

  const goMovie = () => {
    navigation.navigate("movie", {id});
  }

  return(
    <TouchableWithoutFeedback onPress={goMovie} >
      <View style={styles.movie} >
        {
          poster_path ? (
            <Image style={styles.img} source={{uri: url_img}} />
          ) : <Text> {title} </Text>
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: "#15212b"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: "100%",
    height: "100%"
  }
});