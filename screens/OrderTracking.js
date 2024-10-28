import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderTracking() {
  const [selectedPayment, setSelectedPayment] = useState("Mastercard****9402");

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#007676" />
        </TouchableOpacity>
        <Image source={require('./assets/img/logo.png')} style={styles.logo} />
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
        {/* Placeholder for Map */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>[Mapa aqui]</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Status do Pedido</Text>
          <View style={styles.statusSteps}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text style={styles.statusText}>Processando Pedido</Text>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text style={styles.statusText}>Em preparo</Text>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text style={styles.statusText}>Saiu para entrega</Text>
            <Ionicons name="time-outline" size={24} color="gray" />
            <Text style={styles.statusText}>Entregue</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoContainer}>
          <Image
            style={styles.deliveryImage}
            source={require('./assets/img/user.png')}
          />
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryName}>Guilherme A.</Text>
            <Text style={styles.deliveryRating}>4.7 ★ | +5 Mil Entregas</Text>
          </View>
          <View style={styles.arrivalInfo}>
            <Text style={styles.arrivalTitle}>Hora Prevista para Chegada</Text>
            <Text style={styles.arrivalTime}>19:24 - 19:30</Text>
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentLabel}>Selecione o meio de pagamento:</Text>
          <View style={styles.paymentRow}>
            <Picker
              selectedValue={selectedPayment}
              style={styles.paymentPicker}
              onValueChange={(itemValue) => setSelectedPayment(itemValue)}
            >
              <Picker.Item
                label="Mastercard****9402"
                value="Mastercard****9402"
              />
              <Picker.Item label="Visa****1234" value="Visa****1234" />
              <Picker.Item label="Pix" value="Pix" />
              <Picker.Item label="Dinheiro" value="Dinheiro" />
            </Picker>
            <Image
              source={require('./assets/img/card.png')}
              style={styles.paymentImage}
            />
          </View>
        </View>
      </ScrollView>

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
    backgroundColor: '#f5f5f5',
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
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
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
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  mapPlaceholderText: {
    color: '#777',
    fontSize: 16,
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 12,
    color: '#333',
    paddingLeft: 6,
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  deliveryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deliveryInfo: {
    marginLeft: 10,
  },
  deliveryName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deliveryRating: {
    fontSize: 12,
    color: '#777',
  },
  arrivalInfo: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  arrivalTitle: {
    fontSize: 12,
    color: '#777',
  },
  arrivalTime: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentPicker: {
    height: 40,
    width: 260,
    marginRight: 10,
    border: 'none', 
  },
  paymentImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
