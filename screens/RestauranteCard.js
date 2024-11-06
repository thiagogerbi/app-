import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestauranteCard = ({restaurant}) => (
  <View style={styles.card}>
    <Image source={{ uri: restaurant.imagem }} style={styles.image} />
    <Text style={styles.name}>{restaurant.nome}</Text>
    <Text style={styles.description}>{restaurant.descricao}</Text>
    <Text style={styles.info}>
      {restaurant.tempo} Min - Frete: Grátis
    </Text>
    <View style={styles.ratingContainer}>
      <Ionicons name="star" size={16} color="#FFC107" />
      <Text style={styles.rating}>{restaurant.rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 160,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#F2F4F2',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, // Diminuído a altura da sombra
    shadowOpacity: 0.5, // Mantido a opacidade da sombra
    shadowRadius: 4, // Diminuído o raio da sombra
    elevation: 4, // Diminuído a elevação para Android
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  info: {
    fontSize: 12,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default RestauranteCard;
