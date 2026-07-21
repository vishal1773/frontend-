import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function ScanQrScreen() {
  return (
    <ScreenContainer title="Scan QR / RFID" subtitle="Verify beneficiary ration card">
      <View style={styles.scanner}>
        <Text style={styles.icon}>📷</Text>
        <Text variant="bodyLarge" style={styles.text}>Camera scanner placeholder</Text>
        <AppButton label="Simulate Scan" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scanner: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, borderWidth: 1, borderColor: colors.border },
  icon: { fontSize: 64, marginBottom: spacing.md },
  text: { color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
});
