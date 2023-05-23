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

export default ({shotsList}) => {
  const [shotsData, setShotsData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const desiredWidth =
    shotsList.length > 4 ? 100 * shotsList.length : screenWidth;

  useEffect(() => {
    console.log('SHOT PERCENTAGE GRAPHIC COMPONENT:');
    console.log(screenWidth);
    console.log(desiredWidth);
    console.log(shotsList);
    console.log(shotsList.length);
    // setShotsData(shotsList);
  }, []);

  const processedData = shotsList.map(({shots, scored, date}) => {
    const shotsNum = parseInt(shots);
    const scoredNum = parseInt(scored);
    const average = (shotsNum > 0 ? scoredNum / shotsNum : 0) * 100; // Calcula el promedio si se han hecho tiros
    const prom = average % 1 === 0 ? average : Math.round(average); // Redondea el promedio si tiene decimales
    console.log(prom);
    console.log(date);
    return {
      x: date,
      // x: new Date(date),
      y: [shotsNum, scoredNum],
      prom, // Agrega el promedio al objeto resultante
    };
  });

  // Calcula el rango máximo y mínimo de los valores `prom` en `processedData`

  const promValues = processedData.map(data => data.prom);
  const promMin = parseFloat(Math.min(...promValues));
  const promMax = parseFloat(Math.max(...promValues));

  //   // Obtener la fecha del primer elemento de processedData
  //   const firstDate = new Date(processedData[0].x);

  //   // Restar un día a la fecha del primer elemento
  //   const previousDate = new Date(firstDate);
  //   previousDate.setDate(previousDate.getDate() - 1);

  //   // Crear additionalData con la fecha anterior y otros valores deseados
  //   const additionalData = {
  //     x: previousDate.toISOString().slice(0, 10), // Convertir la fecha a formato ISO (YYYY-MM-DD)
  //     y: [50, 40],
  //     prom: 80,
  //   };

  // Agregar additionalData al inicio del arreglo processedData
  //   processedData.unshift(additionalData);

  return (
    <>
      <View>
        <View>
          {processedData.length === 1 ? (
            <>
              <Text style={{textAlign: 'center', fontSize: 20}}>
                El unico promedio registrado{'\n'} (acertados/hechos)
              </Text>
            </>
          ) : (
            <>
              <Text style={{textAlign: 'center', fontSize: 20}}>
                <Text style={{color: '#c62828', fontSize: 18}}>
                  {'\u2501'}
                  {'\u2501'}
                  {'\u2501'}{' '}
                </Text>
                Promedio (acertados/hechos)
              </Text>
            </>
          )}
          {console.log(processedData)}
          <ScrollView horizontal={true}>
            {processedData.length === 1 ? (
              <>
                <VictoryChart
                  domainPadding={{x: 50}}
                  width={300}
                  height={300}
                  theme={VictoryTheme.material}>
                  <VictoryAxis
                    crossAxis //Eje x
                    tickFormat={date =>
                      new Date(date).toLocaleDateString('es-ES', {
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    }
                  />
                  <VictoryAxis
                    dependentAxis // Vertical axis
                    domain={{y: [0, 100]}} // Adjust the domain according to your data range
                    tickValues={[processedData[0].prom]} // Specify the tick values you want to display
                    tickFormat={t => `${t}%`} // Format the tick labels with a percentage symbol
                  />
                  <VictoryScatter
                    data={processedData.map(({x, prom}) => ({x, y: prom}))}
                    size={7}
                    style={{labels: {fill: 'gray', fontSize: 18}}}
                    labels={({datum}) => `${datum.y}%`}
                  />
                </VictoryChart>
              </>
            ) : (
              <>
                <View style={{marginTop: 20}}>
                  <VictoryChart
                    domainPadding={{x: 50}}
                    width={desiredWidth}
                    height={500}
                    theme={VictoryTheme.material}>
                    <VictoryAxis
                      crossAxis //Eje x
                      tickFormat={date =>
                        new Date(date).toLocaleDateString('es-ES', {
                          month: 'numeric',
                          day: 'numeric',
                        })
                      }
                    />
                    <VictoryAxis
                      dependentAxis // Eje Y
                      domain={{y: [0, 105]}}
                      tickFormat={t => `${t}%`} // Formato de los valores en el eje Y
                    />
                    <VictoryGroup offset={10}>
                      <VictoryLine // Línea de promedio
                        data={processedData}
                        x="x"
                        y="prom"
                        labels={({datum}) => `${datum.prom}%`}
                        style={{data: {stroke: '#c62828', strokeWidth: 2}}}
                      />
                    </VictoryGroup>
                  </VictoryChart>
                </View>
              </>
            )}
          </ScrollView>
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
