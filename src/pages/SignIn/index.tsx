import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignIn(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false);

  const navigation = useNavigation();

  function handleLogin() {
    if (type) {
      if (name === '' || email === '' || password === '') {
        return;
      }

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          user.user.updateProfile({ displayName: name });
        })
        .then(() => {
          navigation.goBack();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
        });
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack();
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HeyGrupos</Text>
      <Text style={{ marginBottom: 20 }}>
        Ajude, colabore, faça networking!
      </Text>
      {type && (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={t => setName(t)}
          placeholder="Qual o seu nome"
        />
      )}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={t => setEmail(t)}
        placeholder="Seu email"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={t => setPassword(t)}
        placeholder="Sua Senha"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={[
          styles.buttonLogin,
          { backgroundColor: type ? '#f53745' : '#57dd86' },
        ]}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>{type ? 'Cadastrar' : 'Acessar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setType(!type)}>
        <Text>{type ? 'Já possuo uma conta' : 'Criar uma nova conta'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    color: '#121212',
    backgroundColor: '#EBEBEB',
    width: '90%',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50,
  },
  buttonLogin: {
    width: '90%',
    backgroundColor: '#121212',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
