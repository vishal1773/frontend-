import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { saveCandidate } from '../../services/authStorage';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'StateAdminRegistration'>;

export default function StateAdminRegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [adminCode, setAdminCode] = useState('');

  const handleCreate = async () => {
    if (!name || !phone || !state || !adminCode) {
      return;
    }

    await saveCandidate({
      id: `candidate-${Date.now()}`,
      phone,
      fullName: name,
      aadhaar: adminCode,
      address: state,
      role: 'Citizen',
      createdAt: new Date().toISOString(),
    });

    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>State admin registration</Text>
        <Text style={styles.title}>Create governance profile</Text>
        <Text style={styles.subtitle}>This state-level registration form is wired for future admin workflows.</Text>

        <AppInput label="Admin Name" value={name} onChangeText={setName} placeholder="Sanjay Rao" />
        <AppInput label="Mobile Number" value={phone} onChangeText={(value) => setPhone(value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="9876543210" keyboardType="number-pad" />
        <AppInput label="State" value={state} onChangeText={setState} placeholder="Karnataka" />
        <AppInput label="Admin Code" value={adminCode} onChangeText={setAdminCode} placeholder="KA-001" />

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
