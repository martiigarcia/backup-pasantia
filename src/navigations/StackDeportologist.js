import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import DeportistList from '../screens/medicalTemplate/SportsmanList';
import HomeDeportologist from '../screens/homes/HomeDeportologist';
import TemplateDetailDeportologist from '../screens/medicalTemplate/deportologist/TemplateDetailDeportologist';
import CreateTemplateDeportologist from '../screens/medicalTemplate/deportologist/CreateTemplateDeportologist';

const Stack = createStackNavigator();

export default function StackDeportologist() {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeDeportologist"
          screenOptions={screenOptions}>
          
          <Stack.Screen
        name="HomeDeportologist"
        options={{
          title: 'Home',
        }}
        component={HomeDeportologist}
      />

    

      <Stack.Screen
        name="DeportologistList"
        component={DeportistList}
        options={({navigation}) => {
          return {
            title: 'Planillas deportologo',
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
        name="CreateTemplateDeportologist"
        component={CreateTemplateDeportologist}
        options={{
          title: 'Registrar planilla',
        }}
      />
      <Stack.Screen
        name="TemplateDetail"
        component={TemplateDetailDeportologist}
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
