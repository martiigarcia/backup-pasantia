import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeAdministrator from '../screens/homes/HomeAdministrator';
import StackUsers from './StackUsers';
import UserForm from '../screens/users/UserForm';
import RolesList from '../screens/RolesList';
import AllTemplates from '../screens/AllTemplates';

const Stack = createStackNavigator();

export default function StackAdministrator() {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeAdministrator"
          screenOptions={screenOptions}>
          
          <Stack.Screen
        name="HomeAdministrator"
        options={{
          title: 'Home',
        }}
        component={HomeAdministrator}
      />


      <Stack.Screen
        name="Users"
        options={{
          title: 'Usuarios',
        }}
        component={StackUsers}
      />

      <Stack.Screen
        name="UserForm"
        options={{
          title: 'Formulario de Usuario',
        }}
        component={UserForm}
      />
      <Stack.Screen
        name="RolesList"
        options={{
          title: 'Roles del sistema',
        }}
        component={RolesList}
      />
      <Stack.Screen
        name="AllTemplates"
        options={{
          title: 'Todas las planillas',
        }}
        component={AllTemplates}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerStyle: {
    //backgroundColor: '#faf',
  },
  headerTitleStyle: {
    //fontWeight: 'bold',
  },
};
