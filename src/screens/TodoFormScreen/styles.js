import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },

  formContainer: {
    flexDirection: 'column',
   
   
   height:'100%',
    width:'100%',
    paddingTop: 10,
    paddingBottom: 10,
   
   justifyContent: 'center',
   alignItems:'center',
   
    backgroundColor:'red'
  },
  input: {
   
    borderRadius: 10,
      overflow: 'hidden',
    backgroundColor:'blue',
   width:'100%',
   padding:15,
    flex: 1,
    margin:10
  },
  button: {
    height: 47,
    borderRadius: 5,
   
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
