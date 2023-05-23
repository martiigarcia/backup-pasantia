import {View, Text, Alert} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import NutricionistList from '../screens/medicalTemplate/nutricionist/NutricionistList';
import createTemplateNutricionist from '../screens/medicalTemplate/nutricionist/createTemplateNutricionist';
import TemplateDetail from '../screens/medicalTemplate/nutricionist/TemplateDetailNutricionist';
import TemplateDetailPhysicalTrainer from '../screens/medicalTemplate/PhysicalTrainer/TemplateDetailPhysicalTrainer';
import PhysicalTrainerList from '../screens/medicalTemplate/PhysicalTrainer/PhysicalTrainerList';
import HomePhysicalTrainer from '../screens/homes/HomePhysicalTrainer';
import CreateTemplatePT from '../screens/medicalTemplate/PhysicalTrainer/CreateTemplatePT';
import SportmanStrengthList from '../screens/medicalTemplate/PhysicalTrainer/SportmanStrengthList';
import StrengthList from '../components/StrengthList';
import StrengthGraphic from '../components/StrengthGraphic';

const Stack = createStackNavigator();

export default function StackPhysicalTrainer({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="HomePhysicalTrainer"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="HomePhysicalTrainer"
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
        component={HomePhysicalTrainer}
      />
      <Stack.Screen
        name="PhysicalTrainerList"
        component={PhysicalTrainerList}
        options={{
          title: 'Planillas',
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
        name="TemplateDetailPhysicalTrainer"
        component={TemplateDetailPhysicalTrainer}
        options={{
          title: 'Detalle',
        }}
      />
      <Stack.Screen
        name="CreateTemplate"
        component={CreateTemplatePT}
        options={{
          title: 'Registrar planilla',
        }}
      />
      <Stack.Screen
        name="SportmanStrengthList"
        options={{
          title: '',
        }}
        component={SportmanStrengthList}
      />
      <Stack.Screen
        name="StrengthList"
        component={StrengthList}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="StrengthGraphic"
        component={StrengthGraphic}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerStyle: {
    // backgroundColor: '#faf',
  },
  headerTitleStyle: {
    // fontWeight: 'bold',
  },
};
