import React, {useState, useEffect} from 'react';
import {
  Provider,
  IconButton,
  Dialog,
  Button,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Stack,
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
import {Input, Card, Icon} from '@rneui/themed';
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
  const [sportman, setSportman] = useState(
    route.params.user ? route.params.user : {},
  );
  //para ver los dialog/dropbox
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dateSession, setDateSession] = useState('');
  const [dateInjuryStart, setDateInjuryStart] = useState('');
  const [dateInjuryEnd, setDateInjuryEnd] = useState('');
  const [zones, setZones] = useState({zones: []});

  //elegir zonas desde el dropbox
  const [selectedZoneSession, setSellectedZoneSession] = useState(null);
  const [selectedZoneInjury, setSellectedZoneInjury] = useState(null);

  const [newSession, setNewSession] = useState({
    goal: '',
    activity: '',
    date: '',
  });
  const [newInjury, setNewInjury] = useState({
    type: '',
    observation: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    getZones();
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
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        const url = environment.baseURL + 'kinesiologo/zonas';
        // console.log(url);

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

  const handleVisible = () => {
    setVisible(prevState => !prevState);
  };

  const handleDateSession = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateSession(date);
  };
  const handleDateInjuryStart = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateInjuryStart(date);
  };
  const handleDateInjuryEnd = date => {
    console.log('handle date: ');
    console.log(date); // 2023-04-25T02:21:00.000Z
    setDateInjuryEnd(date);
  };

  const handleSave = () => {
    console.log('agregando...');

    /*
    {
      "playerID":"5",
      "ownerID":"2",
      "date":"2023-04-29T19:29:16.176Z",
      "session":
      [
        {
          "date":"2023-03-28T19:20:00.000Z",
          "goal":"Obbhffbbfjx",
          "activity":"Jbfjfjf",
          "zone":"6"
        }
      ],
      "injury":
      [
        {
          "type":"Lesionvb",
          "start_date":"2023-03-27T19:20:00.000Z",
          "end_date":"",
          "zone":"3"
        }
      ]
    }
        
    */

    getUserData()
      .then(data => {
        const idX = JSON.parse(data.ID);
        const dateX = new Date();
        console.log(idX);
        console.log(dateX);

        const url = environment.baseURL + 'kinesiologo/create-planilla';
        console.log(url);

        const templateData = {
          playerID: sportman.id_usuario, //número, obligatorio //ID del deportista
          ownerID: idX, //número, obligatorio //ID del kinesiólogo
          date: dateX.toISOString(), //string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`
          session:
            newSession &&
            newSession.goal &&
            newSession.activity &&
            selectedZoneSession
              ? {
                  date: dateSession.toISOString(), //string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`
                  goal: newSession.goal, //string, obligatorio //por ej Liberar espalda baja, Relajar hombro
                  activity: newSession.activity, //string, obligatorio //por ej masaje, etc.
                  zone: selectedZoneSession.id_zona_tratada, //número, obligatorio //ID de la zona tratada
                }
              : {},
          injury:
            newInjury &&
            newInjury.type &&
            newInjury.observation &&
            selectedZoneInjury
              ? {
                  type: newInjury.type, //string, obligatorio //tipo de lesión como desgarro, etc.
                  start_date: dateInjuryStart.toISOString(), //string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`,
                  end_date:
                    dateInjuryEnd.length > 0 ? dateInjuryEnd.toISOString() : '', //string, opcional //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`,
                  observation: newInjury.observation, //string, obligatorio //por ejemplo debe hacer reposo, etc.
                  zone: selectedZoneInjury.id_zona_tratada, //número, obligatorio //ID de la zona tratada
                }
              : {},
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
            /*
            {
              "playerID":"5",
              "ownerID":"2",
              "date":"2023-04-29T19:46:46.431Z",
              "session":
              [
                {
                  "date":"2023-04-29T19:40:00.000Z",
                  "goal":"Jfjf",
                  "activity":"Bffjjf",
                  "zone":"2"
                }
              ],
              "injury":
              [
                {
                  "type":"Lesion",
                  "start_date":"2023-04-28T19:40:00.000Z",
                  "end_date":"",
                  "observation":"Observación ",
                  "zone":"1"
                }
              ]
            }

 {
  "errors": 
  {
    "injury.observation": "The injury.observation field is required when injury is present.", 
    "injury.start_date": "The injury.start_date field is required when injury is present.", 
    "injury.type": "The injury.type field is required when injury is present.", 
    "injury.zone": "The injury.zone field is required when injury is present.", 
    "session.activity": "The session.activity field is required when session is present.", 
    "session.date": "Debe ingresar una fecha para la sesion", 
    "session.goal": "The session.goal field is required when session is present.", 
    "session.zone": "The session.zone field is required when session is present."
  }, 
  "message": "No se pudo dar de alta la planilla", 
  "success": false
}

{
  
  "input": 
  {
    "date": "2023-04-29T20:19:02.609Z", 
    "injury": [[Object]], 
    "ownerID": "2", 
    "playerID": "5", 
    "session": [[Object]]
  }, 
  "injury": 
  [
    {
      "end_date": "", 
      "observation": "Observación ", 
      "start_date": "2023-04-28T19:40:00.000Z", 
      "type": "Lesion", 
      "zone": "1"
    }
  ], 
  "message": "No se pudo dar de alta la planilla", 
  "session": 
    [
      {
        "activity": "Bffjjf", 
        "date": "2023-04-29T19:40:00.000Z", 
        "goal": "Jfjf", 
        "zone": "2"
      }
    ], 
    "success": false
  }

*/
            if (json.success) {
              console.log('ENTRA');
              Alert.alert('Se ha registrado con exito!', json.message);
              navigation.navigate('HomeKinesiologist');
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

    /*

{ "playerID": número, obligatorio //ID del deportista
  "ownerID": número, obligatorio //ID del kinesiólogo
  "date": string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`
  "session": { //objeto JSON, pero puede estar vacío si no se carga sesión
          "date": string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`
          "goal": string, obligatorio //por ej Liberar espalda baja, Relajar hombro
          "activity": string, obligatorio //por ej masaje, etc.
          "zone":  número, obligatorio //ID de la zona tratada
  },
  "injury": { //objeto JSON, pero puede estar vacío si no se carga lesión
    "type": string, obligatorio //tipo de lesión como desgarro, etc.
    "start_date": string, obligatorio //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`,
    "end_date": string, opcional //formato ISO 8601 `YYYY-MM-DDTHH:MM:SS.000Z` por ejemplo `1972-07-31T00:00:00.000Z`,
    "observation": string, obligatorio //por ejemplo debe hacer reposo, etc.
    "zone": número, obligatorio //ID de la zona tratada

  }
}


*/
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
              <Card.Title>SESIONES</Card.Title>
              <Card.Divider />
              <Input
                style={styles.input}
                onChangeText={goal =>
                  // console.log(name)
                  setNewSession({...newSession, goal})
                }
                placeholder="Objetivo"
                value={newSession.goal}
                // keyboardType="numeric"
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />
              <Input
                style={styles.input}
                onChangeText={activity =>
                  // console.log(name)
                  setNewSession({...newSession, activity})
                }
                placeholder="Actividad realizada"
                value={newSession.activity}
                // keyboardType="numeric"
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />

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
                label="Zona tratada"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder={!isFocus ? 'Zona tratada' : '...'}
                value={selectedZoneSession}
                data={zones.zones}
                // multiple={true}
                labelField="nombre"
                valueField="id_zona_tratada"
                onChange={item => {
                  setSellectedZoneSession(item);
                }}
              />
              <FechaInput doDate={handleDateSession} />

              {dateSession !== '' && (
                <Text style={{marginLeft: 15, marginTop: 10, marginBottom: 15}}>
                  Fecha elegida: {dateSession.toLocaleDateString()}
                </Text>
              )}

              <Card.Divider />
              <Card.Divider />
              <Card.Title>LESIONES</Card.Title>
              <Card.Divider />
              <Input
                style={styles.input}
                onChangeText={type =>
                  // console.log(name)
                  setNewInjury({...newInjury, type})
                }
                placeholder="Lesion"
                value={newInjury.type}
                // keyboardType="numeric"
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />
              <Input
                style={styles.input}
                onChangeText={observation =>
                  // console.log(name)
                  setNewInjury({...newInjury, observation})
                }
                placeholder="Observaciones"
                value={newInjury.observation}
                // keyboardType="numeric"
                errorStyle={{color: 'red'}}
                // errorMessage={errors.errors.name}
              />

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
                label="Zona tratada"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder={!isFocus ? 'Zona tratada' : '...'}
                value={selectedZoneInjury}
                data={zones.zones}
                // multiple={true}
                labelField="nombre"
                valueField="id_zona_tratada"
                onChange={item => {
                  setSellectedZoneInjury(item);
                }}
              />
              <FechaInput doDate={handleDateInjuryStart} />

              {dateInjuryStart !== '' && (
                <Text style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
                  Fecha de inicio de lesion:{' '}
                  {dateInjuryStart.toLocaleDateString()}
                </Text>
              )}

              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Text style={{width: '75%', marginLeft: 15, marginTop: 5}}>
                  ¿Desea agregar una fecha de curado de la lesion?
                </Text>

                <IconButton
                  onPress={handleVisible}
                  style={styles.buttonAdd}
                  variant=""
                  type="clear"
                  icon={
                    !visible ? (
                      <Icon
                        name="plus"
                        size={25}
                        type="font-awesome"
                        color="#6409E6"
                      />
                    ) : (
                      <Icon
                        name="minus"
                        size={25}
                        type="font-awesome"
                        color="#6409E6"
                      />
                    )
                  }
                />
              </View>
              {visible ? (
                <View>
                  <FechaInput doDate={handleDateInjuryEnd} />
                  {dateInjuryEnd !== '' && (
                    <Text
                      style={{
                        marginLeft: 15,
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      Fecha de inicio de lesion:{' '}
                      {dateInjuryEnd.toLocaleDateString()}
                    </Text>
                  )}
                </View>
              ) : null}

              <Card.Divider />
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Separator />

      <View style={styles.fixToText}>
        <View style={styles.vertical}>
          <Button title="Guardar" onPress={handleSave} />
        </View>
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 18,
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

    // paddingBottom: StatusBar.currentHeight,
  },
  scrollView: {
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 20,
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
  buttonAdd: {
    // marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
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
    marginBottom: 10,
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
    // fontSize: 16,
    height: 50,
    // width: 210,
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
