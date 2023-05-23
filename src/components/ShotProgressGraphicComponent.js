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

// const data = {
//   graph: [
//     {
//       shots: '50',
//       scored: '0',
//       date: '2022-02-15',
//     },
//     {
//       shots: '50',
//       scored: '27',
//       date: '2022-02-16',
//     },
//     {
//       shots: '40',
//       scored: '18',
//       date: '2022-02-17',
//     },
//     {
//       shots: '60',
//       scored: '36',
//       date: '2022-02-18',
//     },
//     {
//       shots: '55',
//       scored: '29',
//       date: '2022-02-19',
//     },
//   ],
// };

export default ({shotsList}) => {
  const [shotsData, setShotsData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const desiredWidth =
    shotsList.length > 4 ? 100 * shotsList.length : screenWidth;

  useEffect(() => {
    console.log('SHOT GRAPHIC COMPONENT:');
    console.log(screenWidth);
    console.log(desiredWidth);
    // console.log(shotsList);
    // setShotsData(shotsList);
  }, []);

  // const processedData = shotsList.map(({shots, scored, date}) => {
  //   const shotsNum = parseInt(shots);
  //   const scoredNum = parseInt(scored);
  //   const average = (shotsNum > 0 ? scoredNum / shotsNum : 0) * 100; // Calcula el promedio si se han hecho tiros
  //   const prom = average % 1 === 0 ? average : Math.round(average); // Redondea el promedio si tiene decimales
  //   console.log(prom);
  //   return {
  //     x: date,
  //     y: [shotsNum, scoredNum],
  //     prom, // Agrega el promedio al objeto resultante
  //   };
  // });

  const processedData =
    shotsList.length > 0
      ? shotsList.map(({shots, scored, date}) => {
          const shotsNum = parseInt(shots);
          const scoredNum = parseInt(scored);
          const average = (shotsNum > 0 ? scoredNum / shotsNum : 0) * 100; // Calcula el promedio si se han hecho tiros
          const prom = average % 1 === 0 ? average : Math.round(average); // Redondea el promedio si tiene decimales
          console.log(prom);
          console.log(date);
          return {
            x: date,
            y: [shotsNum, scoredNum],
            prom, // Agrega el promedio al objeto resultante
          };
        })
      : // .sort((a, b) => a.x - b.x)
        [];

  return (
    <>
      <View>
        <View>
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
              width={processedData.length > 1 ? desiredWidth : 300}
              height={500}
              theme={VictoryTheme.material}>
              <VictoryAxis
                key={0}
                crossAxis
                tickFormat={date =>
                  new Date(date).toLocaleDateString('es-ES', {
                    month: 'numeric',
                    day: 'numeric',
                    year: processedData.length === 1 ? 'numeric' : undefined,
                  })
                }
              />
              <VictoryAxis
                key={1}
                dependentAxis // Eje Y
                tickFormat={t => `${t}`} // Formato de los valores en el eje Y
              />

              <VictoryGroup
                offset={25} // Espacio entre las dos barras de cada fecha
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

          {/* <ScrollView horizontal={true}>
            <View style={{marginTop: 20}}>
              <VictoryChart
                style={{marginTop: 20}}
                width={desiredWidth}
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
            </View>
          </ScrollView> */}
        </View>
      </View>
    </>
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
