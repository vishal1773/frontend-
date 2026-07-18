import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { saveCandidate } from '../../services/authStorage';

type Props = StackScreenProps<AuthStackParamList, 'CitizenRegistration'>;

export default function CitizenRegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [address, setAddress] = useState('');

  const handleCreate = async () => {
    if (!name || !aadhaar || !address) {
      return;
    }

    const phone = '9876543210';
    await saveCandidate({
      id: `candidate-${Date.now()}`,
      phone,
      fullName: name,
      aadhaar,
      address,
      role: 'Citizen',
      createdAt: new Date().toISOString(),
    });

    navigation.replace('CitizenDashboard', { phone });
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Citizen registration</Text>
        <Text style={styles.title}>Create citizen profile</Text>
        <Text style={styles.subtitle}>This screen saves sample candidate data locally and lets the phone number open the dashboard.</Text>

        <AppInput label="Full Name" value={name} onChangeText={setName} placeholder="Aarav Kumar" />
        <AppInput label="Aadhaar Number" value={aadhaar} onChangeText={(value) => setAadhaar(value.replace(/[^0-9]/g, '').slice(0, 12))} placeholder="123412341234" keyboardType="number-pad" />
        <AppInput label="Residential Address" value={address} onChangeText={setAddress} placeholder="House 12, Ward 3" />

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
    color: '#0F766E',
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 20,
  },
});
