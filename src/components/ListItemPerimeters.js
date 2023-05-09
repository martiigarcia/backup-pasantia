import React, {useState, useEffect} from 'react';
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Stack,
} from '@react-native-material/core';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Card, Icon} from '@rneui/base';
import {Input} from '@rneui/themed';
import {List} from 'react-native-paper';
import {ListItem} from '@rneui/themed';

export default ({perimeters}) => {
  const [perimeter, setPerimeter] = useState([]);
  useEffect(() => {
    setPerimeter(perimeters);
  }, []);

  return (
    <View>
      {perimeter.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{c.nombre}</ListItem.Title>
            <ListItem.Subtitle>Valor: {c.valor_medida} </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
/*



*/
