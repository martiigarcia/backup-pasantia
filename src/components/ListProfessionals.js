import {View, Text} from 'react-native';
import React, {useState} from 'react';

export default ({route, navigation}) => {
  const [profesional, SetProfessional] = useState(
    route.params && route.params.profesional ? route.params.profesional : {},
  );
  return (
    <View>
      <Text>ListProfessionals de {profesional}</Text>
    </View>
  );
};
