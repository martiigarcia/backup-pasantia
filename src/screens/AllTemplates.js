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
  VirtualizedList,
} from 'react-native';
import {Button, IconButton} from '@react-native-material/core';
import {Avatar, ListItem, Icon} from '@rneui/themed';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../environments/environment';
import {Card} from '@rneui/base';

export default ({route, navigation}) => {
  const {user} = route.params;
  const [templates, setTemplates] = useState([
    {template: [], title: 'Planillas nutricionales'},
    {template: [], title: 'Planillas kinesiologicas'},
    {template: [], title: 'Planillas entrenador'},
    {template: [], title: 'Planillas preparador fisico'},
  ]);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    console.log(user);
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
          environment.baseURL +
          'deportistas/get-planillas/' +
          +user.id_usuario +
          '/' +
          idX;
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            // console.log(json);
            // console.log(json);

            if (json.success) {
              setTemplates([
                {
                  // nutricionistTemplates: json.planillaNutricionista,
                  template: json.planillaNutricionista.map(item => ({
                    ...item,
                    professional: item.nutricionista,
                  })),
                  // template: json.planillaNutricionista,
                  title: 'Planillas nutricionales',
                },
                {
                  // kinesiologistTemplates: json.planillaKinesiologo,
                  // template: json.planillaKinesiologo,
                  template: json.planillaKinesiologo.map(item => ({
                    ...item,
                    professional: item.kinesiologo,
                  })),
                  title: 'Planillas kinesiologicas',
                },
                {
                  // trainerTemplates: json.planillaEntrenador,
                  // template: json.planillaEntrenador,
                  template: json.planillaEntrenador.map(item => ({
                    ...item,
                    professional: item.entrenador,
                  })),
                  title: 'Planillas entrenador',
                },
                {
                  // physicalTrainerTemplates: json.planillaPreparadorFisico,
                  // template: json.planillaPreparadorFisico,
                  template: json.planillaPreparadorFisico.map(item => ({
                    ...item,
                    professional: item.preparador_fisico,
                  })),
                  title: 'Planillas preparador fisico',
                },
              ]);
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

  const getItem = (data, index) => {
    const template = Object.keys(data)[index];
    const title = data[template].title;
    const templates = data[template].template;
    // if (title === 'Planillas nutricionales') {
    //   templates = data[template].nutricionistTemplates;
    // } else {
    //   if (title === 'Planillas kinesiologicas') {
    //     templates = data[template].kinesiologistTemplates;
    //   } else {
    //     if (title === 'Planillas entrenador') {
    //       templates = data[template].trainerTemplates;
    //     } else {
    //       templates = data[template].physicalTrainerTemplates;
    //     }
    //   }
    // }

    return {
      template,
      title,
      templates,
    };
  };

  const getItemCount = () => {
    return templates.length;
  };

  const renderItem = ({item}) => {
    const {title, templates} = item;
    console.log(item);
    return (
      <View>
        <Card.Title style={styles.titleCard}>{item.title}</Card.Title>
        {templates.map(template => (
          <ListItem
            key={template.id}
            bottomDivider
            onPress={
              () => handleDetail({template, title})
              // navigation.navigate('TemplateDetail', template)
            }>
            <ListItem.Content>
              <ListItem.Title>
                Fecha: {template.fecha}
                {/* {console.log('PLANILLAS: ' + template)} */}
              </ListItem.Title>
              <ListItem.Subtitle>
                Profesional: {template.professional.nombre}{' '}
                {template.professional.apellido}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
              name="info-circle"
              size={25}
              type="font-awesome"
              color="#6495ed"
            />
          </ListItem>
        ))}
      </View>
    );
  };
  const handleDetail = ({template, title}) => {
    console.log('HANDLE DETAIL');

    if (title === 'Planillas nutricionales') {
      navigation.navigate('TemplateDetailN', template);
    } else {
      if (title === 'Planillas kinesiologicas') {
        navigation.navigate('TemplateDetailK', template);
      } else {
        if (title === 'Planillas entrenador') {
          navigation.navigate('TemplateDetailT', template);
        } else {
          navigation.navigate('TemplateDetailPT', template);
        }
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Card>
            <Card.Title style={styles.titleCardSportman}>
              {user.nombre} {user.apellido}
            </Card.Title>
            <Text style={styles.textInfo}>
              Seleccione una planilla para verla en detalle.
            </Text>
            <Card.Divider />

            <VirtualizedList
              data={templates}
              // initialNumToRender={4}
              getItemCount={getItemCount}
              getItem={getItem}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
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
  titleCard: {
    fontSize: 20,
  },
  titleCardSportman: {
    fontSize: 30,
    // textDecorationLine: 'underline',
  },
  view: {
    // paddingTop: StatusBar.currentHeight,
    // paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
