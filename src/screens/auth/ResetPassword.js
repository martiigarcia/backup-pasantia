import {View, Text} from 'react-native';
import React from 'react';

export default function ResetPassword() {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (password1 === password2) {
      console.log('iguales');
    } else {
      console.log('distnitos');
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

  const changePassword = () => {
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
          'http://localhost:8080/back/public/update-password/' +
          +userID.id_usuario +
          '/' +
          userID.id_usuario;
        console.log(url);

        const requestBody = {
          password: password,
        };

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);
            console.log(json.planillas);

            if (json.success) {
              setTemplate({
                templates: json.planillas,
              });
              //console.log(templates.templates);
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
    <View>
      <Text>ResetPassword</Text>

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
    </View>
  );
}
