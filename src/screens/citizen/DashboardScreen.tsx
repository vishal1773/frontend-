import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import DashboardCard from '../../components/DashboardCard';
import QuotaCard from '../../components/QuotaCard';
import NotificationCard from '../../components/NotificationCard';
import BottomNavigation from '../../components/BottomNavigation';
import { dashboardCards, notifications } from '../../constants/dummyData';
import { theme } from '../../theme/theme';

export default function DashboardScreen() {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const thumbHeight = viewportHeight > 0 && contentHeight > viewportHeight
    ? Math.max(40, (viewportHeight / contentHeight) * viewportHeight)
    : 0;
  const thumbTop = viewportHeight > 0 && contentHeight > viewportHeight
    ? (scrollTop / Math.max(1, contentHeight - viewportHeight)) * (viewportHeight - thumbHeight)
    : 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.scrollContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          persistentScrollbar
          scrollEventThrottle={16}
          onLayout={(event: any) => setViewportHeight(event.nativeEvent.layout.height)}
          onContentSizeChange={(_width: number, height: number) => setContentHeight(height)}
          onScroll={(event: any) => setScrollTop(event.nativeEvent.contentOffset.y)}
        >
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

        {contentHeight > viewportHeight ? (
          <View pointerEvents="none" style={styles.scrollbarTrack}>
            <View style={[styles.scrollbarThumb, { height: thumbHeight, top: thumbTop }]} />
          </View>
        ) : null}
      </View>
      <BottomNavigation active="dashboard" />
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
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    // Keeps the last cards above the fixed bottom navigation.
    paddingBottom: 120,
  },
  scrollbarTrack: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    right: 6,
    width: 6,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
  },
  scrollbarThumb: {
    position: 'absolute',
    width: 6,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
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
