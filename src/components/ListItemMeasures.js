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

export default ({measures}) => {
  const [measure, setMeasures] = useState([]);
  useEffect(() => {
    //console.log(measures);
    setMeasures(measures);
  }, []);

  return (
    <View>
      {measure.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Medidas</ListItem.Title>
            <ListItem.Subtitle>Estatura: {c.estatura} </ListItem.Subtitle>
            <ListItem.Subtitle>Peso: {c.peso}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
/*



*/
