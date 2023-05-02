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

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    // backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const labels = imc.map(i => i.month);
  const dataValues = imc.map(i => Number(i.imc));

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
          <LineChart
            data={data}
            width={300}
            height={500}
            bezier
            chartConfig={chartConfig}
          />
        </>
      )}
    </>
  );
};
