import AdItemCard from '@/components/AdItemCard';
import FilterBottomSheet from '@/components/FilterBottomSheet';
import Input from '@/components/shared/Input';
import TextResponsive from '@/components/shared/TextResponsive';
import { useI18n } from '@/context/I18nContext';
import apartmentsData from '@/data/apartments.json';
import carsData from '@/data/cars.json';
import mobilesData from '@/data/mobiles.json';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

type Category = 'Cars' | 'Apartments' | 'Mobiles' | 'All';

type Filters = {
  q: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  category: Category;
};

const DEFAULT_FILTERS: Filters = { q: '', category: 'All' };

const Search = () => {
  const router = useRouter();

  const { i18n } = useI18n();

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showSheet, setShowSheet] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce query input into filters.q and simulate async fetch to drive loading state
  useEffect(() => {
    let cancelled = false;
    setIsSearching(true);
    const id = setTimeout(async () => {
      try {
        // simulate network/search latency
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (cancelled) return;
        setFilters((f) => (f.q === queryText ? f : { ...f, q: queryText }));
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [queryText]);

  const items = useMemo(() => {
    const combined = [
      ...carsData.Cars.map((c) => ({
        category: 'Cars' as const,
        id: c.id,
        title: c.title,
        price: c.price,
        location: c.location,
        image: c.image,
        onPress: () =>
          router.push({
            pathname: '/(tabs)/(home)/ad-details',
            params: { category: 'Cars', id: c.id },
          }),
      })),
      ...apartmentsData.Apartments.map((a, idx) => ({
        category: 'Apartments' as const,
        id: String(idx),
        title: a.title,
        price: a.price,
        location: a.location,
        image: a.image,
        onPress: () =>
          router.push({
            pathname: '/(tabs)/(home)/ad-details',
            params: { category: 'Apartments', idx: String(idx) },
          }),
      })),
      ...mobilesData.Mobiles.map((m) => ({
        category: 'Mobiles' as const,
        id: m.ad_external_id,
        title: m.ad_title,
        price: m.ad_price,
        location: m.ad_location_name_en,
        image: m.ad_image_url,
        onPress: () =>
          router.push({
            pathname: '/(tabs)/(home)/ad-details',
            params: { category: 'Mobiles', id: m.ad_external_id },
          }),
      })),
    ];

    const q = filters.q.trim().toLowerCase();
    return combined
      .filter((it) =>
        filters.category === 'All' ? true : it.category === filters.category,
      )
      .filter((it) => (!q ? true : it.title.toLowerCase().includes(q)))
      .filter((it) =>
        filters.location
          ? it.location.toLowerCase().includes(filters.location.toLowerCase())
          : true,
      )
      .filter((it) =>
        filters.minPrice != null ? it.price >= filters.minPrice : true,
      )
      .filter((it) =>
        filters.maxPrice != null ? it.price <= filters.maxPrice : true,
      );
  }, [filters, router]);

  const noResults = !isSearching && items.length === 0;

  return (
    <View className='flex-1'>
      <FlatList
        data={isSearching ? [] : items}
        keyExtractor={(it) => `${it.category}-${it.id}`}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <View className='px-4'>
            <Input
              placeholder={i18n.t('search_screen.search_placeholder')}
              value={queryText}
              onChangeText={setQueryText}
              leftIcon={(color) => (
                <Ionicons name='search-outline' size={24} color={color} />
              )}
              rightIcon={(color) => (
                <Ionicons name='filter' size={22} color={'#1f2937'} />
              )}
              onPressRightIcon={() => setShowSheet(true)}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View className='px-4'>
            <AdItemCard
              image={item.image}
              title={item.title}
              subtitle={item.location}
              priceText={`$${item.price}`}
              onPress={item.onPress}
            />
          </View>
        )}
        ListEmptyComponent={
          isSearching ? (
            <View className='flex-1 items-center justify-center'>
              <ActivityIndicator />
              <TextResponsive fontSize={14} className='text-gray-500 mt-2'>
                {i18n.t('search_screen.searching')}
              </TextResponsive>
            </View>
          ) : noResults ? (
            <View className='flex-1 items-center justify-center'>
              <TextResponsive fontSize={16} className='text-gray-500'>
                {i18n.t('search_screen.no_result_found')}
              </TextResponsive>
            </View>
          ) : null
        }
      />

      <FilterBottomSheet
        visible={showSheet}
        onClose={() => setShowSheet(false)}
        filters={filters}
        onApply={async (next) => {
          setFilters(next);
          if (next.q !== queryText) setQueryText(next.q ?? '');

          if (isSearching) return;

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }}
        defaultFilters={DEFAULT_FILTERS}
      />
    </View>
  );
};

export default Search;
