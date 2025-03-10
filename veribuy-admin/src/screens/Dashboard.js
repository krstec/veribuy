// src/screens/Dashboard.js
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, useWindowDimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatsCards from '../components/StatsCards';
import TaskList from '../components/TaskList';
import NotificationsPanel from '../components/NotificationsPanel';

export default function Dashboard({ navigation }) {
  const { width } = useWindowDimensions();
  const isWebLarge = Platform.OS === 'web' && width > 1024;
  const isWebMedium = Platform.OS === 'web' && width > 768 && width <= 1024;

  // Sample metrics data
  const metrics = [
    { title: 'Open Tasks', value: 24, icon: 'list', color: '#4CAF50' },
    { title: 'Pending Approvals', value: 12, icon: 'time', color: '#FF9800' },
    { title: 'Active Orders', value: 37, icon: 'cart', color: '#2196F3' },
    { title: 'Manufacturers', value: 8, icon: 'business', color: '#9C27B0' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Page title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Dashboard</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>4</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Stats cards */}
          <StatsCards metrics={metrics} />
          
          {/* Main dashboard layout */}
          <View style={[
            styles.dashboardLayout,
            isWebLarge && styles.webLargeLayout,
            isWebMedium && styles.webMediumLayout
          ]}>
            {/* Task management section */}
            <View style={[
              styles.taskSection,
              isWebLarge && styles.webLargeTaskSection,
              isWebMedium && styles.webMediumTaskSection
            ]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Tasks</Text>
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={() => navigation.navigate('Tasks')}
                >
                  <Text style={styles.viewAllButtonText}>View All</Text>
                  <Ionicons name="arrow-forward" size={16} color="#2196F3" />
                </TouchableOpacity>
              </View>
              <TaskList limit={5} />
            </View>
            
            {/* Notifications section */}
            <View style={[
              styles.notificationsSection,
              isWebLarge && styles.webLargeNotificationsSection,
              isWebMedium && styles.webMediumNotificationsSection
            ]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllButtonText}>View All</Text>
                  <Ionicons name="arrow-forward" size={16} color="#2196F3" />
                </TouchableOpacity>
              </View>
              <NotificationsPanel limit={4} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dashboardLayout: {
    flexDirection: 'column',
    marginTop: 16,
  },
  webLargeLayout: {
    flexDirection: 'row',
  },
  webMediumLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  taskSection: {
    flex: 1,
    marginBottom: 16,
  },
  webLargeTaskSection: {
    flex:4 ,
    marginRight: 16,
  },
  webMediumTaskSection: {
    flex: 2,
    marginRight: 16,
  },
  notificationsSection: {
    flex: 1,
  },
  webLargeNotificationsSection: {
    flex: 1,
  },
  webMediumNotificationsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#2196F3',
    marginRight: 4,
  },
});