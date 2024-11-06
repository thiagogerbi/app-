import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import supabase from '../supabase';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import RestauranteList from './RestauranteList'; // Ou seja, podemos modificar este para mostrar os cards como FlatList

export default function HomeScreen({ route, navigation }) {
  const [userAddress, setUserAddress] = useState('Endereço desconhecido');
  const [restaurantes, setRestaurantes] = useState([]);
  const userId = route.params?.id;

  // Primeiro useEffect: busca o endereço do usuário se um userId for fornecido
  useEffect(() => {
    if (userId) {
      fetchUserAddress();
    }
  }, [userId]);

  // Segundo useEffect: busca todos os restaurantes ao montar o componente
  useEffect(() => {
    console.log("useEffect para buscar restaurantes iniciado");
    fetchRestaurantes(); // Chamando diretamente aqui
  }, []);
  
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
  const fetchRestaurantes = async () => {
    try {
      console.log("Iniciando busca de restaurantes...");
      
      const { data: restauranteData, error: restauranteError } = await supabase
        .from('Restaurante')
        .select('id, nome'); // Buscar o id e o nome
        
      if (restauranteError) {
        console.error("Erro na consulta de restaurantes:", restauranteError);
        throw restauranteError;
      }
      
      if (restauranteData && restauranteData.length > 0) {
        console.log("Dados dos restaurantes encontrados:", restauranteData);
        setRestaurantes(restauranteData); // Limitar a 2 restaurantes
      } else {
        console.warn("Nenhum restaurante encontrado ou resposta vazia.");
      }
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TopNav
        userAddress={userAddress}
        onMenuPress={() => { /* Lógica para abrir o menu */ }}
        onCartPress={() => navigation.navigate('Pedidos', { id: userId })}
      />

      {/* Conteúdo Principal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Todos os Restaurantes</Text>
        {/* Passa o array de restaurantes para o RestauranteList */}
        
        <RestauranteList data={restaurantes}  onPressItem={(restaurantId) => navigation.navigate('RestauranteScreen', { restaurantId: restaurantId, userId: userId })} />
      </View>

      {/* Componente BottomNav */}
      <BottomNav navigation={navigation} userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 60, 
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
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop: 6,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#a7a7a7',  
    borderRadius: 5,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#808080',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  mainContent: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantListContainer: {
    alignItems: 'center',
  },
  restaurantCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  info: {
    fontSize: 12,
    color: '#999',
  },
  rating: {
    fontSize: 14,
    color: '#ffcc00',
    marginTop: 5,
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
