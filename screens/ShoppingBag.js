import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Biblioteca para ícones

const ShoppingBag = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Arutz Burger', price: 21.90, quantity: 2, image: 'https://example.com/burger.png' },
    { id: 2, name: 'Brownie', price: 10.90, quantity: 1, image: 'https://example.com/brownie.png' }
  ]);

  const [suggestions] = useState([
    { id: 1, name: 'H2OH', description: 'Refrigerante sabor limão citrus com suco de fruta 310ml', price: 8.00, image: 'https://example.com/h2oh.png' },
    { id: 2, name: 'Bolo da Casa', description: 'Bolo com recheio de ninho e morango', price: 15.90, image: 'https://example.com/bolo-casa.png' },
    { id: 3, name: 'Petit Gateau', description: 'Bolo de chocolate com sorvete de creme', price: 17.90, image: 'https://example.com/petit-gateau.png' }
  ]);

  const handleQuantityChange = (id, change) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5; // Frete de R$ 5

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Sacola</Text>
        <Text style={styles.clearText}>Limpar</Text>
      </View>
      <View style={styles.restaurantInfo}>
        <Image source={{ uri: 'https://example.com/logo.png' }} style={styles.restaurantImage} />
        <View style={styles.addressContainer}>
          <Text style={styles.restaurantName}>Burst Burger</Text>
          <Text style={styles.restaurantDetails}>Av Goiás, 670 - São Caetano do Sul</Text>
          <Text style={styles.restaurantDetails}>20 - 40 Min</Text>
        </View>
        <Text style={styles.deliveryFee}>Frete: R$ 5,00</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Qtd</Text>
        <Text style={styles.tableHeaderText}>Nome</Text>
        <Text style={styles.tableHeaderText}>Valor</Text>
      </View>
      <ScrollView>
        {items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.addMoreItems}>Adicionar mais itens</Text>
        <Text style={styles.suggestionsHeader}>Peça Também</Text>
        <View style={styles.suggestions}>
          {suggestions.map(suggestion => (
            <View key={suggestion.id} style={styles.suggestionItem}>
              <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
              <Text style={styles.suggestionName}>{suggestion.name}</Text>
              <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
              <Text style={styles.suggestionPrice}>R$ {suggestion.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total com frete</Text>
        <Text style={styles.totalPrice}>R$ {total.toFixed(2)} / {items.length} itens</Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  clearText: { color: '#007676' },
  restaurantInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  restaurantImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  addressContainer: { flex: 1, marginRight: 10 },
  restaurantName: { fontWeight: 'bold' },
  restaurantDetails: { color: 'gray', fontSize: 12 },
  deliveryFee: { color: 'gray' },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  tableHeaderText: { fontSize: 14, color: 'gray', fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#e0e0e0' },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { color: 'gray' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 },
  quantityText: { fontSize: 18 },
  quantity: { fontSize: 16, fontWeight: 'bold' },
  addMoreItems: { fontSize: 16, color: '#007676', marginTop: 10, marginBottom: 20, textAlign: 'center' },
  suggestionsHeader: { fontSize: 16, fontWeight: 'bold', color: 'gray', marginVertical: 10 },
  suggestions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  suggestionItem: { alignItems: 'center', width: 90 },
  suggestionImage: { width: 60, height: 60, borderRadius: 8, marginBottom: 5 },
  suggestionName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  suggestionDescription: { fontSize: 10, color: 'gray', textAlign: 'center' },
  suggestionPrice: { fontSize: 12, color: '#007676', fontWeight: 'bold' },
  addButton: { backgroundColor: '#007676', borderRadius: 15, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 5 },
  addButtonText: { color: '#fff', fontSize: 16 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 10, borderTopWidth: 1, borderColor: '#e0e0e0' },
  totalText: { fontSize: 14, color: 'gray' },
  totalPrice: { fontSize: 16, fontWeight: 'bold' },
  continueButton: { backgroundColor: '#007676', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default ShoppingBag;
