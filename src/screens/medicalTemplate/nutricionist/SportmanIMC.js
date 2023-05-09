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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '@rneui/themed';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [users, setUsers] = useState({users: []});
  const [UserRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    // getUserRole();
    getUsers();
  }, []);

  const getUser = async () => {
    try {
      // const MEMBER = await AsyncStorage.getItem('@MEMBER');
      // const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      // const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        ROLE,
        // MEMBER,
        // TOKEN,
        // ID,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRole = () => {
    getUser().then(data => {
      const roleX = JSON.parse(data.ROLE);
      setUserRole(roleX);
    });
  };

  const getUserData = async () => {
    try {
      // const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      // const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        ROLE,
        // MEMBER,
        TOKEN,
        // ID,
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = () => {
    setLoading(true);
    let valorToken;

    getUserData()
      .then(data => {
        const roleX = JSON.parse(data.ROLE);
        setUserRole(roleX);

        const headers = {
          Authorization: 'Bearer ' + data.TOKEN,
        };

        fetch(environment.baseURL + 'profesionales/deportistas', {
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
      <>
        <ListItem
          key={user.id_usuario}
          bottomDivider
          onPress={() => {
            navigation.navigate('IMC', {user});
          }}>
          <ListItem.Content>
            <ListItem.Title>
              {user.nombre} {user.apellido}
            </ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>

          <Icon name="arrow-right" type="font-awesome" color="#FF69B4" />
        </ListItem>
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Card>
            {users.users.length === 0 ? (
              <>
                <Text style={styles.text}>
                  * No hay deportistas registrados aun
                </Text>
                <Card.Divider />
              </>
            ) : (
              <></>
            )}

            <Text style={styles.textInfo}>
              * Seleccione un deportista para ver su IMC por mes
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
  text: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 10,
  },
});
