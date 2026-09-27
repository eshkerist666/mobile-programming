import { Text } from 'expo-router/build/react-navigation';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Події коледжу</Text>

      <View style={styles.article}>
        <Text style={styles.articleTitle}>
          Українське кіно: від класики до генеративного мистецтва
        </Text>

        <Text style={styles.articleText}>
          Для студентів групи П-227 відбувся особливий захід,
          який майстерно об'єднав глибоку повагу до національної
          кіноспадщини та передові цифрові технології.
        </Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.articleTitle}>
          Урочистий початок нового навчального року в коледжі
        </Text>

        <Text style={styles.articleText}>
          1 вересня в актовій залі коледжу відбувся урочистий захід,
          присвячений зустрічі студентів першого курсу та їхньому
          знайомству з наставниками.
        </Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.articleTitle}>
          Шаную Воїнів, біжу за Героїв України
        </Text>

        <Text style={styles.articleText}>
          29 серпня 2026 року студенти та викладачі спеціальності
          «Фізична культура і спорт» взяли участь у щорічному
          Всеукраїнському патріотичному забігу
          «Шаную Воїнів, біжу за Героїв України».
        </Text>
      </View>

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