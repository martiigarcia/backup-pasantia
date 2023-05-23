import React, {useState, useEffect} from 'react';
import moment from 'moment';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [templates, setTemplate] = useState({templates: []});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getTemplates();
  }, [{}]);

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
  const getTemplates = () => {
    setLoading(true);
    let valorToken;

    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };
        //  console.log('USER:     ' + user);
        const userID = JSON.parse(data.ID);
        //  console.log(userID.nombre);
        const url =
          environment.baseURL + 'entrenador/list-planillas/' + +userID + '/';
        // console.log(url);

        fetch(url)
          .then(resp => resp.json())
          .then(json => {
            //console.log(json);
            // console.log(json.planillas);

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

  const handleDelete = templateID => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };
        //  console.log('USER:     ' + user);
        const userID = JSON.parse(data.ID);
        //  console.log(userID.nombre);
        const url =
          environment.baseURL +
          'entrenador/delete-planilla/' +
          templateID +
          '/' +
          userID;

        console.log(url);

        fetch(url, {
          method: 'DELETE',
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            // console.log(json.planillas);

            if (json.success) {
              console.log('ENTRA');
              Alert.alert('Enhorabuena!', json.message);
              getTemplates();
            } else {
              Alert.alert('Error... algo salio mal', json.message);
              console.log(json.errors);
              setErrors({
                errors: json.errors,
              });
              console.log(errors);
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
        onPress={() => navigation.navigate('TemplateDetailTrainer', template)}>
        {/* <Text>{template.id_planilla}</Text> */}
        <ListItem.Content>
          <ListItem.Title>
            {template.deportista.nombre} {template.deportista.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>Fecha: {template.fecha}</ListItem.Subtitle>
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
        {/* <IconButton
          variant="outlined"
          onPress={() => {
            console.log('EDITAR OPTION');
            navigation.navigate('UpdateTemplateNutricionist');
          }}
          type="clear"
          icon={
            <Icon name="edit" size={25} type="font-awesome" color="orange" />
          }
        /> */}

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
              {
                text: 'Eliminar',
                onPress: () => handleDelete(template.id_planilla),
              },
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
              keyExtractor={template => template.id_planilla.toString()}
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
