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
  const [typeTest, setTypeTest] = useState({typeTest: []});
  const [selectedTypeTest, setSelectedTypeTest] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [tests, setTests] = useState({tests: []});
  const [jsonTests, setJsonTests] = useState({jsonTests: []});
  const [valuation, setValuation] = useState({name: ''});
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getTypeTest();
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

  const getTypeTest = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'preparador/list-tipo-test/';
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json.success) {
              setTypeTest({
                typeTest: json.tests,
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

        const templateData = {
          id_preparador: idX,
          id_deportista: sportman.id_usuario,
          fecha: moment(date).format('YYYY-MM-DD'),
          tests: jsonTests.jsonTests,
        };
        console.log(templateData);
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

  const handleAddTest = () => {
    console.log(valuation);
    console.log(selectedTypeTest);

    const testData = {
      valuation: valuation.name,
      name: selectedTypeTest.nombre,
    };
    const testDataJson = {
      valoracion: valuation.name,
      id_tipo: selectedTypeTest.id_tipo,
    };

    setJsonTests(prevState => ({
      ...prevState,
      jsonTests: [...prevState.jsonTests, testDataJson],
    }));

    setTests(prevState => ({
      ...prevState,
      tests: [...prevState.tests, testData],
    }));

    setDialogVisible(false);
    setValuation({name: ''});
    setSelectedTypeTest(null);
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

              {tests.tests.length !== 0 && (
                <>
                  {tests.tests.map((c, index) => (
                    <ListItem key={index} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{c.name}</ListItem.Title>
                        <ListItem.Subtitle>
                          Valoracion: {c.valuation}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                </>
              )}

              <Button
                style={{marginBottom: 20}}
                title="Agregar nuevo test"
                onPress={() => {
                  setDialogVisible(true);
                }}
              />

              <Dialog
                fullScreen={true}
                visible={dialogVisible}
                onDismiss={() => setDialogVisible(false)}>
                <DialogHeader title="Agregar test" />
                <DialogContent>
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
                    value={selectedTypeTest}
                    data={typeTest.typeTest}
                    // multiple={true}
                    labelField="nombre"
                    valueField="id_tipo"
                    onChange={item => {
                      setSelectedTypeTest(item);
                    }}
                  />
                  <Input
                    style={styles.input}
                    onChangeText={name =>
                      // console.log(name)
                      setValuation({...valuation, name})
                    }
                    placeholder="Valoración"
                    value={valuation.name}
                    errorStyle={{color: 'red'}}
                    // errorMessage={errors.errors.name}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    title="Cancelar"
                    compact
                    variant="text"
                    onPress={() => {
                      setDialogVisible(false);
                      setValuation({name: ''});
                      setSelectedTypeTest(null);
                    }}
                  />
                  <Button
                    title="Registrar"
                    compact
                    variant="text"
                    onPress={handleAddTest}
                  />
                </DialogActions>
              </Dialog>
            </Card>
          </View>
        </SafeAreaView>

        <Separator />

        <View style={styles.fixToText}>
          <View style={styles.vertical}>
            <Button title="Guardar" onPress={handleSave} />
          </View>
        </View>
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
