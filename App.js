import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const App = () => {
  const [arutzBurgerQty, setArutzBurgerQty] = useState(2);
  const [brownieQty, setBrownieQty] = useState(1);
  const frete = 5.0;
  const arutzBurgerPrice = 21.9;
  const browniePrice = 10.9;
  const total = arutzBurgerQty * arutzBurgerPrice + brownieQty * browniePrice + frete;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sacola</Text>

      <View style={styles.header}>
        <Image source={{ uri: 'https://example.com/logo.png' }} style={styles.logo} />
        <View>
          <Text style={styles.storeName}>Burst Burger</Text>
          <Text style={styles.storeDetails}>Av Goiás, 670 - São Caetano do Sul</Text>
          <Text style={styles.deliveryTime}>20 - 40 Min</Text>
        </View>
        <Text style={styles.frete}>Frete: R$ {frete.toFixed(2)}</Text>
      </View>

      <ScrollView style={styles.itemsContainer}>
        {/* Arutz Burger */}
        <View style={styles.itemRow}>
          <Image source={{ uri: 'https://example.com/arutz-burger.png' }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Arutz Burguer</Text>
            <Text style={styles.itemPrice}>R$ {arutzBurgerPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setArutzBurgerQty(Math.max(0, arutzBurgerQty - 1))}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{arutzBurgerQty}</Text>
            <TouchableOpacity onPress={() => setArutzBurgerQty(arutzBurgerQty + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brownie */}
        <View style={styles.itemRow}>
          <Image source={{ uri: 'https://example.com/brownie.png' }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Brownie</Text>
            <Text style={styles.itemPrice}>R$ {browniePrice.toFixed(2)}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setBrownieQty(Math.max(0, brownieQty - 1))}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{brownieQty}</Text>
            <TouchableOpacity onPress={() => setBrownieQty(brownieQty + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* "Peça Também" Section */}
        <Text style={styles.sectionTitle}>Peça Também</Text>
        <View style={styles.suggestions}>
          {['H2OH', 'Bolo da Casa', 'Petit Gateau'].map((item, index) => (
            <View key={index} style={styles.suggestionItem}>
              <Image source={{ uri: `https://example.com/${item.toLowerCase()}.png` }} style={styles.suggestionImage} />
              <Text style={styles.suggestionName}>{item}</Text>
              <Text style={styles.suggestionPrice}>
                {item === 'H2OH' ? 'R$8,00' : item === 'Bolo da Casa' ? 'R$15,90' : 'R$17,90'}
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total com frete</Text>
        <Text style={styles.totalAmount}>R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeDetails: {
    color: '#777',
  },
  deliveryTime: {
    color: '#777',
  },
  frete: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  itemsContainer: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#777',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    width: 25,
    textAlign: 'center',
    color: '#007bff',
  },
  quantity: {
    fontSize: 16,
    width: 25,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  suggestions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionItem: {
    alignItems: 'center',
    width: 100,
  },
  suggestionImage: {
    width: 80,
    height: 80,
  },
  suggestionName: {
    fontSize: 14,
    textAlign: 'center',
  },
  suggestionPrice: {
    fontSize: 14,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 5,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 'auto',
  },
  continueButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
