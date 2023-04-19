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
import {mdiAccountDetails} from '@mdi/js';
import {mdiInformationVariantCircleOutline} from '@mdi/js';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [templates, setTemplate] = useState({templates: []});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    console.log('listado');
    getTemplates();
  }, []);

  const getUser = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');

      return MEMBER;
    } catch (error) {
      console.log(error);
    }
  };

  const getTemplates = () => {
    setLoading(true);
    let valorToken;

    getUser()
      .then(user => {
        const headers = {
          //userID: user,
          //Authorization: 'Bearer ' + token,
        };
        //  console.log('USER:     ' + user);
        const userID = JSON.parse(user);
        //  console.log(userID.nombre);
        const url =
          environment.baseURL +
          'preparador/list-planillas/' +
          +userID.id_usuario +
          '/';
        console.log(url);

        fetch(url)
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            console.log(json.planillas);

            if (json.success) {
              setTemplate({
                templates: json.planillas,
              });
              //console.log(templates.templates);
            }

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
  function getTempleteItem({item: template}) {
    return (
      <ListItem
        key={template.id}
        bottomDivider
        onPress={() =>
          navigation.navigate('TemplateDetailPhysicalTrainer', template)
        }>
        <Text>{template.id}</Text>
        <ListItem.Content>
          <ListItem.Title>
            {template.deportista.nombre} {template.deportista.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>Fecha: 25/10/2022</ListItem.Subtitle>
        </ListItem.Content>
        <Icon
          name="info-circle"
          size={25}
          type="font-awesome"
          color="#6495ed"
        />

        {/* <Icon
              name="account-details"
              type="material-community"
              size={25}
              color="#6495ed"></Icon> */}

        <Card.Divider orientation="vertical" />
        {/* <ListItem.Content> */}
        <IconButton
          variant="outlined"
          onPress={() => {
            console.log('EDITAR OPTION');
            navigation.navigate('UpdateTemplateNutricionist');
          }}
          type="clear"
          icon={
            <Icon name="edit" size={25} type="font-awesome" color="orange" />
          }
        />

        <IconButton
          variant="outlined"
          onPress={() => {
            console.log('DELETE OPTION');
            message =
              'Desea eliminar la planilla de ' +
              template.deportista.nombre +
              ' ' +
              template.deportista.apellido +
              ', realizada el dia ' +
              template.fecha +
              '?';
            Alert.alert('Confirmación', message, [
              {
                text: 'Cancelar',
                onPress: () => console.log('cancelando...'),
                style: 'cancel',
              },
              {text: 'Eliminar', onPress: () => console.log('eliminando...')},
            ]);
          }}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </ListItem>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Card style={styles.card}>
            <Card.Title>Planillas</Card.Title>
            <Card.Divider />
            <Text style={styles.textInfo}>
              Seleccione una planilla segun el nombre del deportista y la fecha
              de la planilla para verla en detalle, editarla o eliminarla.
            </Text>
            <Card.Divider />
            <FlatList
              keyExtractor={template => template.id.toString()}
              data={templates.templates}
              renderItem={getTempleteItem}
            />
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textInfo: {
    fontSize: 15,
    textAlign: 'left',
    padding: 10,
  },
  // container: {
  //   flex: 1,
  //   width: '100%', // make sure SafeAreaView takes up full width
  // },
  // view: {
  //   flex: 1,
  //   width: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center', // make sure View takes up full width
  // },
  // card: {
  //   width: '50%', // set Card width to match List width
  //   marginRight: 0,
  // },
  container: {
    // flex: 1,
    paddingBottom: StatusBar.currentHeight,
    // marginBottom: StatusBar.currentHeight,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // marginHorizontal: 20,
  },
  // form: {
  //   padding: 20,
  // },
  // titleCard: {
  //   fontSize: 20,
  // },
  view: {
    // paddingTop: StatusBar.currentHeight,
    // paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
