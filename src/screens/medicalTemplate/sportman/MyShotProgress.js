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
import {Card} from '@rneui/themed';
import {Button, Stack, Text} from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';
import FechaInput from '../../../components/FechaInput';
import moment from 'moment';

export default ({route, navigation}) => {
  const [user, setUser] = useState({});
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [UserRole, setUserRole] = useState('');

  useEffect(() => {
    console.log('MY SHOTS PROGRESS');
    getUser();
  }, []);

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

  const getUser = () => {
    getUserData()
      .then(data => {
        const MEMBER = JSON.parse(data.MEMBER);
        setUser(MEMBER);
      })
      .catch(error => {
        console.log(error);
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

  const handleSave = () => {
    console.log('handle SAVE');
    // console.log(selectedUser);
    // console.log(dateStart);
    // console.log(dateEnd);

    ///deportistas/grafico-lanzamientos/6/2022-02-10/2022-10-03/6
    const url =
      environment.baseURL +
      'deportistas/grafico-lanzamientos/' +
      user.id_usuario +
      '/' +
      moment(dateStart).format('YYYY-MM-DD') +
      '/' +
      moment(dateEnd).format('YYYY-MM-DD') +
      '/' +
      user.id_usuario;

    if (dateStart === '') {
      Alert.alert('Error', 'Debe seleccionar una fecha de inicio');
    } else {
      if (dateEnd === '') {
        Alert.alert('Error', 'Debe seleccionar una fecha de fin');
      } else {
        console.log('esta todo completo');
        navigation.navigate('ShotProgressList', {
          user: user,
          url: url,
          // start: moment(dateStart).format('YYYY-MM-DD'),
          // end: moment(dateEnd).format('YYYY-MM-DD'),
          // UserRole: UserRole, // si esto no funciona hacer user.rol
          // UserRole: user.rol,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          {console.log(user)}

          <>
            <Card.Title>INTERVALO DE FECHAS</Card.Title>
            <Card.Divider />
            <Text style={styles.textInfo}>
              * Seleccione las fechas entre las que se buscaran los lanzamientos
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
            {user && (
              <>
                <Button title={'Guardar'} onPress={handleSave}></Button>
              </>
            )}
          </>
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
