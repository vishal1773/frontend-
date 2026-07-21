import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { authService } from '../../services/authService';
import { colors } from '../../theme/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await authService.sendOtp(phone);
      navigation.navigate('OTP', { phone });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer title="Login" subtitle="Enter your mobile number to continue">
      <View style={styles.form}>
        <TextInput
          label="Mobile Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton label={loading ? 'Sending...' : 'Send OTP'} onPress={handleSendOtp} disabled={loading || phone.length < 10} />
        <AppButton label="Create Account" variant="outline" onPress={() => navigation.navigate('SelectRole')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, marginTop: 8 },
  input: { backgroundColor: colors.surface },
  error: { color: colors.danger },
});
