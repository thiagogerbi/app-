import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import RestauranteCard from './RestauranteCard';

const RestauranteList = ({ data, onPressItem }) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / 2.2; // Ajuste o valor conforme necessário para largura do cartão

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem(item.id)} style={{ width: cardWidth }}>
          <RestauranteCard restaurant={item} style={styles.card} />
        </TouchableOpacity>
      )}
      horizontal={true} // Define a lista como horizontal
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={true} // Mostra a barra de rolagem horizontal
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    marginRight: 10, // Adicione margem direita para espaçamento entre os cards
  },
});

export default RestauranteList;
