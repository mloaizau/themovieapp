import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { IconButton } from 'react-native-paper';
import { Home } from '../screens/Home';
import { Movie } from '../screens/Movie';
import { News } from '../screens/News';
import { Popular } from '../screens/Popular';
import { Search } from '../screens/Search';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export const StackNavigation = (props: any) => {

    const { navigation } = props;

    const buttonLeft = (screen: string) => {
        switch (screen) {
            case "search":
            case "movie":
                return(
                    <IconButton
                        icon={"arrow-left"}
                        style={{marginTop: Platform.OS === "ios" ? 3 : -3}}
                        onPress={ () => navigation.goBack() }
                    ></IconButton>)
            default:
                return(
                <IconButton
                    icon={"menu"}
                    onPress={ () => navigation.openDrawer() }
                ></IconButton>)
        }
    }

    const buttonRight = () => {
        return(
            <IconButton
                icon={"magnify"}
                onPress={ () => navigation.navigate("search") }
            ></IconButton>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={{title: "TheMovieApp", headerLeft: () => buttonLeft("home"), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen name='movie' component={Movie} options={{title: "Movie", headerLeft: () => buttonLeft("movie"), headerRight: () => buttonRight(), headerTransparent:true}}></Stack.Screen>
            <Stack.Screen name='news' component={News} options={{title: "Películas Nuevas", headerLeft: () => buttonLeft("news"), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen name='popular' component={Popular} options={{title: "Películas Populares", headerLeft: () => buttonLeft("popular"), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen 
                name='search' 
                component={Search} 
                options={{title: "", headerTransparent:true, headerLeft: () => buttonLeft("search")}}></Stack.Screen>
        </Stack.Navigator>
    )
}