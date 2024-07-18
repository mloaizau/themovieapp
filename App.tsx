import React, { useMemo, useState } from 'react';
import { PaperProvider, MD2LightTheme as DfTPaper, MD2DarkTheme } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import PreferenceContext from './src/context/PreferencesContext';

function App(): React.JSX.Element {

  DfTPaper.colors.primary = "#1ae1f2";
  MD2DarkTheme.colors.primary = "#1ae1f2";
  MD2DarkTheme.colors.accent = "#1ae1f2";

  DarkTheme.colors.background = "#192734";
  DarkTheme.colors.card = "#15212b";
  
  const [theme, setTheme] = useState('light');

  const ToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark" );
  }

  const preferences = useMemo(
    () => ({
      theme, 
      ToggleTheme
    }),
    [theme]
  );


  return (
    <PreferenceContext.Provider value={preferences}>
      <PaperProvider theme={theme === "dark" ? MD2DarkTheme : DfTPaper } >
        <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme } >
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferenceContext.Provider>

  );
}

export default App;
