import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon, Input, ListItem} from '@rneui/themed';
import {Button, Stack} from '@react-native-material/core';
import {Card} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';

export default ({route, navigation}) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState('');
  const [errorPassword1, setErrorPassword1] = useState('');
  const [errorPassword2, setErrorPassword2] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [resultado, setResultado] = useState({resultado: ''});
  const [mensaje, setMensaje] = useState({mensaje: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    const clearvalue1 = password1.trim();
    const clearvalue2 = password2.trim();
    // console.log(password1);
    // console.log(password2);
    // console.log(clearvalue1);
    // console.log(clearvalue2);
    // console.log(clearvalue1.length);
    // console.log(password1.length);
    // console.log(clearvalue2.length);
    // console.log(password2.length);
    //
    // console.log(clearvalue2.length < password2.length);
    // console.log(clearvalue1.length < password1.length);

    if (password1 === '' || password2 === '') {
      Alert.alert('Error', 'Debe ingresar una nueva contraseña');
    } else {
      if (
        clearvalue2.length < password2.length ||
        clearvalue1.length < password1.length
      ) {
        Alert.alert(
          'Error',
          'La contraseña no puede contener espacios en blanco',
        );
      } else {
        if (password1 === password2) {
          console.log('iguales: p1- ' + password1 + ' - p2- ' + password2);
          change();
        } else {
          console.log('distintos p1- ' + password1 + ' - p2- ' + password2);
          Alert.alert('Error', 'Las constraseñas no coinciden');
        }
      }
    }
  };

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

      // setUserData({
      //   member: MEMBER,
      //   token: TOKEN,
      //   userId: ID,
      // });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const change = () => {
    setLoading(true);

    console.log('CHANGE: ');
    getUserData()
      .then(data => {
        // console.log(data.MEMBER);
        // console.log(data.TOKEN);
        // console.log(data.ID);
        const idX = JSON.parse(data.ID);
        // console.log(idX);

        // const headers = {
        //   'Content-Type': 'application/json',
        //   Authorization: 'Bearer ' + data.TOKEN,
        // };
        const url =
          environment.baseURL + 'profile/update-password/' + +idX + '/' + idX;
        console.log(url);

        const requestBody = {
          password: password1,
        };

        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.TOKEN,
          },
          body: JSON.stringify(requestBody),
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);

            if (json.success) {
              Alert.alert(
                'Enhorabuena!',
                'La contraseña se actualizo con exito',
              );
              navigation.navigate('Profile');
            } else {
              Alert.alert(
                'Error',
                json.message + ': \n' + json.errors.password,
              );
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
    // console.log(userData.member);
    // console.log(userData.token);
    // console.log(userData.userId);
    // const id = JSON.parse(userData.userId);
    // console.log(id);

    // const headers = {
    //   //userID: user,
    //   Authorization: 'Bearer ' + userData.token,
    // };

    // const url =
    //   'http://localhost:8080/back/public/profile/update-password/' +
    //   +id +
    //   '/' +
    //   id;
    // // console.log(url);

    // const requestBody = {
    //   password: password1,
    // };

    // console.log(requestBody);
    // fetch(url, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + userData.token,
    //   },
    //   body: JSON.stringify(requestBody),
    // })
    //   .then(resp => resp.json())
    //   .then(json => {
    //     // console.log(json);

    //     if (json.success) {
    //       Alert.alert('Enhorabuena!', 'La contraseña se actualizo con exito');
    //       navigation.navigate('Profile');
    //     } else {
    //       Alert.alert('ERROR', json.message + ': \n' + json.errors.password);
    //     }

    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     // console.log(error);
    //     setLoading(false);
    //   });
  };

  return (
    <ScrollView>
      <View>
        <Card>
          <Card.Title style={styles.titleCard}>Nueva contraseña</Card.Title>
          <Card.Divider />

          <ListItem key={1} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.text}>
                Ingrese una nueva contraseña
              </ListItem.Title>

              <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={!showPassword1}
                errorStyle={{color: 'red'}}
                errorMessage={errorPassword1}
                // defaultValue={form.form.password}
                onChangeText={password => {
                  setPassword1(password);
                }}
                name="password"
                rightIcon={
                  <Icon
                    type="material-community"
                    name={showPassword1 ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword1(!showPassword1)}
                  />
                }
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={2} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.text}>
                Repita la nueva contraseña ingresada
              </ListItem.Title>

              <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={!showPassword2}
                errorStyle={{color: 'red'}}
                errorMessage={errorPassword2}
                // defaultValue={form.form.password}
                onChangeText={password => {
                  setPassword2(password);
                }}
                name="password"
                rightIcon={
                  <Icon
                    type="material-community"
                    name={showPassword2 ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword2(!showPassword2)}
                  />
                }
              />
              <Text style={styles.textInfo}>
                * La nueva contraseña debe contener al menos 8 caracteres
              </Text>
            </ListItem.Content>
          </ListItem>

          <Card.Divider />
          <View style={styles.view}>
            <Stack fill center spacing={4}>
              <Button
                style={styles.button}
                type="submit"
                title="Cambiar"
                onPress={() => {
                  //Alert.alert('Iniciando...');
                  handleSubmit();
                }}
              />
            </Stack>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    // margin: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  text: {
    fontSize: 18,
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
    textAlign: 'left',
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
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
