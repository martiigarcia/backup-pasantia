import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Overlay} from '@rneui/themed';

export default function Loading({isVisible}) {
  // const isDarkMode = useColorScheme() === "dark";
  // const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker :
  //         Colors.lighter,
  // };
  // return (
  //     <View style={{backgroundColor:"darkviolet"}}>
  //         <ActivityIndicator />
  //     </View>
  // );

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparet"
      overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#442484" />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    </Overlay>
  );
}
const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: '#fff',
    borderColor: '#442484',
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#442484',
    marginTop: 10,
  },
});
