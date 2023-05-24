import React, {useState, useEffect} from 'react';
import {BarChart} from 'react-native-chart-kit';
import {Avatar, ListItem, Icon, Card} from '@rneui/themed';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import {Button, IconButton} from '@react-native-material/core';
import ShotProgressGraphicComponent from './ShotProgressGraphicComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../environments/environment';
import ShotPercentageGraphicComponent from './ShotPercentageGraphicComponent';

export default ({route, navigation}) => {
  const [ShotProgressList, setShotProgressList] = useState({
    ShotProgressList: [],
  });
  useEffect(() => {
    console.log('SHOT GRAPHIC');
    console.log(route);
    getShotProgressList();
  }, []);

  const getUserData = async () => {
    try {
      const MEMBER = await AsyncStorage.getItem('@MEMBER');
      const TOKEN = await AsyncStorage.getItem('@AUTH_TOKEN');
      const ID = await AsyncStorage.getItem('@ID_USER');
      const ROLE = await AsyncStorage.getItem('@ROL_USER');

      const data = {
        ROLE,
        MEMBER,
        TOKEN,
        ID,
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getShotProgressList = () => {
    getUserData()
      .then(data => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.TOKEN,
        };

        // const url =
        //   environment.baseURL +
        //   'kinesiologo/grafico-tratamientos/' +
        //   route.params.user.id_usuario +
        //   '/' +
        //   route.params.start +
        //   '/' +
        //   route.params.end;
        const url = route.params.url;
        console.log(url);
        console.log(route.params.url);

        // const body = {
        //   startDate: route.params.start,
        //   endDate: route.params.end,
        // };

        fetch(url, {
          headers,
        })
          .then(resp => resp.json())
          .then(json => {
            console.log(json);

            if (json.success) {
              const orderedList = json.graph.sort(
                (a, b) => new Date(a.date) - new Date(b.date),
              );
              setShotProgressList({ShotProgressList: orderedList});

              // setShotProgressList({ShotProgressList: json.graph});
            }

            // setLoading(false);
          })
          .catch(error => {
            console.log(error);
            // setLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color de las barras
        barPercentage: 0.5,
        label: 'Dato 1',
      },
      {
        data: [50, 28, 80, 99, 43, 20],
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // color de las barras
        barPercentage: 0.5,
        label: 'Dato 2',
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <>
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.view}>
              <Card>
                <Card.Title>Cantidad de lanzamientos realizados</Card.Title>
                <Card.Divider />
                {/* {console.log('IMCS: ')}
            {console.log(imcs.imcs)} */}
                <Button
                  title="Ver lista"
                  onPress={() => {
                    navigation.navigate('ShotProgressList', {
                      user: route.params.user,
                      url: route.params.url,
                      // start: route.params.start,
                      // end: route.params.end,
                      // UserRole: route.params.UserRole,
                    });
                  }}
                />
                <Card.Divider />
                <Card.Divider />

                {ShotProgressList.ShotProgressList.length !== 0 ? (
                  <>
                    <ShotProgressGraphicComponent
                      shotsList={ShotProgressList.ShotProgressList}
                    />
                    <Card.Divider />
                    <Card.Divider />

                    <ShotPercentageGraphicComponent
                      shotsList={ShotProgressList.ShotProgressList}
                    />
                    <Card.Divider />
                  </>
                ) : (
                  <>
                    <Text>
                      No existen planillas registradas para confeccionar un
                      grafico
                    </Text>
                  </>
                )}
                {/* 
              {imcs.imcs.length !== 0 && (
                <IMCGraphicComponent imcsX={imcs.imcs} />
              )} */}
              </Card>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  //   placeholderStyle: {
  //     fontSize: 16,
  //   },
  //   selectedTextStyle: {
  //     fontSize: 16,
  //   },
  //   iconStyle: {
  //     width: 20,
  //     height: 20,
  //   },
  //   inputSearchStyle: {
  //     height: 40,
  //     fontSize: 16,
  //   },
  //   title: {
  //     textAlign: 'center',
  //     marginVertical: 8,
  //   },
  //   view: {
  //     height: 50,
  //     flex: 1,
  //   },
  //   viewAdmin: {
  //     justifyContent: 'center',
  //     height: 550,
  //   },
  //   containerAdmin: {
  //     paddingBottom: StatusBar.currentHeight,
  //     marginBottom: StatusBar.currentHeight,
  //   },
  //   vertical: {
  //     display: 'flex',
  //     marginHorizontal: 5,
  //     flexDirection: 'row',
  //   },
  //   icon: {
  //     marginRight: 5,
  //   },
  //   fixToText: {
  //     // paddingTop: StatusBar.currentHeight,
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     // marginVertical: 10,
  //     marginBottom: 20,
  //     marginTop: 10,
  //   },
  //   separator: {
  //     paddingTop: StatusBar.currentHeight,
  //     marginVertical: 8,
  //     borderBottomColor: '#737373',
  //     borderBottomWidth: StyleSheet.hairlineWidth,
  //   },
  //   container: {
  //     flex: 1,
  //     // paddingTop: StatusBar.currentHeight,
  //   },
  //   scrollView: {
  //     paddingTop: StatusBar.currentHeight,
  //     marginHorizontal: 20,
  //   },
  //   input: {
  //     paddingTop: StatusBar.currentHeight,
  //   },
  //   button: {
  //     paddingTop: 10,
  //     paddingBottom: 10,
  //     justifyContent: 'center',
  //     alignItems: 'flex-end',
  //     paddingLeft: 5,
  //   },
  //   image: {
  //     flex: 1,
  //     justifyContent: 'center',
  //   },
  //   textNombre: {
  //     color: 'white',
  //     fontSize: 40,
  //     lineHeight: 84,
  //     fontWeight: 'bold',
  //     textAlign: 'center',
  //     backgroundColor: '#6409E6',
  //   },
  //   textTipoFicha: {
  //     marginTop: 10,
  //     textAlign: 'center',
  //   },
  //   textEmail: {
  //     textAlign: 'center',
  //   },
  //   textAutor: {
  //     fontSize: 18,
  //     textAlign: 'center',
  //   },
  //   text: {
  //     textAlign: 'center',
  //     marginBottom: 10,
  //   },
  //   dropdown: {
  //     height: 50,
  //     width: 210,
  //     borderBottomWidth: 1,
  //     borderColor: 'gray',
  //     margin: 10,
  //     marginBottom: 10,
  //     paddingLeft: 10,
  //     // padding: 5,
  //   },
  //   viewButton: {
  //     paddingTop: StatusBar.currentHeight,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
});
