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
import Loading from '../../components/Loading';

export default ({route, navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [resultado, setResultado] = useState({resultado: ''});
  const [mensaje, setMensaje] = useState({mensaje: ''});

  const onSaveSuccess = async value => {
    //console.log(value.access_token);
    //console.log(value.message);
    //console.log(value.user);

    try {
      await AsyncStorage.setItem('@AUTH_TOKEN', value.access_token);
      await AsyncStorage.setItem('@MEMBER', JSON.stringify(value.user));
      await AsyncStorage.setItem('@ROL_USER', JSON.stringify(value.user.rol));
      // await AsyncStorage.setItem('@MEMBER2', value.user);
      await AsyncStorage.setItem(
        '@ID_USER',
        JSON.stringify(value.user.id_usuario),
      );

      // console.log('AUTH_TOKEN' + (await AsyncStorage.getItem('@AUTH_TOKEN')));
      // console.log('MEMBER' + (await AsyncStorage.getItem('@MEMBER')));
      // console.log('MEMBER2' + (await AsyncStorage.getItem('@MEMBER2')));
      // console.log('ID_USER' + (await AsyncStorage.getItem('@ID_USER')));

      if (value.user.rol === 'Administrador')
        navigation.navigate('Administrator');

      if (value.user.rol === 'Kinesiologo')
        navigation.navigate('Kinesiologist');

      if (value.user.rol === 'Nutricionista')
        navigation.navigate('Nutricionist');

      if (value.user.rol === 'Entrenador') navigation.navigate('Trainer');

      if (value.user.rol === 'Deportista') navigation.navigate('Sportman');

      if (value.user.rol === 'Deportologo')
        navigation.navigate('Deportologist');

      if (value.user.rol === 'Preparador Fisico')
        navigation.navigate('PhysicalTrainer');
    } catch (error) {
      Alert.alert('Login', 'Error.' + error);
    }
  };
  const handleSession = () => {
    const requestBody = {
      email: email,
      password: password,
    };

    if (!(requestBody.email === '') || !(requestBody.password === '')) {
      console.log(requestBody);
      fetch('http://localhost:8080/back/public/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => response.json())
        .then(data => {
          console.log('data');
          if (data.success === false) {
            Alert.alert('ERROR', data.message);
          } else {
            <>
              <Loading isVisible={true} />
            </>;
            onSaveSuccess(data); //ERROR: hacer que entre aca solo si se loguea, no siempre como esta ahora
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert(
        'Error',
        'Los campos Email y Contraseña deben estar completos',
      );
    }
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
