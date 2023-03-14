import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import UsersList from '../screens/users/UsersList';
import UserForm from '../screens/users/UserForm';
import {createDrawerNavigator} from '@react-navigation/drawer';

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function StackUsers() {
  return (
    <Drawer.Navigator initialRouteName="UsersList">
      <Drawer.Screen
        name="UsersList"
        component={UsersList}
        /*options={{
          title: 'Lista de usuarios',
        }}*/
        options={({navigation}) => {
          return {
            title: 'Lista de usuarios',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('UserForm')}
                type="clear"
                icon={<Icon name="add" size={30} color="black" />}
              />
            ),
          };
        }}
      />
      <Drawer.Screen
        name="UserForm"
        component={UserForm}
        options={{
          title: 'Formulario de Usuario',
        }}
      />
    </Drawer.Navigator>
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
