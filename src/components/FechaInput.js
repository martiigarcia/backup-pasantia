import React, {useContext, useEffect, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import {Button, Stack} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FechaInput({doDate}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleConfirm = date => {
    if (open) {
      setOpen(false);
      setDate(date);
      doDate(date);
      console.log('HANDLE EN <FECHAINPUT>: ');
      console.log(moment(date).format('YYYY-MM-DD'));
    }
  };

  const handleCancel = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* <Button
        variant={'outlined'}
        style={styles.buttonDate}
        title="Seleccionar fecha"
        onPress={() => setOpen(true)}
        value={date}
      />
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        value={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          //setUser({...user, date});
          doDate(date);
          console.log(moment(date).format('YYYY-MM-DD'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
      <Button
        variant={'text'}
        style={styles.buttonDate}
        title="Seleccionar fecha"
        onPress={() => setOpen(true)}
        value={date}
      />
      <DatePicker
        title={'Seleccione una fecha'}
        modal
        open={open}
        date={date}
        mode="date"
        value={date}
        onConfirm={handleConfirm}
        confirmText={'Confirmar'}
        onCancel={handleCancel}
        cancelText={'Cancelar'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  view: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    // margin: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    padding: 10,
  },
  textInfo: {
    fontSize: 15,
    textAlign: 'left',
    padding: 10,
    color: '#DFA8F8',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
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
  buttonDate: {
    height: 50,
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
    // borderBottomWidth: 1,
    borderColor: 'gray',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
