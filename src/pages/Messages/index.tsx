import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackParamList } from '../../types/Route';
import { RouteProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserMessages } from '../../types/Chat';
import { ChatMessage } from '../../components/ChatMessage';
import Feather from 'react-native-vector-icons/Feather';
import { UserInfo } from '@firebase/auth-types';

type Props = {
  route?: RouteProp<StackParamList, 'Messages'>;
};

export function Messages({ route }: Props): JSX.Element {
  const thread = route?.params.thread;

  const [input, setInput] = useState('');
  const user: UserInfo | any = auth().currentUser?.toJSON();

  const [messagesState, setMessagesState] = useState<Array<UserMessages> | any>(
    [],
  );

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread?._id)
      .collection('MESSAGES')
      .orderBy('created_at', 'desc')
      .onSnapshot(querySnapshot => {
        const messagesQuery = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          let userData;
          let fullData;
          let data = {
            _id: doc.id,
            text: '',
            created_at: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            userData = {
              ...firebaseData,
              name: firebaseData.user.displayName,
            };
          }

          if (userData) {
            fullData = { ...userData, ...data };
          } else {
            fullData = { ...data };
          }

          return fullData;
        });

        setMessagesState(messagesQuery);
      });

    return () => unsubscribeListener();
  }, []);

  async function handleSend() {
    if (input === '') {
      return;
    } else {
      await firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread?._id)
        .collection('MESSAGES')
        .add({
          text: input,
          created_at: firestore.FieldValue.serverTimestamp(),
          user: {
            _id: user.uid,
            displayName: user.displayName,
          },
        });

      await firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread?._id)
        .set(
          {
            lastMessage: {
              text: input,
              created_at: firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true },
        );

      setInput('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={messagesState}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ChatMessage data={item} />}
        inverted={true}
      />
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%' }}
        keyboardVerticalOffset={100}>
        <View style={styles.containerInput}>
          <View style={styles.mainContainerInput}>
            <TextInput
              placeholder="Sua mensagem..."
              style={styles.textInput}
              value={input}
              onChangeText={text => setInput(text)}
              multiline={true}
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity onPress={handleSend}>
            <View style={styles.buttonContainer}>
              <Feather name="send" size={22} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 130,
    minHeight: 48,
  },
  buttonContainer: {
    backgroundColor: '#51c880',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
