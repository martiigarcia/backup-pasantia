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

  const handleSubmit = () => {
    if (password1 === password2) {
      console.log('iguales: p1- ' + password1 + ' - p2- ' + password2);
      change();
    } else {
      console.log('distnitos p1- ' + password1 + ' - p2- ' + password2);
      Alert.alert('Error', 'Las constraseñas no coinciden');
    }
  };

  const getUser = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');

      return MEMBER;
    } catch (error) {
      console.log(error);
    }
  };

  const change = () => {
    setLoading(true);
    let valorToken;

    getUser()
      .then(user => {
        const headers = {
          //userID: user,
          //Authorization: 'Bearer ' + token,
        };
        //  console.log('USER:     ' + user);
        const userID = JSON.parse(user);
        //  console.log(userID.nombre);
        const url =
          'http://localhost:8080/back/public/profile/update-password/' +
          +userID.id_usuario +
          '/' +
          userID.id_usuario;
        console.log(url);

        const requestBody = {
          password: password1,
        };

        console.log(requestBody);
        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
                'ERROR',
                json.message + ': \n' + json.errors.password,
              );
            }

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
                Ingrese una nueva contraseña
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
