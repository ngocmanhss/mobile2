import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const vouchers = [
  { id: '1', discount: '15%', status: 'Use' },
  { id: '2', discount: '20%', status: 'Use' },
  { id: '3', discount: '25%', status: 'Use' },
  { id: '4', discount: '45%', status: 'Used' },
  { id: '5', discount: '45%', status: 'Used' },
];

const Voucher = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voucher</Text>
        <Text style={styles.subtitle}>Let's claim and use your voucher.</Text>
        <Ionicons name="cart-outline" size={28} color="green" style={styles.cartIcon} />
      </View>

      {/* Claimable Vouchers */}
      <View style={styles.claimableRow}>
        <View style={styles.voucherBox}>
          <Text style={styles.voucherText}>Disc 30%</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.voucherBox}>
          <Text style={styles.voucherText}>Disc 10%</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Vouchers */}
      <Text style={styles.sectionTitle}>My Voucher</Text>
      <FlatList
        data={vouchers}
        renderItem={({ item }) => (
          <View style={styles.voucherItem}>
            <Text style={styles.voucherDiscount}>Disc {item.discount}</Text>
            <Text style={styles.howToUseText}>How to use</Text>
            <TouchableOpacity
              style={[
                styles.useButton,
                item.status === 'Used' && styles.usedButton
              ]}
              disabled={item.status === 'Used'}
            >
              <Text style={styles.useButtonText}>{item.status}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
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
  claimableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  voucherBox: {
    backgroundColor: '#d0f7e2',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  voucherText: {
    fontSize: 16,
    fontWeight: '600',
  },
  claimButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  claimButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  voucherItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  voucherDiscount: {
    fontSize: 16,
    fontWeight: '600',
  },
  howToUseText: {
    color: 'grey',
    fontSize: 14,
  },
  useButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  usedButton: {
    backgroundColor: 'grey',
  },
  useButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Voucher;
