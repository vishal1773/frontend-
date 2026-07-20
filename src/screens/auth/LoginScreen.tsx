import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { apiRequest } from '../../services/api';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => /^\d{10}$/.test(phone), [phone]);

  const handleContinue = async () => {
    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await apiRequest('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber: phone }),
      });

      navigation.navigate('OTP', { phone });
    } catch (err: any) {
      setError(err.message || 'Unable to send OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
            autoCapitalize="none"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppButton
            title={isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            onPress={handleContinue}
            disabled={isSubmitting || !isValid}
            style={styles.button}
          />

          <AppButton
            title="Register New User"
            onPress={() => navigation.navigate('SelectRole')}
            variant="secondary"
            style={styles.secondaryButton}
          />

          {isSubmitting ? (
            <View style={styles.loaderRow}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loaderText}>Requesting secure code…</Text>
            </View>
          ) : null}

          <Text style={styles.footer}>Need an account? Continue to registration after verification.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  error: {
    color: theme.colors.danger,
    marginBottom: theme.spacing.sm,
    fontSize: 13,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  secondaryButton: {
    marginTop: theme.spacing.sm,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    gap: 8,
  },
  loaderText: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
  footer: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.textMuted,
    fontSize: 13,
  },
});
