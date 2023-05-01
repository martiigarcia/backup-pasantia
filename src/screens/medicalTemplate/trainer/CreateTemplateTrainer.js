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
  Icon,
  IconComponentProvider,
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
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Divider} from '@rneui/themed';
// import {Icon} from '@rneui/base';
import {Input, Card} from '@rneui/themed';
import {List} from 'react-native-paper';
import {ListItem} from '@rneui/themed';
import BigList from 'react-native-big-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FechaInput from '../../../components/FechaInput';
import moment from 'moment';
import {environment} from '../../../environments/environment';

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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
    paddingBottom: StatusBar.currentHeight,
    marginBottom: StatusBar.currentHeight,
  },
  vertical: {
    display: 'flex',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
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
  textEmail: {
    textAlign: 'center',
  },
  textAutor: {
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    width: 210,
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    // padding: 5,
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({route, navigation}) => {
  //info de inicio:
  const [sportman, setSportman] = useState(
    route.params.user ? route.params.user : {},
  );
  const [errors, setErrors] = useState({errors: []});
  //para ver los dialog/dropbox
  const [isFocus, setIsFocus] = useState(false);
  const [shots, setShots] = useState({
    //ambos valores deben ser numericos si o si
    total: '',
    scored: '',
  });

  useEffect(() => {}, []);

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

  const handleSave = () => {
    /*
{ "playerID": número, obligatorio //ID del deportista
  "ownerID": número, obligatorio //ID del entrenador
  "date": string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`
  "shots": { //objeto JSON, no puede estar vació porque es lo único que tiene la planilla de entrenador (por ahora)
          "total": número, obligatorio, //lanzados
          "scored": número, obligatorio //acertados
  }
}


{
  "ownerID":"3",
  "playerID":"5",
  "date":"2023-04-30T17:17:40.220Z",
  "shots":
  {
   "total":"958998",
   "scored":"2121"
  }
}

*/
    const url = environment.baseURL + 'entrenador/create-planilla';
    console.log(url);

    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const dateX = new Date();

        const templateData = {
          ownerID: idX,
          playerID: sportman.id_usuario,
          date: dateX.toISOString(),
          shots: shots,
        };

        console.log(JSON.stringify(templateData));

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(templateData),
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            console.log(json.success);

            if (json.success) {
              console.log('ENTRA');
              Alert.alert('Se ha registrado con exito!', json.message);
              navigation.navigate('HomeTrainer');
            } else {
              Alert.alert('Error... algo salio mal', json.message);
              console.log(json.errors);
              setErrors({
                errors: json.errors,
              });
              console.log(errors);
            }

            // setLoading(false);
          })
          .catch(error => {
            console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
      });
  };

  return (
    <Provider>
      <Text style={styles.textNombre}>
        {sportman.nombre} {sportman.apellido}
      </Text>
      <Text style={styles.textTipoFicha}>
        * La planilla se registrara con la fecha actual
      </Text>

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Card>
              <Card.Title>TIROS</Card.Title>
              <Card.Divider />
              <Input
                style={styles.input}
                onChangeText={total =>
                  // console.log(name)
                  setShots({...shots, total})
                }
                placeholder="Cantidad de tiros hechos (total)"
                value={shots.total}
                keyboardType="numeric"
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />
              <Input
                style={styles.input}
                onChangeText={scored =>
                  // console.log(name)
                  setShots({...shots, scored})
                }
                placeholder="Cantidad de tiros convertidos"
                value={shots.scored}
                keyboardType="numeric"
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />
            </Card>
          </View>

          <Separator />

          <View style={styles.fixToText}>
            <View style={styles.vertical}>
              <Button title="Guardar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};
