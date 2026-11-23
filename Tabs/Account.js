import { Text, View, StatusBar, FlatList, StyleSheet, Button} from 'react-native';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeUser, changeGroup } from './redux/account';

function AccountScreen(props){

    const initColors = {
      background: '#91AE6E',
      button: '#F2F2F2',
      valid: '#689D4B',
      invalid: '#D96868'
    }
    const [theme, setTheme] = useState(initColors);
    const colors = theme;
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

  const testNewUser = {
    username:"jcrispino",
    email:"jcrispino06@gmail.com",
    firstname:"Jae",
    lastname:"Crispino",
    group:null
  }
  const testNewGroup = {group:"Awesome Group!!"};

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text>Account</Text>
        <Text>Current User: {props.account.firstname} {props.account.lastname}</Text>
        <Text>Username: {props.account.username}</Text>
        <Text>Current Group: {((props.account.group === null) ? "No Group" : props.account.group)}</Text>
        <Button title='Change User' onPress={()=>{props.navigation.navigate('LoginScreen')}}/>
        <Button title='Change Group' onPress={()=>{props.changeGroup(testNewGroup)}}/>
      </View>
    </View>
  );
};
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);