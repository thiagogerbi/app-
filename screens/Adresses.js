import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Adresses() {
  return (
    <View style={styles.container}>
      {/* Barra de navegação superior */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={20} color="#007676" />
        <Text style={styles.headerTitle}>Endereços</Text>
      </View>

      {/* Lista de Endereços */}
      <ScrollView contentContainerStyle={styles.addressList}>
        <View style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Ionicons name="home-outline" size={20} color="#007676" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Casa</Text>
              <Text style={styles.addressText}>R. Bel Aliance, 149</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#007676" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={20} color="#007676" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Ionicons name="briefcase-outline" size={20} color="#007676" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Trabalho</Text>
              <Text style={styles.addressText}>R. das Palmeiras, 51</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#007676" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={20} color="#007676" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Botão Adicionar Novo Endereço */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Novo Endereço</Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
    marginLeft: 8,
  },
  addressList: {
    paddingHorizontal: 16,
    paddingBottom: 60, // para evitar sobreposição com a barra inferior
  },
  addressCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInfo: {
    marginLeft: 8,
  },
  addressTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007676',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
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
