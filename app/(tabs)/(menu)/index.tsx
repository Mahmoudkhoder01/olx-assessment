import Options from '@/components/Options';
import { useI18n } from '@/context/I18nContext';
import { authStore } from '@/mobx/AuthStore';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export default function TabTwoScreen() {
  const router = useRouter();

  const { i18n } = useI18n();

  const { clearToken } = authStore;

  const options = [
    {
      iconFamily: 'Fontisto' as const,
      iconName: 'world-o' as const,
      text: i18n.t('menu_items.change_lang'),
      onPress: () => {
        router.push('/change-language');
      },
    },
    {
      iconFamily: 'MaterialIcons' as const,
      iconName: 'logout' as const,
      text: i18n.t('menu_items.logout.title'),
      onPress: () => {
        Alert.alert(
          i18n.t('menu_items.logout.title'),
          i18n.t('menu_items.logout.message'),
          [
            {
              text: i18n.t('menu_items.logout.cancel'),
              style: 'cancel',
            },
            {
              text: i18n.t('menu_items.logout.confirm'),
              style: 'destructive',
              onPress: () => clearToken(),
            },
          ],
        );
      },
    },
  ];

  return (
    <>
      {options.map((option, index) => (
        <Options key={index} {...option} />
      ))}
    </>
  );
}
