import CustomImage from '@/components/shared/CustomImage';
import TextResponsive from '@/components/shared/TextResponsive';
import { memo } from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
  image: string;
  title: string;
  subtitle?: string;
  priceText?: string;
  onPress?: () => void;
};

function AdItemCard({ image, title, subtitle, priceText, onPress }: Props) {
  return (
    <TouchableOpacity className='mb-4' onPress={onPress}>
      <CustomImage
        source={{ uri: image }}
        className='w-full h-[180px] rounded-[10px] mb-2 bg-[#e5e7eb]'
      />

      <TextResponsive fontSize={16} fontStyle='semiBold' numberOfLines={2}>
        {title}
      </TextResponsive>

      {subtitle ? (
        <TextResponsive fontSize={12} className='text-gray-600'>
          {subtitle}
        </TextResponsive>
      ) : null}

      {priceText ? (
        <TextResponsive fontSize={14}>{priceText}</TextResponsive>
      ) : null}
    </TouchableOpacity>
  );
}

const MemoAdItemCard = memo(AdItemCard);

MemoAdItemCard.displayName = 'AdItemCard';

export default MemoAdItemCard;
