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
import {environment} from '../../../environments/environment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FechaInput from '../../../components/FechaInput';
import moment from 'moment';

const Separator = () => <View style={styles.separator} />;

export default ({route, navigation}) => {
  //info de inicio:
  const [sportman, setSportman] = useState(
    route.params.user ? route.params.user : {},
  );
  const [excerciseTypes, setExerciseTypes] = useState({excerciseTypes: []});
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [tests, setTests] = useState({tests: []});
  const [jsonTests, setJsonTests] = useState({jsonTests: []});
  const [weight, setWeight] = useState('');
  const [rm, setRM] = useState('');
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getExerciseTypes();
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

  const getExerciseTypes = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'preparador/list-tipo-ejercicios/';
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json.success) {
              setExerciseTypes({
                excerciseTypes: json.ejercicios,
              });
            } else {
              Alert.error('Error', json.message);
            }

            // setLoading(false);
          })
          .catch(error => {
            // console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        // console.log(error);
        // setLoading(false);
      });
  };

  const handleSave = () => {
    /*
  {
    "id_preparador": "8",
    "id_deportista": "6",
    "fecha": "2022-09-23",
    "tests": 
    [
      {
        "valoracion": "Mas duro que el diegote",
        "id_tipo": "4"
      }
    ]
  }

    */
    const url = environment.baseURL + 'preparador/create-planilla';
    console.log(url);

    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const date = new Date();

        console.log(weight.weight);
        console.log(rm.rm);

        const templateData = {
          id_preparador: idX,
          id_deportista: sportman.id_usuario,
          fecha: moment(date).format('YYYY-MM-DD'),
          tests: [
            {
              id_tipo_ejercicio: selectedExerciseType.id_tipo_ejercicio,
              peso: weight.weight,
              cant_repeticiones: rm.rm,
            },
          ],
        };
        console.log('HANDLE SAVE DATA:');
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
              navigation.navigate('HomePhysicalTrainer');
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
    <>
      <Provider>
        <Text style={styles.textNombre}>
          {sportman.nombre} {sportman.apellido}
        </Text>
        <Text style={styles.textTipoFicha}>
          * La planilla se registrara con la fecha actual
        </Text>

        <SafeAreaView style={styles.container}>
          <View style={styles.view}>
            <Card>
              <Card.Title>TESTS</Card.Title>
              <Card.Divider />
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: 'blue'},
                  styles.dropdown,
                ]}
                maxHeight={300}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                searchPlaceholder="Buscar por nombre"
                label="Seleccionar un tipo de test"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder={!isFocus ? 'Tipo de test' : '...'}
                value={selectedExerciseType}
                data={excerciseTypes.excerciseTypes}
                // multiple={true}
                labelField="nombre"
                valueField="id_tipo_ejercicio"
                onChange={item => {
                  setSelectedExerciseType(item);
                }}
              />
              <Input
                label="Ingrese el peso en kg. Admite decimales"
                style={styles.input}
                onChangeText={weight => setWeight({...weight, weight})}
                keyboardType="numeric"
                placeholder="Peso"
                value={weight.name}
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />
              <Input
                label="Cantidad de repeticiones (RM - Máxima repetición)"
                style={styles.input}
                onChangeText={rm => setRM({...rm, rm})}
                keyboardType="numeric"
                placeholder="RM"
                value={rm.name}
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />
            </Card>
            <Separator />

            <View style={styles.fixToText}>
              <View style={styles.vertical}>
                <Button title="Guardar" onPress={handleSave} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Provider>
    </>
  );
};

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
    // paddingTop: StatusBar.currentHeight,
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
    weight: 'bold',
    textAlign: 'center',
    backgroundColor: '#6409E6',
  },
  textTipoFicha: {
    marginTop: 10,
    textAlign: 'center',
  },
  textWeight: {
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
    // width: 210,
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    // padding: 5,
    marginEnd: StatusBar.currentHeight,
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
