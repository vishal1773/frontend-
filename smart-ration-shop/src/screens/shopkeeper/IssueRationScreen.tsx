import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors } from '../../theme/theme';

export default function IssueRationScreen() {
  return (
    <ScreenContainer title="Issue Ration" subtitle="Deduct quota and record transaction">
      <View style={styles.form}>
        <TextInput label="Beneficiary ID" mode="outlined" style={styles.input} />
        <TextInput label="Rice (kg)" mode="outlined" keyboardType="decimal-pad" style={styles.input} />
        <TextInput label="Wheat (kg)" mode="outlined" keyboardType="decimal-pad" style={styles.input} />
        <TextInput label="Sugar (kg)" mode="outlined" keyboardType="decimal-pad" style={styles.input} />
        <AppButton label="Confirm Issue" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16, marginTop: 8 },
  input: { backgroundColor: colors.surface },
});
