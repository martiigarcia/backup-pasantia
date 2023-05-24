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
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [ShotProgressList, setShotProgressList] = useState({
    ShotProgressList: [],
  });
  useEffect(() => {
    console.log('SHOT LIST');
    console.log(route);
    getShotProgressList();
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

  const getShotProgressList = () => {
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
              const orderedList = json.graph.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
              );
              setShotProgressList({ShotProgressList: orderedList});
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
              <Card.Title>Lanzamientos</Card.Title>
              <Card.Divider />
              <Button
                title="Ver grafico"
                onPress={() =>
                  navigation.navigate('ShotProgressGraphic', {
                    user: route.params.user,
                    url: route.params.url,
                    // start: route.params.start,
                    // end: route.params.end,
                    // UserRole: route.params.UserRole,
                  })
                }></Button>
              <Card.Divider />
              <Card.Divider />
              {/* {"date": "2022-11-09", "scored": "2", "shots": "500"} */}
              {ShotProgressList.ShotProgressList.length !== 0 ? (
                <>
                  {ShotProgressList.ShotProgressList.map((c, index) => {
                    // const percentage = (c.scored / c.shots) * 100; // Calcula el porcentaje de acierto
                    // const formattedPercentage =
                    //   percentage % 1 === 0 ? percentage : percentage.toFixed(2); // Verifica si tiene decimales y redondea si es necesario

                    const average =
                      (c.shots > 0 ? c.scored / c.shots : 0) * 100; // Calcula el promedio si se han hecho tiros
                    const prom =
                      average % 1 === 0 ? average : Math.round(average); // Redondea el promedio si tiene decimales

                    return (
                      <ListItem key={index} bottomDivider>
                        <Text>{index + 1}</Text>
                        <ListItem.Content>
                          <ListItem.Title>
                            Porcentaje de acierto: {prom}%
                          </ListItem.Title>
                          <ListItem.Subtitle>
                            Lanzamientos hechos: {c.shots}
                          </ListItem.Subtitle>
                          <ListItem.Subtitle>
                            Lanzamientos acertados: {c.scored}
                          </ListItem.Subtitle>
                          <ListItem.Subtitle>Fecha: {c.date}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    );
                  })}
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
  container: {
    flex: 1,
    height: 550,
    // paddingTop: StatusBar.currentHeight,
    marginBottom: StatusBar.currentHeight,
  },
  scrollView: {
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 20,
  },
  // view: {
  //   height: 550,
  //   flex: 1,
  // },
  input: {
    paddingTop: StatusBar.currentHeight,
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
