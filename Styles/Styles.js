import { StyleSheet, StatusBar, Button } from 'react-native';

const styles = StyleSheet.create({
    view: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 40,
      alignItems: 'center',
    },
    container: {
      flexDirection: 'row', 
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
        padding: 16,
    },
    header: {
      fontSize: 24,
      color: 'lightblue',
      marginTop: 40,
      textAlign: 'center',
    },
    flatlist: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 24,
        fontSize: 24,
    },

    flatlistText: {
      fontSize: 16,
      padding: 4,
      margin: 4,   
    },
    form: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 0,
        padding: 4,
        width: '70%',
      },
     
      button: {
        width: '20%',
        height: 50,
        backgroundColor: 'lightblue',
        padding: 0,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    buttonText: {
        color: 'white',
    },   

});

export default styles;