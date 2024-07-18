import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MoviesController } from '../controllers/movies.controller';

export const Home = () => {

    const [newMovies, setNewMovies] = useState(null);

    const { getNewsMovies } = MoviesController();

    useEffect(() => {
        getNewsMovies();
    }, [])


    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
