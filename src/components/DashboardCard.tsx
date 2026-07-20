import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

type Props = {
  title: string;
  value: string;
  hint: string;
  icon: string;
  color: string;
};

export default function DashboardCard({ title, value, hint, icon, color }: Props) {
  const isVectorIcon = icon.includes('-') || icon.includes('outline') || icon.includes('solid');

  return (
    <View style={[styles.card, { borderColor: color }]}>
      <View style={[styles.iconWrap, { backgroundColor: color + '20' }]}>
        {isVectorIcon ? (
          <MaterialCommunityIcons name={icon as never} size={20} color={color} />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  hint: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
});
