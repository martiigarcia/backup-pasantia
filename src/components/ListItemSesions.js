import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {ListItem} from '@rneui/themed';

export default ({sesionx}) => {
  const [sesion, setSesion] = useState([]);
  useEffect(() => {
    setSesion(sesionx);
  }, []);

  /*
 sesiones:
 LOG  [{
  "fecha": "2022-09-06", 
  "id_sesion": "4", 
  "objetivo": "Liberar espalda baja", 
  "tipo_actividad": "Masaje", 
  "zona_tratada": "Espalda Baja"
}]
  */

  return (
    <View>
      {sesion.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{c.objetivo}</ListItem.Title>
            <ListItem.Subtitle>Zona: {c.zona_tratada} </ListItem.Subtitle>
            <ListItem.Subtitle>
              Actividad realizada: {c.tipo_actividad}{' '}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
