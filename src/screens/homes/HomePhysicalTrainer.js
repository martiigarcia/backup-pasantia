import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import Home from '../../components/Home';
//const Stack = createStackNavigator();

export default ({route, navigation}) => {
  const state = {
    data: [
      {
        id: 1,
        title: 'Mis planillas',
        color: '#87CEEB',
        options: 'Listar todas mis planillas registradas',
        image: 'https://img.icons8.com/?size=512&id=MNNoA9H61AWq&format=png',
        route: 'PhysicalTrainerList',
        // image: 'https://img.icons8.com/office/70/000000/home-page.png',
      },
      {
        id: 2,
        title: 'Registrar nueva planilla',
        color: '#4682B4',
        options: 'Registrar nueva planilla',
        image: 'https://img.icons8.com/?size=512&id=WNwdohdkXCzE&format=png',
        route: 'SportsmanList',
        //https://img.icons8.com/color/70/000000/two-hearts.png',
      },
      {
        id: 1,
        title: 'Mis datos',
        color: '#ff581a',
        options: 'Ver mis datos, modificar datos, cambiar contraseña',
        image: 'https://img.icons8.com/?size=512&id=2zQuuMM0XuM9&format=png',
        route: 'Profile',
        // image: 'https://img.icons8.com/color/70/000000/name.png',
      },
      {
        id: 6,
        title: 'Progreso de fuerza',
        // color: '#FF69B4',
        // color: '#20B2AA', //turquesita
        // color: '#00FF00', //verde
        // color: '#00d800', //verde opaco
        color: '#3bc43b', //verde saturado sturado
        options:
          'Ver informacion del progreso de fuerza con RM (repetición máxima)',
        image: 'https://img.icons8.com/?size=512&id=feFedRJYd495&format=png',
        // image: 'https://img.icons8.com/?size=512&id=hlniyYCIF_nE&format=png',
        route: 'SportmanStrengthList',
        // image: 'https://img.icons8.com/office/70/000000/home-page.png',
      },
    ],
  };

  /*function Root() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Profile" component={MyProfile} />
      </Stack.Navigator>
    );
  }
  const NavigaRoot = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
    );
  };*/

  const clickEventListener = item => {
    console.log(item);
    navigation.navigate(item.route);
  };
  return (
    <>
      <Home route={state.data} navigation={navigation} />
      {/* <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {backgroundColor: item.color}]}
                onPress={() => {
                  clickEventListener(item);
                }}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Image style={styles.cardImage} source={{uri: item.image}} />
                <View style={styles.cardFooter}>
                  <Text style={styles.subTitle}>{item.options}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View>
        */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: '#FFFFFF',
  },
  icon: {
    height: 20,
    width: 20,
  },
});
