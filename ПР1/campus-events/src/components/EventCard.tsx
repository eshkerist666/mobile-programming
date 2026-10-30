import { EventItem } from '@/types/event';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type EventCardProps = {
  event: EventItem;
  onDelete: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const EventCard = ({
  event,
  onDelete,
  isFavorite,
  onToggleFavorite,
}: EventCardProps) => {
  return (
    <View style={styles.article}>
      <Text style={styles.articleTitle}>
        {event.title}
      </Text>

      <Text style={styles.category}>
        {event.category}
      </Text>

      <Text style={styles.articleText}>
        {event.description}
      </Text>

      <Text style={styles.articleDate}>
        {event.date}
      </Text>

      {event.location ? (
        <Text style={styles.location}>Місце: {event.location}</Text>
      ) : null}

      <Pressable
        style={[
          styles.favoriteButton,
          isFavorite && styles.favoriteActive,
        ]}
        onPress={onToggleFavorite}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite
            ? `Прибрати ${event.title} з обраного`
            : `Додати ${event.title} в обране`
        }
      >
        <Text
          style={[
            styles.favoriteText,
            isFavorite && styles.favoriteTextActive,
          ]}
        >
          {isFavorite
            ? 'Прибрати з обраного'
            : 'В обране'}
        </Text>
      </Pressable>

      <Button
        title="Видалити"
        color="#dc2626"
        onPress={() => onDelete(event.id)}
      />
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  article: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
  },

  articleTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  category: {
    color: '#2563eb',
    fontSize: 13,
    marginBottom: 8,
  },

  articleText: {
    fontSize: 16,
    lineHeight: 23,
  },

  articleDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 10,
    marginBottom: 10,
  },

  location: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
  },

  favoriteButton: {
    padding: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563eb',
    alignItems: 'center',
    marginBottom: 10,
  },

  favoriteActive: {
    backgroundColor: '#2563eb',
  },

  favoriteText: {
    color: '#2563eb',
    fontWeight: '600',
  },

  favoriteTextActive: {
    color: 'white',
  },
});
