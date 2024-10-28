import React from 'react'; 
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="menu" size={20} color="#007676" />
        </TouchableOpacity>
        <Text style={styles.locationText}>Rua Bel Alliance</Text>
        <View style={styles.topNavIcons}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={20} color="#007676" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="pricetags" size={20} color="#007676" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={20} color="#007676" />
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={20} color="#007676" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search-outline" size={20} color="#007676" />
          <Text style={styles.navText}>Busca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="receipt-outline" size={20} color="#007676" />
          <Text style={styles.navText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={20} color="#007676" />
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
