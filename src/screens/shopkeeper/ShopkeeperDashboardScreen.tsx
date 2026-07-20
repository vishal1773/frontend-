import React, { useCallback, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Card, Divider, Text } from 'react-native-paper';
import BottomNavigation from '../../components/BottomNavigation';
import DashboardCard from '../../components/DashboardCard';
import SectionHeader from '../../components/SectionHeader';
import StatusPill from '../../components/StatusPill';
import { theme } from '../../theme/theme';

const overviewData = [
  { title: 'Beneficiaries Served', value: '48', hint: 'Today', icon: 'account-group-outline', color: theme.colors.primary },
  { title: 'Transactions', value: '126', hint: 'Completed', icon: 'swap-horizontal', color: '#2563EB' },
  { title: 'Rice Distributed', value: '320 kg', hint: 'Today', icon: 'grain', color: theme.colors.warning },
  { title: 'Low Stock Alerts', value: '3', hint: 'Needs attention', icon: 'alert-circle-outline', color: theme.colors.danger },
  { title: 'Pending Complaints', value: '5', hint: 'Open issues', icon: 'message-alert-outline', color: theme.colors.primary },
];

const quickActions = [
  { label: 'Scan Beneficiary', icon: 'qrcode-scan', color: '#2563EB' },
  { label: 'Issue Ration', icon: 'cart-outline', color: '#0F766E' },
  { label: 'Stock Management', icon: 'cube-outline', color: '#F59E0B' },
  { label: 'Transaction History', icon: 'history', color: '#7C3AED' },
  { label: 'Reports', icon: 'chart-box-outline', color: '#0891B2' },
  { label: 'Notifications', icon: 'bell-outline', color: '#DC2626' },
];

const stockItems = [
  { name: 'Rice', quantity: '500 kg', status: 'Available', tone: 'success' as const },
  { name: 'Wheat', quantity: '250 kg', status: 'Available', tone: 'success' as const },
  { name: 'Sugar', quantity: '120 kg', status: 'Low Stock', tone: 'warning' as const },
  { name: 'Palm Oil', quantity: '60 L', status: 'Low Stock', tone: 'warning' as const },
  { name: 'Kerosene', quantity: '25 L', status: 'Out of Stock', tone: 'danger' as const },
];

const transactions = [
  { name: 'Kumar', card: 'PHH-123456', item: 'Rice 20 kg', time: 'Today • 10:30 AM', status: 'Completed' },
  { name: 'Meena', card: 'PHH-456789', item: 'Rice 10 kg', time: 'Today • 11:15 AM', status: 'Completed' },
  { name: 'Ravi', card: 'PHH-789012', item: 'Sugar 2 kg', time: 'Yesterday • 4:20 PM', status: 'Pending' },
];

const notifications = [
  { title: 'Low Rice Stock', message: 'Rice stock is below threshold and needs replenishment.', time: '10 min ago' },
  { title: 'Government Announcement', message: 'A new circular has been posted for shopkeepers.', time: '1 hr ago' },
  { title: 'Monthly Stock Arrival', message: 'The monthly supply truck is expected tomorrow morning.', time: '2 hrs ago' },
];

export default function ShopkeeperDashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} tintColor={theme.colors.primary} />}
      >
        <Card style={styles.heroCard} mode="elevated">
          <View style={styles.headerRow}>
            <View style={styles.greetingWrap}>
              <Text style={styles.eyebrow}>WELCOME, SHOPKEEPER</Text>
              <Text style={styles.title}>Welcome, Ravi 👋</Text>
              <Text style={styles.subtitle}>Fair Price Shop • FPS 102</Text>
            </View>
            <View style={styles.headerActions}>
              <View style={styles.iconBadge}>
                <MaterialCommunityIcons name="bell-outline" size={18} color={theme.colors.primary} />
              </View>
              <Avatar.Text size={44} label="R" style={styles.avatar} labelStyle={styles.avatarLabel} />
            </View>
          </View>

          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.locationText}>Salem District • Shop ID: SH-102</Text>
          </View>
        </Card>

        <SectionHeader title="Today's overview" subtitle="Key indicators for the day" />
        <View style={styles.summaryGrid}>
          {overviewData.map((item) => (
            <DashboardCard key={item.title} title={item.title} value={item.value} hint={item.hint} icon={item.icon} color={item.color} />
          ))}
        </View>

        <SectionHeader title="Quick actions" subtitle="Frequent tasks at a glance" />
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <Pressable key={action.label} style={styles.actionCard}>
              <View style={[styles.actionIconWrap, { backgroundColor: action.color + '18' }]}>
                <MaterialCommunityIcons name={action.icon as never} size={20} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Stock summary" subtitle="Current availability and alerts" />
        <Card style={styles.sectionCard} mode="outlined">
          {stockItems.map((item, index) => (
            <View key={item.name}>
              <View style={styles.stockRow}>
                <View style={styles.stockInfo}>
                  <Text style={styles.stockName}>{item.name}</Text>
                  <Text style={styles.stockQty}>{item.quantity}</Text>
                </View>
                <StatusPill label={item.status} tone={item.tone} />
              </View>
              {index < stockItems.length - 1 ? <Divider style={styles.divider} /> : null}
            </View>
          ))}
        </Card>

        <SectionHeader title="Recent transactions" subtitle="Latest ration distributions" />
        <Card style={styles.sectionCard} mode="outlined">
          {transactions.map((transaction, index) => (
            <View key={transaction.card}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionMeta}>{transaction.card}</Text>
                  <Text style={styles.transactionMeta}>{transaction.item}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionTime}>{transaction.time}</Text>
                  <StatusPill label={transaction.status} tone={transaction.status === 'Completed' ? 'success' : 'warning'} />
                </View>
              </View>
              {index < transactions.length - 1 ? <Divider style={styles.divider} /> : null}
            </View>
          ))}
        </Card>

        <SectionHeader title="Recent notifications" subtitle="Latest updates for the shop" />
        <Card style={styles.sectionCard} mode="outlined">
          {notifications.map((item, index) => (
            <View key={item.title}>
              <View style={styles.notificationRow}>
                <MaterialCommunityIcons name="information-outline" size={18} color={theme.colors.primary} />
                <View style={styles.notificationBody}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
              </View>
              {index < notifications.length - 1 ? <Divider style={styles.divider} /> : null}
            </View>
          ))}
        </Card>
      </ScrollView>
      <BottomNavigation active="home" variant="shopkeeper" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.lg,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingWrap: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarLabel: {
    color: theme.colors.surface,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    gap: 6,
  },
  locationText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  actionCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  actionLabel: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  stockQty: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    backgroundColor: theme.colors.border,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  transactionMeta: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
    marginLeft: theme.spacing.sm,
  },
  transactionTime: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginBottom: 6,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.sm,
  },
  notificationBody: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  notificationTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  notificationMessage: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  notificationTime: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});
