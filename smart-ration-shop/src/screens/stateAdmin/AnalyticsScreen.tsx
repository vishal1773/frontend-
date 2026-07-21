import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function AnalyticsScreen() {
  return (
    <ScreenContainer title="State Analytics" subtitle="Real-time analytics across all districts">
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.title}>State Overview</Text>
        <Text variant="bodyMedium" style={styles.line}>Ration issued this month: 4.2M transactions</Text>
        <Text variant="bodyMedium" style={styles.line}>Stock utilization: 78%</Text>
        <Text variant="bodyMedium" style={styles.line}>Complaint resolution rate: 82%</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  line: { color: colors.textMuted, marginBottom: spacing.xs },
});
