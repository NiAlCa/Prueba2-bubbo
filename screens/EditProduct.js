import { useState, useEffect } from "react";
import { Text, ScrollView, TextInput, StyleSheet, Button, View, Alert } from "react-native";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import appFirebase from '../config/configuracion_firebase';

const db = getFirestore(appFirebase);

export default function EditProduct(props) {
  const initialState = {
    id: '',
    bookName: '',
    bookAuthor: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    getOneProduct(props.route.params.librosId);
  }, []);

  const getOneProduct = async (id) => {
    try {
      const docRef = doc(db, 'libros', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const libro = docSnap.data();
        setState({ ...libro, id: docSnap.id });
      } else {
        Alert.alert('Error', 'Libro no encontrado');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateProduct = async () => {
    const docRef = doc(db, 'libros', state.id);
    await updateDoc(docRef, {
      bookName: state.bookName,
      bookAuthor: state.bookAuthor,
    });
    Alert.alert('Exito', 'Libro actualizado con éxito');
    props.navigation.navigate('List');
  };

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Editar Libro</Text>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Nombre del Libro" value={state.bookName} onChangeText={(value) => handleChangeText(value, 'bookName')} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Autor del Libro" value={state.bookAuthor} onChangeText={(value) => handleChangeText(value, 'bookAuthor')} />
      </View>
      <View>
        <Button title="Actualizar Libro" onPress={updateProduct} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      backgroundColor: '#fff', 
    },
    titulo: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333', 
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc', 
    },
    input: {
      height: 40,
      paddingLeft: 6,
      fontSize: 16,
      color: '#333', 
    },
    button: {
      marginTop: 20,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white', 
      fontSize: 18,
      textAlign: 'center',
    },
  });
  
