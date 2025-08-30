import { Image, ImageProps } from 'expo-image';
import { FC, memo, useMemo, useState, useEffect } from 'react'; // Import useState and useEffect
import { ImageStyle, StyleProp } from 'react-native';

interface CustomImageProps {
  source: ImageProps['source'];
  className?: string;
  style?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
  borderRadius?: number;
  resizeMode?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string | number; // This can remain if you want a pre-load placeholder
  blurhash?: string;
}

const fallbackImage = require('@/assets/images/home/searchnotfound.png');

const CustomImage: FC<CustomImageProps> = ({
  source,
  className,
  style,
  width,
  height,
  borderRadius,
  resizeMode = 'cover',
  blurhash,
  placeholder = require('@/assets/images/auth/letsfix.png'),
  ...props
}) => {
  const [imageSource, setImageSource] = useState(source);
  const [hasError, setHasError] = useState(false); // New state to track error

  // Reset imageSource and hasError when the parent's source prop changes
  useEffect(() => {
    setImageSource(source);
    setHasError(false);
  }, [source]);

  const dynamicStyles = useMemo(
    () => ({
      ...(width && { width }),
      ...(height && { height }),
      ...(borderRadius && { borderRadius }),
    }),
    [width, height, borderRadius],
  );

  const combinedStyles: StyleProp<ImageStyle> = [dynamicStyles, style];

  // If you still want a placeholder before loading (optional)
  const isPlaceHolder = blurhash ? { blurhash } : placeholder;

  return (
    <Image
      source={hasError ? fallbackImage : imageSource}
      className={className}
      style={combinedStyles}
      contentFit={resizeMode}
      placeholder={isPlaceHolder}
      placeholderContentFit='cover'
      transition={200}
      onError={(error) => {
        setHasError(true);
      }}
      {...props}
    />
  );
};

export default memo(CustomImage);
