import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  VirtualizedList,
} from 'react-native';
import {Button, Stack, Text} from '@react-native-material/core';
import {Avatar, ListItem, Icon} from '@rneui/themed';
import {mdiEyeOutline} from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '@rneui/themed';
import {environment} from '../../../environments/environment';
import FechaInput from '../../../components/FechaInput';
import {ScrollView} from 'react-native-gesture-handler';

export default ({route, navigation}) => {
  const [users, setUsers] = useState({users: []});
  const [UserRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUserRole();
    getUsers();
  }, []);

  const getUserRole = () => {
    getUserData().then(data => {
      const roleX = JSON.parse(data.ROLE);
      setUserRole(roleX);
    });
  };

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

  const handleDateStart = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateStart(date);
  };
  const handleDateEnd = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateEnd(date);
  };

  const handleUSer = user => {
    console.log('handle user:');
    console.log(user);
    setSelectedUser(user);
  };

  const handleSave = () => {
    console.log('handle SAVE');
    // console.log(selectedUser);
    // console.log(dateStart);
    // console.log(dateEnd);
    if (Object.keys(selectedUser).length === 0) {
      Alert.alert('Error', 'El usuario no puede ser vacio');
    } else {
      if (dateStart === '') {
        Alert.alert('Error', 'La fecha de inicio no puede ser vacia');
      } else {
        if (dateEnd === '') {
          Alert.alert('Error', 'La fecha de fin no puede ser vacia');
        } else {
          console.log('esta todo completo');
          navigation.navigate('InjuriesList', {
            user: selectedUser,
            start: dateStart.toISOString(),
            end: dateEnd.toISOString(),
            UserRole: UserRole,
          });
        }
      }
    }
  };

  function getUserItem({item: user}) {
    return (
      <>
        <ListItem
          key={user.id_usuario}
          bottomDivider
          onPress={() => {
            handleUSer(user);
            //  navigation.navigate('Injuries', {user});
          }}>
          <ListItem.Content>
            <ListItem.Title>
              {user.nombre} {user.apellido}
            </ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          {user.id_usuario === selectedUser.id_usuario ? (
            <Icon name="check" type="font-awesome" color="#FF69B4" />
          ) : null}
        </ListItem>
      </>
    );
  }

  const HearderListComponent = () => {
    return (
      <>
        <Card.Title>INTERVALO DE FECHAS</Card.Title>
        <Card.Divider />
        <Text style={styles.textInfo}>
          * Seleccione las fechas entre las que se buscaran la cantidad de
          lesiones
        </Text>
        <Card.Divider />

        <Text style={styles.text}>Fecha de inicio</Text>

        <FechaInput doDate={handleDateStart} />

        {dateStart !== '' && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 15,
            }}>
            Fecha de inicio elegida: {dateStart.toLocaleDateString()}
          </Text>
        )}

        <Card.Divider />
        <Text style={styles.text}>Fecha de fin</Text>
        <FechaInput doDate={handleDateEnd} />

        {dateEnd !== '' && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 15,
            }}>
            Fecha de fin elegida: {dateEnd.toLocaleDateString()}
          </Text>
        )}

        <Card.Divider />
        <Card.Divider />
      </>
    );
  };

  const FooterListComponent = () => {
    return (
      <>
        <Card.Title>DEPORTISTAS</Card.Title>
        <Card.Divider />
        <Text style={styles.textInfo}>
          * Seleccione un deportista para ver la cantidad de lesiones
        </Text>
        <Card.Divider />

        <FlatList
          keyExtractor={user => user.id_usuario.toString()}
          data={users.users}
          renderItem={getUserItem}
        />
        <Card.Divider />
        {Object.keys(selectedUser).length !== 0 && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 15,
            }}>
            Usuario elegido: {selectedUser.nombre} {selectedUser.apellido}
          </Text>
        )}
        <Card.Divider />

        <Button title={'Guardar'} onPress={handleSave}></Button>
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Card>
            {users.users.length === 0 ? (
              <>
                <Text style={styles.textAlert}>
                  * No hay deportistas registrados aun para ver los datos
                </Text>
                <Card.Divider />
              </>
            ) : (
              <>
                <FlatList
                  ListHeaderComponent={<>{HearderListComponent()}</>}
                  ListFooterComponent={<>{FooterListComponent()}</>}
                />
              </>
            )}
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
    // fontSize: 20,
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 10,
    // fontWeight: 'bold',
    // marginBottom: 10,
  },
  textAlert: {
    borderTopWidth: 1,
    borderTopColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    color: 'red',
    // fontSize: 20,
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    // fontWeight: 'bold',
    // marginBottom: 10,
  },
});
