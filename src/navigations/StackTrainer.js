import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import CreateTemplateKinesiologist from '../screens/medicalTemplate/kinesiologist/createTemplateKinesiologist';
import KinesiologistList from '../screens/medicalTemplate/kinesiologist/KinesiologistList';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import TemplateDetailKinesiologist from '../screens/medicalTemplate/kinesiologist/TemplateDetailKinesiologist';
import TemplateDetailTrainer from '../screens/medicalTemplate/trainer/TemplateDetailTrainer';
import TrainerList from '../screens/medicalTemplate/trainer/TrainerList';

const Stack = createStackNavigator();

export default function StackTrainer() {
  return (
    <Stack.Navigator
      initialRouteName="TrainerList"
      screenOptions={screenOptions}>
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
    </Stack.Navigator>
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
