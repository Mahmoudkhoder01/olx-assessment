import Input from '@/components/shared/Input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Input
      placeholder='Search'
      leftIcon={(color) => (
        <Ionicons name='search-outline' size={24} color={color} />
      )}
      rightIcon={(color) => <Ionicons name='filter' size={24} color={color} />}
      editable={false}
      onPress={() => router.push('/(tabs)/(home)/search')}
    />
  );
}
