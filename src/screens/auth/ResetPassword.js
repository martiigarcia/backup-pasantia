import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  // Clipboard,
} from 'react-native';
import {Input, ListItem} from '@rneui/themed';
import {Button, Stack} from '@react-native-material/core';
import {Card} from '@rneui/themed';
import Clipboard from '@react-native-clipboard/clipboard';

export default ({route, navigation}) => {
  // const [password1, setPassword1] = useState('');
  // const [password2, setPassword2] = useState('');
  // const [showPassword1, setShowPassword1] = useState(false);
  // const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState('');
  // const [errorPassword1, setErrorPassword1] = useState('');
  // const [errorPassword2, setErrorPassword2] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [resultado, setResultado] = useState({resultado: ''});
  const [mensaje, setMensaje] = useState({mensaje: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    const clearEmail = email.trim();
    console.log(clearEmail);
    console.log(email);
    console.log(clearEmail.length);
    console.log(email.length);
    console.log(clearEmail.length < email.length);

    if (email === '') {
      Alert.alert('Error', 'Debe ingresar su email');
    } else {
      if (clearEmail.length < email.length) {
        Alert.alert('Error', 'El email no puede contener espacios en blanco');
      } else {
        change();
      }
    }
  };

  const change = () => {
    setLoading(true);

    const url = 'http://localhost:8080/back/public/auth/forgot-password';
    console.log(url);

    const requestBody = {
      email: email,
    };

    console.log(requestBody);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify(requestBody),
    })
      .then(resp => resp.json())
      .then(json => {
        // console.log(json);

        if (json.success) {
          Alert.alert(
            'Enhorabuena!',
            'La contraseña se actualizo con exito. Su nueva contraseña es: ' +
              json.user.clave,
            [
              {
                text: 'Copiar contraseña generada al portapapeles',
                onPress: () => {
                  Clipboard.setString(json.user.clave);
                  console.log('Mensaje copiado al portapapeles');
                },
              },
            ],
          );
          navigation.navigate('Auth');
        } else {
          Alert.alert('ERROR', json.message);
        }

        setLoading(false);
      })
      .catch(error => {
        // console.log(error);
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
                Ingrese su email
              </ListItem.Title>
              <Input
                placeholder="Email"
                onChangeText={email => {
                  setEmail(email);
                }}
                name="email"
                keyboardType="email-address"
                errorMessage={errorEmail}
                //defaultValue={form.email}
              />

              <Text style={styles.textInfo}>
                Complete su email y presione "Solicitar nueva contraseña". El
                sistema le generará una contraseña aleatoria en el momento.
              </Text>
            </ListItem.Content>
          </ListItem>

          {/* <ListItem key={2} bottomDivider>
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
                name="password1"
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
          <ListItem key={3} bottomDivider>
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
                name="password2"
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
          </ListItem> */}

          <Card.Divider />
          <View style={styles.view}>
            <Stack fill center spacing={4}>
              <Button
                style={styles.button}
                type="submit"
                title="Solicitar nueva contraseña"
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
