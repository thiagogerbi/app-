import React, {useState} from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from './BottomNav';
import supabase from '../supabase';
import TopNav from './TopNav';

// Importando imagens locais
import burgerImage from '../assets/img/burger.png';
import pizzaImage from '../assets/img/pizza.png';
import japonesaImage from '../assets/img/japonesa.png';
import mexicanaImage from '../assets/img/mexicana.png';
import massasImage from '../assets/img/massas.png';
import docesImage from '../assets/img/doces.png';
import fitImage from '../assets/img/fit.png';
import padariaImage from '../assets/img/padaria.png';
import churrascoImage from '../assets/img/churrasco.png';
import veganaImage from '../assets/img/vegana.png';
import chinesaImage from '../assets/img/chinesa.png';
import marmitaImage from '../assets/img/marmita.png';

export default function FoodCategoriesScreen({navigation, route}) {
  const [userAddress, setUserAddress] = useState('Endereço desconhecido');

  const userId = route.params?.id;
  const categories = [
    { name: 'Burgers', image: burgerImage },
    { name: 'Pizzas', image: pizzaImage },
    { name: 'Japonesa', image: japonesaImage },
    { name: 'Mexicana', image: mexicanaImage },
    { name: 'Massas', image: massasImage },
    { name: 'Doces', image: docesImage },
    { name: 'Fit', image: fitImage },
    { name: 'Padaria', image: padariaImage },
    { name: 'Churrasco', image: churrascoImage },
    { name: 'Vegana', image: veganaImage },
    { name: 'Chinesa', image: chinesaImage },
    { name: 'Marmita', image: marmitaImage },
  ];

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <TopNav
        userAddress={userAddress}
        onMenuPress={() => { /* Lógica para abrir o menu */ }}
        onCartPress={() => navigation.navigate('Pedidos', { id: userId })}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#009688" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise o seu prato ou restaurante favorito"
          placeholderTextColor="#a7a7a7"
        />
      </View>

      {/* Categories */}
      <ScrollView contentContainerStyle={styles.categoriesContainer} style={styles.scrollView}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Image 
              source={category.image} 
              style={styles.categoryImage} 
            />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

       {/* Componente BottomNav */}
       <BottomNav navigation={navigation} userId={userId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    /*backgroundColor: '#f0f0f0',*/
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#009688',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#009688',
  },
  scrollView: {
    flex: 1, // Allows the ScrollView to take up remaining space
    marginBottom: 60, // Adds space to prevent overlap with bottom navigation
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
    /*paddingBottom: 40, // Extra padding to ensure last items are visible*/
  },
  categoryButton: {
    width: '40%',
    flexDirection: 'row',
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
