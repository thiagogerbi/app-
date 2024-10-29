import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You may need to install this package

export default function ProductDetails() {
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Content */}
        <View style={styles.header}>
          <Text style={styles.title}>Burst Burger</Text>
          <Text style={styles.subTitle}>20 ~ 40 Min • Aberto</Text>
          <Text style={styles.address}>Av Goiás - 370, São Caetano do Sul</Text>
        </View>

        <Image
          source={{ uri: 'https://example.com/burger-image.png' }} // Replace with actual image URL
          style={styles.image}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>Arutz Burguer</Text>
          <Text style={styles.productDescription}>
            Sanduíche com Filé de Peito de Frango crocante 100g, no pão Brioche, acompanhado de muçarela, maionese, molho da casa, salada, picles e cebola.
          </Text>
          <View style={styles.badges}>
            <Text style={styles.badge}>Contém Lactose</Text>
            <Text style={styles.badge}>Contém Gluten</Text>
          </View>
        </View>

        {/* Additional options sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deixe seu lanche mais gostoso</Text>
          {renderOption("Alface", "R$ 2,50")}
          {renderOption("Picles", "R$ 2,00")}
          {renderOption("Cheddar", "R$ 5,90")}
          {renderOption("Cebola", "R$ 2,00")}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Molhos</Text>
          {renderOption("Maionese Caseira", "R$ 3,50", "https://example.com/maionese.png")}
          {renderOption("Molho Tasty", "R$ 3,50", "https://example.com/tasty.png")}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acompanhamentos</Text>
          {renderOption("Batata Rústica Média", "R$ 9,90", "https://example.com/batata.png")}
          {renderOption("Nuggets", "R$ 12,90", "https://example.com/nuggets.png")}
          {renderOption("Onion Rings", "R$ 14,90", "https://example.com/onion_rings.png")}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bebidas</Text>
          {renderOption("Coca Cola Lata", "R$ 7,00", "https://example.com/coca.png")}
          {renderOption("H2O", "R$ 8,00", "https://example.com/h2o.png")}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobremesas</Text>
          {renderOption("Brownie", "R$ 10,90", "https://example.com/brownie.png")}
        </View>

        <TextInput
          placeholder="Algum comentário?"
          style={styles.commentInput}
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
          <Text style={styles.price}>R$ 21,90</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>1</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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

const renderOption = (name, price, imageUrl) => (
  <View style={styles.option}>
    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.optionImage} />}
    <Text style={styles.optionText}>{name} - {price}</Text>
    <TouchableOpacity style={styles.addOptionButton}>
      <Text style={styles.addOptionText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: {
    padding: 8,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', 
  },
  subTitle: {
    color: '#888',
  },
  address: {
    color: '#888',
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  productInfo: {
    marginVertical: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 6, 
  },
  badges: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  badge: {
    backgroundColor: '#eee',
    color: '#888',
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    fontSize: 12,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', 
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionImage: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
  },
  addOptionButton: {
    /*backgroundColor: '#f0f0f0',*/
    padding: 6,
    alignItems: 'center', // Centraliza o texto dentro do botão
    justifyContent: 'center',
  },
  addOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(136, 126, 136)', 
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  addButton: {
    backgroundColor: '#007676',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navIcon: {
    alignItems: 'center',
  },
  navIconLabel: {
    fontSize: 12,
    color: '#000',
  },
  navText: {
    fontSize: 12,
    color: '#007676',
    marginTop: 4,
  },


  // restaurantscreen css 
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
};
