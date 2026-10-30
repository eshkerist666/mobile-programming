export type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  category: 'Навчання' | 'Культура' | 'Спорт';
  description: string;
};
