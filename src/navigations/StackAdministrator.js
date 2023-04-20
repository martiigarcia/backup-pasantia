import React from 'react';
import {View, Text, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeAdministrator from '../screens/homes/HomeAdministrator';
import UserForm from '../screens/users/UserForm';
import RolesList from '../screens/RolesList';
import AllTemplates from '../screens/AllTemplates';
import UsersList from '../screens/users/UsersList';
import {Button, Icon} from '@rneui/base';
import ListProfessions from '../components/ListProfessions';
import ListProfessionals from '../components/ListProfessionals';
import SportsmanList from '../screens/medicalTemplate/SportsmanList';
import TemplateDetailNutricionist from '../screens/medicalTemplate/nutricionist/TemplateDetailNutricionist';
import TemplateDetailKinesiologist from '../screens/medicalTemplate/kinesiologist/TemplateDetailKinesiologist';
import TemplateDetailTrainer from '../screens/medicalTemplate/trainer/TemplateDetailTrainer';
import TemplateDetailPhysicalTrainer from '../screens/medicalTemplate/PhysicalTrainer/TemplateDetailPhysicalTrainer';

const Stack = createStackNavigator();

export default function StackAdministrator({navigation}) {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeAdministrator"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeAdministrator"
        options={{
          title: 'Home',
          headerLeft: null,
          headerRight: () => (
            <Button
              title="Cerrar sesión"
              onPress={() => {
                Alert.alert(
                  'Salir',
                  'Esta a punto de cerrar su sesión actual, seguro que desea continuar?',
                  [
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('cancelando...'),
                      style: 'cancel',
                    },
                    {
                      text: 'Salir',
                      onPress: () => navigation.goBack(),
                    },
                  ],
                );
              }}
              type="clear"
              titleStyle={{
                color: 'black',
                fontSize: 20,
                marginHorizontal: 10,
              }}
              iconRight
              icon={
                {
                  name: 'sign-out',
                  type: 'font-awesome',
                  size: 20,
                  color: 'black',
                }
                // <Icon name="add" size={30} color="black" style={marginHorizontal: 10} />
              }
            />
          ),
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
        name="SportsmanList"
        component={SportsmanList}
        options={{
          title: 'Deportistas',
        }}
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

      <Stack.Screen
        name="TemplateDetailN"
        component={TemplateDetailNutricionist}
        options={{
          title: 'Detalle',
        }}
      />
      <Stack.Screen
        name="TemplateDetailK"
        component={TemplateDetailKinesiologist}
        options={{
          title: 'Detalle',
        }}
      />
      <Stack.Screen
        name="TemplateDetailT"
        component={TemplateDetailTrainer}
        options={{
          title: 'Detalle',
        }}
      />
      <Stack.Screen
        name="TemplateDetailPT"
        component={TemplateDetailPhysicalTrainer}
        options={{
          title: 'Detalle',
        }}
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
