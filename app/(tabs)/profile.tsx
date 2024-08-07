import * as React from "react";
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


interface Member {
  id: string;
  name: string;
  profile_pic: string | null;
  organization_name: string;
  business_tagline: string;
  organization_description: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = React.useState<Member | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        const parsedUserData: Member = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
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

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          {userData.profile_pic ? (
            <Image
              source={{ uri: userData.profile_pic }}
              style={styles.profilePic}
            />
          ) : (
            <Image
              source={require("../../assets/images/profile.jpg")}
              style={styles.profilePic}
            />
          )}
          <View style={styles.info}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.tagline}>{userData.business_tagline}</Text>
            <Text style={styles.organization}>{userData.organization_name}</Text>
            <Text style={styles.description}>{userData.organization_description}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  profilePic: {
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.25,
    borderRadius: (Dimensions.get('window').width * 0.25) / 2,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  info: {
    flex: 1,
    marginTop:50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 5,
  },
  organization: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
