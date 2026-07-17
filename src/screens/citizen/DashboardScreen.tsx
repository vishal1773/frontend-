import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import DashboardCard from '../../components/DashboardCard';
import QuotaCard from '../../components/QuotaCard';
import NotificationCard from '../../components/NotificationCard';
import BottomNavigation from '../../components/BottomNavigation';
import { dashboardCards, notifications } from '../../constants/dummyData';
import { theme } from '../../theme/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
        <Header name="Aarav" district="Bengaluru" />
        <QuotaCard />

        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.grid}>
          {dashboardCards.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent notifications</Text>
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </ScrollView>
      <BottomNavigation active="dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
});
