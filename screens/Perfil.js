import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  supabase  from '../supabase'; // Verifique se está no caminho correto
import BottomNav from './BottomNav';

export default function Perfil({ route, navigation }) {
  const [usuario, setUsuario] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const userId = route.params?.id;

  useEffect(() => {
    if (userId) {
      console.log('User ID:', userId); // Verifique se o userId está correto
      fetchUserData();
    } else {
      console.warn('userId não encontrado');
      setIsLoading(false); // Para o carregamento caso userId não exista
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Buscar dados do cliente
      const { data: clienteData, error: clienteError } = await supabase
        .from('Cliente')
        .select('nome, email, telefone, id_endereco')
        .eq('id', userId)
        .single();

      if (clienteError) throw clienteError;

      const { id_endereco, nome, email, telefone } = clienteData;

      // Buscar dados do endereço associado ao cliente
      const { data: enderecoData, error: enderecoError } = await supabase
        .from('EnderecoCliente')
        .select('rua')
        .eq('id', id_endereco)
        .single();

      if (enderecoError) throw enderecoError;

      setUsuario({ nome, email, telefone, endereco: enderecoData.rua });
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar dados do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={20} color="#00796B" />
        <Text style={styles.headerTitle}>Informações Pessoais</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/img/user-g.png')} 
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{usuario?.nome || 'Nome não disponível'}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#007676" style={styles.icon} />
            <Text style={styles.infoLabel}>Nome Completo</Text>
            <Text style={styles.infoValue}>{usuario?.nome || 'Nome não disponível'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#007676" style={styles.icon} />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{usuario.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#007676" style={styles.icon} />
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{usuario.telefone}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Edit Button positioned above the bottom navigation */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('PersonalInfo', {id: userId})}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>

      {/* Componente BottomNav */}
      <BottomNav navigation={navigation} userId={userId}/>
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
    paddingBottom: 20, // Reduced padding for scroll content
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
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  infoContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    width: 25,
  },
  infoLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4D7C8A',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    textAlign: 'right',
    flex: 2,
  },
  editButton: {
    backgroundColor: '#007676',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30, // Space above the bottom navigation
    position: 'absolute',
    bottom: 60, // Positioned just above the bottom navigation
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
