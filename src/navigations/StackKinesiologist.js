import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import CreateTemplateKinesiologist from '../screens/medicalTemplate/kinesiologist/createTemplateKinesiologist';
import KinesiologistList from '../screens/medicalTemplate/kinesiologist/KinesiologistList';
import DeportistList from '../screens/medicalTemplate/SportsmanList';

const Stack = createStackNavigator();

export default function StackKinesiologist() {
  return (
    <Stack.Navigator
      initialRouteName="KinesiologistList"
      screenOptions={screenOptions}>
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
        name="CreateTemplateKinesiologist"
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
    backgroundColor: '#faf',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
