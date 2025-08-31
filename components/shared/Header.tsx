import { TouchableOpacity, View } from 'react-native';
import TextResponsive from './TextResponsive';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useI18n } from '@/context/I18nContext';

interface HeaderProps {
  title: string;
  withArrow?: boolean;
}

const Header = ({ title, withArrow = true }: HeaderProps) => {
  const router = useRouter();

  const { isArabic } = useI18n();

  return (
    <View className='flex-row items-center gap-2'>
      {withArrow && (
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign
            name='arrowleft'
            size={30}
            color='black'
            style={{ transform: [{ rotate: isArabic ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>
      )}

      <TextResponsive fontStyle='bold' fontSize={26}>
        {title}
      </TextResponsive>
    </View>
  );
};

export default Header;
