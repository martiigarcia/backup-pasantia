import {View, Text} from 'react-native';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import StackUsers from './StackUsers';
import StackAuth from './StackAuth';
import StackKinesiologist from './StackKinesiologist';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Helpinggggg')} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      centerTitle={true}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Users" component={StackUsers} />
      <Drawer.Screen name="Auth" component={StackAuth} />
      <Drawer.Screen name="Kinesiologist" component={StackKinesiologist} />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
