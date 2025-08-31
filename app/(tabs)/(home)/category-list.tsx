import AdItemCard from '@/components/AdItemCard';
import { useI18n } from '@/context/I18nContext';
import apartmentsData from '@/data/apartments.json';
import carsData from '@/data/cars.json';
import mobilesData from '@/data/mobiles.json';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

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

  const { i18n } = useI18n();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

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
      return { items: mapped, title: i18n.t('category_list.cars') };
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
      return { items: mapped, title: i18n.t('category_list.apartments') };
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
      return { items: mapped, title: i18n.t('category_list.mobiles') };
    }

    return { items: [], title: 'Category' };
  }, [category, router]);

  // Simulate async fetch on category change to drive a loading state
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [category]);

  return (
    <View className='flex-1'>
      <Stack.Screen options={{ title }} />

      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator />
        </View>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
