import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Avatar, ListItem, Icon, Card} from '@rneui/themed';

import {Button, IconButton} from '@react-native-material/core';
import {mdiAccountDetails} from '@mdi/js';
import {mdiInformationVariantCircleOutline} from '@mdi/js';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../../environments/environment';
import InjuriesGraphicComponent from '../../../components/InjuriesGraphicComponent';

export default ({route, navigation}) => {
  useEffect(() => {
    console.log('INJURIES LIST');
    console.log(route);
    // getInjuriesList();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view}>
            <Card>
              <Card.Title>Cantidad de lesiones por período</Card.Title>
              <Card.Divider />
              {/* {console.log('IMCS: ')}
            {console.log(imcs.imcs)} */}
              <Button
                title="Ver como lista"
                onPress={() => {
                  navigation.navigate('InjuriesList', {
                    user: route.params.user,
                    start: route.params.start,
                    end: route.params.end,
                    UserRole: route.params.UserRole,
                  });
                }}
              />
              <Card.Divider />
              <Text>ACA VA UN GRAFICO (poner valores reales)</Text>
              <InjuriesGraphicComponent />
              {/* 
              {imcs.imcs.length !== 0 && (
                <IMCGraphicComponent imcsX={imcs.imcs} />
              )} */}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  view: {},
});
