import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import supabase from '../supabase'; // ajuste o caminho conforme a estrutura do seu projeto
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const { data: cliente, error } = await supabase
        .from('Cliente')
        .select('*')
        .eq('email', email)
        .eq('senha', senha);

      if (error) {
        throw error;
      }

      if (cliente && cliente.length > 0) {
        // Usuário encontrado, navega para a tela de home
        Toast.show({
          type: 'success',
          text1: 'Login realizado com sucesso!',
        });
        navigation.navigate('HomeScreen');
      } else {
        // Usuário não encontrado
        Toast.show({
          type: 'error',
          text1: 'Erro de autenticação',
          text2: 'Email ou senha incorretos.',
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erro!',
        text2: 'Ocorreu um erro ao tentar fazer login.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#047377" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/img/logo-login.png')} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>Acesse sua conta e comece a fazer seus pedidos!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7F0F3',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#047377',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#047377',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
