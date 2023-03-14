import React, {useState, useEffect} from 'react';
import DeportistList from '../SportsmanList';
import {Alert, FlatList, Text} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiAccountDetails} from '@mdi/js';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({route, navigation}) => {
  const [templates, setTemplate] = useState({templates: []});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getTemplates();
  }, []);

  const getUser = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      // const ID_USER = await AsyncStorage.getItem('@ID_USER');
      /*setUser({
        user: MEMBER,
      });
      console.log('Member USER: ' + user.user); //hacer otra vairble en AsyncStorage para el ID y el ROL
      */
      //  console.log('ID USUARIO: ' + ID_USER);
      //return ID_USER;
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
          'http://localhost:8080/back/public/entrenador/list-planillas/' +
          +userID.id_usuario +
          '/';
        console.log(url);

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
  function getTempleteItem({item: template}) {
    return (
      <ListItem
        key={template.id}
        bottomDivider
        //onPress={() => props.navigation.navigate('UserForm', user)}
      >
        <Text>{template.id}</Text>
        <ListItem.Content>
          <ListItem.Title>
            {template.deportista.nombre} {template.deportista.apellido}
          </ListItem.Title>
          <ListItem.Subtitle>Fecha: {template.fecha}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          // onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => navigation.navigate('TemplateDetailTrainer', template)}
          type="clear"
          icon={
            <Icon
              name="account-details"
              type="material-community"
              size={25}
              color="#6495ed"></Icon>
          }
        />
        <Button
          // onPress={() => userDelete(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </ListItem>
    );
  }

  return (
    <>
      <FlatList
        keyExtractor={template => template.id_planilla.toString()}
        data={templates.templates}
        renderItem={getTempleteItem}
      />
    </>
  );
};
