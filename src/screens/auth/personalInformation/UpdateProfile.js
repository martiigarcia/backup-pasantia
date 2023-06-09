import React, {useContext, useEffect, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon, Input, ButtonGroup} from '@rneui/themed';
import {Button, Stack} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FechaInput from '../../../components/FechaInput';
import {Card} from '@rneui/themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [user, setUser] = useState(route.params ? route.params : {});
  // const [user, setUser] = useState(
  //   route.params && route.params.user ? route.params.user : {},
  // );
  // const [userState, setUserState] = useState(
  //   route.params && route.params.state ? route.params.state : '',
  // );

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [roles, setRoles] = useState({roles: []});
  const [option, setOption] = useState({option: ''});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    console.log(user);
  }, []);

  const getMemberToken = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');

      const data = {
        MEMBER,
        TOKEN,
        ID,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // const getUser = () => {
  //   setLoading(true);

  //   getMemberToken()
  //     .then(data => {
  //       // const idX = JSON.parse(data.ID);

  //       const headers = {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + data.TOKEN,
  //       };

  //       const url =
  //         'http://localhost:8080/back/public/users/get-user/' + user.id_usuario;
  //       console.log(url);

  //       fetch(url, {headers})
  //         .then(resp => resp.json())
  //         .then(json => {
  //           if (json.success) {
  //             setUser({
  //               user: json.user,
  //             });
  //           } else {
  //             Alert.error('Error', json.message);
  //           }

  //           setLoading(false);
  //         })
  //         .catch(error => {
  //           // console.log(error);
  //           setLoading(false);
  //         });
  //     })
  //     .catch(error => {
  //       // console.log(error);
  //       setLoading(false);
  //     });
  // };

  const handleSave = () => {
    setErrors({errors: []});
    console.log('UPDATE PROFILE METHOD');

    getMemberToken().then(data => {
      const idX = JSON.parse(data.ID);
      // const headers = {
      //   'Content-Type': 'application/json',
      //   Authorization: 'Bearer ' + data.TOKEN,
      // };

      const usuario = {
        email: user.email,
        name: user.nombre,
        surname: user.apellido,
        birthDate: user.fecha_nacimiento,
      };

      console.log(usuario);

      const url = environment.baseURL + 'profile/update/' + idX + '/' + idX;

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        },
        body: JSON.stringify(usuario),
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          // if (json.success) {
          //   Alert.alert('Se ha modificado con exito!', json.message);
          //   navigation.navigate('UserList');
          // } else {
          //   Alert.alert('Error... algo salio mal', json.message);
          //   // console.log('json errores:' + json.errors);
          //   setErrors({
          //     errors: json.errors,
          //   });
          //   console.log(json.errors);
          // }

          //
        })
        .catch(error => {
          console.log('catch: ' + error);
        });
    });
  };

  // const handleSave = () => {
  //   setErrors({errors: []});

  //   updateUser();
  // };

  const handleDate = date => {
    console.log('USERFORM METHOD: ' + date);
    setDate(date);
    setUser({...user, date});
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Card>
              <Card.Title style={styles.titleCard}>
                Actualizar mis datos
              </Card.Title>
              <Card.Divider />
              <Text style={styles.text}>Nombre</Text>
              <Input
                style={styles.input}
                onChangeText={nombre => setUser({...user, nombre})}
                placeholder="Completar"
                value={user.nombre}
                errorStyle={{color: 'red'}}
                errorMessage={errors.errors.name}
              />
              <Text style={styles.text}>Apellido</Text>
              <Input
                style={styles.input}
                onChangeText={apellido => setUser({...user, apellido})}
                placeholder="Completar"
                value={user.apellido}
                errorStyle={{color: 'red'}}
                errorMessage={errors.errors.surname}
              />
              <Text style={styles.text}>Email:</Text>
              <Input
                style={styles.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Completar ej. a@a.com"
                value={user.email}
                errorStyle={{color: 'red'}}
                errorMessage={errors.errors.email}
              />

              <>
                <Text style={styles.text}>
                  Fecha de nacimiento:
                  <Text style={styles.textInfo}> {user.fecha_nacimiento}</Text>
                </Text>
                <FechaInput doDate={handleDate} />
              </>

              <View style={styles.view}>
                <Stack fill center spacing={4}>
                  <Button
                    title="Guardar"
                    style={styles.button}
                    onPress={() => {
                      handleSave();
                    }}
                  />
                </Stack>
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },

  view: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // container: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight,
  // },
  // scrollView: {
  //   marginHorizontal: 20,
  // },
  // view: {
  //   paddingTop: StatusBar.currentHeight,
  //   paddingBottom: StatusBar.currentHeight,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // form: {
  //   padding: 20,
  // },
  input: {
    height: 50,
    // borderColor: 'gray',
    // borderWidth: 1,
    // margin: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    padding: 10,
  },
  textError: {
    paddingLeft: 10,
    color: 'red',
    fontSize: 12,
  },
  textInfo: {
    fontSize: 15,
    textAlign: 'left',
    padding: 10,
    color: '#DFA8F8',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
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
  buttonDate: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
