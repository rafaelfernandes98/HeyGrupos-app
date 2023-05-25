import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserType } from '../../types/User';

type Props = {
  setVisible: () => void;
  setUpdateScreen: () => void;
};

declare function alert(message?: any): void;

export function ModalNewRoom({ setVisible, setUpdateScreen }: Props) {
  const [roomName, setRoomName] = useState('');

  const user: UserType = auth().currentUser?.toJSON();

  function handleButtonCreate() {
    if (roomName === '') {
      return;
    }

    firestore()
      .collection('MESSAGE_THREADS')
      .get()
      .then(snapshot => {
        let mythreads = 0;
        snapshot.docs.map(docItem => {
          if (docItem.data().owner === user.uid) {
            mythreads += 1;
          }
        });

        if (mythreads >= 4) {
          alert('Você já atigiu o limite de grupos!');
        } else {
          createRoom();
        }
      });
  }

  function createRoom() {
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado, Bem vindo(a)!`,
          created_at: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(docRef => {
        docRef
          .collection('MESSAGES')
          .add({
            text: `Grupo ${roomName} criado, Bem vindo(a)!`,
            created_at: firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setVisible();
            setUpdateScreen();
          });
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }
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
        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={handleButtonCreate}>
          <Text style={styles.buttonText}>Criar sala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={setVisible}>
          <Text style={styles.backButtonText}>Voltar</Text>
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
  backButton: {
    marginTop: 10,
    height: 45,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2E54D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2E54D4',
  },
});
