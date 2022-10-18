import React, {useState, Fragment} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import {Button, Stack, Text} from '@react-native-material/core';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({route, navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [resultado, setResultado] = useState({resultado: ''});
  const [mensaje, setMensaje] = useState({mensaje: ''});

  const onSaveSuccess = async value => {
    /*console.log(value.access_token);
    console.log(value.message);
    console.log(value.user);*/

    try {
      await AsyncStorage.setItem('@AUTH_TOKEN', value.access_token);
      await AsyncStorage.setItem('@MEMBER', JSON.stringify(value.user));
      console.log('AUTH_TOKEN' + (await AsyncStorage.getItem('@AUTH_TOKEN')));
      // console.log('MEMBER' + (await AsyncStorage.getItem('@MEMBER')));

      navigation.navigate('Users');
    } catch (error) {
      Alert.alert('Login', 'Error.' + error);
    }
  };
  const handleSession = () => {
    const requestBody = {
      email: email,
      password: password,
    };
    fetch('http://localhost:8080/back/public/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        onSaveSuccess(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Fragment>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.view}>
              <Text style={styles.text}>Ingresar sesion</Text>

              <Input
                style={styles.input}
                placeholder="Email"
                onChangeText={email => {
                  setEmail(email);
                }}
                name="email"
                keyboardType="email-address"
                errorMessage={errorEmail}
                //defaultValue={form.email}
              />
              <Input
                style={styles.input}
                placeholder="Contraseña"
                password={true}
                secureTextEntry={!showPassword}
                errorStyle={{color: 'red'}}
                errorMessage={errorPassword}
                // defaultValue={form.form.password}
                onChangeText={password => {
                  setPassword(password);
                }}
                name="password"
                rightIcon={
                  <Icon
                    type="material-community"
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </View>
            <View style={styles.view}>
              <Stack fill center spacing={4}>
                <Button
                  style={styles.button}
                  variant={'text'}
                  title="¿Olvido su contraseña?"
                  onPress={
                    () => navigation.navigate('ResetPassword')
                    //Alert.alert('Restableciendo...')
                  }
                />
              </Stack>
            </View>
            <View style={styles.view}>
              <Stack fill center spacing={4}>
                <Button
                  type="submit"
                  style={styles.button}
                  title="Iniciar Sesión"
                  onPress={() => {
                    //Alert.alert('Iniciando...');
                    handleSession();
                  }}
                />
              </Stack>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
    textAlign: 'center',
  },
  view: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
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
});
