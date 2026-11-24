import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, Dimensions, Pressable} from 'react-native';
import MapView, { Marker, Geojson } from 'react-native-maps';
import { Location } from 'expo-location/next';
import { useState, useEffect } from 'react';
import theme from '../global.js'
import {textStyles} from '../styles.js'

export const TreeInfo = (props) => {
    const id = props.route.params.id;
    return (
    <View style={styles.background}>
        <View style={styles.container}><TouchableOpacity onPress={()=>{props.navigation.pop()}}><Text>Back</Text></TouchableOpacity></View>
        <View style={styles.container}>
            <Text style={textStyles.title}>{id}</Text>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        marginTop: 60,
        marginBottom: "21%",
        gap: 20
    }
})