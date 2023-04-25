// CreateNutrient = ({route, navigation}) => {
//   function handleSubmit() {
//     console.log('handlesumit nutriente');
//   }
//   return (
//     <>
//       <Card>
//         <Text>Create Nutriente</Text>
//         <Input placeholder="Nombre del nutriente"></Input>
//         <Button
//           title="Registrar nutriente"
//           onPress={() => {
//             console.log('registrar nutriente');
//             handleSubmit();
//           }}
//         />
//       </Card>
//     </>
//   );
// };

// CreateFood = ({route, navigation}) => {
//   function handleSubmit() {
//     console.log('handlesumit comida');
//   }
//   return (
//     <>
//       <Card>
//         <Text>Create comida</Text>
//         <Input placeholder="Nombre de la comida"></Input>
//         <Button
//           title="Registrar comida"
//           onPress={() => {
//             console.log('registrar comida');
//             handleSubmit();
//           }}
//         />
//       </Card>
//     </>
//   );
// };

// import React, {useState} from 'react';
// import {View, Text, Button, Modal, TextInput} from 'react-native';
// import {Dropdown} from 'react-native-elements';
// import {Card} from '@rneui/base';

// const nutrients = [
//   {id: 1, name: 'Proteína'},
//   {id: 2, name: 'Carbohidratos'},
//   {id: 3, name: 'Grasas'},
//   {id: 4, name: 'Vitaminas'},
//   {id: 5, name: 'Minerales'},
// ];

// export default ({route, navigation}) => {
// const state = {
//   data: [
//     {
//       id: 1,
//       title: 'Mis datos',
//       color: '#FF4500',
//       options: 'Ver mis datos, modificar datos, cambiar contraseña',
//       image: 'https://img.icons8.com/office/512/user-menu-male--v1.png',
//       route: 'Profile',
//       // image: 'https://img.icons8.com/color/70/000000/name.png',
//     },
//     {
//       id: 1,
//       title: 'Mis planillas',
//       color: '#87CEEB',
//       options: 'Listar todas mis planillas registradas',
//       image: 'https://img.icons8.com/office/512/groups.png',
//       route: 'NutricionistList',
//       // image: 'https://img.icons8.com/office/70/000000/home-page.png',
//     },
//   ],
// };
//   return (
//     <View>
//       <Card>
//         <Text>
//           En esta seccion usted puede registrar una comida o un nutriente por
//           separado
//         </Text>
//         <NutrientSelector />
//         {/* <CreateNutrient />
//         <CreateFood /> */}
//       </Card>
//     </View>
//   );
// };
// NutrientSelector = () => {
//   const [selectedNutrients, setSelectedNutrients] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newNutrientName, setNewNutrientName] = useState('');

//   const handleAddNutrient = () => {
//     setModalVisible(true);
//   };

//   const handleSaveNewNutrient = () => {
//     const newNutrient = {id: nutrients.length + 1, name: newNutrientName};
//     nutrients.push(newNutrient);
//     setSelectedNutrients([...selectedNutrients, newNutrient.id]);
//     setModalVisible(false);
//     setNewNutrientName('');
//   };

//   return (
//     <View>
//       <Dropdown
//         label="Seleccione nutrientes"
//         placeholder="Seleccione uno o más nutrientes"
//         value={selectedNutrients}
//         data={nutrients.map(nutrient => ({
//           value: nutrient.id,
//           label: nutrient.name,
//         }))}
//         multiple={true}
//         onChange={selectedItems =>
//           setSelectedNutrients(selectedItems.map(item => item.value))
//         }
//       />
//       <Button title="Agregar nutriente" onPress={handleAddNutrient} />
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//         }}>
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <View
//             style={{
//               backgroundColor: 'white',
//               padding: 20,
//               borderRadius: 10,
//               elevation: 5,
//             }}>
//             <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
//               Agregar nutriente
//             </Text>
//             <TextInput
//               placeholder="Nombre del nutriente"
//               value={newNutrientName}
//               onChangeText={setNewNutrientName}
//               style={{
//                 borderWidth: 1,
//                 borderColor: 'gray',
//                 borderRadius: 5,
//                 padding: 10,
//                 marginBottom: 10,
//               }}
//             />
//             <Button title="Guardar" onPress={handleSaveNewNutrient} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Card} from '@rneui/base';
import {Input, Icon} from '@rneui/themed';
import {
  IconButton,
  Provider,
  Button,
  Stack,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
} from '@react-native-material/core';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';
import {mdiFoodApple} from '@mdi/js';
// const nutrientsX = [
//   {id: 1, name: 'Proteína'},
//   {id: 2, name: 'Carbohidratos'},
//   {id: 3, name: 'Grasas'},
//   {id: 4, name: 'Vitaminas'},
//   {id: 5, name: 'Minerales'},
// ];
// const comidasX = [
//   {id: 1, name: 'Milanesa'},
//   {id: 2, name: 'Hamburguesa'},
//   {id: 3, name: 'Chambuchito'},
//   {id: 4, name: 'Pernil'},
//   {id: 5, name: 'Sorrentinos'},
// ];

