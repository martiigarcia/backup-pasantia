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
