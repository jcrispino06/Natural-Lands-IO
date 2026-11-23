import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, Dimensions, Pressable} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo-location/next';
import { useState, useEffect } from 'react';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 42.422670
const LONGITUDE =  -76.495157
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

async function getPlots(){
  const url = "https://ic-research2.eastus.cloudapp.azure.com:21963/app/plots";
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.features);
      return responseJson.features;
    })
    .catch((error) => {
      console.error(error);
    });

}

export function MapScreen({route, navigation}) {
    const {height, width, scale, fontScale} = useWindowDimensions();

    const initialRegion = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    const [location, setLocation] = useState({latitude: 42.4175848046414, longitude: -76.4931491097811});
    const [errorMsg, setErrorMsg] = useState();
    const [plots, setPlots] = useState();

    function MarkerElement(props){
      return <Marker coordinate={props.coordinate} onPress={()=>{getPlots()}}>
              <Text>{props.title}</Text>
            </Marker>
    }

    return (
      <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}>
              <MarkerElement title="V" coordinate={location}/>
          </MapView>
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