import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {FlatList} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {TouchableOpacity, Image, ScrollView} from 'react-native';

export default ({route, navigation}) => {
  const [user, setUser] = useState({user: {}});
  const [loading, setLoading] = useState(true);

  const state = {
    data: [
      {
        id: 1,
        title: 'Actualizar datos',
        color: '#58D68D',
        image: 'https://img.icons8.com/offices/512/change-user-female.png',
        route: 'Profile',
        // image: 'https://img.icons8.com/color/70/000000/name.png',
      },
      {
        id: 1,
        title: 'Cambiar contraseña',
        color: '#C39BD3',
        image: 'https://img.icons8.com/office/512/forgot-password.png',
        route: 'ChangePassword',
        // image: 'https://img.icons8.com/office/70/000000/home-page.png',
      },
    ],
  };

  useEffect(() => {
    getProfile();
    console.log(user);
  }, []);

  const getMemberToken = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');

      return MEMBER;
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = () => {
    setLoading(true);
    let valorToken;

    getMemberToken()
      .then(user => {
        const headers = {
          //userID: user,
          //Authorization: 'Bearer ' + token,
        };
        //  console.log('USER:     ' + user);
        const userID = JSON.parse(user);
        //  console.log(userID.nombre);
        const url =
          'http://localhost:8080/back/public/profile/view/' +
          +userID.id_usuario +
          '/' +
          userID.id_usuario;
        // console.log(url);

        fetch(url)
          .then(resp => resp.json())
          .then(json => {
            console.log(json);

            if (json.success) {
              setUser({
                user: json.user,
              });
            } else {
              Alert.error('Error', json.message);
            }

            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const clickEventListener = item => {
    // console.log(item);
    navigation.navigate(item.route);
  };

  return (
    <>
      <View>
        <Card>
          <Card.Title style={styles.titleCard}>Mi perfil</Card.Title>
          <Card.Divider />
          <ListItem key={user.user.id_usuario} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.text}>
                Nombre:{' '}
                <ListItem.Subtitle style={styles.data}>
                  {user.user.nombre}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Title style={styles.text}>
                Apellido:{' '}
                <ListItem.Subtitle style={styles.data}>
                  {user.user.apellido}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Title style={styles.text}>
                Fecha de nacimiento:{' '}
                <ListItem.Subtitle style={styles.data}>
                  {user.user.fecha_nacimiento}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Title style={styles.text}>
                Rol en el sistema:{' '}
                <ListItem.Subtitle style={styles.data}>
                  {user.user.rol}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Title style={styles.text}>
                Mi estado actual es:{' '}
                <ListItem.Subtitle style={styles.data}>
                  {user.user.estado}
                </ListItem.Subtitle>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>

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
                  <View style={styles.cardFooter}></View>
                </TouchableOpacity>
              );
            }}
          />
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: 10,
  },
  data: {
    fontSize: 15,
    textAlign: 'left',
    padding: 10,
  },
  titleCard: {
    fontSize: 20,
  },
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
