import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function QuotaCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Monthly quota</Text>
      <Text style={styles.title}>Rice 20kg • Wheat 15kg</Text>
      <Text style={styles.subtitle}>Issued for this month and ready for collection.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  eyebrow: {
    color: '#CCFBF1',
    fontWeight: '700',
    marginBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#E2E8F0',
    fontSize: 13,
  },
});
