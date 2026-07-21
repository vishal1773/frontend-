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
    <ScreenContainer title="Shopkeeper Dashboard" subtitle="Today's ration operations">
      <ScrollView>
        <View style={styles.grid}>
          <DashboardCard title="Issues Today" value="24" hint="Ration issued" icon="✅" color={colors.success} />
          <DashboardCard title="Low Stock" value="2 items" hint="Needs refill" icon="⚠️" color={colors.warning} />
        </View>
        <View style={styles.actions}>
          <AppButton label="Scan QR / RFID" onPress={() => navigation.navigate('Scan')} />
          <AppButton label="Issue Ration" variant="outline" onPress={() => navigation.navigate('IssueRation')} />
          <AppButton label="View Reports" variant="outline" onPress={() => navigation.navigate('Reports')} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actions: { marginTop: spacing.lg, gap: spacing.sm },
});
