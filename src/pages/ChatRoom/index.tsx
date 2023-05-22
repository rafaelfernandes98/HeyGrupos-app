import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FabButton } from '../../components/FabButton';
import { ModalNewRoom } from '../../components/ModalNewRoom';
import { UserType } from '../../types/User';
import { RouteType } from '../../types/Route';

export function ChatRoom(): JSX.Element {
  const navigation = useNavigation<RouteType>();
  const isFocused = useIsFocused();

  const [user, setUser] = useState<UserType>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const hasUser: UserType = auth().currentUser
      ? auth().currentUser?.toJSON()
      : null;
    setUser(hasUser);
  }, [isFocused]);

  function handleLogout() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
      .catch(() => {});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          {user && (
            <TouchableOpacity onPress={handleLogout}>
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Grupos</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalNewRoom setVisible={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2E54D4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 10,
  },
});
