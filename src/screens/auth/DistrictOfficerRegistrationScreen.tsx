import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

type Props = StackScreenProps<AuthStackParamList, 'DistrictOfficerRegistration'>;

export default function DistrictOfficerRegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>District officer registration</Text>
        <Text style={styles.title}>Create district profile</Text>
        <Text style={styles.subtitle}>Built for district oversight and monitoring workflows.</Text>

        <AppInput label="Officer Name" value={name} onChangeText={setName} placeholder="Meera Iyer" />
        <AppInput label="District" value={district} onChangeText={setDistrict} placeholder="Bengaluru Urban" />
        <AppInput label="Employee ID" value={employeeId} onChangeText={setEmployeeId} placeholder="DO-118" />

        <AppButton title="Create Account" onPress={() => navigation.navigate('Login')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
