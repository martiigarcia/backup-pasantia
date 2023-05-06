import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default ({injuries}) => {
  const [injuriesList, setInjuriesList] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: injuriesList.map(i => i.zone),
    datasets: [
      {
        data: injuriesList.map(i => i.count),
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923', //blanco de abajo
    backgroundGradientFromOpacity: 0,

    backgroundGradientTo: '#ffffff', //parte de arriba: violeta/lila
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(143,	53,	232, 1)`, //color sombreadod de la curva
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    strokeWidth: 2, // optional, default 3

    propsForBackgroundLines: {
      stroke: 'gray',
    },
  };

  useEffect(() => {
    console.log('GRAPHIC COMPONENT');
    // console.log(injuries);

    const parsedInjuriesList = injuries.map(item => ({
      ...item,
      date: new Date(item.date),
      count: parseInt(item.count),
    }));
    console.log(parsedInjuriesList);
    setInjuriesList(parsedInjuriesList);
  }, []);
  return (
    <View>
      {injuriesList.length !== 0 && (
        <>
          {/* <Text style={{textAlign: 'center', fontSize: 20}}>
            <Text style={{color: '#8f35e8', fontSize: 20}}>---- </Text> Cantidad{' '}
          </Text> */}
          <Text style={{textAlign: 'center', fontSize: 20}}>
            <Text style={{color: '#8f35e8', fontSize: 18}}>
              {'\u2501'}
              {'\u2501'}
              {'\u2501'}{' '}
            </Text>
            Cantidad{' '}
          </Text>

          <ScrollView horizontal={true}>
            <BarChart
              style={{marginTop: 20}}
              // style={graphStyle}
              data={data}
              width={screenWidth}
              height={500}
              fromZero
              showBarTops
              showValuesOnTopOfBars
              // yAxisLabel="$"
              chartConfig={chartConfig}
              // verticalLabelRotation={30}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};
