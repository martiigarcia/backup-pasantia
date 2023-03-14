import * as React from 'react';
import {View, Text} from 'react-native';
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
import StackNutricionist from './StackNutricionist';
import StackPhysicalTrainer from './StackPhysicalTrainer';
import StackTrainer from './StackTrainer';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon} from '@rneui/base';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ResetPassword from '../screens/auth/ResetPassword';
import MyProfile from '../screens/auth/personalInformation/MyProfile';
import UserForm from '../screens/users/UserForm';
import RolesList from '../screens/RolesList';
import AllTemplates from '../screens/AllTemplates';
import HomeAdministrator from '../screens/homes/HomeAdministrator';
import HomeNutricionist from '../screens/homes/HomeNutricionist';
import HomeSportman from '../screens/homes/HomeSportman';
import HomeKinesiologist from '../screens/homes/HomeKinesiologist';
import HomeTrainer from '../screens/homes/HomeTrainer';
import HomePhysicalTrainer from '../screens/homes/HomePhysicalTrainer';
import ChangePassword from '../screens/auth/personalInformation/ChangePassword';

//const Drawer = createDrawerNavigator();
//const HomeStack = createStackNavigator();
/*
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem label="Help" onPress={() => alert('Helpinggggg')} />
    </DrawerContentScrollView>
    );
  }*/
/*
  <Drawer.Navigator
  useLegacyImplementation
  centerTitle={true}
  drawerContent={props => <CustomDrawerContent {...props} />}>
  <Drawer.Screen name="Auth" component={StackAuth} />
  <Drawer.Screen name="PhysicalTrainer" component={StackPhysicalTrainer} />
  <Drawer.Screen name="Kinesiologist" component={StackKinesiologist} />
  <Drawer.Screen name="Users" component={StackUsers} />
  <Drawer.Screen name="Nutricionist" component={StackNutricionist} />
  <Drawer.Screen name="Trainer" component={StackTrainer} />
  </Drawer.Navigator>*/

const Stack = createStackNavigator();

const AllStacks = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="HomePhysicalTrainer"
        options={{
          title: 'Home',
        }}
        component={HomePhysicalTrainer}
      />
      <Stack.Screen
        name="HomeTrainer"
        options={{
          title: 'Home',
        }}
        component={HomeTrainer}
      />
      <Stack.Screen
        name="HomeKinesiologist"
        options={{
          title: 'Home',
        }}
        component={HomeKinesiologist}
      />
      <Stack.Screen
        name="HomeSportman"
        options={{
          title: 'Home',
        }}
        component={HomeSportman}
      />
      <Stack.Screen
        name="HomeAdministrator"
        options={{
          title: 'Home',
        }}
        component={HomeAdministrator}
      />

      <Stack.Screen
        name="HomeNutricionist"
        options={{
          title: 'Home',
        }}
        component={HomeNutricionist}
      />
      <Stack.Screen
        name="Profile"
        options={{
          title: 'Mi perfil',
        }}
        component={MyProfile}
      />
      <Stack.Screen
        name="Auth"
        options={({navigation}) => {
          return {
            title: 'Ingresar',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Register')}
                type="clear"
                icon={<Icon name="add" size={30} color="black" />}
              />
            ),
          };
        }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{
          title: 'Registrarme',
        }}
        component={Register}
      />
      <Stack.Screen
        name="ResetPassword"
        options={{
          title: 'Restaurar',
        }}
        component={ResetPassword}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{
          title: 'Cambiar contraseña',
        }}
        component={ChangePassword}
      />
      <Stack.Screen
        name="Users"
        options={{
          title: 'Usuarios',
        }}
        component={StackUsers}
      />

      <Stack.Screen
        name="UserForm"
        options={{
          title: 'Formulario de Usuario',
        }}
        component={UserForm}
      />
      <Stack.Screen
        name="RolesList"
        options={{
          title: 'Roles del sistema',
        }}
        component={RolesList}
      />
      <Stack.Screen
        name="AllTemplates"
        options={{
          title: 'Todas las planillas',
        }}
        component={AllTemplates}
      />

      <Stack.Screen name="Nutricionist" component={StackNutricionist} />
      <Stack.Screen name="Kinesiologist" component={StackKinesiologist} />
      <Stack.Screen name="PhysicalTrainer" component={StackPhysicalTrainer} />
      <Stack.Screen name="Trainer" component={StackTrainer} />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: '#faf',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <AllStacks />
    </NavigationContainer>
  );
}
