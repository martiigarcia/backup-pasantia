import {
  Alert,
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {environment} from '../../../environments/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, ListItem, Icon, Card, Input} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Stack,
  IconButton,
} from '@react-native-material/core';

export default ({route, navigation}) => {
  const [foods, setFoods] = useState({foods: []});
  const [nutrients, setNutrients] = useState({nutrients: []});
  const [errors, setErrors] = useState({errors: []});
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedFood, setSelectedFood] = useState({});

  const [selectedNutrient, setSelectedNutrient] = useState(null);

  useEffect(() => {
    getFoods();
    getNutrients();
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

  const getFoods = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'nutricionista/list-tipo-comida/';
        // console.log(url);

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
            console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
      });
  };

  const getNutrients = () => {
    getUserData()
      .then(data => {
        // const idX = JSON.parse(data.ID);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'nutricionista/list-nutrientes/';
        // console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            // console.log(json);
            if (json) {
              setNutrients({
                nutrients: json.nutrientes,
              });
            } else {
              Alert.error('Error', json.message);
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

  const handleDelete = id => {
    console.log('HANLDE DELETE: ' + id);
    const url = environment.baseURL + 'nutricionista/delete-tipo-comida/' + id;

    console.log(url);
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };
        //  console.log('USER:     ' + user);
        const userID = JSON.parse(data.ID);
        //  console.log(userID.nombre);

        fetch(url, {
          method: 'DELETE',
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            // console.log(json.planillas);

            if (json.success) {
              console.log('ENTRA');
              Alert.alert('Enhorabuena!', json.message);
              getFoods();
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

  const handleUpdate = food => {
    setVisible(true);
    setSelectedFood(food);
    setSelectedNutrient({
      id_nutriente: food.id_nutriente,
      nombre: food.nombre_nutriente,
    });
    console.log('EDITAR OPTION');
    console.log(food);
  };

  const handleUpdateFood = () => {
    console.log('EDITAR ALIMENTO:');

    const foodData = {
      nombre: selectedFood.nombre,
      id_nutriente: selectedNutrient.id_nutriente,
    };
    console.log(JSON.stringify(foodData));

    const url =
      environment.baseURL +
      'nutricionista/update-tipo-comida/' +
      selectedFood.id_tipo_comida;
    // console.log(url);

    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        fetch(url, {
          method: 'PUT',
          headers,
          body: JSON.stringify(foodData),
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json.success) {
              Alert.alert('Se ha registrado con exito!', json.message);
              // navigation.navigate('HomeNutricionist');
              // setReload(prevState => !prevState);
              getFoods();
              setVisible(false);
            } else {
              Alert.alert('Error... algo salio mal', json.message);
              console.log(json.errors);
              setErrors({
                errors: json.errors,
              });
              console.log(errors);
            }
          })
          .catch(error => {
            // console.log(error);
            setLoading(false);
          });
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Provider>
        <SafeAreaView style={styles.container}>
          <View>
            <Card>
              <Card.Title>Alimentos</Card.Title>
              <Card.Divider />
              {foods.foods.map((c, index) => (
                <ListItem key={index} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{c.nombre}</ListItem.Title>
                    <ListItem.Subtitle>
                      Nutriente: {c.nombre_nutriente}
                    </ListItem.Subtitle>
                  </ListItem.Content>

                  <IconButton
                    variant="outlined"
                    onPress={() => {
                      handleUpdate(c);
                    }}
                    type="clear"
                    icon={
                      <Icon
                        name="edit"
                        size={25}
                        type="font-awesome"
                        color="orange"
                      />
                    }
                  />

                  <IconButton
                    variant="outlined"
                    onPress={() => {
                      console.log('DELETE OPTION');
                      message =
                        'Desea eliminar el alimento "' + c.nombre + '"? ';
                      Alert.alert('Confirmación', message, [
                        {
                          text: 'Cancelar',

                          style: 'cancel',
                        },
                        {
                          text: 'Eliminar',
                          onPress: () => handleDelete(c.id_tipo_comida),
                        },
                      ]);
                    }}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                  />
                </ListItem>
              ))}

              <Dialog
                fullScreen={true}
                visible={visible}
                onDismiss={() => setVisible(false)}>
                <DialogHeader title="Editar alimento" />
                <DialogContent>
                  <Stack spacing={2}>
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
                      label="Seleccionar un nutriente"
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      placeholder={
                        !isFocus ? 'Seleccionar un nutriente' : '...'
                      }
                      value={selectedNutrient}
                      data={nutrients.nutrients}
                      // multiple={true}
                      labelField="nombre"
                      valueField="id_nutriente"
                      onChange={item => {
                        setSelectedNutrient(item);
                      }}
                      renderLeftIcon={() => (
                        <Icon
                          color={isFocus ? '#6409E6' : 'black'}
                          iconStyle={styles.icon}
                          name="food-apple"
                          size={30}
                          type="material-community"
                        />
                      )}
                    />
                    <Input
                      style={styles.input}
                      onChangeText={nombre =>
                        // console.log(name)
                        setSelectedFood({...selectedFood, nombre})
                      }
                      placeholder="Nombre"
                      value={selectedFood.nombre}
                      errorStyle={{color: 'red'}}
                      // errorMessage={errors.errors.name}
                    />
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    title="Cancelar"
                    compact
                    variant="text"
                    onPress={() => setVisible(false)}
                  />
                  <Button
                    title="Guardar cambios"
                    compact
                    variant="text"
                    onPress={handleUpdateFood}
                  />
                </DialogActions>
              </Dialog>
            </Card>
          </View>
        </SafeAreaView>
      </Provider>
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
  // titleCard: {
  //   fontSize: 20,
  // },
  view: {
    // paddingTop: StatusBar.currentHeight,
    // paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    // flex: 1,
    // paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  form: {
    padding: 20,
  },

  view: {
    // paddingTop: StatusBar.currentHeight,
    // paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    paddingTop: StatusBar.currentHeight,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  text: {
    fontSize: 20,
    textAlign: 'left',
    padding: 10,
  },
  textError: {
    paddingLeft: 10,
    color: 'red',
    fontSize: 12,
  },
  textInfo: {
    fontSize: 15,
    textAlign: 'justify',
    padding: 10,
    // color: '#DFA8F8',
  },
  buttonAdd: {
    // width: 50,
    // height: 50,
    marginTop: 10,
    // textAlign: 'left',
    // justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    // width: 260,
    borderBottomWidth: 1,
    borderColor: 'gray',

    marginBottom: 50,
    marginHorizontal: 10,
    paddingLeft: 10,
    // padding: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
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
  buttonDate: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
