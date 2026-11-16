import { Text, View, StatusBar, FlatList, StyleSheet, FocusAwareStatusBar, useWindowDimensions, TextInput, TouchableHighlight, Pressable, TouchableOpacity, Modal} from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {theme} from '../global.js'

export function TreeList({route, navigation}) {
    const {height, width, scale, fontScale} = useWindowDimensions();
    const _renderItem = data => {
        return (
	    <TouchableOpacity onPress={()=>{setTreeInput(true); setSelectedTree(data.item.tag)}}><Text style={[styles.row, {width: width*0.95, backgroundColor: ((data.item.status === 'measured') ? colors.invalid : colors.valid)}]}>
		{data.item.tag}: {data.item.nameCommon}</Text></TouchableOpacity>)
    };

    const [treeData, setTreeData] = useState(route.params.trees.data);
    const [treeInput, setTreeInput] = useState(false);
    const [filterSelect, setFilterSelect] = useState(false);
    const [currentSelectedTreeID, setSelectedTree] = useState();

    const colors = theme.colors;

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
    search: {
        flex: 1,
        flexDirection: "row",
        width: '95%',
        marginTop: 0,
        fontSize: 20,
        gap: 20
    },
    searchButtons: {
        backgroundColor: colors.button,
        fontSize: 20,
        padding: 20,
        borderRadius: 10
    },
    filterButton: {
        backgroundColor: colors.button,
        borderRadius: 10,
        padding: 20,
        textAlign: 'center',
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
    },
    }});

    const SearchBar = () => {
        return (
            <View style={styles.search}>
                <TextInput style={[styles.searchButtons, {flex: 4}]} placeholder='Search'></TextInput>
                <TouchableOpacity onPress={()=>{setFilterSelect(true)}} style={[styles.filterButton, {flex: 1}]}><Text style={{fontSize: 20, flex: 1, textAlign: 'center'}}>Filter</Text></TouchableOpacity>
            </View>
        )
    }

    const FilterMenu = () => {
        return (
            <Modal visible={filterSelect} transparent={true} style={[{flex: 1}]}>
                <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.modalView}>
                        <Text>Sort By</Text>
                        <TouchableOpacity onPress={()=>{setFilterSelect(false)}} style={styles.searchButtons}><Text>Close</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
    <View style={styles.background}>
        <View style={styles.container}>
            <SearchBar/>
            <View style={styles.flatlistContainer}><FlatList keyExtractor={item => item.tag} data={treeData} renderItem={_renderItem}/></View>
            <FilterMenu/>
        </View>
    </View>
  );
}

