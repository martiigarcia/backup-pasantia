import {View, Text, Alert} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import NutricionistList from '../screens/medicalTemplate/nutricionist/NutricionistList';
import createTemplateNutricionist from '../screens/medicalTemplate/nutricionist/createTemplateNutricionist';
import TemplateDetail from '../screens/medicalTemplate/nutricionist/TemplateDetailNutricionist';
import HomeNutricionist from '../screens/homes/HomeNutricionist';
import updateTemplate from '../screens/medicalTemplate/nutricionist/updateTemplate';
import CreateAliment from '../screens/medicalTemplate/nutricionist/CreateAliment';
import FoodsList from '../screens/medicalTemplate/nutricionist/FoodsList';
import IMCList from '../screens/medicalTemplate/nutricionist/IMCList';
import SportmanIMC from '../screens/medicalTemplate/nutricionist/SportmanIMC';
import IMCGraphic from '../screens/medicalTemplate/sportman/IMCGraphic';
const Stack = createStackNavigator();

export default function StackNutricionist({navigation}) {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeNutricionist"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeNutricionist"
        options={{
          title: 'Home',
          // headerBackTitle: 'Back',
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
        component={HomeNutricionist}
      />

      <Stack.Screen
        name="NutricionistList"
        component={NutricionistList}
        options={({navigation}) => {
          return {
            title: 'Planillas nutricionales',
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
        name="CreateTemplate"
        component={createTemplateNutricionist}
        options={{
          title: 'Registrar planilla',
        }}
      />
      {/* <Stack.Screen
        name="CreateNutrient"
        component={CreateNutrient}
        options={{
          title: 'Registrar nutriente',
        }}
      /> */}
      <Stack.Screen
        name="CreateAliment"
        component={CreateAliment}
        options={{
          title: 'Registrar alimento',
        }}
      />
      <Stack.Screen
        name="FoodsList"
        component={FoodsList}
        options={{
          title: 'Alimentos registrados',
        }}
      />
      <Stack.Screen
        name="UpdateTemplateNutricionist"
        component={updateTemplate}
        options={{
          title: 'Actualizar planilla',
        }}
      />
      <Stack.Screen
        name="TemplateDetail"
        component={TemplateDetail}
        options={{
          title: 'Detalle',
        }}
      />
      <Stack.Screen
        name="IMC"
        options={{
          title: 'IMC',
        }}
        component={IMCList}
      />
      <Stack.Screen
        name="IMCGraphic"
        options={{
          title: 'IMC',
        }}
        component={IMCGraphic}
      />
      <Stack.Screen
        name="SportmanIMC"
        options={{
          title: 'Deportistas',
        }}
        component={SportmanIMC}
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
