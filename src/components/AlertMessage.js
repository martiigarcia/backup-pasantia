import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

export default function AlertMessage({open}) {
  const [showAlert, setShowAlert] = useState(open);

  useEffect(() => {
    console.log('useEffect: ' + open);
    console.log(showAlert);
    setAlert();
  }, [open]);

  setAlert = () => {
    setShowAlert(open);
  };

  showAlertVisible = () => {
    setShowAlert(true);
  };

  hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <View style={styles.container}>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
