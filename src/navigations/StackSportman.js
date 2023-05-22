import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import {View, Text, Alert} from 'react-native';
import HomeSportman from '../screens/homes/HomeSportman';
import MyTemplates from '../screens/medicalTemplate/sportman/MyTemplates';
import TemplateDetailNutricionist from '../screens/medicalTemplate/nutricionist/TemplateDetailNutricionist';
import TemplateDetailKinesiologist from '../screens/medicalTemplate/kinesiologist/TemplateDetailKinesiologist';
import TemplateDetailTrainer from '../screens/medicalTemplate/trainer/TemplateDetailTrainer';
import TemplateDetailPhysicalTrainer from '../screens/medicalTemplate/PhysicalTrainer/TemplateDetailPhysicalTrainer';
import MyIMC from '../screens/medicalTemplate/sportman/MyIMC';
import IMCGraphic from '../screens/medicalTemplate/sportman/IMCGraphic';
import MySesions from '../screens/medicalTemplate/sportman/MySesions';
import MyShotProgress from '../screens/medicalTemplate/sportman/MyShotProgress';
import MyPF from '../screens/medicalTemplate/sportman/MyPF';
import InjuriesList from '../screens/medicalTemplate/kinesiologist/InjuriesList';
import InjuriesGraphic from '../screens/medicalTemplate/kinesiologist/InjuriesGraphic';
import ShotProgressList from '../components/ShotProgressList';
import ShotProgressGraphic from '../components/ShotProgressGraphic';
import StrengthList from '../components/StrengthList';
import StrengthGraphic from '../components/StrengthGraphic';

const Stack = createStackNavigator();

export default function StackSportman({navigation}) {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeSportman"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeSportman"
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
        component={HomeSportman}
      />

      <Stack.Screen
        name="MyTemplates"
        options={{
          title: 'Mis planillas',
        }}
        component={MyTemplates}
      />

      <Stack.Screen
        name="IMC"
        options={{
          title: 'IMC',
        }}
        component={MyIMC}
      />
      <Stack.Screen
        name="MySesions"
        options={{
          title: 'Sesiones',
        }}
        component={MySesions}
      />
      <Stack.Screen
        name="InjuriesList"
        component={InjuriesList}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="InjuriesGraphic"
        component={InjuriesGraphic}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="MyShotProgress"
        options={{
          title: 'Lanzamientos',
        }}
        component={MyShotProgress}
      />
      <Stack.Screen
        name="ShotProgressList"
        component={ShotProgressList}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="ShotProgressGraphic"
        component={ShotProgressGraphic}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="MyStrenghtProgress"
        options={{
          title: 'PF',
        }}
        component={MyPF}
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

      <Stack.Screen
        name="IMCGraphic"
        options={{
          title: 'IMC',
        }}
        component={IMCGraphic}
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
