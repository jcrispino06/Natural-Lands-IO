import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, Dimensions, Pressable} from 'react-native';
import MapView from 'react-native-maps';
import { Location } from 'expo-location/next';
import { useState, useEffect } from 'react';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 42.422670
const LONGITUDE =  -76.495157
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export function MapScreen({route, navigation}) {
    const {height, width, scale, fontScale} = useWindowDimensions();
    const treeData = route.params.treeData;
    const colors = route.params.colors;

    const initialRegion = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

      getCurrentLocation();
    }, []);

    return (
      <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
          />
          <Text onPress={async ()=>{getCurrentLocation()}}>{JSON.stringify(location)}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    map: {
      width: '100%',
      height: '100%',
    },
    flatlistContainer: {
        flex: 12,
        alignItems: 'center',
        width: '95%'
    },
})