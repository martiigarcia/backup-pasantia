import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiEyeOutline} from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '@rneui/themed';

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

        fetch('http://localhost:8080/back/public/profesionales/deportistas', {
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            setUsers({
              users: json.deportistas,
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
        onPress={() => navigation.navigate('CreateTemplate', user)}>
        <ListItem.Content>
          <ListItem.Title>
            {user.nombre} {user.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="add" size={25} color="orange" />

        {/* <Button
          onPress={() => navigation.navigate('CreateTemplate', user)}
          type="clear"
          icon={<Icon name="add" size={25} color="orange" />}
        /> */}
      </ListItem>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Card>
            <Text style={styles.textInfo}>
              * Seleccione un deportista para registrar una nueva planilla
            </Text>
            <Card.Divider />
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
  textInfo: {
    fontSize: 15,
    textAlign: 'left',
    padding: 10,
  },
});
