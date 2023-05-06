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
  Dimensions,
} from 'react-native';
import {Avatar, ListItem, Icon, Card} from '@rneui/themed';

import {Button, IconButton} from '@react-native-material/core';
import {mdiAccountDetails} from '@mdi/js';
import {mdiInformationVariantCircleOutline} from '@mdi/js';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../environments/environment';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

export default ({imcsX}) => {
  const [imc, setImc] = useState([]);

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#1E2923', //blanco de abajo
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: '#b57af0', //parte de arriba: violeta/lila
    // backgroundGradientTo: '#e1c9f9', //parte de arriba: violeta/lila
    backgroundGradientTo: '#ffffff', //parte de arriba: violeta/lila
    backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => `rgba(0,	0,	0, ${opacity})`,
    // color: (opacity = 1) => `rgba(181,	122,	240, ${opacity})`, //color sombreadod de la curva
    color: (opacity = 1) => `rgba(143,	53,	232, ${opacity})`, //color sombreadod de la curva
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      stroke: 'gray',
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#8641f4',
    },
  };

  const data = {
    labels: imc.map(i => i.month),
    datasets: [
      {
        data: imc.map(i => i.imc),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['IMC'], // optional
  };

  useEffect(() => {
    console.log(imcsX);
    // setImc(imcsX);
    const parsedImcs = imcsX.map(item => ({
      ...item,
      imc: parseFloat(item.imc),
    }));
    console.log(parsedImcs);
    setImc(parsedImcs);
  }, []);

  return (
    <>
      {console.log(data)}
      {console.log(data.datasets)}
      {imc.length !== 0 && (
        <>
          <ScrollView horizontal={true}>
            <LineChart
              data={data}
              width={screenWidth}
              height={500}
              bezier
              chartConfig={chartConfig}
              // chartConfig={{
              //   ...chartConfig,
              //   yLabelsOffset: -10, // ajusta la posición vertical de las etiquetas del eje y
              //   xLabelsOffset: 10, // ajusta la posición horizontal de las etiquetas del eje x
              // }}
              // contentInset={{left: 50, right: 50, top: 0, bottom: 0}}
            />
          </ScrollView>
        </>
      )}
    </>
  );
};
