
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import HomeSportman from '../screens/homes/HomeSportman';

const Stack = createStackNavigator();

export default function StackSportman() {
  return (
    <Stack.Navigator
      useLegacyImplementation
      initialRouteName="HomeSportman"
          screenOptions={screenOptions}>
          
          <Stack.Screen
        name="HomeSportman"
        options={{
          title: 'Home',
        }}
        component={HomeSportman}
          />
          
         
     
    </Stack.Navigator>
  );
}
 /*<Stack.Screen
        name="MyTemplates"
        options={{
          title: 'Mis planillas',
        }}
        component={MyTemplates}
      />*/

const screenOptions = {
  headerStyle: {
    //backgroundColor: '#faf',
  },
  headerTitleStyle: {
    //fontWeight: 'bold',
  },
};
