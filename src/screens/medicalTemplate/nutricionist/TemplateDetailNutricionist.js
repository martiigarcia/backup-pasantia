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
import {List} from 'react-native-paper';
import {ListItem} from '@rneui/themed';
import BigList from 'react-native-big-list';
import {HStack} from '@react-native-material/core';
import ListItemMeasures from '../../../components/ListItemMeasures';
import ListItemPerimeters from '../../../components/ListItemPerimeters';
import ListItemFolds from '../../../components/ListItemFolds';
import ListItemFoods from '../../../components/ListItemFoods';

const Separator = () => <View style={styles.separator} />;

export default ({route, navigation}) => {
  const [template, setTemplate] = useState(route.params ? route.params : {});
  const [touche, setTouch] = useState(false);
  const [foods, setFoods] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    // setFoods(template.comida);
    // setMeasures(template.medidas_antropometricas);
    console.log('template IN DETAIL: ');
    console.log(template);
    // console.log('foods: ');
    //console.log(template.comida);
    // console.log('medidas: ');
    // console.log(template.medidas_antropometricas);
  }, []);

  function FoodList() {
    //console.log('FOOD LIST: ');
    //console.log(template.comida);

    return (
      <>
        <Card.Title>COMIDAS</Card.Title>
        <Card.Divider />
        <ListItemFoods foods={template.comida} />
        <Card.Divider />
      </>
    );
  }

  function render() {
    return (
      <>
        <Card.Title>MEDIDAS ANTROPOMETRICAS</Card.Title>
        <Card.Divider />
        <ListItemMeasures measures={template.medidas_antropometricas.medidas} />

        <Card.Divider />

        <Card.Title>PERIMETROS</Card.Title>
        <Card.Divider />
        <ListItemPerimeters
          perimeters={template.medidas_antropometricas.perimetros}
        />

        <Card.Divider />

        <Card.Title>PLIEGUES</Card.Title>
        <Card.Divider />

        <ListItemFolds folds={template.medidas_antropometricas.pliegues} />
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
          Fecha de la planilla nutricionista: {'\n'}
          {template.fecha}
        </Text>

        <SafeAreaView style={styles.container}>
          {/* <ScrollView style={styles.scrollView}>*/}

          <View style={styles.view}>
            <Card>
              <FlatList
                ListHeaderComponent={<>{FoodList()}</>}
                ListFooterComponent={<>{render()}</>}
              />
            </Card>
          </View>

          <Separator />

          <View style={styles.fixToText}>
            <View style={styles.vertical}>
              <Button
                title="Modificar"
                onPress={() =>
                  navigation.navigate('UpdateTemplateNutricionist')
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
