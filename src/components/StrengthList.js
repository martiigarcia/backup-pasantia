import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Avatar, ListItem, Icon, Card} from '@rneui/themed';

import {Button, IconButton} from '@react-native-material/core';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../environments/environment';

export default ({route, navigation}) => {
  const [strengthList, setStrengthList] = useState({strengthList: []});
  useEffect(() => {
    console.log('STRENGTH LIST');
    console.log(route);
    getStrengthList();
  }, []);

  const getUserData = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        ROLE,
        MEMBER,
        TOKEN,
        ID,
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getStrengthList = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        // const url =
        //   environment.baseURL +
        //   'kinesiologo/grafico-tratamientos/' +
        //   route.params.user.id_usuario +
        //   '/' +
        //   route.params.start +
        //   '/' +
        //   route.params.end;
        const url = route.params.url;
        console.log(url);
        console.log(route.params.url);

        // const body = {
        //   startDate: route.params.start,
        //   endDate: route.params.end,
        // };

        fetch(url, {
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);

            if (json.success) {
              const orderedList = json.pesos.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
              );

              setStrengthList({strengthList: orderedList});
            }

            // setLoading(false);
          })
          .catch(error => {
            console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>
            <Card>
              <Card.Title>Progreso de fuerza</Card.Title>
              <Card.Divider />
              <Text style={styles.text}>
                Tipo de ejecicio: {route.params.exerciseType.nombre}
              </Text>
              <Text style={styles.text}>
                Repetición máxima: {route.params.rm}
              </Text>
              <Button
                title="Ver grafico"
                onPress={() =>
                  navigation.navigate('StrengthGraphic', {
                    user: route.params.user,
                    url: route.params.url,
                    start: route.params.start,
                    end: route.params.end,
                    exerciseType: route.params.exerciseType,
                    rm: route.params.rm,
                    // start: route.params.start,
                    // end: route.params.end,
                    // UserRole: route.params.UserRole,
                  })
                }></Button>
              <Card.Divider />
              <Card.Divider />
              {strengthList.strengthList.length !== 0 ? (
                <>
                  {strengthList.strengthList.map((c, index) => (
                    <ListItem key={index} bottomDivider>
                      <Text>{index + 1}</Text>
                      <ListItem.Content>
                        <ListItem.Title>Peso: {c.peso}</ListItem.Title>
                        <ListItem.Subtitle>Fecha: {c.fecha}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                </>
              ) : (
                <>
                  <Text>No existen planillas registradas para listar</Text>
                </>
              )}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },

  viewAdmin: {
    justifyContent: 'center',
    height: 550,
  },
  containerAdmin: {
    paddingBottom: StatusBar.currentHeight,
    marginBottom: StatusBar.currentHeight,
  },
  vertical: {
    display: 'flex',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
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
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 20,
  },
  view: {
    // height: 50,
    flex: 1,
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
  textEmail: {
    textAlign: 'center',
  },
  textAutor: {
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  dropdown: {
    height: 50,
    width: 210,
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    // padding: 5,
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
