import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DashboardCard from '../../components/common/DashboardCard';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, spacing } from '../../theme/theme';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer title="State Admin Dashboard" subtitle="Tamil Nadu ration system overview">
      <ScrollView>
        <View style={styles.grid}>
          <DashboardCard title="Total Users" value="2.4M" hint="Registered beneficiaries" icon="👥" color={colors.primary} />
          <DashboardCard title="Active Shops" value="1,842" hint="State-wide" icon="🏪" color={colors.success} />
        </View>
        <View style={styles.actions}>
          <AppButton label="Manage Districts" onPress={() => navigation.navigate('Districts')} />
          <AppButton label="View Analytics" variant="outline" onPress={() => navigation.navigate('Analytics')} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actions: { marginTop: spacing.lg, gap: spacing.sm },
});
