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
  const [user, setUser] = useState(route.params.user ? route.params.user : {});
  const [imcs, setImcs] = useState({imcs: []});
  const [UserRole, setUserRole] = useState('');
  useEffect(() => {
    console.log('IMC LIST NUTRI');
    getIMCs();
    getUserRole();
  }, []);

  const monthMapping = {
    January: 'Enero',
    February: 'Febrero',
    March: 'Marzo',
    April: 'Abril',
    May: 'Mayo',
    June: 'Junio',
    July: 'Julio',
    August: 'Agosto',
    September: 'Septiembre',
    October: 'Octubre',
    November: 'Noviembre',
    December: 'Diciembre',
  };

  const getUserData = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        MEMBER,
        TOKEN,
        ID,
        ROLE,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getIMCs = () => {
    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url =
          environment.baseURL +
          'nutricionista/get-imc/' +
          user.id_usuario +
          '/';
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            console.log(json);

            if (json.success) {
              const transformedData = json.map(item => ({
                imc: item.imc,
                month: monthMapping[item.month],
              }));
              console.log(transformedData);
              setImcs({
                imcs: json.imcs,
              });
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

  const getUserRole = () => {
    getUserData().then(data => {
      const roleX = JSON.parse(data.ROLE);
      setUserRole(roleX);
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Card>
            <Card.Title>IMC por mes</Card.Title>
            <Card.Divider />
            <Button
              title="Ver como grafico"
              onPress={() => {
                const url =
                  environment.baseURL +
                  'nutricionista/get-imc/' +
                  user.id_usuario +
                  '/';
                navigation.navigate('IMCGraphic', {
                  user: user,
                  url: url,
                });
              }}></Button>
            <Card.Divider />
            <Card.Divider />
            {imcs.imcs.length !== 0 ? (
              <>
                {imcs.imcs.map((c, index) => (
                  <ListItem key={index} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{c.month}</ListItem.Title>
                      <ListItem.Subtitle>
                        IMC: {parseFloat(c.imc).toFixed(2)}
                      </ListItem.Subtitle>
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
  view: {
    height: 50,
    flex: 1,
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
