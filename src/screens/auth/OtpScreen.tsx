import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { apiRequest } from '../../services/api';
import { findCandidateByPhone } from '../../services/authStorage';

type Props = StackScreenProps<AuthStackParamList, 'OTP'>;

export default function OtpScreen({ navigation, route }: Props) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const isValid = useMemo(() => /^\d{6}$/.test(otp), [otp]);

  const handleVerify = async () => {
    if (!isValid) {
      setError('Enter the 6-digit verification code.');
      return;
    }

    setError('');

    try {
      const response = await apiRequest('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber: route.params.phone, otp }),
      });

      const token = response.token ?? response.data?.token;
      const profile = await findCandidateByPhone(route.params.phone);

      if (profile) {
        navigation.replace('CitizenDashboard', { phone: route.params.phone, token });
      } else {
        navigation.replace('CitizenDashboard', { phone: route.params.phone, token });
      }
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Verification</Text>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>Use the dummy code 123456 to continue.</Text>

        <AppInput
          label="One-time password"
          value={otp}
          onChangeText={(value) => {
            setOtp(value.replace(/[^0-9]/g, '').slice(0, 6));
            if (error) setError('');
          }}
          placeholder="123456"
          keyboardType="number-pad"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title="Verify OTP" onPress={handleVerify} />
        <AppButton title="Resend Code" onPress={() => {}} variant="secondary" style={styles.secondaryButton} />
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
  error: {
    color: '#DC2626',
    marginBottom: 12,
  },
  secondaryButton: {
    marginTop: 12,
  },
});
