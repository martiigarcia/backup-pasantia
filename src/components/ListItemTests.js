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

export default ({testx}) => {
  const [test, setTest] = useState([]);
  useEffect(() => {
    setTest(testx);
  }, []);

  /*
  
  "tests": 
  [
    {
      "cant_repeticiones": "3", 
      "id_test_fuerza": "8", 
      "id_tipo_ejercicio": "1", 
      "nombre": "Levantamiento de pesas", 
      "peso": "45"
    }
  ]
  
  */
  return (
    <View>
      {test.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Tipo de ejercicio: {c.nombre}</ListItem.Title>
            <ListItem.Subtitle>Peso: {c.peso} </ListItem.Subtitle>
            <ListItem.Subtitle>RM: {c.cant_repeticiones} </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
