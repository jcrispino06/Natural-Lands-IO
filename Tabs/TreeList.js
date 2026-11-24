import { Text, View, StatusBar, FlatList, StyleSheet, FocusAwareStatusBar, useWindowDimensions, TextInput, TouchableHighlight, Pressable, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {theme} from '../global.js'

export function TreeList({route, navigation}) {
    const {height, width, scale, fontScale} = useWindowDimensions();
    const _renderItem = data => {
        return (
            <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('TreeInfo', {id: data.item.properties.id})}}>
                <Text style={{}}>{data.item.properties.id}: Plot {data.item.properties.plot_id} {data.item.properties.common_name} {data.item.properties.status}</Text>
            </TouchableOpacity>
        )
    };
    const [moreTreeInfo, setTreeInfo] = useState(false);
    const [filterSelect, setFilterSelect] = useState(false);
    const [currentSelectedTreeID, setSelectedTree] = useState();
    const [trees, setTrees] = useState({features:[]})
    const [loading, setLoading] = useState(true);

    const getTrees = async () =>{
      const url = "https://ic-research2.eastus.cloudapp.azure.com:21963/app/trees";
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setTrees(responseJson)
        }).finally(()=>{
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(()=>{
        getTrees()
    }, [])

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
            <View style={styles.flatlistContainer}>
                {loading? <ActivityIndicator/>:
                    (<FlatList data={trees.features} keyExtractor={item => item.properties.id} renderItem={_renderItem}/>)
                }
            </View> 
            <FilterMenu/>
        </View>
    </View>
  );
}

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
        marginBottom: "21%",
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
        alignItems: 'right',
        width: '95%'
    },
    row: {
        flex: 1,
        fontSize: 20,
        padding: 10,
        width: undefined,
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
    }
}
)

