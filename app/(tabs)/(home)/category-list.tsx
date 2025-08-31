import AdItemCard from '@/components/AdItemCard';
import apartmentsData from '@/data/apartments.json';
import carsData from '@/data/cars.json';
import mobilesData from '@/data/mobiles.json';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

type Category = 'cars' | 'apartments' | 'mobiles';

type UnifiedItem = {
  id: string;
  title: string;
  subtitle?: string;
  priceText?: string;
  image: string;
  onPress: () => void;
};

export default function CategoryListScreen() {
  const { category } = useLocalSearchParams<{ category?: Category }>();
  const router = useRouter();

  const { items, title } = useMemo(() => {
    const cat = category as Category | undefined;

    if (cat === 'cars') {
      const mapped: UnifiedItem[] = carsData.Cars.map((c) => ({
        id: c.id,
        title: c.title,
        subtitle: c.location,
        priceText: `$${c.price}`,
        image: c.image,
        onPress: () =>
          router.push({
            pathname: '/(tabs)/(home)/ad-details',
            params: { category: 'cars', id: c.id },
          }),
      }));
      return { items: mapped, title: 'Cars' };
    }

    if (cat === 'apartments') {
      const mapped: UnifiedItem[] = apartmentsData.Apartments.map((a, idx) => ({
        id: String(idx),
        title: a.title,
        subtitle: `${a.location} · ${a.area} m²`,
        priceText: `$${a.price}`,
        image: a.image,
        onPress: () =>
          router.push({
            pathname: '/(tabs)/(home)/ad-details',
            params: { category: 'apartments', idx: String(idx) },
          }),
      }));
      return { items: mapped, title: 'Apartments' };
    }

    if (cat === 'mobiles') {
      const mapped: UnifiedItem[] = mobilesData.Mobiles.map((m) => ({
        id: m.ad_external_id,
        title: m.ad_title,
        subtitle: m.ad_location_name_en,
        priceText: `$${m.ad_price}`,
        image: m.ad_image_url,
        onPress: () =>
          router.push({
            pathname: '/(tabs)/(home)/ad-details',
            params: { category: 'mobiles', id: m.ad_external_id },
          }),
      }));
      return { items: mapped, title: 'Mobiles' };
    }
    return { items: [], title: 'Category' };
  }, [category, router]);

  return (
    <View className='flex-1'>
      <Stack.Screen options={{ title }} />

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        windowSize={6}
        maxToRenderPerBatch={12}
        updateCellsBatchingPeriod={16}
        removeClippedSubviews
        renderItem={({ item }) => (
          <AdItemCard
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            priceText={item.priceText}
            onPress={item.onPress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
