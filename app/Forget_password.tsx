import * as React from "react";
import { Image } from "expo-image";
import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    // Add your reset password logic here
    alert('Password reset link has been sent to your email');
    router.navigate('/login');
  }

  return (
    <View style={styles.container}>
      <Image
        contentFit="cover"
        source={require("../app/assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Forget Password</Text>
      <Text style={styles.subtitleText}>
        Enter your email to reset your password
      </Text>
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
      <Pressable
        style={styles.button}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Forget Password</Text>
      </Pressable>
      <Text style={styles.loginText}>
        Remembered your password? <Text style={styles.link} onPress={() => router.navigate('/login')}>Log In</Text>
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
    textAlign: 'center',
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
  link: {
    color: '#007BFF',
  },
});

export default ForgetPassword;
