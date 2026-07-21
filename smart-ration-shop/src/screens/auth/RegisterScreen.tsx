import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { ROLE_LABELS } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { authService } from '../../services/authService';
import { UserRole } from '../../types';
import { colors } from '../../theme/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Register'>;
  route: RouteProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation, route }: Props) {
  const role = (route.params?.role ?? 'citizen') as UserRole;
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await authService.register({ name, phone, role });
      await login(phone, '123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer title="Register" subtitle={`Register as ${ROLE_LABELS[role]}`}>
      <View style={styles.form}>
        <TextInput label="Full Name" mode="outlined" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Mobile Number" mode="outlined" keyboardType="phone-pad" value={phone} onChangeText={setPhone} maxLength={10} style={styles.input} />
        <AppButton label={loading ? 'Creating...' : 'Create Account'} onPress={handleRegister} disabled={loading || !name || phone.length < 10} />
        <AppButton label="Back" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, marginTop: 8 },
  input: { backgroundColor: colors.surface },
});
