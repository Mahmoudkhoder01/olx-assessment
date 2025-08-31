import { TouchableOpacity, useColorScheme, View } from 'react-native';
import TextResponsive from './shared/TextResponsive';
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useI18n } from '@/context/I18nContext';

type IconFamily =
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Ionicons'
  | 'Fontisto';

const iconFamilies = {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Fontisto,
};

interface OptionsProps {
  text: string;
  onPress: () => void;
  iconFamily: IconFamily;
  iconName: string;
}

const Options = ({ text, onPress, iconFamily, iconName }: OptionsProps) => {
  const scheme = useColorScheme();

  const { isArabic } = useI18n();

  const IconComponent = iconFamilies[iconFamily];

  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex-row justify-between mb-2'
    >
      <View className='flex-row items-center gap-2'>
        <IconComponent
          name={iconName}
          size={30}
          color={Colors[scheme ?? 'light'].primary}
        />

        <TextResponsive fontSize={20} fontStyle='medium'>
          {text}
        </TextResponsive>
      </View>

      <MaterialIcons
        name='keyboard-arrow-right'
        size={40}
        color='black'
        style={{
          transform: [{ rotate: isArabic ? '180deg' : '0deg' }],
        }}
      />
    </TouchableOpacity>
  );
};

export default Options;
