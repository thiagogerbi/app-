import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RestauranteList from './RestauranteList';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../supabase';

export default function HomeScreen({ navigation }) {
  const { user, userAddress } = useAuth();
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const fetchRestaurantes = async () => {
    try {
      const { data, error } = await supabase
        .from('Restaurante')
        .select('id, nome, frete');
      if (error) throw error;
      setRestaurantes(data || []);
    } catch (err) {
      console.error('Erro ao buscar restaurantes:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TopNav
        userAddress={userAddress}
        onCartPress={() => navigation.navigate('Pedidos')}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Todos os Restaurantes</Text>
        <RestauranteList 
          data={restaurantes} 
          onPressItem={(restaurantId) => navigation.navigate('RestauranteScreen', { restaurantId })} 
        />
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
    marginVertical: 10,
    paddingBottom: 60, // Espaço para a BottomNav
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Garante que a BottomNav sobreponha o conteúdo
    paddingBottom: 80,
  },
});
