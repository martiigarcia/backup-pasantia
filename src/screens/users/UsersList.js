import React, {useState, useEffect} from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiEyeOutline} from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default props => {
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

        fetch('http://localhost:8080/back/public/users/list-users', {
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
    const url =
      'http://localhost:8080/back/public/users/delete-user/' + user.id_usuario;

    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(json => {
        // console.log('json: ' + json);
        if (json.success) {
          Alert.alert('Elimino el usuario con exito', json.message);
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
    const url =
      'http://localhost:8080/back/public/users/activate-user/' +
      user.id_usuario;

    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        // console.log('json: ' + json);
        if (json.success) {
          Alert.alert('Elimino el autorizo con exito', json.message);
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
    const url =
      'http://localhost:8080/back/public/users/autorize-user/' +
      user.id_usuario;

    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        // console.log('json: ' + json);
        if (json.success) {
          Alert.alert('Elimino el autorizo con exito', json.message);
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
        onPress={() => props.navigation.navigate('UserForm', user)}>
        <ListItem.Content>
          <ListItem.Title>
            {user.nombre} {user.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          <ListItem.Subtitle>Estado: {user.estado}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
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
      <Text>Usuarios</Text>
      <FlatList
        keyExtractor={user => user.id_usuario.toString()}
        data={users.users}
        renderItem={getUserItem}
      />
    </>
  );
};
