import React from 'react';
import { Button, PaperProvider } from 'react-native-paper';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


function App(): React.JSX.Element {

  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView>
          <Button style={{ width: "80%", marginHorizontal: 40 }} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
