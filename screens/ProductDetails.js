import React, { useEffect, useState } from 'react'; 
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You may need to install this package
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import supabase from '../supabase';


export default function ProductDetails({navigation, route}) {
    const [userAddress, setUserAddress] = useState('Endereço desconhecido');
    const [restaurantData, setRestaurantData] = useState(null);
    const userId = route.params?.id;
    const restaurantId = route.params?.restaurantId;
  
    useEffect(() => {
      if (userId) fetchUserAddress();
      if (restaurantId) fetchRestaurantData();
    }, [userId, restaurantId]);
  
    // Função para buscar o endereço do usuário
    const fetchUserAddress = async () => {
      try {
        const { data: clienteData, error: clienteError } = await supabase
          .from('Cliente')
          .select('id_endereco')
          .eq('id', userId)
          .single();
  
        if (clienteError) throw clienteError;
  
        const idEndereco = clienteData.id_endereco;
  
        const { data: enderecoData, error: enderecoError } = await supabase
          .from('EnderecoCliente')
          .select('rua, numero')
          .eq('id', idEndereco)
          .single();
  
        if (enderecoError) throw enderecoError;
  
        setUserAddress(`${enderecoData.rua}, ${enderecoData.numero}`);
      } catch (error) {
        console.error('Erro ao buscar endereço do usuário:', error.message);
      }
    };
  
   // Função para buscar os dados do restaurante e seu endereço
const fetchRestaurantData = async () => {
  try {
    // Buscar dados do restaurante
    const { data: restauranteData, error: restauranteError } = await supabase
      .from('Restaurante')
      .select('nome, frete, id_endereco')
      .eq('id', restaurantId)
      .single();
    
    if (restauranteError) throw restauranteError;

    const idEnderecoRestaurante = restauranteData.id_endereco;

    // Buscar o endereço do restaurante usando o id_endereco
    const { data: enderecoRestauranteData, error: enderecoError } = await supabase
      .from('EnderecoRestaurante')
      .select('rua, numero, cidade')
      .eq('id', idEnderecoRestaurante)
      .single();
    
    if (enderecoError) throw enderecoError;

    // Montar os dados completos do restaurante, incluindo o endereço
    setRestaurantData({
      ...restauranteData,
      endereco: `${enderecoRestauranteData.rua}, ${enderecoRestauranteData.numero} - ${enderecoRestauranteData.cidade}`
    });
  } catch (error) {
    console.error('Erro ao buscar dados do restaurante:', error.message);
  }
};
  

  return (
    <View style={styles.container}>
       <TopNav
        userAddress={userAddress}
        onCartPress={() => navigation.navigate('Pedidos', { id: userId })}
      />

      <ScrollView  contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        {restaurantData && (
        <>
      <Text style={styles.title}>{restaurantData.nome}</Text>
      <Text style={styles.subTitle}>20 ~ 40 Min • Aberto</Text>
      <Text style={styles.address}>{restaurantData.endereco}</Text>
        </>
       )}
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

      <BottomNav style={styles.bottomNav} navigation={navigation} userId={userId} />
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
