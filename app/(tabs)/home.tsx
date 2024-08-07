import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Easing, Linking,Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(-1000)).current;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar),
      Animated.timing(sidebarAnim, {
        toValue: showSidebar ? -1000 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMessagesDropdown = () => {
    setShowMessagesDropdown(!showMessagesDropdown);
  };

  const toggleAuthDropdown = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      router.navigate('/login');
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.iconButton}>
          <EvilIcons name="navicon" size={50} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{ router.navigate('(tabs)/profile') } }>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/profile.jpg')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container2}>
        <View style={styles.header2}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
            <View style={styles.picker}>
              <Text style={styles.pickerText}>Category Search</Text>
            </View>
            <View style={styles.picker}>
              <Text style={styles.pickerText}>Chapter Search</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search by Keywords"
            />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationBadge}>23</Text>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitials}>SS</Text>
            </View>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/2024.jpg')}
          />
        </View>

        <Text style={styles.welcomeText}>Welcome Savani Sangwai !!</Text>

        <View style={styles.grid}>
          <View style={[styles.card, styles.greenCard]}>
            <Text style={styles.cardValue}>₹ 4,46,39,449</Text>
            <Text style={styles.cardLabel}>BNI Business Generated</Text>
          </View>
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.cardValue}>431</Text>
            <Text style={styles.cardLabel}>BNI References Shared</Text>
          </View>
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.cardValue}>131</Text>
            <Text style={styles.cardLabel}>BNI Total Visitors</Text>
          </View>
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.cardValue}>372</Text>
            <Text style={styles.cardLabel}>BNI Total One 2 One</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>0</Text>
            <Text style={styles.cardLabel}>References Given</Text>
            <Text style={styles.cardLabel}>Self</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>₹ 17,556</Text>
            <Text style={styles.cardLabel}>Business Given</Text>
            <Text style={styles.cardLabel}>Self</Text>
          </View>
          <View style={[styles.card, styles.greenCard]}>
            <Text style={styles.cardValue}>₹ 1,92,12,066</Text>
            <Text style={styles.cardLabel}>Kalyan Business Generated</Text>
          </View>
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.cardValue}>118</Text>
            <Text style={styles.cardLabel}>Kalyan References Shared</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>16</Text>
            <Text style={styles.cardLabel}>References Received</Text>
            <Text style={styles.cardLabel}>Self</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>₹ 0</Text>
            <Text style={styles.cardLabel}>Business Received</Text>
            <Text style={styles.cardLabel}>Self</Text>
          </View>
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.cardValue}>0</Text>
            <Text style={styles.cardLabel}>Kalyan Visitors</Text>
          </View>
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.cardValue}>101</Text>
            <Text style={styles.cardLabel}>Kalyan One 2 One</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Messages</Text>
        </View>
      </ScrollView>
      <Animated.View style={[styles.sidebar, { left: sidebarAnim, backgroundColor: '#5bc0de' }]}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
          <EvilIcons name="close" size={40} color="#ffffff" />
        </TouchableOpacity>
        <Image
          style={styles.sidebarImage}
          source={require('../../assets/images/logo.png')}
        />
        <ScrollView>
          <TouchableOpacity onPress={() => router.navigate('(tabs)/home')}>
            <Text style={styles.sidebarItem}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
            <Text style={styles.sidebarItem}>References</Text>
            <EvilIcons name={showDropdown ? "chevron-up" : "chevron-down"} size={24} color="#000" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => router.navigate('/screens/givenewreference')}>
                <Text style={styles.dropdownItem}>Give New Reference</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.navigate('/screens/give_reference')}>
                <Text style={styles.dropdownItem}>Give Reference</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.navigate('/screens/Received_reference')} >
                <Text style={styles.dropdownItem}>Received Reference</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity >
            <Text style={styles.sidebarItem}>Member Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMessagesDropdown} style={styles.dropdownToggle}>
            <Text style={styles.sidebarItem}>Messages</Text>
            <EvilIcons name={showMessagesDropdown ? "chevron-up" : "chevron-down"} size={24} color="#000" />
          </TouchableOpacity>
          {showMessagesDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity >
                <Text style={styles.dropdownItem}>Message 1</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={styles.dropdownItem}>Message 2</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={styles.dropdownItem}>Message 3</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={toggleAuthDropdown} style={styles.dropdownToggle}>
            <Text style={styles.sidebarItem}>Authentication</Text>
            <EvilIcons name={showAuthDropdown ? "chevron-up" : "chevron-down"} size={24} color="#000" />
          </TouchableOpacity>
          {showAuthDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity >
                <Text style={styles.dropdownItem}>Authentication 1</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={styles.dropdownItem}>Authentication 2</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={styles.dropdownItem}>Authentication 3</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity >
            <Text style={styles.sidebarItem}>Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={styles.sidebarItem}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleLogout} >
            <Text style={styles.sidebarItem}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 30,
    flex: 1,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#5bc0de',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 50
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: '80%',
    backgroundColor: '#5bc0de',
    padding: 20,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  sidebarItem: {
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
  },
  sidebarImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 18,
    color: '#1a73e8',
  },
  dropdown: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  container2: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  header2: {
    width: 400,
    overflow: 'scroll',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  pickerText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: 200,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
  },
  notificationIcon: {
    fontSize: 24,
  },
  profileCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  profileInitials: {
    fontSize: 18,
    color: '#555',
  },
  imageContainer: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    flex: 1,
    minWidth: '45%',
  },
  greenCard: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  orangeCard: {
    backgroundColor: '#fd7e14',
    color: '#fff',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
