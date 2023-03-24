import React, {useState, useEffect} from 'react';
import DeportistList from '../SportsmanList';
import {Alert, FlatList, Text} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiAccountDetails} from '@mdi/js';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({route, navigation}) => {
  const [templates, setTemplates] = useState({
    nutricionistTemplates: [],
    kinesiologistTemplates: [],
    trainerTemplates: [],
    physicalTrainerTemplates: [],
    deportologistTemplates: [],
  });
  //   const [kinesiologistTemplates, setKinesiologistTemplate] = useState({
  //     templates: [],
  //   });
  //   const [trainerTemplates, setTrainerTemplate] = useState({templates: []});
  //   const [physicalTrainerTemplates, setPhysicalTrainerTemplate] = useState({
  //     templates: [],
  //   });
  //   const [deportologistTemplates, setDeportologistTemplate] = useState({
  //     templates: [],
  //   });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getTemplates();
  }, []);

  const getUser = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');

      const data = {
        MEMBER,
        TOKEN,
        ID,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTemplates = () => {
    setLoading(true);

    getUser()
      .then(data => {
        // console.log(data.MEMBER);
        // console.log(data.TOKEN);
        // console.log(data.ID);
        const idX = JSON.parse(data.ID);
        // console.log(idX);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url =
          'http://localhost:8080/back/public/deportistas/get-planillas/' +
          +idX +
          '/' +
          idX;
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            //console.log(json);
            console.log(json);

            if (json.success) {
              setTemplates({
                nutricionistTemplates: json.planillaNutricionista,
                kinesiologistTemplates: json.planillaKinesiologo,
                trainerTemplates: json.planillaEntrenador,
                physicalTrainerTemplates: json.planillaPreparadorFisico,
                deportologistTemplates: json.planillaDeportologo,
              });
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
          <ListItem.Subtitle>Fecha: 25/10/2022</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          // onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => navigation.navigate('TemplateDetail', template)}
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
        keyExtractor={template => template.id.toString()}
        data={templates.templates}
        renderItem={getTempleteItem}
      />
    </>
  );
};