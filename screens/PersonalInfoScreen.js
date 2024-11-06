"use client";

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importa o ImagePicker
import { Ionicons } from '@expo/vector-icons';
import supabase from '../supabase';
import BottomNav from './BottomNav';

export default function PersonalInfoScreen({ navigation, route }) {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    complemento: '',
    foto: '', // Campo para armazenar a URL da foto
    id_endereco: '', // Garantir que id_endereco esteja aqui
  });

  const [isLoading, setIsLoading] = useState(true);
  const userId = route.params?.id;

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      console.warn('userId não encontrado');
      setIsLoading(false);
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Buscar dados do cliente
      const { data: clienteData, error: clienteError } = await supabase
        .from('Cliente')
        .select('nome, email, telefone, id_endereco, foto')
        .eq('id', userId)
        .single();

      if (clienteError) throw clienteError;

      const { id_endereco, nome, email, telefone, foto } = clienteData;

      // Buscar dados do endereço associado ao cliente
      const { data: enderecoData, error: enderecoError } = await supabase
        .from('EnderecoCliente')
        .select('rua, numero, cidade, estado, complemento')
        .eq('id', id_endereco) // Corrigido aqui: use id_endereco
        .single();

      if (enderecoError) throw enderecoError;

      setUsuario({
        nome,
        email,
        telefone,
        rua: enderecoData.rua,
        numero: enderecoData.numero,
        cidade: enderecoData.cidade,
        estado: enderecoData.estado,
        complemento: enderecoData.complemento,
        id_endereco, // Agora id_endereco está no estado
        foto, // Define a foto inicial
      });
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUsuario((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Atualizar os dados do cliente
      const { error: clienteError } = await supabase
        .from('Cliente')
        .update({
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          foto: usuario.foto,
        })
        .eq('id', userId);

      if (clienteError) throw clienteError;

      // Atualizar os dados do endereço
      const { error: enderecoError } = await supabase
        .from('EnderecoCliente')
        .update({
          rua: usuario.rua,
          numero: usuario.numero,
          cidade: usuario.cidade,
          estado: usuario.estado,
          complemento: usuario.complemento,
        })
        .eq('id', usuario.id_endereco); // Aqui agora estamos usando usuario.id_endereco

      if (enderecoError) throw enderecoError;

      Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar informações:', error.message);
      Alert.alert('Erro', 'Não foi possível atualizar as informações.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
  
    if (!result.cancelled) {
      try {
        const fileName = `${userId}-${Date.now()}.jpg`;
        const { uri } = result.assets[0]; // URI da imagem selecionada
  
        // Converta a URI para um objeto de arquivo para upload no Supabase
        const response = await fetch(uri);
        const blob = await response.blob();
  
        const { data, error } = await supabase.storage
          .from('user-images')
          .upload(fileName, blob, {
            contentType: 'image/jpeg',
          });
  
        if (error) throw error;
  
        // Obter URL pública da imagem
        const { publicUrl } = supabase.storage.from('user-images').getPublicUrl(fileName);
        setUsuario((prev) => ({ ...prev, foto: publicUrl }));
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error.message);
        Alert.alert('Erro', 'Não foi possível fazer upload da imagem.');
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={20} color="#00796B" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Informações Pessoais</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={usuario.foto ? { uri: usuario.foto } : require('../assets/img/user-g.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleImagePick}>
            <Ionicons name="pencil-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Campos de entrada para dados do usuário */}
        <View style={styles.inputContainer}>
  <Text style={styles.label}>Nome</Text>
  <TextInput
    style={styles.input}
    value={usuario.nome}
    onChangeText={(value) => handleInputChange('nome', value)}
  />

  <Text style={styles.label}>Email</Text>
  <TextInput
    style={styles.input}
    value={usuario.email}
    onChangeText={(value) => handleInputChange('email', value)}
  />

  <Text style={styles.label}>Telefone</Text>
  <TextInput
    style={styles.input}
    value={usuario.telefone}
    onChangeText={(value) => handleInputChange('telefone', value)}
  />

  <Text style={styles.label}>Rua</Text>
  <TextInput
    style={styles.input}
    value={usuario.rua}
    onChangeText={(value) => handleInputChange('rua', value)}
  />

  <Text style={styles.label}>Número</Text>
  <TextInput
    style={styles.input}
    value={usuario.numero}
    onChangeText={(value) => handleInputChange('numero', value)}
  />

  <Text style={styles.label}>Cidade</Text>
  <TextInput
    style={styles.input}
    value={usuario.cidade}
    onChangeText={(value) => handleInputChange('cidade', value)}
  />

  <Text style={styles.label}>Estado</Text>
  <TextInput
    style={styles.input}
    value={usuario.estado}
    onChangeText={(value) => handleInputChange('estado', value)}
  />

  <Text style={styles.label}>Complemento</Text>
  <TextInput
    style={styles.input}
    value={usuario.complemento}
    onChangeText={(value) => handleInputChange('complemento', value)}
  />
</View>

      </ScrollView>

      <TouchableOpacity style={styles.editButton} onPress={handleSave}>
        <Text style={styles.editButtonText}>Salvar</Text>
      </TouchableOpacity>

      <BottomNav navigation={navigation} userId={userId} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
    marginLeft: 8,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#008080',
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#007676',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#007676',
    marginTop: 4,
  },
});