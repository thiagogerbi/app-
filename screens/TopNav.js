import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext'; // Importa o contexto de autenticação
import supabase from '../supabase';

export default function TopNav({ onMenuPress, onCartPress }) {
  const { user } = useAuth(); // Obtém o usuário autenticado do contexto
  const [userAddress, setUserAddress] = useState('Endereço desconhecido');

  // Busca o endereço do usuário do banco de dados, caso esteja logado
  useEffect(() => {
    if (user) {
      fetchUserAddress();
    }
  }, [user]);

  const fetchUserAddress = async () => {
    try {
      const { data: enderecoData, error: enderecoError } = await supabase
        .from('EnderecoCliente')
        .select('rua, numero')
        .eq('id', user.id_endereco)
        .single();
      
      if (enderecoError) throw enderecoError;
      setUserAddress(`${enderecoData.rua}, ${enderecoData.numero}`);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error.message);
    }
  };

  return (
    <View style={styles.topNav}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={20} color="#007676" />
      </TouchableOpacity>
      <Text style={styles.locationText}>{userAddress}</Text>
      <View style={styles.topNavIcons}>
        <TouchableOpacity style={styles.cartIcon}>
          <Ionicons name="pricetags" size={20} color="#007676" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon} onPress={onCartPress}>
          <Ionicons name="cart-outline" size={20} color="#007676" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  locationText: {
    fontSize: 16,
    color: '#007676',
    fontWeight: 'bold',
  },
  topNavIcons: {
    flexDirection: 'row',
  },
  cartIcon: {
    marginLeft: 16,
  },
});
