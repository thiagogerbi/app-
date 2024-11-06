import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import RestauranteCard from './RestauranteCard';

const RestauranteList = ({ data, onPressItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem(item.id)}> {/* Adicione TouchableOpacity aqui */}
          <RestauranteCard restaurant={item} />
        </TouchableOpacity>
      )}
      horizontal
      keyExtractor={(item) => item.id.toString()} // Supondo que o id é um número
    />
  );
};

export default RestauranteList;