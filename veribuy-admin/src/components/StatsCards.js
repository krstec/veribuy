// src/components/StatsCards.js
import React from 'react';
import { StyleSheet, View, Text, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsCards({ metrics }) {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  
  // Calculate how many cards per row based on screen width
  const cardsPerRow = isWeb 
    ? width > 1200 ? 4 : width > 768 ? 2 : 1 
    : 1;
  
  const getFlexBasis = () => {
    switch(cardsPerRow) {
      case 4: return '23%';
      case 2: return '48%';
      default: return '100%';
    }
  };

  return (
    <View style={styles.container}>
      {metrics.map((metric, index) => (
        <View 
          key={index} 
          style={[
            styles.card, 
            { flexBasis: getFlexBasis() }
          ]}
        >
          <View style={[styles.iconContainer, { backgroundColor: metric.color }]}>
            <Ionicons name={metric.icon} size={24} color="white" />
          </View>
          <View style={styles.metricInfo}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricTitle}>{metric.title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  metricInfo: {
    flex: 1,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
  },
});