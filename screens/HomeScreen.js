import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const restaurantesPopulares = [
  { id: '1', nome: 'Burst Burger', tempo: '20-40 Min', descricao: 'Burgers Artesanais', rating: 4.2, frete: 'Grátis', imagem: 'https://example.com/burger.jpg' },
  { id: '2', nome: 'Pizzas Fischer', tempo: '70-90 Min', descricao: 'Pizzas Artesanais', rating: 4.6, frete: 'R$5,50', imagem: 'https://example.com/pizza.jpg' },
];

const paraVoce = [
  { id: '3', nome: 'Peixaria 2 Irm.', tempo: '35-60 Min', descricao: 'Peixes Fritos', rating: 4.4, frete: 'R$10,40', imagem: 'https://example.com/fish.jpg' },
  { id: '4', nome: 'Massas Luigi', tempo: '35-50 Min', descricao: 'Massas', rating: 4.0, frete: 'R$10,40', imagem: 'https://example.com/pasta.jpg' },
];

const freteGratis = [
  { id: '5', nome: 'Mexican Food', tempo: '25-50 Min', descricao: 'Tacos e Burritos', rating: 4.5, frete: 'Grátis', imagem: 'https://example.com/tacos.jpg' },
  { id: '6', nome: 'Ana Churros', tempo: '35-50 Min', descricao: 'Churros', rating: 4.3, frete: 'Grátis', imagem: 'https://example.com/churros.jpg' },
];

const RestaurantList = ({ data }) => (
  <View style={styles.restaurantListContainer}>
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
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

export default function App() {
  return (
    <View style={styles.container}>
      {/* Barra de Navegação Superior */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={24} color="#007676" />
        </TouchableOpacity>
        <Text style={styles.addressText}>Rua Bel Alliance</Text>
        <View style={styles.topNavIcons}>
          <TouchableOpacity>
            <FontAwesome name="ticket" size={20} color="#007676" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="bell" size={20} color="#007676" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categorias */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <MaterialIcons name="whatshot" size={20} color="#ff4500" />
          <Text style={styles.categoryText}>Em Alta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <MaterialIcons name="fastfood" size={20} color="#ff8c00" />
          <Text style={styles.categoryText}>Burgers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <MaterialIcons name="cake" size={20} color="#ff69b4" />
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

      {/* Barra de Navegação Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#007676" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={24} color="#007676" />
          <Text style={styles.navText}>Busca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="receipt" size={24} color="#007676" />
          <Text style={styles.navText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#007676" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007676', 
  },
  topNavIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  categoryText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  mainContent: {
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
    alignItems: 'center', // Centraliza o FlatList
  },
  restaurantCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    alignItems: 'center', // Centraliza o conteúdo dentro do card
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
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#007676',
  },
});
