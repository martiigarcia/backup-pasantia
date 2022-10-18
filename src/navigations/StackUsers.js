import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import UsersList from '../screens/users/UsersList';
import UserForm from '../screens/users/UserForm';

const Stack = createStackNavigator();

export default function StackUsers() {
  return (
    <Stack.Navigator initialRouteName="UsersList" screenOptions={screenOptions}>
      <Stack.Screen
        name="UsersList"
        component={UsersList}
        options={({navigation}) => {
          return {
            title: 'CRUD - Listado de Usuarios',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('UserForm')}
                type="clear"
                icon={<Icon name="add" size={30} color="#fff" />}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="UserForm"
        component={UserForm}
        options={{
          title: 'Formulario de Usuario',
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
