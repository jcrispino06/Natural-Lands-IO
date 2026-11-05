import { Text, View, StatusBar, FlatList, StyleSheet} from 'react-native';

export function MapScreen() {
  return (
    <View style={Styles.container}>
      <View style={Styles.map}><Text>Map Will Go Here</Text></View>
    </View>
  );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    map: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#fcfad6"
    }
})