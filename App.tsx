import React from 'react';
import { Button, PaperProvider } from 'react-native-paper';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';

function App(): React.JSX.Element {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
