import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { I18nProvider } from '@/context/I18nContext';
import { authStore } from '@/mobx/AuthStore';
import { observer } from 'mobx-react';

const RootLayout = observer(() => {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
    CairoRegular: require('../assets/fonts/Cairo-Regular.ttf'),
    CairoMedium: require('../assets/fonts/Cairo-Medium.ttf'),
    CairoSemiBold: require('../assets/fonts/Cairo-SemiBold.ttf'),
    CairoBold: require('../assets/fonts/Cairo-Bold.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const { accessToken } = authStore;

  const hasToken = !!accessToken;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <I18nProvider>
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
            redirect={!hasToken}
          />

          <Stack.Screen
            name='(auth)'
            options={{ headerShown: false }}
            redirect={hasToken}
          />

          <Stack.Screen name='+not-found' />
        </Stack>
      </I18nProvider>
      <StatusBar style='auto' />
    </ThemeProvider>
  );
});

export default RootLayout;
