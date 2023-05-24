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
import FechaInput from '../../components/FechaInput';
import {Card} from '@rneui/themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../environments/environment';

export default ({route, navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const [user, setUser] = useState(route.params ? route.params : {});
  const [user, setUser] = useState(
    route.params && route.params.user ? route.params.user : {},
  );
  const [userState, setUserState] = useState(
    route.params && route.params.state ? route.params.state : '',
  );

  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [roles, setRoles] = useState({roles: []});
  const [option, setOption] = useState({option: ''});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  let newUserState = '';

  useEffect(() => {
    getRoles();
    getAction();
    getSelectedIndexState();
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

  const getUser = () => {
    setLoading(true);

    getMemberToken()
      .then(data => {
        // const idX = JSON.parse(data.ID);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'users/get-user/' + user.id_usuario;
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            if (json.success) {
              setUser({
                user: json.user,
              });
            } else {
              Alert.error('Error', json.message);
            }

            setLoading(false);
          })
          .catch(error => {
            // console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        // console.log(error);
        setLoading(false);
      });
  };
  const getSelectedIndexState = () => {
    // console.log('SELECTED INDEX: ');
    // console.log(user.estado);
    if (userState === 'Activo') {
      setSelectedIndex(0);
    } else {
      if (userState === 'Pendiente') {
        setSelectedIndex(1);
      } else {
        if (userState === 'Inactivo') {
          setSelectedIndex(2);
        }
      }
    }
  };

  const getAction = () => {
    user.id_usuario ? setOption('update') : setOption('create');
  };

  const getRoles = () => {
    setLoading(true);
    fetch(environment.baseURL + 'auth/roles')
      .then(resp => resp.json())
      .then(json => {
        setRoles({
          roles: json.roles,
        });
        setLoading(false);
      });
  };

  const createUser = () => {
    console.log('CREATE METHOD');
    console.log(selectedIndex === 0);
    let estado = '';
    if (selectedIndex === 0) estado = 'Activo';

    if (selectedIndex === 1) estado = 'Pendiente';

    if (selectedIndex === 2) estado = 'Inactivo';

    console.log(estado);
    const usuario = {
      email: user.email,
      name: user.nombre,
      surname: user.apellido,
      wantedRole: user.rol,
      birthDate: user.date,
      estado: estado,
    };
    console.log(usuario);
    // const usuario = {
    //   email: user.email,
    //   name: user.nombre,
    //   surname: user.apellido,
    //   wantedRole: null,
    // };

    if (selectedRole !== null) {
      //console.log('lleno');
      usuario.wantedRole = selectedRole.nombre;

      setAlert(true);
      console.log(alert);
      //Alert.alert('debe ingresar un rol');
    }
    /*{
      "email": "El campo email es obligatorio",
      "name": "El campo name es obligatorio",
      "surname": "El campo surname es obligatorio",
      "wantedRole": "El campo wantedRole es obligatorio"
  } */
    console.log('Rol: ' + usuario.wantedRole);

    const url = environment.baseURL + 'users/create-user';
    console.log(url);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          Alert.alert('Se ha registrado con exito!', json.message);
          navigation.navigate('HomeAdministrator');
        } else {
          Alert.alert('Error... algo salio mal', json.message);
          console.log(json.errors);
          setErrors({
            errors: json.errors,
          });
          console.log(errors);
        }

        //
      })
      .catch(error => {
        console.log(error);
      });
  };
  const updateUser = () => {
    console.log('UPDATE METHOD');

    // const headers = {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + data.TOKEN,
    //   };

    console.log(selectedIndex === 0);
    let estado = '';
    if (selectedIndex === 0) estado = 'Activo';

    if (selectedIndex === 1) estado = 'Pendiente';

    if (selectedIndex === 2) estado = 'Inactivo';

    console.log(estado);
    const usuario = {
      email: user.email,
      name: user.nombre,
      surname: user.apellido,
      wantedRole: user.rol,
      birthDate: user.fecha_nacimiento,
      estado: estado,
    };

    console.log(usuario);

    const url = environment.baseURL + 'users/update-user/' + user.id_usuario;

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(usuario),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          Alert.alert('Se ha modificado con exito!', json.message);
          navigation.navigate('UserList');
        } else {
          Alert.alert('Error... algo salio mal', json.message);
          console.log('json errores:' + json.errors);
          setErrors({
            errors: json.errors,
          });
          console.log(json.errors);
        }

        //
      })
      .catch(error => {
        console.log('catch: ' + error);
      });
  };

  const handleSave = () => {
    setErrors({errors: []});

    if (option === 'create') {
      createUser();
    }
    if (option === 'update') {
      updateUser();
    }
  };

  const handleDate = date => {
    console.log('USERFORM METHOD: ' + date);
    setDate(date);
    setUser({...user, date});
  };

  return (
    <>
      {/* {console.log('SelectedIndex: ' + selectedIndex)} */}
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Card>
              {option === 'create' ? (
                <>
                  <Card.Title>REGISTRAR USUARIO</Card.Title>
                  <Card.Divider />
                </>
              ) : (
                <>
                  <Card.Title>MODIFICAR USUARIO</Card.Title>
                  <Card.Divider />
                </>
              )}

              <Text style={styles.text}>Nombre</Text>
              <Input
                style={styles.input}
                onChangeText={nombre => setUser({...user, nombre})}
                placeholder="Nombre"
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
              <Text style={styles.text}>Email</Text>
              <Input
                style={styles.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Completar ej. a@a.com"
                value={user.email}
                errorStyle={{color: 'red'}}
                errorMessage={errors.errors.email}
              />
              <Card.Divider />
              <>
                <Text style={styles.text}>
                  Fecha de nacimiento
                  <Text style={styles.textInfo}> {user.fecha_nacimiento}</Text>
                </Text>

                <FechaInput doDate={handleDate} />
                {date !== '' && (
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 10,
                      marginBottom: 15,
                      fontSize: 15,
                    }}>
                    Fecha de inicio elegida: {date.toLocaleDateString()}
                  </Text>
                )}
              </>
              <Card.Divider />
              <Text style={styles.text}>
                Rol en el sistema
                <Text style={styles.textInfo}> {user.rol}</Text>
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={roles.roles}
                search
                maxHeight={300}
                labelField="nombre"
                valueField="id_rol"
                placeholder={!isFocus ? 'Seleccionar rol' : '...'}
                searchPlaceholder="Buscar por nombre"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSelectedRole(item);
                  //  setUser({...user, item});
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              {selectedRole && (
                <Text
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    marginBottom: 15,
                    fontSize: 15,
                  }}>
                  Rol elegido: {selectedRole.nombre}
                </Text>
              )}
              <Card.Divider />
              <Text style={styles.text}>
                Estado actual
                <Text style={styles.textInfo}> {user.estado}</Text>
              </Text>
              <ButtonGroup
                buttons={['ACTIVO', 'PENDIENTE', 'INACTIVO']}
                selectedIndex={selectedIndex}
                onPress={value => {
                  setSelectedIndex(value);
                  console.log(value);
                }}
                // containerStyle={{marginBottom: StatusBar.currentHeight}}
                selectedButtonStyle={{backgroundColor: '#6409E6'}}
              />

              {selectedIndex !== null && (
                <>
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 10,
                      marginBottom: 15,
                      fontSize: 15,
                    }}>
                    Estado elegido: {selectedIndex === 0 && 'Activo'}
                    {selectedIndex === 1 && 'Pendiente'}
                    {selectedIndex === 2 && 'Inactivo'}
                  </Text>
                </>
              )}
              <Card.Divider />
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
  textInfo: {
    fontSize: 15,
    textAlign: 'left',
    padding: 10,
    color: '#DFA8F8',
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
    // paddingTop: StatusBar.currentHeight,
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
    fontSize: 20,
    textAlign: 'left',
    padding: 10,
  },
  // text: {
  //   textAlign: 'center',
  //   marginBottom: 10,
  //   color: 'black',
  // },
  dropdown: {
    height: 50,
    // width: 210,
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
    marginBottom: StatusBar.currentHeight,
    paddingLeft: 10,
    // padding: 5,
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingTop: StatusBar.currentHeight,
//     paddingBottom: StatusBar.currentHeight,
//   },
//   scrollView: {
//     marginHorizontal: 20,
//   },

//   form: {
//     padding: 20,
//   },

//   view: {
//     paddingTop: StatusBar.currentHeight,
//     paddingBottom: StatusBar.currentHeight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // container: {
//   //   flex: 1,
//   //   paddingTop: StatusBar.currentHeight,
//   // },
//   // scrollView: {
//   //   marginHorizontal: 20,
//   // },
//   // view: {
//   //   paddingTop: StatusBar.currentHeight,
//   //   paddingBottom: StatusBar.currentHeight,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   // form: {
//   //   padding: 20,
//   // },
//   input: {
//     height: 50,
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     // margin: 5,
//     marginBottom: 10,
//     padding: 10,
//   },
//   button: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   text: {
//     fontSize: 20,
//     textAlign: 'left',
//     padding: 10,
//   },
//   textError: {
//     paddingLeft: 10,
//     color: 'red',
//     fontSize: 12,
//   },
//   textInfo: {
//     fontSize: 15,
//     textAlign: 'left',
//     padding: 10,
//     color: '#DFA8F8',
//   },
//   dropdown: {
//     height: 50,
//     borderBottomWidth: 1,
//     borderColor: 'gray',
//     margin: 10,
//     marginBottom: 10,
//     padding: 10,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   buttonDate: {
//     height: 50,
//     borderWidth: 1,
//     margin: 10,
//     marginBottom: 10,
//     padding: 10,
//     borderColor: 'gray',
//     paddingTop: 10,
//     paddingBottom: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//   },
// });
