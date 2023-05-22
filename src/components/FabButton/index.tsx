import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserType } from '../../types/User';
import { useNavigation } from '@react-navigation/native';
import { RouteType } from '../../types/Route';

type Props = {
  setVisible: () => void;
  userStatus: UserType;
};

export function FabButton({ setVisible, userStatus }: Props) {
  const navigation = useNavigation<RouteType>();
  function handleNavigateButton() {
    userStatus ? setVisible() : navigation.navigate('SignIn');
  }

  return (
    <TouchableOpacity
      style={styles.containerButton}
      onPress={handleNavigateButton}>
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: '#2E54D4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '6%',
  },
  text: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
