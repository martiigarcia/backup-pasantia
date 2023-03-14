import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {ListItem} from '@rneui/themed';

export default ({throws}) => {
  const [basketballThrows, setBasketballThrows] = useState([]);
  useEffect(() => {
    setBasketballThrows(throws);
  }, []);
  /*
  "lanzamientos": [
      {
        "id_lanzamientos": "1", 
        "id_planilla_entrenador": "1", 
        "tiros_convertidos": "2", 
        "tiros_lanzados": "500"
      }
  */
  return (
    <View>
      {basketballThrows.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              TIROS CONVERTIDOS: {c.tiros_convertidos}
            </ListItem.Title>
            <ListItem.Subtitle>
              TIROS TOTALES LANZADOS: {c.tiros_lanzados}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
