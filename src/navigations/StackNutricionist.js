import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import NutricionistList from '../screens/medicalTemplate/nutricionist/NutricionistList';
import createTemplateNutricionist from '../screens/medicalTemplate/nutricionist/createTemplateNutricionist';
import TemplateDetail from '../screens/medicalTemplate/nutricionist/TemplateDetailNutricionist';

const Stack = createStackNavigator();

export default function StackNutricionist() {
  return (
    <Stack.Navigator
      initialRouteName="NutricionistList"
      screenOptions={screenOptions}>
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
        name="CreateTemplateNutricionist"
        component={createTemplateNutricionist}
        options={{
          title: 'Registrar planilla',
        }}
      />
      <Stack.Screen
        name="TemplateDetail"
        component={TemplateDetail}
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
