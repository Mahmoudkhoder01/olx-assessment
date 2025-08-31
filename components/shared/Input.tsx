import { Fonts } from '@/constants/Fonts';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { ForwardedRef, forwardRef, ReactNode, useRef, useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Error from './Error';

export type InputProps = TextInputProps & {
  leftIcon?: (color: string) => ReactNode;
  rightIcon?: (color: string) => ReactNode;
  isPassword?: boolean;
  secureTextEntry?: boolean;
  onPressRightIcon?: () => void;
  onKeyPress?: any;
  autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters';
  clearButtonMode?: string;
  error?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
  parentClassName?: string;
  className?: string;
};

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      isPassword,
      leftIcon,
      rightIcon,
      onPressRightIcon,
      onKeyPress,
      autoCapitalize = 'sentences',
      keyboardType = 'default',
      clearButtonMode = 'while-editing',
      error,
      editable = true,
      onPress,
      parentClassName,
      ...rest
    },
    ref?: ForwardedRef<TextInput>,
  ) => {
    const { colors } = useTheme();
    const inputRef = useRef<TextInput>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(!!secureTextEntry);

    const statusColors = {
      focused: colors.primary,
      filled: '#000000',
      default: '#9E9E9E',
    };

    const iconColor = isFocused
      ? statusColors.focused
      : value
        ? statusColors.filled
        : statusColors.default;

    const togglePassword = () => setIsSecure(!isSecure);

    const handlePressOnInput = () => {
      if (inputRef.current && editable) {
        inputRef.current.focus();
      }

      if (onPress) {
        onPress();
      }
    };

    const handlePressOnRightIcon = () => {
      if (onPressRightIcon) onPressRightIcon();

      if (onPress && !onPressRightIcon) {
        onPress();
      }
    };

    return (
      <View className={`mb-4 ${parentClassName}`}>
        <TouchableWithoutFeedback onPress={handlePressOnInput}>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: isFocused ? colors.primary : 'transparent',
                backgroundColor: isFocused ? '#EFF3FF' : '#F7F7F7',
              },
            ]}
          >
            {leftIcon && <View className='mr-2'>{leftIcon(iconColor)}</View>}

            <TextInput
              ref={(node) => {
                // chain the forwarded ref with our internal ref
                (inputRef as React.MutableRefObject<TextInput | null>).current =
                  node;
                if (typeof ref === 'function') ref(node);
                else if (ref && 'current' in ref)
                  (ref as React.MutableRefObject<TextInput | null>).current =
                    node;
              }}
              style={[
                styles.input,
                {
                  fontFamily: value ? Fonts.semiBold : Fonts.regular,
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor='#BDBDBD'
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={isSecure}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType={keyboardType}
              clearButtonMode={clearButtonMode}
              onKeyPress={onKeyPress}
              autoCapitalize={isPassword ? 'none' : autoCapitalize}
              editable={editable}
              {...rest}
            />

            {isPassword && !rightIcon && (
              <TouchableOpacity onPress={togglePassword}>
                <Entypo
                  name={!isSecure ? 'eye' : 'eye-with-line'}
                  size={24}
                  color='black'
                />
              </TouchableOpacity>
            )}

            {rightIcon && (
              <TouchableOpacity
                activeOpacity={onPressRightIcon ? 0.7 : 1}
                onPress={handlePressOnRightIcon}
              >
                {rightIcon(iconColor)}
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>

        {error && <Error error={error} />}
      </View>
    );
  },
);

Input.displayName = 'Input'; // Set display name for better debugging

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  eye: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 0,
  },
});

export default Input;
