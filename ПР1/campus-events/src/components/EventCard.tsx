import { EventItem } from "@/types/event";
import { Button, StyleSheet, Text, View } from "react-native";

type EventCardProps = {
  event: EventItem;
  onDelete: (id: string) => void;
};

const EventCard = ({ event, onDelete } : EventCardProps) => {
    return (
      <View style={styles.article}>
        <Text style={styles.articleTitle}>
            {event.title}
        </Text>

        <Text style={styles.articleText}>
            {event.description}
        </Text>

        <Text style={styles.articleDate}>
            {event.date}
        </Text>

        <Button
          title="Видалити"
          onPress={() => onDelete(event.id)}
        />
      </View>

    )
}

export default EventCard

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

});