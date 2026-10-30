import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import { initialEvents } from '@/data/events';
import { EventItem } from '@/types/event';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
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
  const [events, setEvents] = useState<EventItem[]>(initialEvents);

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
  }, [events, category]);

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

  const addEvent = (event: EventItem) => {
    setEvents((previous) => [event, ...previous]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../../assets/images/college-events.jpg')}
          style={styles.banner}
          accessible
          accessibilityLabel="Студенти спілкуються у дворі коледжу біля будівлі"
          resizeMode="cover"
        />
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

        <EventForm onAdd={addEvent} />

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
    backgroundColor: '#f1f6f4',
  },

  content: {
    paddingBottom: 28,
  },

  banner: {
    width: '100%',
    height: 150,
  },

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    color: '#17324d',
    backgroundColor: '#ffffff',
    paddingTop: 14,
    paddingBottom: 16,
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
    backgroundColor: '#176b5b',
    borderColor: '#176b5b',
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
    color: '#176b5b',
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
