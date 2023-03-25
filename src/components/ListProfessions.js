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
import {Card} from '@rneui/themed';

export default ({route, navigation}) => {
  const state = {
    data: [
      {
        id: 0,
        title: 'Nutricionista',
        color: '#E74C3C',
        //  options: 'Ver mis datos, modificar datos, cambiar contraseña',
        //  image: 'https://img.icons8.com/office/512/user-menu-male--v1.png',
        //  route: 'Profile',
        // image: 'https://img.icons8.com/color/70/000000/name.png',
      },
      {
        id: 1,
        title: 'Kinesiologo',
        color: '#87CEEB',
        //  options: 'Listar usuarios y opciones',
        //  image: 'https://img.icons8.com/office/512/groups.png',
        //  route: 'UsersList',
        // image: 'https://img.icons8.com/office/70/000000/home-page.png',
      },
      {
        id: 2,
        title: 'Entrenador',
        color: '#4682B4',
        //  options: 'Registrar nuevo usuario',
        //  image: 'https://img.icons8.com/officel/512/add-user-male.png',
        //  route: 'UserForm',
        //https://img.icons8.com/color/70/000000/two-hearts.png',
      },
      {
        id: 3,
        title: 'Entrenador Físico',
        color: '#6A5ACD',
        //  options: 'Ver todas las planillas registradas',
        //  image: 'https://img.icons8.com/office/512/report-card.png',
        //  route: 'ListProfessionals',
        //image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        //image: 'https://img.icons8.com/color/70/000000/family.png',
      },
      {
        id: 4,
        title: 'Deportólogo',
        color: '#FF69B4',
        //  options: 'Ver roles del sistema',
        //  image: 'https://img.icons8.com/office/512/user-shield.png',
        //  route: 'RolesList',
        //image: 'https://img.icons8.com/color/70/000000/groups.png',
      },
    ],
  };

  useEffect(() => {}, []);

  function getUserItem({item: professional}) {
    return (
      <ListItem
        key={professional.id}
        bottomDivider
        onPress={() =>
          navigation.navigate('ListProfessionals', {
            profesional: professional.title,
          })
        }>
        <ListItem.Content>
          <ListItem.Title>{professional.title}</ListItem.Title>
          <ListItem.Subtitle>
            Ver las planillas de {professional.title}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon
          name="arrow-right"
          type="font-awesome"
          color={professional.color}
        />
      </ListItem>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Card>
            <Card.Title style={styles.titleCard}>
              Seleccione la profesión para ver las planillas
            </Card.Title>
            <Card.Divider />
            <FlatList
              keyExtractor={professional => professional.id.toString()}
              data={state.data}
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
