import React, {useState, useEffect} from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {Avatar, Button, ListItem, Icon} from '@rneui/themed';
import {mdiEyeOutline} from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemSeparator from '../components/ItemSeparator';
import {Card} from '@rneui/themed';

export default props => {
  const [roles, setRoles] = useState({roles: []});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({errors: []});

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = () => {
    setLoading(true);
    fetch('http://localhost:8080/back/public/auth/roles')
      .then(resp => resp.json())
      .then(json => {
        setRoles({
          roles: json.roles,
        });
        setLoading(false);
      });
  };

  function getRoleItem({item: role}) {
    return (
      <>
        <ListItem key={role.id_rol} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {role.id_rol} - {role.nombre}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <Card>
        <FlatList
          keyExtractor={role => role.id_rol.toString()}
          data={roles.roles}
          renderItem={getRoleItem}
          ListHeaderComponent={() => <Card.Title>Lista de roles</Card.Title>}
        />
      </Card>
    </>
  );
};
