// TopNav.js
import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TopNav = ({ userAddress, onMenuPress, onCartPress }) => {

  return (
    <View style={styles.topNav}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={20} color="#007676" />
      </TouchableOpacity>
      <Text style={styles.locationText}>{userAddress}</Text>
      <View style={styles.topNavIcons}>
        <TouchableOpacity style={styles.cartIcon}>
          <Ionicons name="pricetags" size={20} color="#007676" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon} onPress={onCartPress}>
          <Ionicons name="cart-outline" size={20} color="#007676" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TopNav;
