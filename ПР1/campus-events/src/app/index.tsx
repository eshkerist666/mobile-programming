import EventCard from '@/components/EventCard';
import { initialEvents } from '@/data/events';
import { Text } from 'expo-router/build/react-navigation';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';



export default function HomeScreen() {
  const [events, setEvents] = useState(initialEvents)

  const deleteEvent = (id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id))
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Події коледжу</Text>

      <ScrollView>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onDelete={deleteEvent}/>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 23,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 15,
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
  },

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
});