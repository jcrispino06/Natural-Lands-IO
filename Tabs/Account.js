import { Text, View, StatusBar, FlatList, StyleSheet} from 'react-native';
import {theme, account} from '../global.js';

export function AccountScreen({route, navigation}){

  const colors = theme.colors
  const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        marginTop: 60,
        gap: 20
    },
  })

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text>Account</Text>
        <Text>Current User: {account.displayName}</Text>
        <Text>Username: {account.username}</Text>
        <Text>Current Group: {((account.currentGroup === null) ? "No Group" : account.currentGroup)}</Text>
      </View>
    </View>
  );
};