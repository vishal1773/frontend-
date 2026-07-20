import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import BottomNavigation from '../../components/BottomNavigation';
import AppButton from '../../components/AppButton';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'ShopkeeperStock'>;

export default function StockScreen({ navigation }: Props) {
  const handleTabPress = (tab: string) => {
    if (tab === 'home') navigation.navigate('ShopkeeperDashboard');
    if (tab === 'stock') navigation.navigate('ShopkeeperStock');
    if (tab === 'reports') navigation.navigate('ShopkeeperReports');
    if (tab === 'profile') navigation.navigate('ShopkeeperProfile');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>STOCK</Text>
        <Text style={styles.title}>Stock Management</Text>
        <Text style={styles.subtitle}>Manage available stock, low alerts, and replenishment from one place.</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current stock overview</Text>
          <Text style={styles.cardText}>Rice • Wheat • Sugar • Palm Oil • Kerosene</Text>
        </View>
        <AppButton title="Back to Home" onPress={() => navigation.navigate('ShopkeeperDashboard')} />
      </ScrollView>
      <BottomNavigation active="stock" variant="shopkeeper" onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background },
  scrollView: { flex: 1 },
  content: { flexGrow: 1, padding: theme.spacing.lg, paddingBottom: 120 },
  eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 6 },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: theme.colors.textMuted, fontSize: 13, lineHeight: 20, marginBottom: theme.spacing.lg },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.border, padding: theme.spacing.lg, marginBottom: theme.spacing.lg },
  cardTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  cardText: { fontSize: 13, color: theme.colors.textMuted, lineHeight: 20 },
});
