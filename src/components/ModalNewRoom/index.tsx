import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  setVisible: () => void;
};

export function ModalNewRoom({ setVisible }: Props) {
  const [roomName, setRoomName] = useState('');

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Criar um novo grupo?</Text>
        <TextInput
          value={roomName}
          onChangeText={t => setRoomName(t)}
          placeholder="Nome para a sua sala?"
        />
        <TouchableOpacity style={styles.buttonCreate}>
          <Text style={styles.buttonText}>Criar sala</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34, 34, 34, 0.4)',
  },
  modal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  title: {
    marginTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
  input: {
    borderRadius: 4,
    height: 45,
    backgroundColor: '#DDD',
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  buttonCreate: {
    borderRadius: 4,
    backgroundColor: '#2E54D4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
