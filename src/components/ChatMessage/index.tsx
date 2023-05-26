import React, { useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View } from 'react-native';
import { MessagesType } from '../../types/Chat';
import { UserInfo } from '@firebase/auth-types';

type Props = {
  data: MessagesType & {
    user: UserInfo | any;
  };
};

export function ChatMessage({ data }: Props) {
  const user: UserInfo | any = auth().currentUser?.toJSON();
  console.log('user: ', user);

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user?.uid;
  }, [data]);

  console.log(data);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage ? '#dcf8c5' : '#ffff',
            marginLeft: isMyMessage ? 50 : 0,
            marginRight: isMyMessage ? 0 : 50,
          },
        ]}>
        {!isMyMessage && (
          <Text style={styles.name}>{data?.user?.displayName}</Text>
        )}
        <Text
          style={[
            styles.message,
            { fontWeight: data?.system === true ? 'bold' : 'normal' },
          ]}>
          {data.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  message: {},
  name: {
    color: '#F53745',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
