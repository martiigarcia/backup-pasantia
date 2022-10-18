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
import {Icon, Input} from '@rneui/themed';
import {Button, Stack} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FechaInput from '../../components/FechaInput';

export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});
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
    getRoles();
    getAction();
  }, []);

  const getAction = () => {
    user.id_usuario ? setOption('update') : setOption('create');
  };

  const getRoles = () => {
    setLoading(true);
    fetch('http://localhost:8080/back/public/auth/roles')
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
    const usuario = {
      email: user.email,
      name: user.nombre,
      surname: user.apellido,
      wantedRole: null,
    };

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

    console.log(usuario);
    fetch('http://localhost:8080/back/public/users/create-user', {
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
          navigation.navigate('UsersList');
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

    const usuario = {
      email: user.email,
      name: user.nombre,
      surname: user.apellido,
      wantedRole: user.rol,
      birthDate: user.fecha_nacimiento,
    };
    console.log(usuario);

    const url =
      'http://localhost:8080/back/public/users/update-user/' + user.id_usuario;

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(usuario),
    })
      .then(response => response.json())
      .then(json => {
        console.log('json: ' + json);
        if (json.success) {
          Alert.alert('Se ha modificado con exito!', json.message);
          navigation.navigate('UsersList');
        } else {
          Alert.alert('Error... algo salio mal', json.message);
          console.log('json errores:' + json.errors);
          setErrors({
            errors: json.errors,
          });
          console.log('ERRORES : ' + errors);
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
    console.log(date);
    setDate(date);
    setUser({...user, date});
  };

  return (
    <>
      <Text>UserForm</Text>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
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

            {option === 'update' && (
              <>
                <Text style={styles.text}>
                  Fecha de nacimiento:
                  <Text style={styles.textInfo}> {user.fecha_nacimiento}</Text>
                </Text>
                <FechaInput doDate={handleDate} />
              </>
            )}

            <Text style={styles.text}>
              Rol en el sistema:
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
            <Text style={styles.textError}>{errors.errors.wantedRole}</Text>

            <View style={styles.view}>
              <Stack fill center spacing={4}>
                <Button
                  title="Guardar"
                  style={styles.button}
                  onPress={() => {
                    handleSave();
                    //navigation.navigate('UserList');
                  }}
                />
              </Stack>
            </View>
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
    marginHorizontal: 20,
  },
  view: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
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
