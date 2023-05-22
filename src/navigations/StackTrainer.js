import {View, Text, Alert} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import CreateTemplateKinesiologist from '../screens/medicalTemplate/kinesiologist/createTemplateKinesiologist';
import KinesiologistList from '../screens/medicalTemplate/kinesiologist/KinesiologistList';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import TemplateDetailKinesiologist from '../screens/medicalTemplate/kinesiologist/TemplateDetailKinesiologist';
import TemplateDetailTrainer from '../screens/medicalTemplate/trainer/TemplateDetailTrainer';
import TrainerList from '../screens/medicalTemplate/trainer/TrainerList';
import HomeTrainer from '../screens/homes/HomeTrainer';
import CreateTemplateTrainer from '../screens/medicalTemplate/trainer/CreateTemplateTrainer';
import ShotProgressList from '../components/ShotProgressList';
import ShotProgressGraphic from '../components/ShotProgressGraphic';
import SportmanShotProgress from '../screens/medicalTemplate/trainer/SportmanShotProgress';

const Stack = createStackNavigator();

export default function StackTrainer({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="HomeTrainer"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeTrainer"
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
        component={HomeTrainer}
      />
      <Stack.Screen
        name="TrainerList"
        component={TrainerList}
        options={({navigation}) => {
          return {
            title: 'Planillas del entrenador',
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
        name="TemplateDetailTrainer"
        component={TemplateDetailTrainer}
        options={{
          title: 'Detalle',
        }}
      />
      <Stack.Screen
        name="CreateTemplate"
        component={CreateTemplateTrainer}
        options={{
          title: 'Registrar planilla',
        }}
      />

      <Stack.Screen
        name="SportmanShotProgress"
        component={SportmanShotProgress}
        options={{
          title: '',
        }}
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
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerStyle: {
    //backgroundColor: '#faf',
  },
  // headerTintColor: '#fff',
  headerTitleStyle: {
    // fontWeight: 'bold',
  },
};
