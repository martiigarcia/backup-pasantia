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
import options from '../../contextOptions/NutricionistOptions';
const initialState = {options};

export default ({route, navigation}) => {
  const state = {
    data: [
      {
        id: 1,
        title: 'Mis planillas',
        color: '#87CEEB',
        options: 'Listar todas mis planillas registradas',
        image: 'https://img.icons8.com/?size=512&id=MNNoA9H61AWq&format=png',
        // image: 'https://img.icons8.com/office/512/groups.png',
        route: 'NutricionistList',
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
        id: 3,
        title: 'Alimentos',
        color: '#6A5ACD',
        options: 'Listado de comidas',
        image: 'https://img.icons8.com/?size=512&id=Y_obQE80MN9W&format=png',
        route: 'FoodsList',
        //https://img.icons8.com/color/70/000000/two-hearts.png',
      },
      {
        id: 3,
        title: 'Registrar alimento',
        color: '#FF69B4',
        options: 'Registrar nutriente y comida',
        // image: 'https://img.icons8.com/?size=512&id=QcMHDdo4nVYe&format=png',
        image: 'https://img.icons8.com/?size=512&id=U8uBDFKQd8-O&format=png',
        route: 'CreateAliment',
        //https://img.icons8.com/color/70/000000/two-hearts.png',
      },

      {
        id: 1,
        title: 'Mis datos',
        // color: '#FF4500',
        color: '#ff581a',
        options: 'Ver mis datos, modificar datos, cambiar contraseña',
        image: 'https://img.icons8.com/?size=512&id=2zQuuMM0XuM9&format=png',
        // image: 'https://img.icons8.com/office/512/user-menu-male--v1.png',
        route: 'Profile',
        // image: 'https://img.icons8.com/color/70/000000/name.png',
      },
    ],
  };

  useEffect(() => {
    console.log({options});
  }, []);

  return <Home route={state.data} navigation={navigation} />;
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
