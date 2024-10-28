import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar @expo/vector-icons

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#007676" />
        </TouchableOpacity>
        <Text style={styles.locationText}>Rua Bel Alliance</Text>
        <View style={styles.topNavIcons}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#007676" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={24} color="#007676" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.restaurantInfo}>
          {/* Espaço para Imagem do Restaurante */}
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>Burst Burger</Text>
            <Text style={styles.restaurantAddress}>Av Goiás, 670 - São Caetano do Sul</Text>
            <Text style={styles.deliveryTime}>20 - 40 Min</Text>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Pagamento pelo app</Text>
          <View style={styles.paymentOption}>
            <Text style={styles.paymentText}>PIX</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.couponSection}>
          <Text style={styles.couponLabel}>Cupom</Text>
          <TextInput 
            style={styles.couponInput} 
            placeholder="Digite seu cupom" 
            placeholderTextColor="#999" 
          />
        </View>

        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumo de valores</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$54,80</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Taxa de Entrega</Text>
            <Text style={styles.summaryValue}>R$5,00</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$59,80</Text>
          </View>
        </View>

        <View style={styles.cpfSection}>
          <View style={styles.cpfIconText}>
            <Ionicons name="person-circle-outline" size={24} color="#555" />
            <Text style={styles.cpfText}>CPF na nota</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Realizar Pedido</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={24} color="#007676" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search-outline" size={24} color="#007676" />
          <Text style={styles.navText}>Busca</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="receipt-outline" size={24} color="#007676" />
          <Text style={styles.navText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#007676" />
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
  content: {
    flex: 1,
    padding: 16,
  },
  restaurantInfo: {
    marginBottom: 20,
  },
  restaurantDetails: {
    marginLeft: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#555',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#555',
  },
  paymentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    color: '#3c3c3c',
    marginBottom: 8,
    fontWeight: '600', 
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#008080',
  },
  changeButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    /*backgroundColor: '#E0E0E0',*/
    background: 'transparent', 
    borderRadius: 4,
  },
  changeButtonText: {
    fontSize: 14,
    color: '#008080',
  },
  couponSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  couponLabel: {
    fontSize: 16,
    color: '#555',
  },
  couponInput: {
    width: 150,
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 14,
    color: '#333',
  },
  summary: {
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    color: '#000',
  },
  totalItem: {
    marginTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cpfSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cpfIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cpfText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  addButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    /*backgroundColor: '#E0E0E0',*/
    background: 'transparent', 
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: '#008080',
  },
  orderButton: {
    paddingVertical: 16,
    backgroundColor: '#008080',
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    position: 'absolute',
    bottom: 64,
    left: 16,
    right: 16,
  },
  orderButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
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
