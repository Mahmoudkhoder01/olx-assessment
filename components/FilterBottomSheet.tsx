import BottomSheet from '@/components/BottomSheet';
import TextResponsive from '@/components/shared/TextResponsive';
import { useI18n } from '@/context/I18nContext';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Input from './shared/Input';

type Category = 'Cars' | 'Apartments' | 'Mobiles' | 'All';

type Filters = {
  q: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  category: Category;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  filters: Filters;
  onApply: (next: Filters) => Promise<void>;
  defaultFilters: Filters;
};

const FilterBottomSheet = ({
  visible,
  onClose,
  filters,
  onApply,
  defaultFilters,
}: Props) => {
  const { i18n } = useI18n();

  const [draft, setDraft] = useState<Filters>(filters);
  const [isApplying, setIsApplying] = useState(false);

  // Reset draft when sheet opens or filters change
  useEffect(() => {
    if (visible) setDraft(filters);
  }, [visible, filters]);

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View className='py-2'>
        <TextResponsive fontSize={16} fontStyle='semiBold'>
          {i18n.t('filter_bottom_sheet.title')}
        </TextResponsive>

        <View className='mt-3'>
          <TextResponsive fontSize={14} className='mb-1'>
            {i18n.t('filter_bottom_sheet.location.label')}
          </TextResponsive>

          <Input
            placeholder={i18n.t('filter_bottom_sheet.location.placeholder')}
            value={draft.location}
            editable={!isApplying}
            onChangeText={(text) => setDraft((f) => ({ ...f, location: text }))}
          />
        </View>

        <View className='mt-1 flex-row gap-3'>
          <View className='flex-1'>
            <TextResponsive fontSize={14} className='mb-1'>
              {i18n.t('filter_bottom_sheet.min_price')}
            </TextResponsive>

            <Input
              placeholder='0'
              keyboardType='numeric'
              value={draft.minPrice?.toString()}
              editable={!isApplying}
              onChangeText={(text) =>
                setDraft((f) => ({
                  ...f,
                  minPrice: text ? Number(text) : undefined,
                }))
              }
            />
          </View>

          <View className='flex-1'>
            <TextResponsive fontSize={14} className='mb-1'>
              {i18n.t('filter_bottom_sheet.max_price')}
            </TextResponsive>

            <Input
              placeholder='100000'
              keyboardType='numeric'
              value={draft.maxPrice?.toString()}
              editable={!isApplying}
              onChangeText={(text) =>
                setDraft((f) => ({
                  ...f,
                  maxPrice: text ? Number(text) : undefined,
                }))
              }
            />
          </View>
        </View>

        <View className='mt-1'>
          <TextResponsive fontSize={14} className='mb-1'>
            {i18n.t('filter_bottom_sheet.category')}
          </TextResponsive>

          <View className='flex-row flex-wrap gap-2'>
            {(['All', 'Cars', 'Apartments', 'Mobiles'] as Category[]).map(
              (cat) => (
                <Pressable
                  key={cat}
                  disabled={isApplying}
                  onPress={() => setDraft((f) => ({ ...f, category: cat }))}
                  className={`px-3 py-2 rounded-full ${
                    draft.category === cat ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                >
                  <TextResponsive
                    fontSize={13}
                    className={
                      draft.category === cat ? 'text-white' : 'text-gray-800'
                    }
                  >
                    {(() => {
                      switch (cat) {
                        case 'All':
                          return i18n.t('filter_bottom_sheet.all');
                        case 'Cars':
                          return i18n.t('filter_bottom_sheet.cars');
                        case 'Apartments':
                          return i18n.t('filter_bottom_sheet.apartments');
                        case 'Mobiles':
                          return i18n.t('filter_bottom_sheet.mobiles');
                        default:
                          return cat;
                      }
                    })()}
                  </TextResponsive>
                </Pressable>
              ),
            )}
          </View>
        </View>

        <View className='mt-4 flex-row items-center'>
          <Pressable
            className='bg-[#E5E7EB] items-center justify-center py-2 px-6 rounded-lg mr-4'
            disabled={isApplying}
            onPress={() => setDraft(defaultFilters)}
          >
            <TextResponsive fontSize={14} className='text-gray-800'>
              {i18n.t('filter_bottom_sheet.reset')}
            </TextResponsive>
          </Pressable>

          <Pressable
            className={`bg-[#3B82F6] items-center justify-center py-2 px-6 rounded-lg ${isApplying ? 'opacity-60' : ''}`}
            disabled={isApplying}
            onPress={async () => {
              try {
                setIsApplying(true);
                await onApply(draft);
                onClose();
              } finally {
                setIsApplying(false);
              }
            }}
          >
            {isApplying ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <TextResponsive fontSize={14} className='text-white'>
                {i18n.t('filter_bottom_sheet.apply')}
              </TextResponsive>
            )}
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
};

export default FilterBottomSheet;
