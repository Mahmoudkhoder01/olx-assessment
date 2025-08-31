import Input from '@/components/shared/Input';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Search = () => {
  return (
    <KeyboardAwareScrollView>
      <Input
        placeholder='Search'
        leftIcon={(color) => (
          <Ionicons name='search-outline' size={24} color={color} />
        )}
        rightIcon={(color) => (
          <Ionicons name='filter' size={24} color={color} />
        )}
      />
    </KeyboardAwareScrollView>
  );
};

export default Search;
