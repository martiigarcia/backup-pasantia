import React, {useState, useEffect} from 'react';
import {
  Provider,
  Dialog,
  Button,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Stack,
} from '@react-native-material/core';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Divider} from '@rneui/themed';
import {Icon} from '@rneui/base';
import {Input, Card} from '@rneui/themed';
import ListItemBasketballThrows from '../../../components/ListItemBasketballThrows';

const Separator = () => <View style={styles.separator} />;

export default ({route, navigation}) => {
  const [template, setTemplate] = useState(route.params ? route.params : {});
  const [touche, setTouch] = useState(false);

  useEffect(() => {
    console.log('template: ');
    console.log(template);
    console.log('lesiones: ');
    console.log(template.lesion);
    console.log('sesiones: ');
    console.log(template.sesion);
  }, []);

  /*
   template:
 {
  "deportista": 
  {
    "apellido": "Perez", 
    "email": "anacleto@gmail.com", 
    "estado": "Activo", 
    "fecha_nacimiento": "2002-10-04", 
    "nombre": "Anacleto", 
    "rol": "Deportista"
  }, 
  "entrenador": 
  {
    "apellido": "Pica", 
    "email": "pedro@gmail.com", 
    "estado": "Activo", 
    "fecha_nacimiento": "2001-11-11", 
    "nombre": "Pedro", 
    "rol": "Entrenador"
  }, 
    "fecha": "0000-00-00", 
    "id_planilla": "1", 
    "lanzamientos": [
      {
        "id_lanzamientos": "1", 
        "id_planilla_entrenador": "1", 
        "tiros_convertidos": "2", 
        "tiros_lanzados": "500"
      }
    ]
  }
  */
  function BasketballThrowsList() {
    return (
      <>
        <Card.Title>LANZAMIENTOS</Card.Title>
        <Card.Divider />
        <ListItemBasketballThrows throws={template.lanzamientos} />
        <Card.Divider />
      </>
    );
  }

  function Component() {
    return (
      <>
        <Text style={styles.textNombre}>
          {template.deportista.nombre} {template.deportista.apellido}
        </Text>
        <Text style={styles.textTipoFicha}>
          Fecha de la planilla entrenador: {'\n'}
          {template.fecha}
        </Text>

        <SafeAreaView style={styles.container}>
          {/* <ScrollView style={styles.scrollView}>*/}

          <View style={styles.view}>
            <Card>
              <FlatList
                ListHeaderComponent={<>{BasketballThrowsList()}</>}
                ListFooterComponent={<></>}
              />
            </Card>
          </View>

          <Separator />

          <View style={styles.fixToText}>
            <View style={styles.vertical}>
              <Button
                title="Modificar"
                onPress={
                  () => console.log('updating')
                  // navigation.navigate('UpdateTemplateNutricionist')
                }
              />
            </View>
            <View style={styles.vertical}>
              <Button
                title="Eliminar"
                onPress={() => {
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
                      onPress: () => console.log('eliminando...'),
                    },
                  ]);
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <Provider>
      <Component />
    </Provider>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  view: {
    height: 50,
    flex: 1,
  },

  vertical: {
    display: 'flex',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  fixToText: {
    // paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  separator: {
    paddingTop: StatusBar.currentHeight,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
  input: {
    paddingTop: StatusBar.currentHeight,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textNombre: {
    color: 'white',
    fontSize: 40,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#6409E6',
  },
  textTipoFicha: {
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
