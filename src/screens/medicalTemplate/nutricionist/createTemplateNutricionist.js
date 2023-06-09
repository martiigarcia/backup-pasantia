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
import ListItemMeasures from '../../../components/ListItemMeasures';
import ListItemPerimeters from '../../../components/ListItemPerimeters';
import ListItemFolds from '../../../components/ListItemFolds';
import ListItemFoods from '../../../components/ListItemFoods';
import FechaInput from '../../../components/FechaInput';
import moment from 'moment';

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
  const [zones, setZones] = useState({zones: []});
  const [foods, setFoods] = useState({foods: []});
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({errors: []});

  //info seleccionada:
  const [selectedFoodsDate, setSelectedFoodsDate] = useState({
    selectedFoodsDate: [],
  });
  const [perimeters, setPerimeters] = useState({perimeters: []});
  const [folds, setFolds] = useState({folds: []});

  const [measures, setMeasures] = useState({
    //ambos valores deben ser numericos si o si
    stature: '',
    weight: '',
  });

  //elegir zonas y comidas desde el dropbox
  const [selectedZone, setSellectedZone] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  //para ver los dialog/dropbox
  const [isFocus, setIsFocus] = useState(false);

  const [dialogVisiblePerimeter, setDialogVisiblePerimeter] = useState(false);
  const [dialogVisibleFolds, setDialogVisibleFolds] = useState(false);
  const [dialogVisibleFoods, setDialogVisibleFoods] = useState(false);

  //agregar perimetros y pliegues
  const [newPerimeterName, setNewPerimeterName] = useState({name: ''});
  const [newFoldName, setNewFoldName] = useState({name: ''});

  //para el json:
  const [jsonFoods, setJsonFoods] = useState({jsonFoods: []});
  const [jsonPerimeters, setJsonPerimeters] = useState({jsonPerimeters: []});
  const [jsonFolds, setJsonFolds] = useState({jsonFolds: []});

  useEffect(() => {
    getZones();
    getFoods();
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

  const getZones = () => {
    getUserData()
      .then(data => {
        console.log('entra getZones1');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'nutricionista/list-zonas-medidas/';
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            // console.log(json);
            if (json.success) {
              setZones({
                zones: json.zonas,
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

  const getFoods = () => {
    getUserData()
      .then(data => {
        console.log('entra getZones1');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'nutricionista/list-tipo-comida/';
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            // console.log(json);
            if (json.success) {
              setFoods({
                foods: json.comidas,
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

  const handleDate = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDate(date);
  };

  const handleSave = () => {
    /*JSON QUE RECIBE EL METODO:
    
      {
    "id_propietario": 1,
    "id_deportista": 5,
    "fecha": "2022-09-22",
    "comida": [
      {
        "fecha": "2022-12-06 15:27:07.000000",
        "id_tipo_comida": "1"
      }
    ],
    "medidas_antropometricas": {
      "medidas": {
          "estatura": "189.21",
          "peso": "92.75"
       },
      "perimetros": [
        {
          "id_zona": "8",
          "valor_medida": "15.4"
        },
        {
          "id_zona": "5",
          "valor_medida": "30.2"
        }
      ],
      "pliegues": [
        {
          "id_zona": "8",
          "valor_medida": "4.2"
        }
      ]
    }
  }

///////////////////////////////////////
 {
  "id_propietario":"1",
  "id_deportista":"5",
  "fecha":"2023-04-26T00:30:41.978Z",
  "comida":
  [
    {
      "nombre":"Milanesa",
      "nutriente":"Grasas",
      "id_comida":"1",
      "fecha":"2023-05-26T00:24:00.000Z",
      "fecha_mostrar":"25/5/2023"
    },
    {
      "nombre":"Lentejas",
      "nutriente":"Proteina",
      "id_comida":"4",
      "fecha":"2024-04-26T00:24:00.000Z",
      "fecha_mostrar":"25/4/2024"
    }
  ],
  "medidas_antropometricas":
  {
    "medidas":
    {
      "estatura":"11111",
      "peso":"22222"
    },
    "perimetros":
    [
        {
          "valor_medida":"1",
          "id_zona":"3",
          "nombre":"Gemelo Izquierdo"
        },
        {
          "valor_medida":"1",
          "id_zona":"4",
          "nombre":"Gemelo Derecho"
        }
    ],
    "pliegues":
    [ 
        {
          "valor_medida":"3",
          "id_zona":"2",
          "nombre":"Cadera"
        },
        {
          "valor_medida":"4",
          "id_zona":"1",
          "nombre":"Cintura"
        }
    ]
  }
}

///////////////////////////////////////////////////////



{
  "id_propietario":"1",
  "id_deportista":"5",
  "fecha":"2023-04-25",
  "comida":
  [
    {
      "id_tipo_comida":"1",
      "fecha":"2024-06-26T01:20:00.000Z"
    },
    {
      "id_tipo_comida":"4",
      "fecha":"2023-04-26 01:29:00.000"
    }
  ],
  "medidas_antropometricas":
  {
    "medidas":
    {
      "estatura":"11.11",
      "peso":"22.22"
    },
    "perimetros":
    [
      {
        "valor_medida":"111",
        "id_zona":"1"
      }
    ]
    ,
    "pliegues":
    [
      {
        "valor_medida":"333",
        "id_zona":"3"
      }
    ]
  }
}


  */

    const url = environment.baseURL + 'nutricionista/create-planilla';
    console.log(url);

    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const date = new Date();

        const templateData = {
          id_propietario: idX,
          id_deportista: sportman.id_usuario,
          fecha: moment(date).format('YYYY-MM-DD'),
          comida: jsonFoods.jsonFoods,
          medidas_antropometricas: {
            medidas: {
              estatura: measures.stature,
              peso: measures.weight,
            },
            perimetros: jsonPerimeters.jsonPerimeters,
            pliegues: jsonFolds.jsonFolds,
          },
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
              navigation.navigate('HomeNutricionist');
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
            // console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        // console.log(error);
        // setLoading(false);
      });
  };

  const handleAddPerimeter = () => {
    console.log('Agregar perimetro');

    const perimeterData = {
      valor_medida: newPerimeterName.name,
      id_zona: selectedZone.id_zona_medida,
      nombre: selectedZone.nombre,
    };
    const perimeterDataJson = {
      valor_medida: newPerimeterName.name,
      id_zona: selectedZone.id_zona_medida,
    };
    console.log(perimeterData);
    console.log(perimeterDataJson);

    setPerimeters(prevState => ({
      ...prevState,
      perimeters: [...prevState.perimeters, perimeterData],
    }));
    setJsonPerimeters(prevState => ({
      ...prevState,
      jsonPerimeters: [...prevState.jsonPerimeters, perimeterDataJson],
    }));
    setDialogVisiblePerimeter(false);
    setNewPerimeterName({name: ''});
    setSellectedZone(null);
  };

  const handleAddFolds = () => {
    console.log('Agregar pliegue');
    console.log(newFoldName);

    const foldData = {
      // id: folds.folds.length + 1,
      valor_medida: newFoldName.name,
      id_zona: selectedZone.id_zona_medida,
      nombre: selectedZone.nombre,
    };

    const foldDataJson = {
      // id: folds.folds.length + 1,
      valor_medida: newFoldName.name,
      id_zona: selectedZone.id_zona_medida,
    };
    setFolds(prevState => ({
      ...prevState,
      folds: [...prevState.folds, foldData],
    }));

    setJsonFolds(prevState => ({
      ...prevState,
      jsonFolds: [...prevState.jsonFolds, foldDataJson],
    }));

    setDialogVisibleFolds(false);
    setNewFoldName({name: ''});
    setSellectedZone(null);
  };

  const handleAddFood = () => {
    console.log('agregar comida');

    const foodData = {
      nombre: selectedFood.nombre,
      nutriente: selectedFood.nombre_nutriente,
      id_comida: selectedFood.id_tipo_comida,
      id_tipo_comida: selectedFood.id_tipo_comida,
      fecha: date, //este deberia ser el formato en que lo mando a la bd
      fecha_mostrar: date.toLocaleDateString(),
    };
    const foodDataJson = {
      id_tipo_comida: selectedFood.id_tipo_comida,
      fecha: date.toISOString().replace('T', ' ').slice(0, -1), //este deberia ser el formato en que lo mando a la bd
    };

    setSelectedFoodsDate(prevState => ({
      ...prevState,
      selectedFoodsDate: [...prevState.selectedFoodsDate, foodData],
    }));

    setJsonFoods(prevState => ({
      ...prevState,
      jsonFoods: [...prevState.jsonFoods, foodDataJson],
    }));
    setDialogVisibleFoods(false);
    setSelectedFood(null);
    setDate('');
  };

  function HearderListComponent() {
    return (
      <>
        {console.log(perimeters.perimeters)}
        <Card.Title>MEDIDAS</Card.Title>
        <Card.Divider />
        <Input
          style={styles.input}
          onChangeText={stature =>
            // console.log(name)
            setMeasures({...measures, stature})
          }
          placeholder="Medidas - Estatura"
          value={measures.stature}
          keyboardType="numeric"
          errorStyle={{color: 'red'}}
          // errorMessage={errors.errors.name}
        />
        <Input
          style={styles.input}
          onChangeText={weight =>
            // console.log(name)
            setMeasures({...measures, weight})
          }
          placeholder="Medidas - Peso"
          value={measures.weight}
          keyboardType="numeric"
          errorStyle={{color: 'red'}}
          // errorMessage={errors.errors.name}
        />
        <Card.Divider />
        <Card.Divider />
        <Card.Title>PERIMETROS</Card.Title>
        <Card.Divider />
        {perimeters.perimeters.length !== 0 && (
          <>
            {perimeters.perimeters.map((c, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{c.nombre}</ListItem.Title>
                  <ListItem.Subtitle>
                    Medida de la zona: {c.valor_medida}{' '}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </>
        )}
        <Button
          style={{marginBottom: 20}}
          title="Agregar nuevo perimetro"
          onPress={() => {
            setDialogVisiblePerimeter(true);
          }}
        />
        <Dialog
          fullScreen={true}
          visible={dialogVisiblePerimeter}
          onDismiss={() => setDialogVisiblePerimeter(false)}>
          <DialogHeader title="Agregar perimetro" />
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
              label="Seleccionar una zona"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder={!isFocus ? 'Seleccionar una zona' : '...'}
              value={selectedZone}
              data={zones.zones}
              // multiple={true}
              labelField="nombre"
              valueField="id_zona_medida"
              onChange={item => {
                setSellectedZone(item);
              }}
            />
            <Input
              style={styles.input}
              onChangeText={name =>
                // console.log(name)
                setNewPerimeterName({...newPerimeterName, name})
              }
              keyboardType="numeric"
              placeholder="Medida de la zona"
              value={newPerimeterName.name}
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
                setDialogVisiblePerimeter(false);
                setNewPerimeterName({name: ''});
                setSellectedZone(null);
              }}
            />
            <Button
              title="Registrar"
              compact
              variant="text"
              onPress={handleAddPerimeter}
            />
          </DialogActions>
        </Dialog>
        <Card.Divider />
        <Card.Divider />

        <Card.Title>PLIEGUES</Card.Title>
        <Card.Divider />
        <Dialog
          fullScreen={true}
          visible={dialogVisibleFolds}
          onDismiss={() => setDialogVisibleFolds(false)}>
          <DialogHeader title="Agregar pliegue" />
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
              label="Seleccionar una zona"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder={!isFocus ? 'Seleccionar una zona' : '...'}
              value={selectedZone}
              data={zones.zones}
              // multiple={true}
              labelField="nombre"
              valueField="id_zona_medida"
              onChange={item => {
                setSellectedZone(item);
              }}
            />
            <Input
              style={styles.input}
              onChangeText={name =>
                // console.log(name)
                setNewFoldName({...newFoldName, name})
              }
              keyboardType="numeric"
              placeholder="Medida de la zona"
              value={newFoldName.name}
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
                setDialogVisibleFolds(false);
                setNewFoldName({name: ''});
                setSellectedZone(null);
              }}
            />
            <Button
              title="Registrar"
              compact
              variant="text"
              onPress={handleAddFolds}
            />
          </DialogActions>
        </Dialog>

        {folds.folds.length !== 0 && (
          <>
            {folds.folds.length !== 0 && (
              <>
                {folds.folds.map((c, index) => (
                  <ListItem key={index} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{c.nombre}</ListItem.Title>
                      <ListItem.Subtitle>
                        Medida de la zona: {c.valor_medida}{' '}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </>
            )}
          </>
        )}
        <Button
          style={{marginBottom: 20}}
          title="Agregar nuevo pliegue"
          onPress={() => {
            setDialogVisibleFolds(true);
          }}
        />
        <Card.Divider />
        <Card.Divider />
      </>
    );
  }

  function FooterListComponent() {
    return (
      <>
        <Card.Title>COMIDAS</Card.Title>
        <Card.Divider />
        {console.log(selectedFoodsDate)}
        {selectedFoodsDate.selectedFoodsDate.length !== 0 && (
          <>
            {selectedFoodsDate.selectedFoodsDate.map((c, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{c.nombre}</ListItem.Title>
                  <ListItem.Subtitle>
                    Fecha: {c.fecha_mostrar}{' '}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </>
        )}

        <Button
          style={{marginBottom: 20}}
          title="Agregar comida"
          onPress={() => {
            setDialogVisibleFoods(true);
          }}
        />

        <Dialog
          fullScreen={true}
          visible={dialogVisibleFoods}
          onDismiss={() => setDialogVisibleFoods(false)}>
          <DialogHeader title="Agregar comida" />
          <DialogContent>
            <Text style={styles.text}>
              Seleccionar una comida y su fecha asignada.
            </Text>
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
              label="Seleccionar una comida"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder={!isFocus ? 'Seleccionar una comida' : '...'}
              value={selectedFood}
              data={foods.foods}
              // multiple={true}
              labelField="nombre"
              valueField="id_tipo_comida"
              onChange={item => {
                console.log(item);
                setSelectedFood(item);
              }}
            />
            <Card.Divider />
            <FechaInput style={{color: 'black'}} doDate={handleDate} />

            {date !== '' && (
              <Text style={{marginLeft: 15, marginVertical: 10}}>
                Fecha elegida: {date.toLocaleDateString()}
              </Text>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              title="Cancelar"
              compact
              variant="text"
              onPress={() => {
                setDialogVisibleFoods(false);
                setSelectedFood(null);
                setDate('');
              }}
            />
            <Button
              title="Registrar"
              compact
              variant="text"
              onPress={handleAddFood}
            />
          </DialogActions>
        </Dialog>
      </>
    );
  }

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
              <FlatList
                ListHeaderComponent={<>{HearderListComponent()}</>}
                ListFooterComponent={<>{FooterListComponent()}</>}
              />
            </Card>
          </View>
        </SafeAreaView>

        <Separator />

        <View style={styles.fixToText}>
          <View style={styles.vertical}>
            <Button title="Guardar" onPress={handleSave} />
          </View>
        </View>
        {/* <Text>{newPerimeterName.name}</Text>
        <Text>{measures.stature}</Text>
        <Text>{measures.weight}</Text> */}
      </Provider>
    </>
  );
};
