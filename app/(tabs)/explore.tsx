import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import 'nativewind';
// import { styled } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableOpacity, Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

// const StyledView = styled(View);
// const StyledText = styled(Text);

export default function TabTwoScreen() {

  const [References, setReferences]: any = useState([]);
  const [Message, setMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-1000)).current;

  const username = 'amar@sanmisha.com';
  const password = 'amar123@';


  const fetchReferences = async () => {
    try {

      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      console.log(authString);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const response = await fetch(`https://bbmoapp.bbnglobal.net/api/references`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
      });

      const data = await response.json();

      console.log(data);
      console.log(myHeaders)

      if (response.status === 200) {
        setMessage('It Worked!!!');
        console.log(data);
        setReferences(data.references);
      } else {
        setMessage('It do not Worked!!!');
        setReferences([]);
      }
    } catch (e: any) {
      console.error('JSON parse error Help', e);
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar),
      Animated.timing(sidebarAnim, {
        toValue: showSidebar ? -1000 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
  };

  const openExternalLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening external link:', err));
  };

  useEffect(() => {
    fetchReferences();
  }, [])

  return (
    <View className='flex-1 relative top-[30px] bg-gray-200'>
         <Text>coming soon</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
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
});
