import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../global.js';

export function SettingsScreen({route, navigation}) {
  const newColors = {
    background: '#ae6e6e',
    button: '#F2F2F2',
    valid: '#4b539d',
    invalid: '#d968c4'
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=>{theme.colors = newColors;}}><Text>Change Colors</Text></TouchableOpacity>
    </View>
  );
}