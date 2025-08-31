import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import TextResponsive from '@/components/shared/TextResponsive';
import { useI18n } from '@/context/I18nContext';
import { authStore } from '@/mobx/AuthStore';
import { Entypo } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SecureStore from 'expo-secure-store';

interface SignInData {
  user_name: string; // Email or Username
  password: string;
}

const Index = () => {
  const { i18n } = useI18n();

  const { setToken } = authStore;

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<SignInData>({
    user_name: '',
    password: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInData, string>>
  >({});

  // Static credentials (data source: static only)
  const STATIC_CREDENTIALS = {
    username: 'olx_usr1',
    password: 'olx_pass',
  };

  // Simulate retrieving data using a Promise (async)
  const authenticate = (data: SignInData): Promise<void> => {
    return new Promise((resolve, reject) => {
      // simulate network latency
      setTimeout(() => {
        if (
          data.user_name === STATIC_CREDENTIALS.username &&
          data.password === STATIC_CREDENTIALS.password
        ) {
          resolve();
        } else {
          reject(new Error(i18n.t('sign_in.invalid_credentials')));
        }
      }, 700);
    });
  };

  const inputFields = [
    {
      key: 'user_name',
      placeholder: i18n.t('sign_in.user_name.placeholder'),
      keyboardType: 'default',
      autoCapitalize: 'none',
      secureTextEntry: false,
      isPassword: false,
      leftIcon: (color: string) => (
        <Entypo name='user' size={24} color={color} />
      ),
    },
    {
      key: 'password',
      placeholder: i18n.t('sign_in.password.placeholder'),
      keyboardType: 'default',
      autoCapitalize: 'none',
      secureTextEntry: true,
      isPassword: true,
      leftIcon: (color: string) => (
        <Entypo name='lock' size={24} color={color} />
      ),
    },
  ];

  const handleChangeText = (key: keyof SignInData, value: string) => {
    setForm((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: '', // Clear the error when the user starts typing again
    }));
  };

  const handleSubmit = () => {
    // basic client-side validation
    const newErrors: Partial<Record<keyof SignInData, string>> = {};

    if (!form.user_name || !form.user_name.trim()) {
      newErrors.user_name = i18n.t('sign_in.user_name.required');
    } else if (form.user_name.trim().length < 3) {
      newErrors.user_name = i18n.t('sign_in.user_name.invalid');
    }

    if (!form.password) {
      newErrors.password = i18n.t('sign_in.password.required');
    } else if (form.password.length < 8) {
      newErrors.password = i18n.t('sign_in.password.invalid');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    authenticate(form)
      .then(async () => {
        setIsLoading(false);
        // generate a simple dummy access token
        const token = `token_${Date.now()}`;

        setToken(token);

        await SecureStore.setItemAsync('accessToken', token);
      })
      .catch((err: Error) => {
        setIsLoading(false);
        // map localized auth error to both fields for visibility
        const message =
          i18n.t('sign_in.invalid_credentials') ||
          err.message ||
          'Invalid username or password';

        setErrors({ user_name: message, password: message });
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TextResponsive fontSize={32} fontStyle='bold'>
        {i18n.t('sign_in.title')}
      </TextResponsive>

      {inputFields.map((field, index) => (
        <Input
          key={index}
          value={form[field.key as keyof SignInData]}
          onChangeText={(text) =>
            handleChangeText(field.key as keyof SignInData, text)
          }
          placeholder={field.placeholder}
          secureTextEntry={field.secureTextEntry}
          isPassword={field.isPassword}
          leftIcon={field.leftIcon}
          error={errors[field.key as keyof SignInData]}
          editable={!isLoading}
        />
      ))}

      <Button
        title={i18n.t('sign_in.button')}
        onPress={handleSubmit}
        isLoading={isLoading}
        isValid={!!form.user_name && form.password.length > 0}
      />
    </KeyboardAwareScrollView>
  );
};

export default observer(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
});
