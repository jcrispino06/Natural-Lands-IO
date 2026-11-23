import { Text, View, StatusBar, FlatList, StyleSheet, Button, TouchableOpacity, TextInput, Modal} from 'react-native';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeUser, changeGroup } from './redux/account';
import { StyledButton } from './components/StyledButton';

function LoginScreen(props){
    const [inputtedUser, setInputtedUser] = useState("");
    const [inputtedPass, setInputtedPass] = useState("");
    const [loginModalVisible, setLoginVisible] = useState(false);

    function loginUser(){
        // Ask for username and password
        // Send request to node server to see if user exists in database and check password
        // if the server sends back an accepted request then 
        //      Set appropriate redux parameters relating to account
        //      go to the main screens

        if (inputtedUser != null){
            const testNewUser = {
                username:inputtedUser,
                email:"jcrispino06@gmail.com",
                firstname:"Jae",
                lastname:"Crispino",
                group:null
            }
            props.changeUser(testNewUser);
            setLoginVisible(!loginModalVisible);
            props.navigation.navigate('MainScreens');
        }
    }

    const LoginModal = (props) => {
        return (
            <Modal visible={loginModalVisible} transparent={true}>
                <View style={styles.loginView}>
                    <TextInput placeholder='Username' onChangeText={setInputtedUser} autoCapitalize='none' autoComplete='off' autoCorrect={false}/>
                    <TextInput placeholder='Password' onChangeText={setInputtedPass} autoCapitalize='none' autoComplete='off' autoCorrect={false}/>
                    <StyledButton label="Login" onPress={loginUser}/>
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.background}>
            <View style={styles.centerView}>
                <Text style={styles.title}>Welcome To The Natural Lands!</Text>
                <StyledButton label="Login" onPress={()=>{setLoginVisible(true)}}/>
                <LoginModal/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor:'#91AE6E'
    },
    button: {
        backgroundColor: '#F2F2F2',
        padding: '20%',
    },
    title: {
        flex: 1,
        fontSize: 26,
        textAlign: 'center'
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '50%',
        marginHorizontal: '25%'
    },
    loginView: {
        flex: 1,
        gap: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25
    }
})
const mapStateToProps = (state) => {
  const {account} = state;
  return {account};
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeUser,
    changeGroup
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
