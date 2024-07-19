import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MoviesController } from '../controllers/movies.controller';
import { ScrollView } from 'react-native-gesture-handler';
import { Result } from '../interfaces/movies.interface';
import { Title } from 'react-native-paper';
import { CarouselVertical } from '../components/CarouselVertical';
import { map } from "lodash";
import { CarouselMulti } from '../components/CarouselMulti';

export const Home = (props: any) => {

    const [newMovies, setNewMovies] = useState<Result[]>([]);
    const [genreList, setGenreList] = useState(null);
    const [genreSelect, setGenreSelect] = useState(28);
    const [genreMovies, setGenreMovies] = useState(null);

    const { getNewsMovies, getAllGenresMovies, getGenresMovies } = MoviesController();
    const { navigation } = props;

    useEffect(() => {
        getNewsMovies().then((resp) => {
            const info = resp.results;
            setNewMovies(info);
        });
    }, []);

    useEffect(() => {
        getAllGenresMovies().then((resp) => {
            const info = resp;
            setGenreList(info.genres);
        });
    }, []);

    useEffect(() => {
        getGenresMovies(genreSelect).then((resp) => {
            const info = resp;
            setGenreMovies(info.results);
        });
    }, [genreSelect]);

    const onChangeGenre = (newGenreId: number) => {
        setGenreSelect(newGenreId);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                newMovies && (
                    <View style={styles.news}>
                        <Title style={styles.newsTitle}>Nuevas Películas</Title>
                        <CarouselVertical data={newMovies} navigation={navigation} />
                    </View>
                )
            }
            <View style={styles.genres}>
                <Title style={styles.genresTitle}>
                    Películas por género
                </Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList} >
                    {
                        map(genreList, (genre: any) => (
                            <Text 
                                key={genre.id} 
                                onPress={() => onChangeGenre(genre.id)}
                                style={[styles.genre, {color: genre.id !== genreSelect ? '#8697a5' : '#fff' }]} 
                            >
                                { genre.name }
                            </Text>
                        ))
                    }
                </ScrollView>
                {
                    genreMovies && (
                        <CarouselMulti data={genreMovies} navigation={navigation} />
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        paddingHorizontal: 20
    },
    genre: {
        marginRight: 20,
        fontSize: 16
    }
});