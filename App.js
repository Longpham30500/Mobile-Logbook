import { StyleSheet, Text, View , Image, Button, Alert} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{uri: "https://itechnolabs.ca/wp-content/uploads/2022/01/complete-guide-to-react-native-for-cross-platform-apps-development-itechnolabs.jpg"}}
      />
      <View style={styles.fixToText}>
        <Button
          title="Backward"
          onPress={() => Alert.alert('Backward button pressed')}
        />
        <Button
          title="Forward"
          onPress={() => Alert.alert('Forward button pressed')}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
});
