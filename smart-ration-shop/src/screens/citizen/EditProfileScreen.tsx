import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/theme';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? '');

  return (
    <ScreenContainer title="Edit Profile" subtitle="Update your personal details">
      <View style={styles.form}>
        <TextInput label="Full Name" mode="outlined" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Email (optional)" mode="outlined" keyboardType="email-address" style={styles.input} />
        <AppButton label="Save Changes" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, marginTop: 8 },
  input: { backgroundColor: colors.surface },
});
