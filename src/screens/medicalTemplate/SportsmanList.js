import React, {useState, useEffect} from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiEyeOutline} from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({route, navigation}) => {
  const [users, setUsers] = useState({users: []});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getUsers();
  }, []);

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
              users: json.users.filter(user => user.rol === 'Deportista'),
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

  function getUserItem({item: user}) {
    return (
      <ListItem
        key={user.id_usuario}
        bottomDivider
        // onPress={() => props.navigation.navigate('UserForm', user)}
      >
        <ListItem.Content>
          <ListItem.Title>
            {user.nombre} {user.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          onPress={() =>
            navigation.navigate('CreateTemplateKinesiologist', user)
          }
          type="clear"
          icon={<Icon name="add" size={25} color="orange" />}
        />
      </ListItem>
    );
  }

  return (
    <>
      <Text>Deportistas: </Text>
      <FlatList
        keyExtractor={user => user.id_usuario.toString()}
        data={users.users}
        renderItem={getUserItem}
      />
    </>
  );
};
