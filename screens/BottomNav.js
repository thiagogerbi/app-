import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext'; // Importa o contexto de autenticação

export default function BottomNav({ navigation }) {
  const { user } = useAuth(); // Obtém o usuário autenticado do contexto

  if (!user) return null; // Verifica se o usuário está logado antes de renderizar

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home', { id: user.id })}>
        <Ionicons name="home-outline" size={20} color="#007676" />
        <Text style={styles.navText}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Busca', { id: user.id })}>
        <Ionicons name="search-outline" size={20} color="#007676" />
        <Text style={styles.navText}>Busca</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Pedidos', { id: user.id })}>
        <Ionicons name="receipt-outline" size={20} color="#007676" />
        <Text style={styles.navText}>Pedidos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Perfil', { id: user.id })}>
        <Ionicons name="person-outline" size={20} color="#007676" />
        <Text style={styles.navText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
