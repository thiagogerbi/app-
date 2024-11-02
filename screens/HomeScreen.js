import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../supabase';
import BottomNav from './BottomNav';

const RestaurantList = ({ data }) => (
  <View style={styles.restaurantListContainer}>
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.restaurantCard}>
          <Image source={{ uri: item.imagem }} style={styles.image} />
          <Text style={styles.name}>{item.nome}</Text>
          <Text style={styles.description}>{item.descricao}</Text>
          <Text style={styles.info}>{item.tempo} - Frete: {item.frete}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default function HomeScreen({ route, navigation}) {
  const [userAddress, setUserAddress] = useState('Endereço desconhecido');
  const [restaurantesPopulares, setRestaurantesPopulares] = useState([]);
  const [paraVoce, setParaVoce] = useState([]);
  const [freteGratis, setFreteGratis] = useState([]);
  const userId = route.params?.id;

  useEffect(() => {
    if (userId) {
      fetchUserAddress();
    }
    fetchRestaurantes();
  }, [userId]);

  const fetchUserAddress = async () => {
    try {
      // Primeiro, buscamos o cliente para obter o id_endereco
      const { data: clienteData, error: clienteError } = await supabase
        .from('Cliente')
        .select('id_endereco')
        .eq('id', userId)
        .single();

      if (clienteError) throw clienteError;

      const idEndereco = clienteData.id_endereco;

      // Com o id_endereco, buscamos o endereço na tabela EnderecoCliente
      const { data: enderecoData, error: enderecoError } = await supabase
        .from('EnderecoCliente')
        .select('rua')
        .eq('id', idEndereco)
        .single();

      if (enderecoError) throw enderecoError;

      setUserAddress(enderecoData.rua); // Atualiza o endereço no estado
    } catch (error) {
      console.error('Erro ao buscar endereço do usuário:', error.message);
    }
  };

  const fetchRestaurantes = async () => {
    try {
      const { data, error } = await supabase
        .from('Restaurante')
        .select('*');

      if (error) throw error;

      const populares = data.filter((item) => item.rating >= 4.5);
      const paraVoceList = data.filter((item) => item.rating >= 4.0 && item.rating < 4.5);
      const freteGratisList = data.filter((item) => item.frete === 'Grátis');

      setRestaurantesPopulares(populares);
      setParaVoce(paraVoceList);
      setFreteGratis(freteGratisList);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="menu" size={20} color="#007676" />
        </TouchableOpacity>
        <Text style={styles.locationText}>{userAddress}</Text>
        <View style={styles.topNavIcons}>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="pricetags" size={20} color="#007676" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={20} color="#007676" onPress={() => navigation.navigate('Pedidos', { id: userId})} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Buttons */}
      <View style={styles.categoryButtons}>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="flame-outline" size={20} color="#808080" />
          <Text style={styles.categoryText}>Em Alta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="wine-outline" size={20} color="#808080" />
          <Text style={styles.categoryText}>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="ice-cream-outline" size={20} color="#808080" />
          <Text style={styles.categoryText}>Doces</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurantes Populares</Text>
          <RestaurantList data={restaurantesPopulares} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Para Você</Text>
          <RestaurantList data={paraVoce} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frete Grátis</Text>
          <RestaurantList data={freteGratis} />
        </View>
      </ScrollView>

       {/* Componente BottomNav */}
       <BottomNav navigation={navigation} userId={userId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 60, 
  },
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
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop: 6,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#a7a7a7',  
    borderRadius: 5,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#808080',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  mainContent: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantListContainer: {
    alignItems: 'center',
  },
  restaurantCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  info: {
    fontSize: 12,
    color: '#999',
  },
  rating: {
    fontSize: 14,
    color: '#ffcc00',
    marginTop: 5,
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
