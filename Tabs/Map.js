import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, Dimensions, Pressable} from 'react-native';
import MapView, { Marker, Geojson } from 'react-native-maps';
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
    const [currTreeInfo, setCurrTree] = useState({id: null, measurements:[]})
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
          // console.log(responseJson);
          setTrees(responseJson)
        }).finally(()=>{
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const getAllTrees = async () => {
      const url = "https://ic-research2.eastus.cloudapp.azure.com:21963/app/trees";
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          setTrees(responseJson)
        }).finally(()=>{
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const getTreeInfoMeasurements = async (tree_id) => {
      const url = "https://ic-research2.eastus.cloudapp.azure.com:21963/app/trees/"+tree_id;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setCurrTree(responseJson)
        }).finally(()=>{
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const TreeInfo = (props) => {
        console.log(currTreeInfo);
    }


    useEffect(()=>{
      getPlots();
      getAllTrees();
    }, [])

    function Plots(props){
      return plots.features.map((feature)=>{
        const feature_x = feature.geometry.coordinates[1];
        const feature_y = feature.geometry.coordinates[0];
        const plot_id = feature.properties.id;
        // console.log(`${plot_id}: ${feature_x}, ${feature_y}`)
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
        return <Marker key={id} coordinate={{latitude: feature_x,longitude: feature_y}} onPress={()=>{getTreeInfoMeasurements(id)}}>
                  <View style={[{backgroundColor: "green", padding: 5}]}>
                  </View>
                </Marker>
      })
    }

    return (
      <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}>
              <Trees/>
              {/* <Plots/> */}
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