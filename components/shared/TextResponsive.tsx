import { Fonts } from '@/constants/Fonts';
import { useI18n } from '@/context/I18nContext'; // Make sure the path is correct
import { FC, ReactNode } from 'react';
import { PixelRatio, Text, TextProps } from 'react-native';

type TextResponsiveProps = TextProps & {
  children: ReactNode;
  fontSize?: number;
  style?: object;
  fontStyle?: keyof typeof Fonts; // This allows only the keys defined in Fonts
};

const TextResponsive: FC<TextResponsiveProps> = ({
  children,
  fontSize = 14,
  style,
  fontStyle = 'regular', // Default to "regular"
  ...rest
}) => {
  const fontScale = PixelRatio.getFontScale();
  const { isArabic } = useI18n(); // Get the current language preference

  const getFontSize = (size: number) => size / fontScale;

  // Determine the font family based on the fontStyle and language
  const fontFamily = isArabic
    ? Fonts[`${fontStyle}Arabic` as keyof typeof Fonts]
    : Fonts[fontStyle];

  return (
    <Text
      style={[{ fontSize: getFontSize(fontSize), fontFamily }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TextResponsive;
