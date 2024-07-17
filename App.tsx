import React from 'react';
import { Button, PaperProvider } from 'react-native-paper';
import { SafeAreaView, Text } from 'react-native';

function App(): React.JSX.Element {

  return (
    <PaperProvider>
      <SafeAreaView>
        <Button style={{width: "80%", marginHorizontal:40}} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
