import Header from '@/components/shared/Header';
import { useI18n } from '@/context/I18nContext';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AuthLayout = () => {
  const insets = useSafeAreaInsets();

  const { i18n } = useI18n();

  return (
    <Stack
      screenOptions={{
        header: ({ options, route }) => (
          <Header
            title={(options?.title as string) ?? ''}
            withArrow={route?.name === 'index' ? false : true}
          />
        ),
        contentStyle: {
          paddingTop: insets.top,
          marginHorizontal: 16,
        },
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />

      <Stack.Screen
        name='search'
        options={{ title: i18n.t('home_screens.search') }}
      />
    </Stack>
  );
};

export default AuthLayout;
