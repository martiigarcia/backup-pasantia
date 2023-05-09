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
"tests": [
                {
                    "id_test": "6",
                    "valoraciones": "Mas duro que el diegote",
                    "id_tipo": "4",
                    "nombre": "Flexibilidad"
                }
            ]
*/
  return (
    <View>
      {test.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Test realizado: {c.nombre}</ListItem.Title>
            <ListItem.Subtitle>
              valoraciones: {c.valoraciones}{' '}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
