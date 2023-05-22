import React, {useEffect, useState} from 'react';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import {Avatar, ListItem, Icon, Card} from '@rneui/themed';

export default ({strengthList}) => {
  const screenWidth = Dimensions.get('window').width;
  const desiredWidth = 100 * strengthList.length;

  useEffect(() => {
    console.log('STRENGTH GRAPHIC COMPONENT:');
    console.log(strengthList);
  }, []);

  const processedData =
    strengthList.length > 0
      ? strengthList.map(({peso, fecha}) => {
          const pesoNum = parseInt(peso);
          return {
            x: fecha,
            y: pesoNum,
          };
        })
      : [];

  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 20}}>
        <Text style={{color: '#8f35e8', fontSize: 18}}>
          {'\u2501'}
          {'\u2501'}
          {'\u2501'}{' '}
        </Text>
        Peso
      </Text>
      {console.log(processedData)}
      <ScrollView horizontal={true}>
        <VictoryChart
          domainPadding={{x: 50}}
          width={desiredWidth}
          height={500}
          theme={VictoryTheme.material}>
          <VictoryAxis
            crossAxis
            tickFormat={date =>
              new Date(date).toLocaleDateString('es-ES', {
                month: 'numeric',
                day: 'numeric',
              })
            }
          />
          <VictoryAxis
            dependentAxis // Eje Y
            tickFormat={t => `${t}`} // Formato de los valores en el eje Y
          />

          <VictoryGroup
            offset={10} // Espacio entre las dos barras de cada fecha
            colorScale={['rgba(143,	53,	232, 0.5)']} // Colores de las barras
          >
            <VictoryBar // Barra de fuerza
              data={processedData}
              x="x"
              y="y"
              labels={({datum}) => datum.y}
              //   style={{data: {strokeWidth: 2}}}
            />
          </VictoryGroup>
        </VictoryChart>
      </ScrollView>
    </View>
  );
};
