import React, {useState, useEffect} from 'react';
import IMCGraphicComponent from '../../../components/IMCGraphicComponent';
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

export default ({route, navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Card>
            <Card.Title>IMC por mes</Card.Title>
            <Card.Divider />
            <Button
              title="Ver como lista"
              onPress={() => {
                navigation.navigate('MyIMC');
              }}
            />
            <Card.Divider />
            <Text>IMCGraphic</Text>
            <IMCGraphicComponent />
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  view: {},
});
