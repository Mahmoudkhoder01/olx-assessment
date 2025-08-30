import { Fonts } from '@/constants/Fonts';
import { useTheme } from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import TextResponsive from './TextResponsive';
import { FC } from 'react';

type ButtonPropsComponent = {
  title: string;
  onPress: () => void;
  bold?: boolean;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
  width?: number;
  className?: string;
  isValid?: boolean;
  isLoading?: boolean;
};

const Button: FC<ButtonPropsComponent> = ({
  title,
  onPress,
  bold = false,
  style,
  fontSize = 15,
  width,
  className,
  isValid = true,
  isLoading = false,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    if (isValid) onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={isValid || isLoading ? 0.7 : 1}
      style={{ width: width || '100%' }}
      disabled={!isValid || isLoading}
    >
      <View
        style={[
          styles.button,
          isValid && styles.validStyle,
          {
            backgroundColor: isValid ? colors.primary : '#D0DEEB',
          },
          style,
        ]}
        className={className}
      >
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <TextResponsive
            fontSize={fontSize}
            style={[
              styles.text,
              {
                fontFamily: bold ? Fonts.bold : Fonts.semiBold,
              },
            ]}
          >
            {title}
          </TextResponsive>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginHorizontal: 30,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
  },
  validStyle: {
    shadowColor: '#0059AB',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
  },
});
