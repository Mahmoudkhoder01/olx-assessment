import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AuthLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 16,
          marginHorizontal: 16,
        },
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default AuthLayout;
