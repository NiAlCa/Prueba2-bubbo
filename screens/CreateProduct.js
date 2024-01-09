import { useState } from "react";
import {
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  View,
  Alert,
} from "react-native";

import appFirebase from '../config/configuracion_firebase'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase)
export default function CreateProduct(props) {

  const initialState = {
    bookName:'',
    bookAuthor:'',
  }

  const [state, setState] = useState(initialState)


  const saveProduct = async() => {
   try {
    await addDoc(collection(db, 'libros'), {
      ...state
    })

    Alert.alert('Alerta', 'Guardado con exito')
    props.navigation.navigate('List')
   } catch (e) {
    console.error(e)
   }
  }

  const handleChangeText = (value, name) => {
    setState({...state, [name]: value})
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}> Agrega un libro</Text>
      <View style={styles.inputGroup}>
        <TextInput placeholder="bookName" onChangeText={(value) => handleChangeText(value, 'bookName')} 
        value={state.bookName}/>
      </View>

      <View style={styles.inputGroup}>
        <TextInput placeholder="bookAuthor" onChangeText={(value) => handleChangeText(value, 'bookAuthor')} 
        value={state.bookAuthor}/>
      </View>

      <View>
        <Button title='Guardar Producto' onPress={saveProduct} />
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 20
  },
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
});
