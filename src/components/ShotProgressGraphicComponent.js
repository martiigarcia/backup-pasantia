import React from 'react';
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

const data = {
  graph: [
    {
      shots: '50',
      scored: '0',
      date: '2022-02-15',
    },
    {
      shots: '50',
      scored: '27',
      date: '2022-02-16',
    },
    {
      shots: '40',
      scored: '18',
      date: '2022-02-17',
    },
    {
      shots: '60',
      scored: '36',
      date: '2022-02-18',
    },
    {
      shots: '55',
      scored: '29',
      date: '2022-02-19',
    },
  ],
};

export default ({route, navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  // const processedData = data.graph.map(({shots, scored, date}) => ({
  //   x: date,
  //   y: [parseInt(shots), parseInt(scored)],
  // }));

  const processedData = data.graph.map(({shots, scored, date}) => {
    const shotsNum = parseInt(shots);
    const scoredNum = parseInt(scored);
    const average = (shotsNum > 0 ? scoredNum / shotsNum : 0) * 100; // Calcula el promedio si se han hecho tiros
    const prom = average % 1 === 0 ? average : Math.round(average); // Redondea el promedio si tiene decimales
    console.log(prom);
    return {
      x: date,
      y: [shotsNum, scoredNum],
      prom, // Agrega el promedio al objeto resultante
    };
  });

  const data1 = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };

  const data2 = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [50, 28, 80, 99, 43, 20],
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`,
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
    <View>
      <View>
        {/* <ScrollView horizontal={true}>
          <BarChart
            data={data1}
            width={300}
            height={220}
            chartConfig={chartConfig}
          />
          <BarChart
            data={data2}
            width={300}
            height={220}
            chartConfig={chartConfig}
          />
        </ScrollView> */}
        {/* <ScrollView horizontal={true}>
          <VictoryChart>
            <VictoryGroup offset={20} colorScale={'qualitative'}>
              <VictoryBar
                data={[
                  {x: 1, y: 1},
                  {x: 2, y: 2},
                  {x: 3, y: 5},
                ]}
              />
              <VictoryBar
                data={[
                  {x: 1, y: 2},
                  {x: 2, y: 1},
                  {x: 3, y: 7},
                ]}
              />
              <VictoryBar
                data={[
                  {x: 1, y: 3},
                  {x: 2, y: 4},
                  {x: 3, y: 9},
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
        </ScrollView> */}

        <Text style={{textAlign: 'center', fontSize: 20}}>
          <Text style={{color: '#FF69B4', fontSize: 18}}>
            {'\u2501'}
            {'\u2501'}
            {'\u2501'}{' '}
          </Text>
          Tiros hechos{' '}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          <Text style={{color: '#6A5ACD', fontSize: 18}}>
            {'\u2501'}
            {'\u2501'}
            {'\u2501'}{' '}
          </Text>
          Tiros acertados{' '}
        </Text>

        <ScrollView horizontal={true}>
          <VictoryChart
            domainPadding={{x: 50}}
            width={screenWidth}
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
              offset={18} // Espacio entre las dos barras de cada fecha
              // colorScale={['#FF69B4', '#c62828', '#6A5ACD']} // Colores de las barras
              colorScale={['#FF69B4', '#6A5ACD']} // Colores de las barras
              // labels={({datum}) => `${datum.y[0]} tiros, ${datum.y[1]} goles`} // Texto de las etiquetas en cada barra
              // labelComponent={
              //   <VictoryLabel angle={-90} textAnchor="start" dy={-5} />
              // } // Estilo de las etiquetas
            >
              <VictoryBar // Barra de tiros
                data={processedData}
                x="x"
                y={d => d.y[0]}
                labels={({datum}) => datum.y[0]}
                style={{data: {strokeWidth: 2}}}
              />
              {/* <VictoryBar // Barra de tiros
                data={processedData}
                x="x"
                y={d => d.y[0]}
                // labels={({datum}) => datum.y[0]}
              /> */}
              {/* <VictoryBar // Línea de promedio
                data={processedData}
                x="x"
                y="prom"
                style={{data: {strokeWidth: 2}}}
                // y={'prom'}
                // style={{data: {stroke: 'red', strokeWidth: 2}}}
              /> */}
              <VictoryBar // Barra de goles
                data={processedData}
                x="x"
                y={d => d.y[1]}
                labels={({datum}) => datum.y[1]}
                style={{data: {strokeWidth: 2}}}
              />
            </VictoryGroup>
          </VictoryChart>
        </ScrollView>
        <Card.Divider />

        <Card.Divider />

        <Text style={{textAlign: 'center', fontSize: 20}}>
          <Text style={{color: '#c62828', fontSize: 18}}>
            {'\u2501'}
            {'\u2501'}
            {'\u2501'}{' '}
          </Text>
          Promedio (acertados/hechos)
        </Text>
        <ScrollView horizontal={true}>
          <VictoryChart
            width={screenWidth}
            height={500}
            domainPadding={{x: 20}}
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
              dependentAxis
              domain={{y: [0, 100]}}
              tickFormat={t => t + '%'}
            />
            <VictoryGroup offset={10}>
              <VictoryLine // Línea de promedio
                data={processedData}
                x="x"
                y="prom"
                labels={({datum}) => datum.prom + '%'}
                style={{data: {stroke: '#c62828', strokeWidth: 2}}}
              />
            </VictoryGroup>
          </VictoryChart>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  view: {
    height: 50,
    flex: 1,
  },
  viewAdmin: {
    justifyContent: 'center',
    height: 550,
  },
  containerAdmin: {
    paddingBottom: StatusBar.currentHeight,
    marginBottom: StatusBar.currentHeight,
  },
  vertical: {
    display: 'flex',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  fixToText: {
    // paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  separator: {
    paddingTop: StatusBar.currentHeight,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
  input: {
    paddingTop: StatusBar.currentHeight,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textNombre: {
    color: 'white',
    fontSize: 40,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#6409E6',
  },
  textTipoFicha: {
    marginTop: 10,
    textAlign: 'center',
  },
  textEmail: {
    textAlign: 'center',
  },
  textAutor: {
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    width: 210,
    borderBottomWidth: 1,
    borderColor: 'gray',
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    // padding: 5,
  },
  viewButton: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
