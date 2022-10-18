import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View} from 'react-native';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';

const ItemSeparator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.darker,
  };
  return (
    <View
      style={[
        backgroundStyle,
        {
          height: 1,
          marginHorizontal: 10,
          backgroundColor: 'darkviolet',
        },
      ]}
    />
  );
};
export default ItemSeparator;
