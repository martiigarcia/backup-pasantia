import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import NutricionistList from '../screens/medicalTemplate/nutricionist/NutricionistList';
import createTemplateNutricionist from '../screens/medicalTemplate/nutricionist/createTemplateNutricionist';
import TemplateDetail from '../screens/medicalTemplate/nutricionist/TemplateDetailNutricionist';
import TemplateDetailPhysicalTrainer from '../screens/medicalTemplate/PhysicalTrainer/TemplateDetailPhysicalTrainer';
import PhysicalTrainerList from '../screens/medicalTemplate/PhysicalTrainer/PhysicalTrainerList';

const Stack = createStackNavigator();

export default function StackPhysicalTrainer() {
  return (
    <Stack.Navigator
      initialRouteName="PhysicalTrainerList"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="PhysicalTrainerList"
        component={PhysicalTrainerList}
        options={({navigation}) => {
          return {
            title: 'Planillas del preparador fisico',
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
        name="TemplateDetailPhysicalTrainer"
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
    backgroundColor: '#faf',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
