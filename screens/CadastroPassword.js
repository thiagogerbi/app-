import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../supabase';

export default function CadastroPassword() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Verifica se as senhas coincidem antes de tentar salvar no banco de dados
    if (formData.senha !== formData.confirmarSenha) {
      setErrorMessage('As senhas não coincidem.');
      return; // Interrompe a execução se as senhas não coincidem
    }

    try {
      // Limpa a mensagem de erro antes de tentar salvar o usuário
      setErrorMessage('');

      // Criação do usuário
      const userLogin = {
        email: formData.email,
        senha: formData.senha
      };

      const { error: errorUser } = await supabase
        .from("Cliente")
        .insert(userLogin)
        .select("id");

      if (errorUser) throw new Error("Erro ao salvar o usuário");

      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error(error.message);
      setErrorMessage('Erro ao cadastrar o usuário. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={20} color="teal" style={styles.backIcon} />
      <View style={styles.logoContainer}>
        <Image source={require('./assets/img/logo-login.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange('senha', text)}
      />
      <TextInput
        placeholder="Confirme sua senha"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange('confirmarSenha', text)}
      />

      {/* Exibe a mensagem de erro se houver */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf1f1',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backIcon: {
    alignSelf: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', 
  },
  input: {
    borderWidth: 1,
    borderColor: 'teal',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
