import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { apiRequest } from '../../services/api';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const isValid = useMemo(() => /^\d{10}$/.test(phone), [phone]);

  const handleContinue = async () => {
    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError('');

    try {
      await apiRequest('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber: phone }),
      });

      navigation.navigate('OTP', { phone });
    } catch (err: any) {
      setError(err.message || 'Unable to send OTP');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Secure authentication</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Enter your registered mobile number to receive an OTP.</Text>

        <AppInput
          label="Mobile Number"
          value={phone}
          onChangeText={(value) => {
            setPhone(value.replace(/[^0-9]/g, '').slice(0, 10));
            if (error) setError('');
          }}
          placeholder="9876543210"
          keyboardType="number-pad"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title="Send OTP" onPress={handleContinue} />

        <Text style={styles.footer}>Need an account? Continue to registration after verification.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    padding: 20,
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
    fontSize: 26,
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
  error: {
    color: '#DC2626',
    marginBottom: 12,
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 13,
  },
});
