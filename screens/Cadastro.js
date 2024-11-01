import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import supabase from '../supabase';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    cep: '',
    estado: '',
    rua: '',
    numero: '',
    bairro: '',
    complemento: '',
    cidade: ''
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Busca o último cliente registrado
      const { data: lastCliente, error: errorLastCliente } = await supabase
        .from('Cliente')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (errorLastCliente || !lastCliente.length) {
        throw new Error("Não foi possível obter o último cliente.");
      }

      const clienteId = lastCliente[0].id;

      // Criação do endereço
      const addressUsuario = {
        rua: formData.rua,
        numero: formData.numero,
        cidade: formData.cidade,
        estado: formData.estado,
        bairro: formData.bairro,
        complemento: formData.complemento,
        cep: formData.cep
      };

      const { data: insertedAddress, error: errorAddress } = await supabase
        .from("EnderecoCliente")
        .insert(addressUsuario)
        .select("id");

      if (errorAddress) throw new Error("Erro ao salvar o endereço do usuário");

        // Atualiza o último cliente com os novos dados
        const { error: errorUpdateCliente } = await supabase
        .from("Cliente")
        .update({
          id_endereco: insertedAddress[0].id,
          nome: formData.nome,
          telefone: formData.telefone,
          cpf: formData.cpf
        })
        .eq("id", clienteId);

      if (errorUpdateCliente) throw new Error("Erro ao atualizar o cliente com os dados.");

      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Endereço associado ao último cliente com sucesso.'
      });

      // Navega para a tela de login
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: 'Erro!',
        text2: error.message || 'Ocorreu um erro ao salvar o usuário.'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="teal" style={styles.backIcon} />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/img/logo-login.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput placeholder="Nome" style={styles.input} onChangeText={(text) => handleInputChange('nome', text)} />
      <TextInput placeholder="Telefone" style={styles.input} onChangeText={(text) => handleInputChange('telefone', text)} />
      <View style={styles.row}>
        <TextInput placeholder="CPF" style={[styles.input, styles.halfInput]} onChangeText={(text) => handleInputChange('cpf', text)} />
        <TextInput placeholder="CEP" style={[styles.input, styles.halfInput]} onChangeText={(text) => handleInputChange('cep', text)} />
      </View>
      <TextInput placeholder="Rua" style={styles.input} onChangeText={(text) => handleInputChange('rua', text)} />
      <TextInput placeholder="Bairro" style={styles.input} onChangeText={(text) => handleInputChange('bairro', text)} />
      <View style={styles.row}>
        <TextInput placeholder="Número" style={[styles.input, styles.halfInput]} onChangeText={(text) => handleInputChange('numero', text)} />
        <TextInput placeholder="Complemento" style={[styles.input, styles.halfInput]} onChangeText={(text) => handleInputChange('complemento', text)} />
      </View>
      <View style={styles.row}>
        <TextInput placeholder="Estado" style={[styles.input, styles.halfInput]} onChangeText={(text) => handleInputChange('estado', text)} />
        <TextInput placeholder="Cidade" style={[styles.input, styles.halfInput]} onChangeText={(text) => handleInputChange('cidade', text)} />
      </View>

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
    paddingTop: 20,
  },
  backIcon: {
    alignSelf: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
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
