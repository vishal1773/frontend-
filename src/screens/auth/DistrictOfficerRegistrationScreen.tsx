import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { saveCandidate } from '../../services/authStorage';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'DistrictOfficerRegistration'>;

export default function DistrictOfficerRegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleCreate = async () => {
    if (!name || !phone || !district || !employeeId) {
      return;
    }

    await saveCandidate({
      id: `candidate-${Date.now()}`,
      phone,
      fullName: name,
      aadhaar: employeeId,
      address: district,
      role: 'Citizen',
      createdAt: new Date().toISOString(),
    });

    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>District officer registration</Text>
        <Text style={styles.title}>Create district profile</Text>
        <Text style={styles.subtitle}>Built for district oversight and monitoring workflows.</Text>

        <AppInput label="Officer Name" value={name} onChangeText={setName} placeholder="Meera Iyer" />
        <AppInput label="Mobile Number" value={phone} onChangeText={(value) => setPhone(value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="9876543210" keyboardType="number-pad" />
        <AppInput label="District" value={district} onChangeText={setDistrict} placeholder="Bengaluru Urban" />
        <AppInput label="Employee ID" value={employeeId} onChangeText={setEmployeeId} placeholder="DO-118" />

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
