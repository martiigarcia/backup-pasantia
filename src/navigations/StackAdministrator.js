import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeAdministrator from '../screens/homes/HomeAdministrator';
import UserForm from '../screens/users/UserForm';
import RolesList from '../screens/RolesList';
import AllTemplates from '../screens/AllTemplates';
import UsersList from '../screens/users/UsersList';
import {Button, Icon} from '@rneui/base';
import ListProfessions from '../components/ListProfessions';
import ListProfessionals from '../components/ListProfessionals';

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
        name="UsersList"
        component={UsersList}
        options={{
          title: 'Lista de usuarios',
        }}
        // options={({navigation}) => {
        //   return {
        //     title: 'Lista de usuarios',
        //     headerRight: () => (
        //       <Button
        //         onPress={() => navigation.navigate('UserForm')}
        //         type="clear"
        //         icon={<Icon name="add" size={30} color="black" />}
        //       />
        //     ),
        //   };
        // }}
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
        name="ListProfessions"
        options={{
          title: 'Profesiones',
        }}
        component={ListProfessions}
      />
      <Stack.Screen
        name="ListProfessionals"
        options={{
          title: 'Profesionales',
        }}
        component={ListProfessionals}
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
