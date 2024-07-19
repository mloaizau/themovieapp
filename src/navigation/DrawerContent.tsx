import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text, MD2DarkTheme } from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export const DrawerContent = (props: any) => {

    const { navigation } = props;
    const [active, setActive] = useState("home");
    const {theme, ToggleTheme } = usePreferences();

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
            <Drawer.Section title='Opciones'>
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Tema Oscuro</Text>
                        <Switch value={theme === "dark"} onValueChange={ToggleTheme} ></Switch>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preferences:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
});