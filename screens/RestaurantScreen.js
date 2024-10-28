import React from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you install @expo/vector-icons

const BURGERS = [
  { id: '1', name: 'The Rock', description: 'Carne Bovina 300g\nCebola Caramelizada\nQueijo Cheddar', price: 'R$ 35,90', image: 'therock' },
  { id: '2', name: 'Taylor Swift', description: 'Carne Bovina 500g\nQueijo Parmesão\nBacon', price: 'R$ 37,50', image: 'taylorswift' },
  { id: '3', name: 'Arutz Burger', description: 'Peito de Frango 100g\nQueijo Muçarela\nPão Brioche', price: 'R$ 32,40', image: 'arutzburger' },
];

const SIDES = [
  { id: '1', name: 'Batata Rústica', description: 'Porção Frita 100g\nTempero da casa', price: 'R$ 9,90', image: 'batata' },
  { id: '2', name: 'Nuggets', description: 'Porção Frita 200g\n+ Tempero da casa', price: 'R$ 12,90', image: 'nuggets' },
  { id: '3', name: 'Onion Rings', description: 'Porção Frita 180g\n+ Molho Caseiro', price: 'R$ 14,90', image: 'onionrings' },
];

export default function RestaurantScreen() {
  const renderBurger = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={20} color="#007676" />
        </TouchableOpacity>
        <Text style={styles.locationText}>Rua Bel Alliance</Text>
        <View style={styles.topNavIcons}>
          <TouchableOpacity>
            <Ionicons name="pricetags" size={20} color="#007676" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={20} color="#007676" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: 'logo' }} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Burst Burger</Text>
            <Text style={styles.subtitle}>★★★★★ 4 Mil Avaliações</Text>
            <Text style={styles.subtitle}>Av Goiás - 370, São Caetano do Sul</Text>
            <Text style={styles.status}>20 - 40 Min • Aberto</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <Text style={styles.tab}>Promoções</Text>
          <Text style={[styles.tab, styles.activeTab]}>Burgers</Text>
          <Text style={styles.tab}>Acompanhamentos</Text>
          <Text style={styles.tab}>Molhos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Burgers</Text>
          <FlatList
            horizontal
            data={BURGERS}
            renderItem={renderBurger}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acompanhamentos</Text>
          <FlatList
            horizontal
            data={SIDES}
            renderItem={renderBurger}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
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
    backgroundColor: '#F5F5F5',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  status: {
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
  tab: {
    fontSize: 12,
    color: '#666',
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  section: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  card: {
    width: 140,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginRight: 16,
    padding: 8,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
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
