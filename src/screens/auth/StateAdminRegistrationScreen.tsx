import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

type Props = StackScreenProps<AuthStackParamList, 'StateAdminRegistration'>;

export default function StateAdminRegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [adminCode, setAdminCode] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>State admin registration</Text>
        <Text style={styles.title}>Create governance profile</Text>
        <Text style={styles.subtitle}>This state-level registration form is wired for future admin workflows.</Text>

        <AppInput label="Admin Name" value={name} onChangeText={setName} placeholder="Sanjay Rao" />
        <AppInput label="State" value={state} onChangeText={setState} placeholder="Karnataka" />
        <AppInput label="Admin Code" value={adminCode} onChangeText={setAdminCode} placeholder="KA-001" />

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
