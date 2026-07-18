import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import Header from '../../components/Header';
import DashboardCard from '../../components/DashboardCard';
import QuotaCard from '../../components/QuotaCard';
import NotificationCard from '../../components/NotificationCard';
import BottomNavigation from '../../components/BottomNavigation';
import QuickActionCard from '../../components/QuickActionCard';
import { dashboardCards, notifications, quickActions } from '../../constants/dummyData';
import { theme } from '../../theme/theme';
import { apiRequest } from '../../services/api';

type Props = StackScreenProps<AuthStackParamList, 'CitizenDashboard'>;

export default function CitizenDashboardScreen({ navigation, route }: Props) {
  const { phone, token } = route.params || { phone: '', token: '' };
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLayout = (event: any) => {
    setViewportHeight(event.nativeEvent.layout.height);
  };

  const handleContentSizeChange = (_width: number, height: number) => {
    setContentHeight(height);
  };

  const handleScroll = (event: any) => {
    setScrollTop(event.nativeEvent.contentOffset.y);
  };

  const handleTabPress = (tab: string) => {
    if (tab === 'quota') navigation.navigate('CitizenQuota');
    if (tab === 'complaints') navigation.navigate('CitizenComplaints');
    if (tab === 'profile') navigation.navigate('CitizenProfile');
  };

  const thumbHeight = viewportHeight > 0 && contentHeight > viewportHeight
    ? Math.max(40, (viewportHeight / contentHeight) * viewportHeight)
    : 0;

  const thumbTop = viewportHeight > 0 && contentHeight > viewportHeight
    ? (scrollTop / Math.max(1, contentHeight - viewportHeight)) * Math.max(0, viewportHeight - thumbHeight)
    : 0;

  useEffect(() => {
    const loadDashboard = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest('/citizen/dashboard', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(response);
      } catch (error) {
        console.log('dashboard load failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator
          persistentScrollbar
          style={styles.scrollView}
          scrollEventThrottle={16}
          onLayout={handleLayout}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
        >
          <Header name={dashboardData?.name || 'Citizen'} district={dashboardData?.district || 'Madurai'} />
          <Text style={styles.phoneText}>Phone: {phone}</Text>
          {loading ? <Text style={styles.loadingText}>Loading dashboard...</Text> : null}
          <View style={styles.panelBox}>
            <Text style={styles.panelTitle}>Account status</Text>
            <Text style={styles.panelText}>Your ration account is ready for service.</Text>
          </View>
          <QuotaCard />

          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.grid}>
            {dashboardCards.map((card) => (
              <DashboardCard key={card.title} {...card} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.quickGrid}>
            {quickActions.map((item) => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Recent notifications</Text>
          {notifications.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {viewportHeight > 0 && contentHeight > viewportHeight ? (
          <View pointerEvents="none" style={styles.scrollbarTrack}>
            <View style={[styles.scrollbarThumb, { height: thumbHeight, top: thumbTop }]} />
          </View>
        ) : null}
      </View>
      <BottomNavigation active="dashboard" onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollbarTrack: {
    position: 'absolute',
    top: 10,
    right: 6,
    width: 6,
    height: '90%',
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
  },
  scrollbarThumb: {
    position: 'absolute',
    width: 6,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingBottom: 120,
    minHeight: 1000,
  },
  phoneText: {
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
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
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  panelBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  panelText: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  loadingText: {
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
});
