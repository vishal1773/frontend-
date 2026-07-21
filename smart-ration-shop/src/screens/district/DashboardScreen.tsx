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
    <ScreenContainer title="District Dashboard" subtitle="Monitor ration shops in your district">
      <ScrollView>
        <View style={styles.grid}>
          <DashboardCard title="Active Shops" value="42" hint="Across district" icon="🏪" color={colors.primary} />
          <DashboardCard title="Open Complaints" value="8" hint="Needs attention" icon="📝" color={colors.warning} />
        </View>
        <View style={styles.actions}>
          <AppButton label="View Complaints" onPress={() => navigation.navigate('Complaints')} />
          <AppButton label="Analytics" variant="outline" onPress={() => navigation.navigate('Analytics')} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actions: { marginTop: spacing.lg, gap: spacing.sm },
});
