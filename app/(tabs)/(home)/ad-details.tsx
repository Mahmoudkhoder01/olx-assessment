import CustomImage from '@/components/shared/CustomImage';
import TextResponsive from '@/components/shared/TextResponsive';
import apartmentsData from '@/data/apartments.json';
import carsData from '@/data/cars.json';
import mobilesData from '@/data/mobiles.json';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type Category = 'cars' | 'apartments' | 'mobiles';

export default function AdDetailsScreen() {
  const params = useLocalSearchParams<{
    category?: Category;
    id?: string;
    idx?: string;
  }>();

  const { item, category } = useMemo(() => {
    const cat = params.category as Category | undefined;
    if (!cat) return { item: undefined, category: undefined };

    if (cat === 'cars') {
      const id = params.id as string | undefined;
      const found = carsData.Cars.find((c) => c.id === id);
      return { item: found, category: cat };
    }
    if (cat === 'mobiles') {
      const id = params.id as string | undefined;
      const found = mobilesData.Mobiles.find((m) => m.ad_external_id === id);
      return { item: found, category: cat };
    }
    // apartments (by index)
    const i = params.idx ? parseInt(params.idx, 10) : NaN;
    const found = Number.isFinite(i) ? apartmentsData.Apartments[i] : undefined;
    return { item: found, category: cat };
  }, [params]);

  if (!item || !category) {
    return (
      <View className='flex-1 items-center justify-center'>
        <TextResponsive fontSize={16}>Ad not found</TextResponsive>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero image and basic info depending on category */}
      {category === 'cars' && (
        <View>
          <CustomImage source={{ uri: item.image }} style={styles.hero} />

          <TextResponsive fontSize={20} fontStyle='semiBold' className='mt-2'>
            {item.title}
          </TextResponsive>

          <TextResponsive fontSize={16} className='text-gray-700'>
            ${item.price} · {item.location}
          </TextResponsive>

          {item.mileage ? (
            <TextResponsive fontSize={14} className='text-gray-500'>
              Mileage: {item.mileage}
            </TextResponsive>
          ) : null}

          {item.agent ? (
            <TextResponsive fontSize={14} className='text-gray-500'>
              Seller: {item.agent}
            </TextResponsive>
          ) : null}
        </View>
      )}

      {category === 'apartments' && (
        <View>
          <CustomImage source={{ uri: item.image }} style={styles.hero} />

          <TextResponsive fontSize={20} fontStyle='semiBold' className='mt-2'>
            {item.title}
          </TextResponsive>

          <TextResponsive fontSize={16} className='text-gray-700'>
            ${item.price} · {item.location}
          </TextResponsive>

          <TextResponsive fontSize={14} className='text-gray-500'>
            Area: {item.area} m² · Beds: {item.bedrooms} · Baths:{' '}
            {item.bathrooms}
          </TextResponsive>

          {item.agent ? (
            <TextResponsive fontSize={14} className='text-gray-500'>
              Agent: {item.agent}
            </TextResponsive>
          ) : null}
        </View>
      )}

      {category === 'mobiles' && (
        <View>
          <CustomImage
            source={{ uri: item.ad_image_url }}
            style={styles.hero}
          />

          <TextResponsive fontSize={20} fontStyle='semiBold' className='mt-2'>
            {item.ad_title}
          </TextResponsive>

          <TextResponsive fontSize={16} className='text-gray-700'>
            ${item.ad_price} · {item.ad_location_name_en}
          </TextResponsive>

          {item.ad_agent_name ? (
            <TextResponsive fontSize={14} className='text-gray-500'>
              Seller: {item.ad_agent_name}
            </TextResponsive>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
  },
});
