import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { saveCandidate } from '../../services/authStorage';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'ShopkeeperRegistration'>;

export default function ShopkeeperRegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [license, setLicense] = useState('');

  const handleCreate = async () => {
    if (!name || !phone || !shopName || !license) {
      return;
    }

    await saveCandidate({
      id: `candidate-${Date.now()}`,
      phone,
      fullName: name,
      aadhaar: license,
      address: shopName,
      role: 'Citizen',
      createdAt: new Date().toISOString(),
    });

    navigation.replace('ShopkeeperDashboard');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Shopkeeper registration</Text>
        <Text style={styles.title}>Register your shop</Text>
        <Text style={styles.subtitle}>This includes dummy shop credentials for Sprint 1 flow validation.</Text>

        <AppInput label="Owner Name" value={name} onChangeText={setName} placeholder="Ravi Sharma" />
        <AppInput label="Mobile Number" value={phone} onChangeText={(value) => setPhone(value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="9876543210" keyboardType="number-pad" />
        <AppInput label="Shop Name" value={shopName} onChangeText={setShopName} placeholder="Sharma Fair Price Shop" />
        <AppInput label="License Number" value={license} onChangeText={(value) => setLicense(value.toUpperCase())} placeholder="LIC-2048" />

        <AppButton title="Create Account" onPress={handleCreate} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 20,
    lineHeight: 20,
  },
});
