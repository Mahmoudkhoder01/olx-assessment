import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useI18n } from '@/context/I18nContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { i18n, isArabic } = useI18n();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontFamily: isArabic ? Fonts.regularArabic : Fonts.regular,
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: i18n.t('home_screens.index'),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house.fill' color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='(menu)'
        options={{
          title: i18n.t('menu_screens.menu'),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='menucard' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
