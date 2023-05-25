import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StackParamList } from '../../types/Route';
import { RouteProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
import { UserMessages } from '../../types/Chat';

type Props = {
  route?: RouteProp<StackParamList, 'Messages'>;
};

export function Messages({ route }: Props): JSX.Element {
  const thread = route?.params.thread;

  const [messagesState, setMessagesState] = useState<Array<UserMessages> | any>(
    [],
  );
  // const user = auth().currentUser?.toJSON();

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

  return (
    <>
      <Text>Tela Message{thread?.name}</Text>
    </>
  );
}
