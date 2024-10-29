import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const transactions = [
  { id: '1', name: 'Rau Sạch', time: 'Today, 12:32 PM', amount: '-$25.00', image: require('../assets/banner1.jpg') },
  { id: '2', name: 'Red Velvet', time: 'Yesterday, 16:09 PM', amount: '-$20.00', image: require('../assets/banner2.jpg') },
];

const Wallet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>Easier transaction with StarWallet</Text>
        <Ionicons name="cart-outline" size={28} color="green" style={styles.cartIcon} />
      </View>

      {/* Card Information */}
      <View style={styles.card}>
        <Text style={styles.balanceTitle}>Balance</Text>
        <Text style={styles.balanceAmount}>$382,201</Text>
        <Text style={styles.cardNumber}>2505 **** **** 0003</Text>
        <Text style={styles.expiryDate}>05/25</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="wallet-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Top up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="briefcase-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Portfolio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="ellipsis-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <Text style={styles.transactionTitle}>Recent Transaction</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Image source={item.image} style={styles.transactionImage} />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionTime}>{item.time}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
  },
  cartIcon: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  card: {
    backgroundColor: '#d0f7e2',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },
  balanceTitle: {
    fontSize: 16,
    color: 'grey',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardNumber: {
    marginTop: 20,
    fontSize: 16,
    color: 'grey',
  },
  expiryDate: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 16,
    color: 'grey',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    flex: 1,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  transaction: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  transactionImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionTime: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
  },
});

export default Wallet;
