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
import moment from 'moment';

export default ({foods}) => {
  const [food, setFood] = useState([]);
  const [day, setDay] = useState('');
  useEffect(() => {
    // console.log(foods);
    setFood(foods);
  }, []);

  return (
    <View>
      {food.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{c.nombre}</ListItem.Title>
            <ListItem.Subtitle>Nutriente: {c.nutriente} </ListItem.Subtitle>
            {c.fecha && (
              <>
                <ListItem.Subtitle>
                  Fecha asignada: {new Date(c.fecha).toLocaleDateString()}
                </ListItem.Subtitle>
              </>
            )}
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
