import { EventItem } from '@/types/event';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Category = EventItem['category'];

type EventFormProps = {
  onAdd: (event: EventItem) => void;
};

const categories: Category[] = ['Навчання', 'Культура', 'Спорт'];

export default function EventForm({ onAdd }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Навчання');
  const [error, setError] = useState('');

  const addEvent = () => {
    if (!title.trim() || !date.trim() || !location.trim() || !description.trim()) {
      setError('Заповніть назву, дату й час, місце та опис події.');
      return;
    }

    if (!/^\d{2}\.\d{2}, \d{2}:\d{2}$/.test(date.trim())) {
      setError('Введіть дату й час у форматі 12.10, 14:00.');
      return;
    }

    onAdd({
      id: `local-${Date.now()}`,
      title: title.trim(),
      date: date.trim(),
      location: location.trim(),
      description: description.trim(),
      category,
    });
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setError('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Додати подію</Text>

      <Text style={styles.label}>Назва</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Наприклад, День відкритих дверей"
        accessibilityLabel="Назва події"
        returnKeyType="next"
      />

      <Text style={styles.label}>Дата й час</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="12.10, 14:00"
        accessibilityLabel="Дата й час події у форматі 12.10, 14:00"
        keyboardType="numbers-and-punctuation"
        returnKeyType="next"
      />

      <Text style={styles.label}>Місце</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Наприклад, актова зала"
        accessibilityLabel="Місце проведення"
        returnKeyType="next"
      />

      <Text style={styles.label}>Опис</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Коротко розкажіть про подію"
        accessibilityLabel="Опис події"
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Категорія</Text>
      <View style={styles.categories}>
        {categories.map((item) => {
          const active = category === item;
          return (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={({ pressed }) => [
                styles.categoryButton,
                active && styles.categoryButtonActive,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {error !== '' && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}

      <Pressable
        onPress={addEvent}
        style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Text style={styles.submitText}>Додати подію</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  heading: {
    color: '#17324d',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#172b3a',
    backgroundColor: '#fbfdff',
    fontSize: 16,
  },
  descriptionInput: {
    minHeight: 96,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#b9c9d8',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  categoryButtonActive: {
    backgroundColor: '#176b5b',
    borderColor: '#176b5b',
  },
  categoryText: {
    color: '#29445c',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  error: {
    marginTop: 12,
    color: '#a12622',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  submitButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#176b5b',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.76,
  },
});
