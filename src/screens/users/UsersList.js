import React, {useState, useEffect} from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiEyeOutline} from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Input, ButtonGroup} from '@rneui/themed';
import {Stack} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FechaInput from '../../components/FechaInput';
import {Card} from '@rneui/themed';
import {environment} from '../../environments/environment';

export default ({route, navigation}) => {
  const [users, setUsers] = useState({users: []});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getUsers();
  }, [{}]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@AUTH_TOKEN');

      return token;
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = () => {
    setLoading(true);
    let valorToken;

    getToken()
      .then(token => {
        const headers = {
          Authorization: 'Bearer ' + token,
        };

        fetch(environment.baseURL + 'users/list-users', {
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            setUsers({
              users: json.users,
            });
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const userDelete = user => {
    // console.log(user.estado);
    const url = environment.baseURL + 'users/delete-user/' + user.id_usuario;

    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(json => {
        // console.log('json: ' + json);
        if (json.success) {
          user.estado = 'Inactivo';
          Alert.alert('Elimnación exitosa!', json.message);
          navigation.navigate('UsersList');
        } else {
          Alert.alert('Error... algo salio mal', json.message);
          //console.log('json errores:' + json.errors);
          setErrors({
            errors: json.errors,
          });
          // console.log('ERRORES : ' + errors);
        }

        //
      })
      .catch(error => {
        console.log(error);
      });
  };
  const userActivate = user => {
    // console.log(user.estado);
    const url = environment.baseURL + 'users/activate-user/' + user.id_usuario;

    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        // console.log('json: ' + json);
        if (json.success) {
          user.estado = 'Activo';
          Alert.alert('Activación exitosa!', json.message);
          navigation.navigate('UsersList');
        } else {
          Alert.alert('Error... algo salio mal', json.message);
          //console.log('json errores:' + json.errors);
          setErrors({
            errors: json.errors,
          });
          // console.log('ERRORES : ' + errors);
        }

        //
      })
      .catch(error => {
        console.log(error);
      });
  };
  const userAuthorization = user => {
    // console.log(user.estado);
    const url = environment.baseURL + 'users/autorize-user/' + user.id_usuario;

    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        // console.log('json: ' + json);
        if (json.success) {
          user.estado = 'Activo';
          Alert.alert('Autorización extiosa!', json.message);
          navigation.navigate('UsersList');
        } else {
          Alert.alert('Error... algo salio mal', json.message);
          //console.log('json errores:' + json.errors);
          setErrors({
            errors: json.errors,
          });
          // console.log('ERRORES : ' + errors);
        }

        //
      })
      .catch(error => {
        console.log(error);
      });
  };

  function getUserItem({item: user}) {
    return (
      <ListItem
        key={user.id_usuario}
        bottomDivider
        onPress={() =>
          navigation.navigate('UserForm', {user: user, state: user.estado})
        }>
        <ListItem.Content>
          <ListItem.Title>
            {user.nombre} {user.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          <ListItem.Subtitle>Estado: {user.estado}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="edit" size={25} type="font-awesome" color="orange" />

        {user.estado === 'Activo' && (
          <Button
            onPress={() => userDelete(user)}
            type="clear"
            icon={<Icon name="delete" size={25} color="red" />}
          />
        )}

        {user.estado === 'Inactivo' && (
          <>
            <Button
              onPress={() => userActivate(user)}
              type="clear"
              icon={<Icon name="visibility" size={25} color="#6495ed" />}
            />
          </>
        )}

        {user.estado === 'Pendiente' && (
          <>
            <Button
              onPress={() => userAuthorization(user)}
              type="clear"
              icon={<Icon name="lock" size={25} color="#00fa9a" />}
            />
          </>
        )}
      </ListItem>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Card>
            <FlatList
              keyExtractor={user => user.id_usuario.toString()}
              data={users.users}
              renderItem={getUserItem}
            />
          </Card>
        </View>
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
});
