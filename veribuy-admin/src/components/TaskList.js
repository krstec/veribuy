// src/components/TaskList.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList({ limit }) {
  // Sample task data
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      date: '09/08/24', 
      type: 'Pre-Shipment Inspection', 
      status: 'Confirmed', 
      quantity: 7,
      product: 'Upper Cabinet U2 30"',
      sku: 'UPC-U2-30',
      orderId: '#456797'
    },
    { 
      id: 2, 
      date: '14/08/24', 
      type: 'Factory Audit', 
      status: 'Pending', 
      quantity: 1,
      product: 'Upper Cabinet U2 30"',
      sku: 'BC-G1-36',
      orderId: '#456797'
    },
    { 
      id: 3, 
      date: '09/08/24', 
      type: 'Mid-Production Inspection', 
      status: 'Confirmed', 
      quantity: 1,
      product: 'Upper Cabinet U2 30"',
      sku: 'BC-G1-36',
      orderId: '#456797'
    },
    { 
      id: 4, 
      date: '19/08/24', 
      type: 'Pre-Production Inspection', 
      status: 'Confirmed', 
      quantity: 3,
      product: 'Unisex Organic Cotton',
      sku: 'REFR-2XL-CT-80G-BLK',
      orderId: '#098765'
    },
    { 
      id: 5, 
      date: '22/08/24', 
      type: 'Mid-Production Inspection', 
      status: 'Confirmed', 
      quantity: 3,
      product: 'Unisex Organic Cotton',
      sku: 'REFR-2XL-CT-80G-BLK',
      orderId: '#098765'
    },
    { 
      id: 6, 
      date: '28/08/24', 
      type: 'Pre-Shipment Inspection', 
      status: 'Confirmed', 
      quantity: 3,
      product: 'Unisex Organic Cotton',
      sku: 'REFR-2XL-CT-80G-BLK',
      orderId: '#098765'
    },
    { 
      id: 7, 
      date: '07/08/24', 
      type: 'Mid-Production Inspection', 
      status: 'Complete', 
      quantity: 7,
      product: 'Upper Cabinet U2 30"',
      sku: 'BC-G1-36',
      orderId: '#456797'
    },
    { 
      id: 8, 
      date: '29/07/24', 
      type: 'Pre-Shipment Inspection', 
      status: 'Cancelled', 
      quantity: 4,
      product: 'Perforated Shoes',
      sku: 'SHOE-PERF-BLK',
      orderId: 'PO-4567'
    },
  ]);

  // Get displayed tasks (all or limited)
  const displayedTasks = limit ? tasks.slice(0, limit) : tasks;

  // Get the appropriate badge color based on status
  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Confirmed':
        return { backgroundColor: '#4CAF50' };
      case 'Pending':
        return { backgroundColor: '#FF9800' };
      case 'Approve':
        return { backgroundColor: '#9C27B0' };
      case 'Complete':
        return { backgroundColor: '#E0E0E0' };
      case 'Cancelled':
        return { backgroundColor: '#F44336' };
      case 'In-Person':
        return { backgroundColor: '#2196F3' };
      case 'Factory-Led':
        return { backgroundColor: '#795548' };
      default:
        return { backgroundColor: '#E0E0E0' };
    }
  };

  // Get the appropriate icon based on task type
  const getTaskIcon = (type) => {
    if (type.includes('Factory Audit')) return '🏭';
    if (type.includes('Pre-Shipment')) return '📦';
    if (type.includes('Mid-Production')) return '🔧';
    if (type.includes('Pre-Production')) return '📋';
    return '📋';
  };

  return (
    <View style={styles.container}>
      {/* Filter/Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.newTaskButton}>
          <Text style={styles.newTaskButtonText}>New Task</Text>
        </TouchableOpacity>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScrollView}>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="checkmark-circle" size={16} color="white" />
            <Text style={styles.filterButtonText}>Confirmed</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#FF9800' }]}>
            <Ionicons name="time" size={16} color="white" />
            <Text style={styles.filterButtonText}>Pending</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#9C27B0' }]}>
            <Ionicons name="checkmark-done-circle" size={16} color="white" />
            <Text style={styles.filterButtonText}>Approve</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#E0E0E0' }]}>
            <Ionicons name="checkmark-done" size={16} color="white" />
            <Text style={styles.filterButtonText}>Complete</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#F44336' }]}>
            <Ionicons name="close-circle" size={16} color="white" />
            <Text style={styles.filterButtonText}>Cancelled</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Column Headers */}
      <View style={styles.columnHeaders}>
        <Text style={[styles.columnHeader, styles.columnDate]}>Date</Text>
        <Text style={[styles.columnHeader, styles.columnTask]}>Task</Text>
        <Text style={[styles.columnHeader, styles.columnProduct]}>Products/SKU</Text>
        <Text style={[styles.columnHeader, styles.columnOrder]}>Order ID</Text>
      </View>
      
      {/* Task List */}
      <ScrollView style={styles.taskList}>
        {displayedTasks.map(task => (
          <View key={task.id} style={styles.taskRow}>
            <Text style={[styles.taskCell, styles.columnDate]}>{task.date}</Text>
            
            <View style={[styles.taskCell, styles.columnTask]}>
              <View style={[styles.taskBadge, getStatusBadgeStyle(task.status)]}>
                <Text style={styles.taskIcon}>{getTaskIcon(task.type)}</Text>
                <Text style={styles.taskType}>{task.type}</Text>
              </View>
            </View>
            
            <View style={[styles.taskCell, styles.columnProduct]}>
              <View style={styles.productContainer}>
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>{task.quantity}</Text>
                </View>
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={1}>{task.product}</Text>
                  <Text style={styles.productSku}>{task.sku}</Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.taskCell, styles.columnOrder]}>{task.orderId}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  newTaskButton: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  newTaskButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filtersScrollView: {
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterButtonText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
  },
  columnHeaders: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  columnHeader: {
    fontWeight: 'bold',
    color: '#666',
  },
  columnDate: {
    width: 80,
  },
  columnTask: {
    flex: 2,
  },
  columnProduct: {
    flex: 3,
  },
  columnOrder: {
    width: 90,
    textAlign: 'right',
  },
  taskList: {
    maxHeight: 400,
  },
  taskRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  taskCell: {
    paddingHorizontal: 4,
  },
  taskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  taskIcon: {
    marginRight: 6,
  },
  taskType: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBadge: {
    width: 28,
    height: 28,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productSku: {
    fontSize: 12,
    color: '#666',
  },
});