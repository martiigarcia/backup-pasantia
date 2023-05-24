import React, {useState, useEffect} from 'react';
import IMCGraphicComponent from '../../../components/IMCGraphicComponent';
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Avatar, ListItem, Icon, Card} from '@rneui/themed';

import {Button, IconButton} from '@react-native-material/core';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [imcs, setImcs] = useState({imcs: []});
  // const [UserRole, setUserRole] = useState('');
  const [user, setUser] = useState(route.params.user ? route.params.user : {});

  useEffect(() => {
    console.log('IMC GRAPHIC');
    console.log(route);
    getIMCs();
  }, []);

  // const getUserRole = () => {getUserData().then(data => {
  //     const roleX = JSON.parse(data.ROLE);
  //     setUserRole(roleX);
  //   });};

  const getUserData = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        MEMBER,
        TOKEN,
        ID,
        ROLE,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getIMCs = () => {
    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };
        let id;
        // console.log(UserRole);
        // console.log(UserRole === 'Nutricionista');
        // console.log(UserRole === 'Nutricionista' ? user.id_usuario : idX);
        if (route.params.UserRole === 'Nutricionista') {
          id = user.id_usuario;
        } else {
          id = idX;
        }
        console.log;
        // const url = environment.baseURL + 'deportistas/get-imc/' + id + '/';
        const url = route.params.url;
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            // console.log(json);

            if (json.success) {
              const parsedImcs = json.imcs.map(imc => ({
                ...imc,
                imc: parseFloat(imc.imc).toFixed(2),
              }));
              setImcs({
                imcs: parsedImcs,
              });
              // setImcs({
              //   imcs: json.imcs,
              // });
            }
            // setLoading(false);
          })
          .catch(error => {
            console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>
            <Card>
              <Card.Title>IMC por mes</Card.Title>
              <Card.Divider />
              {/* {console.log('IMCS: ')}
            {console.log(imcs.imcs)} */}
              <Button
                title="Ver como lista"
                onPress={() => {
                  // if (UserRole === 'Nutricionista') {
                  navigation.navigate('IMC', {
                    user: user,
                    url: route.params.url,
                  });
                  // } else {
                  //   navigation.navigate('IMC');
                  // }
                }}
              />
              <Card.Divider />
              <Card.Divider />
              {/* <Text>ACA VA EL GRAFICO</Text> */}
              {imcs.imcs.length !== 0 ? (
                <IMCGraphicComponent imcsX={imcs.imcs} />
              ) : (
                <>
                  <Text>
                    No existen planillas registradas para confeccionar un
                    grafico
                  </Text>
                </>
              )}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  view: {},
});
