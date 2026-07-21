import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../../theme/theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
};

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
}: AppButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[styles.button, isOutline && styles.outline, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={[styles.label, isOutline && styles.outlineLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineLabel: {
    color: colors.primary,
  },
});
