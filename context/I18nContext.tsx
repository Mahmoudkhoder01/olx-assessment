/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  ReactElement,
  useContext,
  FC,
} from 'react';
import { I18nManager, NativeModules, Platform } from 'react-native';
import { I18n } from 'i18n-js';
import * as Updates from 'expo-updates';
import { translations } from '@/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface I18nContextValue {
  i18n: any;
  locale: string | any;
  changeLocale: (locale: string) => void;
}

export const I18nContext = createContext<I18nContextValue | any>(undefined);

interface I18nProviderProps {
  children: ReactNode | null;
}

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
}): ReactElement | null => {
  const [i18n, setI18n] = useState<I18n | null>(null);
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    // Load the initial locale when the component mounts
    const loadInitialLocale = async () => {
      // Read the stored language value from AsyncStorage
      const storedLang = await AsyncStorage.getItem('wayzLang');

      // Create an instance of I18n with the translations
      const i18nInstance = new I18n(translations);

      if (storedLang) {
        // Use the stored language preference if available
        i18nInstance.locale = storedLang;

        setLocale(storedLang);

        if (storedLang.includes('ar') && I18nManager.isRTL === false) {
          // Enable right-to-left layout for Arabic
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
        } else if (storedLang.includes('en') && I18nManager.isRTL === true) {
          // Disable right-to-left layout for English
          I18nManager.allowRTL(false);
          I18nManager.forceRTL(false);
        }
      } else {
        const systemLanguage = (
          (Platform.OS === 'ios'
            ? NativeModules?.SettingsManager?.settings?.AppleLocale ||
              NativeModules?.SettingsManager?.settings?.AppleLanguages[0] //iOS 13
            : NativeModules?.I18nManager?.localeIdentifier) || 'en'
        ).substring(0, 2);

        if (systemLanguage.includes('ar') && I18nManager.isRTL === false) {
          // Enable right-to-left layout for Arabic
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
          // Reload the app to apply the layout changes
        } else if (
          systemLanguage.includes('en') &&
          I18nManager.isRTL === true
        ) {
          // Disable right-to-left layout for English
          I18nManager.allowRTL(false);
          I18nManager.forceRTL(false);
          // Reload the app to apply the layout changes
        }

        // Use the device's default locale if no preference is stored
        i18nInstance.locale = systemLanguage;
        setLocale(systemLanguage);
      }

      // Enable fallback language support
      i18nInstance.enableFallback = true;
      setI18n(i18nInstance);
    };

    loadInitialLocale();
  }, []);

  const changeLocale = async (newLocale: string) => {
    try {
      if (i18n) {
        i18n.locale = newLocale;
      }

      if (newLocale.includes('ar')) {
        await AsyncStorage.setItem('wayzLang', 'ar');

        if (I18nManager.isRTL === false) {
          // Enable right-to-left layout for Arabic
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
          // Reload the app to apply the layout changes
          Updates.reloadAsync();
        }
      } else if (newLocale.includes('en')) {
        if (I18nManager.isRTL === true) {
          // Disable right-to-left layout for English
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
          // Reload the app to apply the layout changes
          Updates.reloadAsync();
        }

        await AsyncStorage.setItem('wayzLang', 'en');
      }

      setLocale(newLocale);
    } catch (error) {
      console.log('changeLocale error', error);
    }
  };

  // Compute isArabic based on the current locale
  const isArabic = locale ? locale.includes('ar') : false;

  // Wait until i18n and locale are loaded
  if (!i18n || !locale) {
    return null; // or loading indicator
  }

  // Provide the i18n context to the component tree
  return (
    <I18nContext.Provider value={{ i18n, locale, changeLocale, isArabic }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
};
