import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function User() {
  return (
    <View style={styles.container}>
      {/* ScrollView para permitir rolagem do conteúdo */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={20} color="#00796B" />
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Foto e nome do usuário */}
        <View style={styles.profileInfo}>
          <Image
            source={require('./assets/img/user-g.png')} 
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Giovanni Antonio</Text>
        </View>

        {/* Opções de perfil */}
        <View style={styles.optionContainer}>
          <OptionItem icon="person" title="Informações Pessoais" />
          <OptionItem icon="location" title="Endereços" />
          <OptionItem icon="cart" title="Sacola" />
          <OptionItem icon="heart" title="Favoritos" />
          <OptionItem icon="notifications" title="Notificações" />
          <OptionItem icon="card" title="Métodos de Pagamento" />
        </View>

        {/* FAQs e Configurações */}
        <View style={styles.optionContainer}>
          <OptionItem icon="help-circle" title="FAQs" />
          <OptionItem icon="settings" title="Configurações" />
        </View>

        {/* Botão de sair */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out" size={20} color="#00796B" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

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

function OptionItem({ icon, title }) {
  return (
    <TouchableOpacity style={styles.optionItem}>
      <Ionicons name={icon} size={20} color="#00796B" />
      <Text style={styles.optionText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 60, // Espaço para a barra de navegação inferior
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginLeft: 8,
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  optionContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  logoutText: {
    fontSize: 16,
    color: '#00796B',
    marginLeft: 8,
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
