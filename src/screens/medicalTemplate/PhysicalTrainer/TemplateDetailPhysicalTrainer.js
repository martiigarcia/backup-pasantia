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
import ListItemTests from '../../../components/ListItemTests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => <View style={styles.separator} />;

export default ({route, navigation}) => {
  const [template, setTemplate] = useState(route.params ? route.params : {});
  const [UserRole, setUserRole] = useState('');

  useEffect(() => {
    console.log('template: ');
    console.log(template.tests);
    getUserData().then(data => {
      const roleX = JSON.parse(data.ROLE);
      setUserRole(roleX);
    });
  }, []);

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

  function TestList() {
    return (
      <>
        {(UserRole === 'Administrador' || UserRole === 'Deportista') && (
          <>
            <Card.Title>DATOS DEL ESPECIALISTA</Card.Title>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {template.professional.nombre}{' '}
                  {template.professional.apellido}
                </ListItem.Title>
                <ListItem.Subtitle>
                  Email: {template.professional.email}{' '}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>

            <Card.Divider />
            <Card.Divider />
          </>
        )}

        <Card.Title>TESTS</Card.Title>
        <Card.Divider />
        {template.tests.length === 0 ? (
          <>
            <Text style={styles.text}>* No hay tests registrados</Text>
            <Card.Divider />
          </>
        ) : (
          <>
            <ListItemTests testx={template.tests} />
            <Card.Divider />
          </>
        )}
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
          Fecha de la planilla del preparador físico: {'\n'}
          {template.fecha}
        </Text>

        {UserRole === 'Administrador' || UserRole === 'Deportista' ? (
          <>
            <SafeAreaView style={styles.containerAdmin}>
              <View style={styles.viewAdmin}>
                <Card>
                  <FlatList
                    ListHeaderComponent={<>{TestList()}</>}
                    ListFooterComponent={<></>}
                  />
                </Card>
              </View>
            </SafeAreaView>
          </>
        ) : (
          <>
            <SafeAreaView style={styles.container}>
              <View style={styles.view}>
                <Card>
                  <FlatList
                    ListHeaderComponent={<>{TestList()}</>}
                    ListFooterComponent={<></>}
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
        )}
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
  viewAdmin: {
    justifyContent: 'center',
    height: 550,
  },
  containerAdmin: {
    height: 550,
    paddingBottom: StatusBar.currentHeight,
    marginBottom: StatusBar.currentHeight,
  },
  vertical: {
    display: 'flex',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  fixToText: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  separator: {
    paddingTop: StatusBar.currentHeight,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
