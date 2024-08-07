import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigation } from "./StackNavigation";
import { DrawerContent } from "./DrawerContent";

const Drawer = createDrawerNavigator();

export const Navigation = () => {
    return (
        <Drawer.Navigator 
            initialRouteName="app"
            screenOptions={{ headerShown: false }} 
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="app" component={StackNavigation} ></Drawer.Screen>
        </Drawer.Navigator>
    )

}