export default ({route, navigation}) => {
  const [food, setFood] = useState({name: ''});
  const [errors, setErrors] = useState({errors: []});
  const [isFocus, setIsFocus] = useState(false);
  const [nutrients, setNutrients] = useState({nutrients: []});

  // const [selectedNutrients, setSelectedNutrients] = useState({nutrients: []});
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [newNutrientName, setNewNutrientName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNutrients();
  }, []);

  const getUserData = async () => {
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

  const getNutrients = () => {
    getUserData()
      .then(data => {
        // const idX = JSON.parse(data.ID);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'nutricionista/list-nutrientes/';
        console.log(url);

        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json) {
              setNutrients({
                nutrients: json.nutrientes,
              });
            } else {
              Alert.error('Error', json.message);
            }

            setLoading(false);
          })
          .catch(error => {
            // console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        // console.log(error);
        setLoading(false);
      });
  };

  const handleAddNutrient = () => {
    setDialogVisible(true);
    setModalVisible(true);
  };

  const handleSaveNewNutrient = () => {
    //hacer un agregar a la bd primero
    // console.log('entra al handle');
    // const newNutrient = {
    //   id_nutriente: nutrients.nutrients.length + 1,
    //   nombre: newNutrientName,
    // };

    // setNutrients(prevState => ({
    //   ...prevState,
    //   nutrients: [...prevState.nutrients, newNutrient],
    // }));
    const dataNutrient = {
      nombre: newNutrientName,
    };

    getUserData()
      .then(data => {
        // const idX = JSON.parse(data.ID);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'nutricionista/create-nutriente';
        console.log(url);

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataNutrient),
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json.success) {
              setDialogVisible(false);
              setModalVisible(false);
              setNewNutrientName('');
              setLoading(false);
              getNutrients();
            }
          })
          .catch(error => {
            // console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        // console.log(error);
        setLoading(false);
      });
  };

  // const handleSelectedItems = newNutrient => {
  //   console.log(newNutrient);
  //   setSelectedNutrients(prevState => ({
  //     ...prevState,
  //     nutrients: [...prevState.nutrients, newNutrient],
  //   }));
  // };

  const handleAddFood = () => {
    console.log('HANDLE FOOD: ');
    console.log(food); //    {"name": "A"}
    console.log(selectedNutrient); //    {"id_nutriente": "1", "nombre": "Proteina"}

    //   {
    //   "nombre": "Tallarines",
    //   "id_nutriente": 2
    // }
    const foodData = {
      nombre: food.name,
      id_nutriente: selectedNutrient.id_nutriente,
    };
    console.log(foodData);
    const url = environment.baseURL + 'nutricionista/create-tipo-comida';
    console.log(url);

    getUserData()
      .then(data => {
        // const idX = JSON.parse(data.ID);

        //  const headers = {
        //    'Content-Type': 'application/json',
        //    Authorization: 'Bearer ' + data.TOKEN,
        //  };
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.TOKEN,
          },
          body: JSON.stringify(foodData),
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json.success) {
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
          })
          .catch(error => {
            // console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        // console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Provider>
        <SafeAreaView style={styles.container}>
          <View style={styles.view}>
            <Card>
              <Card.Title>COMIDA</Card.Title>
              <Card.Divider />
              <Text style={styles.text}>Nombre de la comida</Text>
              <Input
                style={styles.input}
                onChangeText={name =>
                  // console.log(name)
                  setFood({...food, name})
                }
                placeholder="Nombre"
                value={food.name}
                errorStyle={{color: 'red'}}
                errorMessage={errors.errors.name}
              />

              <Text style={styles.text}>Nutriente que contiene la comida</Text>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
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
                  placeholder={!isFocus ? 'Seleccionar un nutriente' : '...'}
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
                <IconButton
                  onPress={handleAddNutrient}
                  style={styles.buttonAdd}
                  variant="outlined"
                  type="clear"
                  icon={
                    <Icon
                      name="plus"
                      size={25}
                      type="font-awesome"
                      color="#6409E6"
                    />
                  }
                />

                <Dialog
                  fullScreen={true}
                  visible={dialogVisible}
                  onDismiss={() => setDialogVisible(false)}>
                  <DialogHeader title="Agregar nutriente" />
                  <DialogContent>
                    <Stack spacing={2}>
                      <Input
                        placeholder="Nombre del nutriente"
                        value={newNutrientName}
                        onChangeText={setNewNutrientName}
                        style={styles.input}
                      />
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      title="Cancelar"
                      compact
                      variant="text"
                      onPress={() => setDialogVisible(false)}
                    />
                    <Button
                      title="Registrar"
                      compact
                      variant="text"
                      onPress={handleSaveNewNutrient}
                    />
                  </DialogActions>
                </Dialog>
              </View>

              <Card.Divider />
              <View style={styles.viewButton}>
                <Button
                  style={styles.button}
                  title="Registrar comida"
                  onPress={handleAddFood}></Button>
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
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
    height: 50,
    // borderColor: 'gray',
    // borderWidth: 1,
    // margin: 5,
    marginBottom: 10,
    padding: 10,
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
    width: 260,
    borderBottomWidth: 1,
    borderColor: 'gray',

    margin: 10,
    marginBottom: 10,
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
