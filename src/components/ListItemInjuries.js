import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {ListItem} from '@rneui/themed';

export default ({injuryx}) => {
  const [injury, setInjury] = useState([]);
  useEffect(() => {
    setInjury(injuryx);
  }, []);
  /*lesiones: [
  {
    fecha_fin: null,
    fecha_inicio: '2022-09-23',
    id_lesion: '1',
    observaciones: 'Irrecuperable, amputen pierna',
    tipo: 'Desgarro',
    zona_tratada: 'Cuadricep Izquierdo',
  },
];*/
  return (
    <View>
      {injury.map((c, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {c.tipo} - {c.zona_tratada}
            </ListItem.Title>
            <ListItem.Subtitle>
              observaciones: {c.observaciones}{' '}
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              Fecha : {c.fecha_inicio} -{' '}
              {c.fecha_fin === null ? 'en curso...' : c.fecha_fin}{' '}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
