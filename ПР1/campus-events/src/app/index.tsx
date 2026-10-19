import EventCard from '@/components/EventCard';
import { initialEvents } from '@/data/events';
import { EventItem } from '@/types/event';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Category = EventItem['category'] | 'Усі';

const categories: Category[] = [
  'Усі',
  'Навчання',
  'Культура',
  'Спорт',
];

export default function HomeScreen() {
  const [events, setEvents] = useState(initialEvents);
  const [category, setCategory] = useState<Category>('Усі');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [filterNotice, setFilterNotice] = useState('');

  const previousCategory = useRef(category);

  const visibleEvents = useMemo(() => {
    console.count('Обчислення фільтра');

    if (category === 'Усі') {
      return events;
    }

    return events.filter((event) => event.category === category);
  }, [category, events]);

  useEffect(() => {
    if (previousCategory.current === category) {
      return;
    }

    previousCategory.current = category;
    setFilterNotice(`Фільтр: ${category}`);

    const timer = setTimeout(() => {
      setFilterNotice('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [category]);

  const deleteEvent = (id: string) => {
    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );

    setFavoriteIds((previous) =>
      previous.filter((favoriteId) => favoriteId !== id)
    );
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Події коледжу</Text>

      <View style={styles.filters}>
        {categories.map((item) => {
          const isActive = category === item;

          return (
            <Pressable
              key={item}
              style={[
                styles.filterButton,
                isActive && styles.activeFilter,
              ]}
              onPress={() => setCategory(item)}
              accessibilityRole="button"
              accessibilityLabel={`Фільтр: ${item}`}
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.favoriteCount}>
        Обрано: {favoriteIds.length}
      </Text>

      {filterNotice !== '' && (
        <Text style={styles.notice}>{filterNotice}</Text>
      )}

      <ScrollView>
        {visibleEvents.length === 0 ? (
          <Text style={styles.emptyText}>
            У цій категорії поки немає подій
          </Text>
        ) : (
          visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={deleteEvent}
              isFavorite={favoriteIds.includes(event.id)}
              onToggleFavorite={() => toggleFavorite(event.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  title: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 15,
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
  },

  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },

  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#b8c2cc',
    backgroundColor: 'white',
  },

  activeFilter: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },

  filterText: {
    color: '#263238',
    fontSize: 14,
  },

  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },

  favoriteCount: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 6,
  },

  notice: {
    textAlign: 'center',
    color: '#2563eb',
    marginBottom: 6,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    color: 'gray',
    fontSize: 16,
  },
});