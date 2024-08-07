import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AnimatedNav from '@/components/navigation/NavbarAnimated';
import AnimatedNavOne from '@/components/navigation/NavAniOne';
import AnimatedNavTwo from '@/components/navigation/NavAniTwo';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{
          backgroundColor: "#5bc0de",
          height: 60,
        }
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <AnimatedNav name="home" focused={ focused } />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <AnimatedNavOne name="bell-o" focused={ focused } />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <AnimatedNavTwo name="account" focused={ focused } />
          ),
        }}
      />
    </Tabs>
  );
}
