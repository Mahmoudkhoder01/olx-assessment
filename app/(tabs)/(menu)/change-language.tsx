import TextResponsive from '@/components/shared/TextResponsive';
import { Fonts } from '@/constants/Fonts';
import { useI18n } from '@/context/I18nContext';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type LanguageOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  fontStyle?: keyof typeof Fonts;
};

function LanguageOption({
  label,
  selected,
  onPress,
  fontStyle,
}: LanguageOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected ? styles.optionSelected : undefined,
        pressed && !selected && { opacity: 0.1, backgroundColor: 'black' },
      ]}
      accessibilityRole='button'
    >
      <View style={styles.optionRow}>
        <TextResponsive
          fontSize={16}
          fontStyle={fontStyle}
          style={selected ? styles.optionTextSelected : undefined}
        >
          {label}
        </TextResponsive>

        {selected && <TextResponsive style={styles.check}>✓</TextResponsive>}
      </View>
    </Pressable>
  );
}

export default function ChangeLanguageScreen() {
  const { locale, changeLocale } = useI18n();

  const selectEnglish = () => {
    if (locale !== 'en') changeLocale('en');
  };

  const selectArabic = () => {
    if (!locale.includes('ar')) changeLocale('ar');
  };

  return (
    <View style={styles.container}>
      <LanguageOption
        label='English'
        selected={locale === 'en'}
        onPress={selectEnglish}
        fontStyle='semiBold'
      />

      <LanguageOption
        label='العربية'
        selected={locale.includes('ar')}
        onPress={selectArabic}
        fontStyle='semiBoldArabic'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: '#E6F3FF',
    borderWidth: 1,
    borderColor: '#9CC7FF',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTextSelected: {
    color: '#005FA3',
  },
  check: {
    marginLeft: 8,
    color: '#005FA3',
    fontSize: 18,
  },
});
