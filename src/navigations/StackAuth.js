import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ResetPassword from '../screens/auth/ResetPassword';

const Stack = createStackNavigator();
export default function StackAuth({routes, navigation}) {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation}) => {
          return {
            title: 'Ingresar',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Register')}
                type="clear"
                icon={<Icon name="add" size={30} color="#fff" />}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Registrarme',
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: 'Restaurar',
        }}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#faf',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
