import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors } from '../../theme/theme';
import { formatPhone } from '../../utils/formatters';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'OTP'>;
  route: RouteProp<AuthStackParamList, 'OTP'>;
};

export default function OtpScreen({ navigation, route }: Props) {
  const { phone } = route.params;
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      await login(phone, otp);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer title="OTP Verification" subtitle={`Code sent to ${formatPhone(phone)}`}>
      <View style={styles.form}>
        <TextInput
          label="Enter OTP"
          mode="outlined"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
          style={styles.input}
        />
        <Text variant="bodySmall" style={styles.hint}>
          Demo OTP: 123456
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton label={loading ? 'Verifying...' : 'Verify & Continue'} onPress={handleVerify} disabled={loading || otp.length < 6} />
        <AppButton label="Back" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, marginTop: 8 },
  input: { backgroundColor: colors.surface },
  hint: { color: colors.textMuted },
  error: { color: colors.danger },
});
