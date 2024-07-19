import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import Carousel from "react-native-snap-carousel";
import { BASE_PATH_IMG } from "../utils/constants";
import { Text, Title } from "react-native-paper";
import { MoviesController } from "../controllers/movies.controller";
import { map, size } from "lodash";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export const CarouselVertical = (props: any) => {

    const { data, navigation } = props;

    return (
        <Carousel
            layout={"default"}
            data={data}
            renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
        />
    )
}

const RenderItem = (props: any) => {

    const { data, navigation } = props;
    const { id, title, poster_path, genre_ids } = data.item;
    const url_img = BASE_PATH_IMG + "/w500" + poster_path;
    const [genres, setGenres] = useState(null);
    const { getGenreMovies } = MoviesController();

    useEffect(() => {
        getGenreMovies(genre_ids).then((resp) => {
            setGenres(resp);
        });
    }, []);

    const onNavigation = () => {
        navigation.navigate('movie', { id });
    }

    return (
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.card}>
                <Image style={styles.img} source={{ uri: url_img }}></Image>
                <Title style={styles.title}>{title}</Title>
                <View style={styles.genres}>
                    {
                        genres && (
                            map(genres, (genre: any, index) => (
                                <Text key={index} style={styles.genre}>
                                    {genre}
                                    {index !== size(genres) - 1 && ', '}
                                </Text>
                            ))
                        )
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    img: {
        width: "100%",
        height: 450,
        borderRadius: 20
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10
    },
    genres: {
        flexDirection: "row",
        marginHorizontal: 10
    },
    genre: {
        fontSize: 12,
        color: "#8997a5"
    }
});