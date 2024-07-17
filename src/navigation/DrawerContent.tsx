import { View } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';

export const DrawerContent = (props: any) => {

    const { navigation } = props;

    const [active, setActive] = useState("home");

    const onChangeScreen = (screen: string) => {
        setActive(screen);
        navigation.navigate(screen);
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label='Inicio'
                    active={active === "home"}
                    onPress={ () => onChangeScreen('home') }
                >
                </Drawer.Item>
                <Drawer.Item
                    label='Películas populares'
                    active={active === "popular"}
                    onPress={ () => onChangeScreen('popular') }
                >
                </Drawer.Item>
                <Drawer.Item
                    label='Películas nuevas'
                    active={active === "news"}
                    onPress={ () => onChangeScreen('news') }
                >
                </Drawer.Item>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}