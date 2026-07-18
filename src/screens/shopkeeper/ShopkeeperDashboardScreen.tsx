import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BottomNavigation from '../../components/BottomNavigation';
import { theme } from '../../theme/theme';

const summary = [
  { label: 'Beneficiaries Served', value: '48', icon: '👥', color: theme.colors.primary },
  { label: 'Rice Issued', value: '320 kg', icon: '📦', color: '#2563EB' },
  { label: 'Oil Issued', value: '42 L', icon: '🛢️', color: theme.colors.warning },
  { label: 'Low Stock Items', value: '3', icon: '⚠️', color: theme.colors.danger },
];

const quickActions = [
  { label: 'Scan QR', icon: '📷' },
  { label: 'RFID Scan', icon: '🪪' },
  { label: 'Issue Ration', icon: '🛒' },
  { label: 'Stock Management', icon: '📦' },
  { label: 'Reports', icon: '📊' },
  { label: 'Notifications', icon: '🔔' },
];

const transactions = [
  { name: 'Lakshmi Devi', items: 'Rice 10 kg · Oil 1 L', time: '10:42 AM' },
  { name: 'R. Kumar', items: 'Rice 5 kg · Sugar 1 kg', time: '10:18 AM' },
  { name: 'Meena Raj', items: 'Wheat 5 kg · Oil 1 L', time: '09:55 AM' },
];

export default function ShopkeeperDashboardScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>SHOPKEEPER DASHBOARD</Text>
          <Text style={styles.title}>Welcome, Shopkeeper</Text>
        </View>

        <View style={styles.shopCard}>
          <Text style={styles.shopIcon}>🏪</Text>
          <View>
            <Text style={styles.shopName}>Fair Price Shop - 102</Text>
            <Text style={styles.district}>📍 Salem District</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today&apos;s Summary</Text>
        <View style={styles.summaryGrid}>
          {summary.map((item) => (
            <View key={item.label} style={[styles.summaryCard, { borderLeftColor: item.color }]}>
              <Text style={styles.summaryIcon}>{item.icon}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <Pressable key={action.label} style={styles.actionCard}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionsCard}>
          {transactions.map((transaction, index) => (
            <View
              key={transaction.name}
              style={[styles.transaction, index < transactions.length - 1 && styles.transactionBorder]}
            >
              <View style={styles.transactionAvatar}>
                <Text style={styles.transactionAvatarText}>{transaction.name.charAt(0)}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionItems}>{transaction.items}</Text>
              </View>
              <Text style={styles.transactionTime}>{transaction.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNavigation active="home" variant="shopkeeper" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background },
  scrollView: { flex: 1 },
  content: { flexGrow: 1, padding: theme.spacing.lg, paddingBottom: 120 },
  header: { marginBottom: theme.spacing.lg },
  eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 5 },
  title: { color: theme.colors.text, fontSize: 26, fontWeight: '800' },
  shopCard: {
    alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.lg,
    flexDirection: 'row', gap: theme.spacing.md, marginBottom: theme.spacing.xl, padding: theme.spacing.md,
  },
  shopIcon: { fontSize: 30 },
  shopName: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  district: { color: theme.colors.primarySoft, fontSize: 13, fontWeight: '600' },
  sectionTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '800', marginBottom: theme.spacing.sm },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: theme.spacing.lg },
  summaryCard: {
    backgroundColor: theme.colors.surface, borderLeftWidth: 4, borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm, padding: theme.spacing.sm, width: '48%',
  },
  summaryIcon: { fontSize: 20, marginBottom: 8 },
  summaryValue: { color: theme.colors.text, fontSize: 20, fontWeight: '800', marginBottom: 3 },
  summaryLabel: { color: theme.colors.textMuted, fontSize: 12, lineHeight: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: theme.spacing.lg },
  actionCard: {
    alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border,
    borderRadius: theme.radius.md, borderWidth: 1, marginBottom: theme.spacing.sm, padding: theme.spacing.md, width: '31%',
  },
  actionIcon: { fontSize: 22, marginBottom: 8 },
  actionLabel: { color: theme.colors.text, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  transactionsCard: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1 },
  transaction: { alignItems: 'center', flexDirection: 'row', padding: theme.spacing.md },
  transactionBorder: { borderBottomColor: theme.colors.border, borderBottomWidth: 1 },
  transactionAvatar: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: 18, height: 36, justifyContent: 'center', marginRight: theme.spacing.sm, width: 36 },
  transactionAvatarText: { color: theme.colors.primary, fontWeight: '800' },
  transactionDetails: { flex: 1 },
  transactionName: { color: theme.colors.text, fontSize: 14, fontWeight: '700', marginBottom: 3 },
  transactionItems: { color: theme.colors.textMuted, fontSize: 12 },
  transactionTime: { color: theme.colors.textMuted, fontSize: 11 },
});
