import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, Dimensions, Pressable} from 'react-native';
import MapView, { Marker, Geojson } from 'react-native-maps';
import { Location } from 'expo-location/next';
import { useState, useEffect } from 'react';

const {width, height} = Dimensions.get('window');
// 42°25'11.84"N 76°29'37.84"W
const ASPECT_RATIO = width / height;
const LATITUDE = 42.4156742845761731
const LONGITUDE = -76.4908316048417808
const LATITUDE_DELTA = 0.0279374839377;
const LONGITUDE_DELTA = 0.0158212023713;
const SPACE = 0.01;

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
    const [plots, setPlots] = useState({features:[]});
    const [trees, setTrees] = useState({features:[]});
    const [loading, setLoading] = useState(true);

    const getPlots = async () =>{
      const url = "https://ic-research2.eastus.cloudapp.azure.com:21963/app/plots";
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setPlots(responseJson)
        }).finally(()=>{
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const getPlotTrees = async (plot_id) => {
      const url = "https://ic-research2.eastus.cloudapp.azure.com:21963/app/plots/"+plot_id+"/trees";
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setTrees(responseJson)
        }).finally(()=>{
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }


    useEffect(()=>{
      getPlots();
    }, [])

    function Plots(props){
      return plots.features.map((feature)=>{
        const feature_x = feature.geometry.coordinates[1];
        const feature_y = feature.geometry.coordinates[0];
        const plot_id = feature.properties.id;
        console.log(`${plot_id}: ${feature_x}, ${feature_y}`)
        return <Marker key={plot_id} coordinate={{latitude: feature_x,longitude: feature_y}} onPress={()=>{getPlotTrees(plot_id)}}>
                  <View style={[{backgroundColor: "white"}, styles.plotMarker]}>
                    <Text>{plot_id}</Text>
                  </View>
                </Marker>
      })
    }

    function Trees(props){
      return trees.features.map((feature)=>{
        const feature_x = feature.geometry.coordinates[1];
        const feature_y = feature.geometry.coordinates[0];
        const id = feature.properties.id;
        // console.log(`${id}: ${feature_x}, ${feature_y}`)
        return <Marker key={id} coordinate={{latitude: feature_x,longitude: feature_y}}>
                  <View style={[{backgroundColor: "green", padding: 5, borderRadius: "100%"}]}>
                  </View>
                </Marker>
      })
    }

    return (
      <View style={styles.container}>
          <MapView style={styles.map}
            region={initialRegion}
            showsUserLocation={true}
            mapType='hybrid'
            showsCompass="true">
              <Trees/>
              <Plots/>
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
    plotMarker: {
      padding: 10,
      borderRadius: '100%'
    }
})