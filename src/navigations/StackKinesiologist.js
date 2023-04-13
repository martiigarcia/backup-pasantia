import {View, Text, Alert} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import CreateTemplateKinesiologist from '../screens/medicalTemplate/kinesiologist/createTemplateKinesiologist';
import KinesiologistList from '../screens/medicalTemplate/kinesiologist/KinesiologistList';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import TemplateDetailKinesiologist from '../screens/medicalTemplate/kinesiologist/TemplateDetailKinesiologist';
import HomeKinesiologist from '../screens/homes/HomeKinesiologist';

const Stack = createStackNavigator();

export default function StackKinesiologist({navigation}) {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeKinesiologist"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeKinesiologist"
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
        component={HomeKinesiologist}
      />
      <Stack.Screen
        name="KinesiologistList"
        component={KinesiologistList}
        options={({navigation}) => {
          return {
            title: 'Planillas kinesiologicas',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('SportsmanList')}
                type="clear"
                icon={<Icon name="add" size={30} color="#fff" />}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="SportsmanList"
        component={DeportistList}
        options={{
          title: 'Deportistas',
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
        name="CreateTemplate"
        component={CreateTemplateKinesiologist}
        options={{
          title: 'Registrar planilla',
        }}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerStyle: {
    //backgroundColor: '#faf',
  },
  // headerTintColor: '#fff',
  headerTitleStyle: {
    //  fontWeight: 'bold',
  },
};
