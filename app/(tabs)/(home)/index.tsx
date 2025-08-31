import CustomImage from '@/components/shared/CustomImage';
import Input from '@/components/shared/Input';
import TextResponsive from '@/components/shared/TextResponsive';
import apartmentsData from '@/data/apartments.json';
import carsData from '@/data/cars.json';
import mobilesData from '@/data/mobiles.json';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

type SectionKey = 'cars' | 'apartments' | 'mobiles';

const SECTIONS: { key: SectionKey; title: string }[] = [
  { key: 'cars', title: 'Cars' },
  { key: 'apartments', title: 'Apartments' },
  { key: 'mobiles', title: 'Mobiles' },
];

const CATEGORY_ICONS: {
  key: SectionKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { key: 'cars', label: 'Cars', icon: 'car-sport-outline' },
  { key: 'apartments', label: 'Homes', icon: 'home-outline' },
  { key: 'mobiles', label: 'Mobiles', icon: 'phone-portrait-outline' },
];

function SectionRow({ sectionKey }: { sectionKey: SectionKey }) {
  if (sectionKey === 'cars') {
    return (
      <FlatList
        horizontal
        data={carsData.Cars}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rowContainer}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <CustomImage
              source={{ uri: item.image }}
              style={styles.cardImage}
            />
            <TextResponsive
              fontSize={14}
              fontStyle='semiBold'
              numberOfLines={1}
            >
              {item.title}
            </TextResponsive>
            <TextResponsive fontSize={12}>
              ${item.price} · {item.location}
            </TextResponsive>
          </Pressable>
        )}
      />
    );
  }
  if (sectionKey === 'apartments') {
    return (
      <FlatList
        horizontal
        data={apartmentsData.Apartments}
        keyExtractor={(item, idx) => `${item.title}-${idx}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rowContainer}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <CustomImage
              source={{ uri: item.image }}
              style={styles.cardImage}
            />
            <TextResponsive
              fontSize={14}
              fontStyle='semiBold'
              numberOfLines={2}
            >
              {item.title}
            </TextResponsive>
            <TextResponsive fontSize={12}>
              {item.area} m² · ${item.price}
            </TextResponsive>
          </Pressable>
        )}
      />
    );
  }
  // mobiles
  return (
    <FlatList
      horizontal
      data={mobilesData.Mobiles}
      keyExtractor={(item) => item.ad_external_id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.rowContainer}
      renderItem={({ item }) => (
        <Pressable style={styles.card}>
          <CustomImage
            source={{ uri: item.ad_image_url }}
            style={styles.cardImage}
          />
          <TextResponsive fontSize={14} fontStyle='semiBold' numberOfLines={2}>
            {item.ad_title}
          </TextResponsive>
          <TextResponsive fontSize={12}>
            {item.ad_location_name_en} · ${item.ad_price}
          </TextResponsive>
        </Pressable>
      )}
    />
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const renderHeader = () => (
    <View>
      <Input
        placeholder='Search'
        leftIcon={(color) => (
          <Ionicons name='search-outline' size={24} color={color} />
        )}
        rightIcon={(color) => (
          <Ionicons name='filter' size={24} color={color} />
        )}
        editable={false}
        onPress={() => router.push('/(tabs)/(home)/search')}
      />

      <View className='flex-row items-center justify-between'>
        <TextResponsive fontSize={18} fontStyle='semiBold'>
          All Categories
        </TextResponsive>
        <TextResponsive
          fontSize={15}
          fontStyle='semiBold'
          className='text-blue-500 underline'
        >
          See all
        </TextResponsive>
      </View>

      <FlatList
        data={CATEGORY_ICONS}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={styles.categoryIconCircle}>
              <Ionicons name={item.icon} size={22} color={'#1f2937'} />
            </View>
            <TextResponsive fontSize={12}>{item.label}</TextResponsive>
          </View>
        )}
      />
    </View>
  );

  return (
    <FlatList
      data={SECTIONS}
      keyExtractor={(item) => item.key}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <View className='mt-3'>
          <View className='flex-row items-center justify-between mb-2'>
            <TextResponsive fontSize={18} fontStyle='semiBold'>
              {item.title}
            </TextResponsive>
            <TextResponsive fontSize={14} className='text-blue-500 underline'>
              See all
            </TextResponsive>
          </View>
          <SectionRow sectionKey={item.key} />
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  categoriesRow: {
    paddingVertical: 8,
  },
  categoryItem: {
    width: 84,
    alignItems: 'center',
    gap: 6,
  },
  categoryIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    paddingBottom: 12,
  },
  rowContainer: {
    paddingRight: 12,
  },
  card: {
    width: 170,
    marginRight: 12,
  },
  cardImage: {
    width: '100%',
    height: 110,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#e5e7eb',
  },
});
