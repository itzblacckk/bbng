import * as React from "react";
import 'nativewind';
import { Image } from "expo-image";
import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Member {
  id: string;
  name: string;
  gender: string;
  date_of_birth: string;
  mobile_1: string;
  mobile_2: string;
  address_line_1: string;
  address_line_2: string;
  pincode: string;
  organization_name: string;
  business_tagline: string;
  organization_mobile: string;
  organization_email: string;
  organization_address_line_1: string;
  organization_address_line_2: string;
  organization_city_id: string;
  organization_pincode: string;
  organization_description: string;
  profile_pic: string | null;
}

interface ApiResponse {
  member: {
    Member: Member;
  };
  message: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [eyeClose, setEyeClose] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<Member | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogin = async () => {
    if (username !== '' && password !== '') {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const res = await fetch('https://bbmoapp.bbnglobal.net/api/users/login', {
        method: 'POST',
        headers: myHeaders,
      });

      if (res.status === 200) {
        const data: ApiResponse = await res.json();
        const memberData = data.member.Member;
        const name = memberData.name;

        if (name) {
          setIsLogged(true);
          setMessage(name);
          setUserData(memberData); // Save user data
          await AsyncStorage.setItem('userData', JSON.stringify(memberData)); // Store user data
          setTimeout(() => {
            router.navigate('/(tabs)/home');
          }, 2500);
        } else {
          setIsLogged(false);
          alert('Login Unsuccessful');
        }
      } else {
        setTimeout(() => {
          alert('Login Unsuccessful');
        }, 2500);
      }
    } else {
      setTimeout(() => {
        alert('Please Fill the fields');
      }, 2000);
    }
  };

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

  return (
    <View style={styles.container}>
      <Image
        contentFit="cover"
        source={require("../app/assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subtitleText}>Sign in to access your account</Text>
      {isLogged && (
        <View style={styles.messageContainer}>
          <Text>{message}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Image
          contentFit="cover"
          source={require("../app/assets/mail.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter your email"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          contentFit="cover"
          source={require("../app/assets/lock.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={!eyeClose}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <FontAwesome
          name={eyeClose ? "eye" : "eye-slash"}
          size={15}
          color="gray"
          onPress={() => setEyeClose(!eyeClose)}
        />
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.forgetPasswordText} onPress={() => router.navigate('/Forget_password')}>
        Forget password?
      </Text>
      <Text style={styles.registerText}>
        New Member? <Text style={styles.link} onPress={() => router.navigate('/Register')}>Register</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  messageContainer: {
    width: 250,
    height: 40,
    backgroundColor: '#DFF0D8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#5bc0de',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgetPasswordText: {
    marginTop: 20,
    color: '#1a73e8',
  },
  registerText: {
    marginTop: 20,
    color: '#666',
  },
  link: {
    color: '#007BFF',
  },
});

export default Login;
