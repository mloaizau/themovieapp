import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { IconButton } from 'react-native-paper';
import { Home } from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export const StackNavigation = (props: any) => {

    const {navigation} = props;

    const buttonLeft = () => {
        return(
            <IconButton
                icon={"menu"}
                onPress={ () => navigation.openDrawer() }
            ></IconButton>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={{title: "TheMovieApp", headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='movie' component={Movie} options={{title: "Movie", headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='news' component={News} options={{title: "Películas Nuevas", headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='popular' component={Popular} options={{title: "Películas Populares", headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='search' component={Search} options={{title: "Buscador", headerLeft: () => buttonLeft()}}></Stack.Screen>
        </Stack.Navigator>
    )
}