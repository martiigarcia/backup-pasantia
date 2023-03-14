import React, {useState} from 'react';
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
} from 'react-native';
import {Icon} from '@rneui/base';
import {Input} from '@rneui/themed';
import createTemplate from './createTemplate';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    Alert.alert('Agregando ...');
  };

  return (
    <>
      <Text style={styles.textNombre}>{user.nombre}</Text>
      <Text style={styles.textTipoFicha}>Kinesiologia - Agosto 2022</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>
            <Text style={styles.text}>Medidas 1</Text>
            <Input style={styles.input} placeholder="Completar" />
            <Text style={styles.text}>Medidas 2</Text>
            <Input style={styles.input} placeholder="Completar" />
            <Text style={styles.text}>Medidas 3</Text>
            <Input style={styles.input} placeholder="Completar" />
          </View>

          <View style={styles.view}>
            <Stack fill center spacing={4}>
              <Button
                style={styles.button}
                title="Añadir ficha"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </Stack>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
  input: {
    paddingTop: StatusBar.currentHeight,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textNombre: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  textTipoFicha: {
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
  },
});
