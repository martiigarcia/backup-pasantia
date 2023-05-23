import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import {Card, Input, ListItem, Icon} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Stack, Text} from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';
import FechaInput from '../../../components/FechaInput';
import moment from 'moment';

export default ({route, navigation}) => {
  const [users, setUsers] = useState({users: []});
  const [user, setUser] = useState({});
  const [exerciseTypes, setExerciseTypes] = useState({exerciseTypes: []});
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [rm, setRM] = useState({rm: ''});
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [UserRole, setUserRole] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    console.log('MY SHOTS PROGRESS');
    getUsers();
    getUser();
    getExerciseTypes();
  }, []);

  const getUserData = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        ROLE,
        MEMBER,
        TOKEN,
        ID,
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    getUserData()
      .then(data => {
        const MEMBER = JSON.parse(data.MEMBER);
        setUser(MEMBER);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getExerciseTypes = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };
        const url = environment.baseURL + 'preparador/list-tipo-ejercicios';
        fetch(url, {headers})
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            if (json) {
              setExerciseTypes({
                exerciseTypes: json.ejercicios,
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
        console.log(error);
      });
  };

  const getUsers = () => {
    setLoading(true);
    let valorToken;

    getUserData()
      .then(data => {
        const roleX = JSON.parse(data.ROLE);
        setUserRole(roleX);

        const headers = {
          Authorization: 'Bearer ' + data.TOKEN,
        };

        fetch(environment.baseURL + 'profesionales/deportistas', {
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            setUsers({
              users: json.deportistas,
            });
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

  const handleDateStart = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateStart(date);
  };
  const handleDateEnd = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateEnd(date);
  };
  const handleUSer = user => {
    console.log('handle user:');
    console.log(user);
    setSelectedUser(user);
  };

  const handleSave = () => {
    console.log('handle SAVE');

    console.log(dateStart);
    console.log(dateEnd);
    console.log(selectedExerciseType);
    console.log(rm);
    //  LOG  2022-05-22T00:45:00.000Z
    //  LOG  2023-05-22T00:45:18.315Z
    //  LOG  {"id_tipo_ejercicio": "3", "nombre": "Peso muerto"}
    //  LOG  {"0": "5", "rm": "5"}

    if (dateStart === '') {
      Alert.alert('Error', 'Debe seleccionar una fecha de inicio');
    } else {
      if (dateEnd === '') {
        Alert.alert('Error', 'Debe seleccionar una fecha de fin');
      } else {
        if (selectedExerciseType === null) {
          Alert.alert('Error', 'Debe seleccionar un tipo de ejercicio');
        } else {
          if (rm.rm === '') {
            Alert.alert('Error', 'Debe seleccionar una repetición máxima');
          } else {
            console.log('esta todo completo');

            //obtener-progreso-fuerza/(:num)/(:segment)/(:segment)/(:num)/(:num)/(:num)
            //obtenerProgresoFuerzaDeportista($idDeportista, $startDate, $endDate, $idTipoEjercicio, $cantRepeticiones, $idUsuario)
            // /deportistas/obtener-progreso-fuerza/6/2022-09-23/2022-09-29/1/3/6

            const url =
              environment.baseURL +
              'preparador/obtener-progreso-fuerza/' +
              selectedUser.id_usuario +
              '/' +
              moment(dateStart).format('YYYY-MM-DD') +
              '/' +
              moment(dateEnd).format('YYYY-MM-DD') +
              '/' +
              selectedExerciseType.id_tipo_ejercicio +
              '/' +
              rm.rm;

            console.log(url);

            navigation.navigate('StrengthList', {
              user: user,
              url: url,
              start: moment(dateStart).format('YYYY-MM-DD'),
              end: moment(dateEnd).format('YYYY-MM-DD'),
              exerciseType: selectedExerciseType,
              rm: rm.rm,
            });
          }
        }
      }
    }
  };

  function getUserItem({item: user}) {
    return (
      <>
        <ListItem
          key={user.id_usuario}
          bottomDivider
          onPress={() => {
            handleUSer(user);
            //  navigation.navigate('Injuries', {user});
          }}>
          <ListItem.Content>
            <ListItem.Title>
              {user.nombre} {user.apellido}
            </ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          {user.id_usuario === selectedUser.id_usuario ? (
            <Icon name="check" type="font-awesome" color="#FF69B4" />
          ) : null}
        </ListItem>
      </>
    );
  }

  const HearderListComponent = () => {
    return (
      <>
        <Card.Title>INTERVALO DE FECHAS</Card.Title>
        <Card.Divider />
        <Text style={styles.textInfo}>
          * Seleccione las fechas entre las que se visualizara el progreso de
          fuerza
        </Text>
        <Card.Divider />

        <Text style={styles.text}>Fecha de inicio</Text>

        <FechaInput doDate={handleDateStart} />

        {dateStart !== '' && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 15,
            }}>
            Fecha de inicio elegida: {dateStart.toLocaleDateString()}
          </Text>
        )}

        <Card.Divider />
        <Text style={styles.text}>Fecha de fin</Text>
        <FechaInput doDate={handleDateEnd} />

        {dateEnd !== '' && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 15,
            }}>
            Fecha de fin elegida: {dateEnd.toLocaleDateString()}
          </Text>
        )}

        <Card.Divider />
        <Card.Divider />

        <Card.Title>TIPO DE EJERCICIO</Card.Title>
        <Card.Divider />

        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={exerciseTypes.exerciseTypes}
          search
          maxHeight={300}
          labelField="nombre"
          valueField="id_tipo_ejercicio"
          placeholder={!isFocus ? 'Seleccionar tipo de ejercicio' : '...'}
          searchPlaceholder="Buscar por nombre"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedExerciseType(item);
            //  setUser({...user, item});
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              color={isFocus ? '#6409E6' : 'black'}
              iconStyle={styles.icon}
              name="weight-lifter"
              size={30}
              type="material-community"
            />
          )}
        />

        <Card.Divider />
        <Card.Divider />

        <Card.Title>CANTIDAD DE REPETICIONES</Card.Title>
        <Card.Divider />

        <Input
          style={styles.input}
          onChangeText={rm =>
            // console.log(name)
            setRM({...rm, rm})
          }
          placeholder="RM (repetición máxima)"
          value={rm.rm}
          keyboardType="numeric"
          errorStyle={{color: 'red'}}
          // errorMessage={errors.errors.rm}
        />

        <Card.Divider />
        <Card.Divider />
      </>
    );
  };
  const FooterListComponent = () => {
    return (
      <>
        <Card.Title>DEPORTISTAS</Card.Title>
        <Card.Divider />
        <Text style={styles.textInfo}>
          * Seleccione un deportista para ver la cantidad de sesiones
        </Text>
        <Card.Divider />

        <FlatList
          keyExtractor={user => user.id_usuario.toString()}
          data={users.users}
          renderItem={getUserItem}
        />
        <Card.Divider />
        {Object.keys(selectedUser).length !== 0 && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 15,
            }}>
            Usuario elegido: {selectedUser.nombre} {selectedUser.apellido}
          </Text>
        )}
        <Card.Divider />

        <Button title={'Guardar'} onPress={handleSave}></Button>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
        <Card>
          {console.log(user)}

          <>
            <FlatList
              ListHeaderComponent={<>{HearderListComponent()}</>}
              ListFooterComponent={<>{FooterListComponent()}</>}
            />
          </>
        </Card>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
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
    // width: 260,
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
