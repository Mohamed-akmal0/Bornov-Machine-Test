import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import {Colors} from './src/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
