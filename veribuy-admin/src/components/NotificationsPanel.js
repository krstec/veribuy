// Project structure for Veribuy
// Admin Panel: React.js
// Mobile App: React Native

// Step-by-Step Setup

// 1. Create the Project Directory
// mkdir Veribuy
// cd Veribuy

// 2. Admin Panel (Web) Setup
// Directory: /admin
// Create a React app
// npx create-react-app admin
// cd admin
// Install dependencies (e.g., Ant Design)
// npm install antd axios react-router-dom
// Start the development server
// npm start

// 3. Mobile App (React Native) Setup
// Directory: /app
// Create a React Native app using Expo
// npx expo init app
// cd app
// Install dependencies (e.g., React Navigation)
// npm install @react-navigation/native @react-navigation/stack axios
// Start the development server
// npm start

// 4. Backend API Setup (Optional)
// Directory: /backend
// mkdir backend
// cd backend
// Initialize Node.js project
// npm init -y
// Install Express and other packages
// npm install express mongoose cors body-parser
// Create server.js and set up basic API

// 5. Testing & Deployment
// Web Admin Panel: Deploy with Vercel/Netlify
// Mobile App: Build APK/iOS app with Expo
// Backend: Deploy with services like Heroku or Render

// Development can proceed with coding and feature integration

// NotificationsPanel Component (React Native)
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsPanel({ limit }) {
  const [notifications, setNotifications] = useState([
    { id: 1, time: '2 minutes ago', message: 'Manufacturer has joined the order.', orderId: '#1029', manufacturer: 'Yekalon Ltd.', hasImage: true, imageUrl: 'https://via.placeholder.com/50' },
    { id: 2, time: '4 minutes ago', message: 'Manufacturer Connection Request', manufacturer: 'Yekalon Ltd.', hasImage: true, hasActions: true, imageUrl: 'https://via.placeholder.com/50' },
    { id: 3, time: '4 minutes ago', message: 'Task has been approved.', orderId: '#1029', taskType: 'Factory Audit', hasImage: false },
    { id: 4, time: '4 minutes ago', message: 'Task has been approved.', manufacturer: 'Yekalon Ltd.', taskType: 'Factory Audit', hasImage: true, imageUrl: 'https://via.placeholder.com/50' }
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {notifications.slice(0, limit).map(notification => (
        <View key={notification.id} style={styles.card}>
          <View style={styles.cardContent}>
            {notification.hasImage && <Image source={{ uri: notification.imageUrl }} style={styles.image} />}
            <View style={{ flex: 1 }}>
              <Text style={styles.message}>{notification.message}</Text>
              {notification.orderId && <Text style={styles.subText}>Order ID: {notification.orderId}</Text>}
              {notification.manufacturer && <Text style={styles.subText}>Manufacturer: {notification.manufacturer}</Text>}
              <Text style={styles.time}>{notification.time}</Text>
            </View>
            <TouchableOpacity onPress={() => dismissNotification(notification.id)}>
              <Ionicons name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          {notification.hasActions && (
            <View style={styles.actions}>
              <TouchableOpacity style={styles.acceptButton}><Text style={styles.buttonText}>Accept</Text></TouchableOpacity>
              <TouchableOpacity style={styles.declineButton}><Text style={styles.buttonText}>Decline</Text></TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginVertical: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  message: { fontSize: 16, fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#666' },
  time: { fontSize: 12, color: '#aaa', marginTop: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  acceptButton: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5 },
  declineButton: { backgroundColor: '#f44336', padding: 5, borderRadius: 5 },
  buttonText: { color: '#fff' }
});
