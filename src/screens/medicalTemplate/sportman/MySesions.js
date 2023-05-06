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

export default ({route, navigation}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          {console.log(user)}
          <Text>MySesions</Text>
          <Text>Elegir fechas ¿? y listar</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
});
