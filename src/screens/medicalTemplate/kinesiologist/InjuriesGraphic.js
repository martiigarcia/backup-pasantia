import React, {useState, useEffect} from 'react';
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
import InjuriesGraphicComponent from '../../../components/InjuriesGraphicComponent';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [injuriesList, setInjuriesList] = useState({injuriesList: []});
  useEffect(() => {
    console.log('INJURIES GRAPHIC');
    console.log(route);
    getInjuriesList();
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

  const getInjuriesList = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        // const url =
        //   environment.baseURL +
        //   'kinesiologo/grafico-tratamientos/' +
        //   route.params.user.id_usuario +
        //   '/' +
        //   route.params.start +
        //   '/' +
        //   route.params.end;
        const url = route.params.url;
        console.log(url);
        console.log(route.params.url);

        // const body = {
        //   startDate: route.params.start,
        //   endDate: route.params.end,
        // };

        fetch(url, {
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);

            if (json.success) {
              const orderedList = json.graph.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
              );

              setInjuriesList({injuriesList: orderedList});
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
              <Card.Title>
                Cantidad de sesiones realizadas para una zona
              </Card.Title>
              <Card.Divider />
              {/* {console.log('IMCS: ')}
            {console.log(imcs.imcs)} */}
              <Button
                title="Ver lista"
                onPress={() => {
                  navigation.navigate('InjuriesList', {
                    user: route.params.user,
                    url: route.params.url,
                    // start: route.params.start,
                    // end: route.params.end,
                    // UserRole: route.params.UserRole,
                  });
                }}
              />
              <Card.Divider />

              {injuriesList.injuriesList.length !== 0 && (
                <InjuriesGraphicComponent
                  injuries={injuriesList.injuriesList}
                />
              )}
              {/* 
              {imcs.imcs.length !== 0 && (
                <IMCGraphicComponent imcsX={imcs.imcs} />
              )} */}
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
