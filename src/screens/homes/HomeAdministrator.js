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
// import options from '../../contextOptions/AdministratorOptions';

// const initialState = {options};
// const OptionsContext = createContext({});
// export const RolesProvider = props => {

//     function reducer(state, action){
//         const fn = actions[action.type]
//         return fn ? fn(state, action): state
//     }

//     const [state, dispatch] = useReducer(reducer, initialState)

//     return (
//         <OptionsContext.Provider
//             value={{
//                 state, dispatch
//             }}>
//             {props.children}
//         </OptionsContext.Provider>
//     )
// }

// export default OptionsContext;

export default ({route, navigation}) => {
  const state = {
    data: [
      {
        id: 1,
        title: 'Usuarios',
        color: '#87CEEB',
        options: 'Listar usuarios y opciones',
        image: 'https://img.icons8.com/office/512/groups.png',
        route: 'UsersList',
        // image: 'https://img.icons8.com/office/70/000000/home-page.png',
      },
      {
        id: 2,
        title: 'Registrar nuevo usuario',
        color: '#4682B4',
        options: 'Registrar nuevo usuario',
        image: 'https://img.icons8.com/officel/512/add-user-male.png',
        route: 'UserForm',
        //https://img.icons8.com/color/70/000000/two-hearts.png',
      },
      {
        id: 3,
        title: 'Todas las planillas',
        color: '#6A5ACD',
        options: 'Ver todas las planillas registradas por profesional',
        image: 'https://img.icons8.com/office/512/report-card.png',
        route: 'SportsmanList',
        //image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        //image: 'https://img.icons8.com/color/70/000000/family.png',
      },
      {
        id: 4,
        title: 'Roles del sistema',
        color: '#FF69B4',
        options: 'Ver roles del sistema',
        image: 'https://img.icons8.com/office/512/user-shield.png',
        route: 'RolesList',
        //image: 'https://img.icons8.com/color/70/000000/groups.png',
      },
      {
        id: 1,
        title: 'Mis datos',
        color: '#ff581a',
        // color: '#E74C3C',
        options: 'Ver mis datos, modificar datos, cambiar contraseña',
        image: 'https://img.icons8.com/?size=512&id=2zQuuMM0XuM9&format=png',
        route: 'Profile',
        // image: 'https://img.icons8.com/color/70/000000/name.png',
      },
      // {
      //   id: 5,
      //   title: 'Templates prueba',
      //   color: '#00BFFF',
      //   options: 'Ver todas las planillas del sistema',
      //   image: 'https://img.icons8.com/office/512/report-card.png',
      //   route: 'AllTemplates',
      // },
      /* {
          id: 6,
          title: 'Things',
          color: '#00FFFF',
          members: 8,
          image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        },
        {
          id: 8,
          title: 'World',
          color: '#20B2AA',
          members: 23,
          image: 'https://img.icons8.com/dusk/70/000000/globe-earth.png',
        },
        {
          id: 9,
          title: 'Remember',
          color: '#191970',
          members: 45,
          image: 'https://img.icons8.com/color/70/000000/to-do.png',
        },
        {
          id: 9,
          title: 'Game',
          color: '#008080',
          members: 13,
          image: 'https://img.icons8.com/color/70/000000/basketball.png',
        },*/
      ,
    ],
  };

  useEffect(() => {
    // console.log(initialState);
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
