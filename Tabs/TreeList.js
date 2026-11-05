import { Text, View, StatusBar, FlatList, StyleSheet, FocusAwareStatusBar, useWindowDimensions, TextInput, TouchableHighlight, Pressable} from 'react-native';
import { useState } from 'react';

export function TreeList() {
    const {height, width, scale, fontScale} = useWindowDimensions();
   const _renderItem = data => {
        return (
	    <Text style={[styles.row, {width: width*0.95, backgroundColor: ((data.item.status === 'measured') ? 'red' : 'green')}]}>
		{data.item.tag}: {data.item.nameCommon}</Text>)};

    let trees = [
      {tag: '43', nameCommon: 'Red Maple', status: 'measured'},
      {tag: '44', nameCommon: 'Red Maple', status: 'measured'},
      {tag: '39', nameCommon: 'Ash', status: 'unmeasured'},
      {tag: '78', nameCommon: 'Red Oak', status: 'measured'}
    ];

    const [treeData, setTreeData] = useState(trees);

    const SearchBar = () => {
        return (
            <View style={styles.search}>
                <TextInput style={[styles.searchButtons, {flex: 2}]} placeholder='Search'></TextInput>
                <Text style={[styles.searchButtons, {flex: 1}]}>Filter</Text>
            </View>
        )
    }

    return (
    <View style={styles.background}>
        <View style={styles.container}>
            <SearchBar/>
            <View style={styles.flatlistContainer}><FlatList keyExtractor={item => item.tag} data={treeData} renderItem={_renderItem}/></View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#75b55c'
    },
    container: {
        flex: 1,
        backgroundColor: '#75b55c',
        alignItems: 'center',
        marginTop: 60,
        gap: 20
    },
    search: {
        flex: 1,
        flexDirection: "row",
        width: '95%',
        marginTop: 0,
        fontSize: 20,
        gap: 20
    },
    searchButtons: {
        backgroundColor: '#DDD',
        fontSize: 20,
        padding: 20,
        borderRadius: 10
    },
    flatlistContainer: {
        flex: 12,
        alignItems: 'center',
        width: '95%'
    },
    row: {
        flex: 1,
        fontSize: 20,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
 },
});