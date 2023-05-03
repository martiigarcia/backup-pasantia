import React from 'react';
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

export default ({route, navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#b57af0',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View>
      <Text>Injuries Graphic Component</Text>

      <ScrollView horizontal={true}>
        <BarChart
          // style={graphStyle}
          data={data}
          width={screenWidth}
          // height={220}
          // width={300}
          height={500}
          // yAxisLabel="$"
          chartConfig={chartConfig}
          // verticalLabelRotation={30}
        />
      </ScrollView>
    </View>
  );
};
