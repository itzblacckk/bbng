import * as React from "react";
import { Image } from "expo-image";
import { Text, View, Pressable, StyleSheet, TextInput, Linking } from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";

const Register = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
 

  const handleRegister = async () => {
    router.navigate('(tabs)/home')
  }

  return (
    <View style={styles.container}>
      <Image
        contentFit="cover"
        source={require("../app/assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subtitleText}>
      Register to access your account
      </Text>
      <View style={styles.inputContainer}>
        <Image
          contentFit="cover"
          source={require("../app/assets/user.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Full name"
          value={fullName}
          onChangeText={(e) => {
            setFullName(e);
          }}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          contentFit="cover"
          source={require("../app/assets/mail.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Valid email"
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          contentFit="cover"
          source={require("../app/assets/smartphone.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={(e) => {
            setPhoneNumber(e);
          }}
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
          placeholder="Strong password"
          secureTextEntry
          value={password}
          onChangeText={(e) =>{
            setPassword(e)
          }}
          style={styles.input}
        />
      </View>
 
      <Pressable
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Text style={styles.loginText}>
        Already a member? <Text style={styles.link} onPress={() => router.navigate('/login')}>Log In</Text>
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
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    backgroundColor:'#DCDCDC',
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 10,
    color: '#666',
    flex: 1,
  },
  link: {
    color: '#007BFF',
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
  loginText: {
    marginTop: 20,
    color: '#666',
  },
});

export default Register;
