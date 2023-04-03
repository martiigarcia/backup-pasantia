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
import {Input, Card} from '@rneui/themed';
import createTemplate from '../nutricionist/createTemplate';
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
      <Text style={styles.textTipoFicha}>
        Kinesiologia {'\n'} *Se cargara automaticamente con la fecha actual
      </Text>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* <View style={styles.view}> */}
          <Card>
            <Text style={styles.text}>Medidas 1</Text>
            <Input style={styles.input} placeholder="Completar" />
            <Text style={styles.text}>Medidas 2</Text>
            <Input style={styles.input} placeholder="Completar" />
            <Text style={styles.text}>Medidas 3</Text>
            <Input style={styles.input} placeholder="Completar" />

            <Card.Divider />
            <View style={styles.view}>
              <Stack fill center spacing={4}>
                <Button
                  style={styles.button}
                  title="Añadir Planilla"
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </Stack>
            </View>
          </Card>
          {/* </View> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  view: {
    height: 50,
    flex: 1,
  },

  vertical: {
    display: 'flex',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  fixToText: {
    // paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  separator: {
    paddingTop: StatusBar.currentHeight,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
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
    alignItems: 'flex-end',
    paddingLeft: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textNombre: {
    color: 'white',
    fontSize: 40,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#6409E6',
  },
  textTipoFicha: {
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // container: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight,
  // },
  // scrollView: {
  //   paddingTop: StatusBar.currentHeight,
  //   marginHorizontal: 20,
  // },
  // input: {
  //   paddingTop: StatusBar.currentHeight,
  // },
  // button: {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // image: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  // textNombre: {
  //   color: 'white',
  //   fontSize: 42,
  //   lineHeight: 84,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   backgroundColor: '#6409E6',
  // },
  // textTipoFicha: {
  //   textAlign: 'center',
  // },
  // text: {
  //   fontSize: 20,
  //   textAlign: 'left',
  // },
});
