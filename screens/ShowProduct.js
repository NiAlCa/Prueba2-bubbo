import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'

import appFirebase from '../config/configuracion_firebase'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";

const db = getFirestore(appFirebase);


export default function ShowProduct(props) {

  const [libro, setLibro] = useState({})

  const getOneProduct = async(id) =>{
    try {
      const docRef = doc(db, 'libros', id)
      const docSnap = await getDoc(docRef)
      setLibro(docSnap.data())
    } catch (e) {
      console.error(e)
    }
  }
 
  useEffect(() => {

    getOneProduct(props.route.params.librosId)

  }, [])

  const deleteProduct = async(id)=>{ 
    await deleteDoc(doc(db,'libros', id))
    Alert.alert('exito', 'producto eliminado con exito')
    props.navigation.navigate('List')
  }

  const editProduct = (id) => {
    props.navigation.navigate('Edit', { librosId: id });
  };
  


    return (
      <View>
        <Text style={styles.titulo}>Libro</Text>
        <Text style={styles.sub}>Nombre del libro: {libro.bookName}</Text>
        <Text style={styles.sub}>Nombre del libro: {libro.bookAuthor}</Text>

        <TouchableOpacity style={styles.BotonEditar} onPress={() => editProduct(props.route.params.librosId)}>
  <Text style={styles.TextoBotonEditar}>Editar</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.BotonLista} onPress={()=>deleteProduct(props.route.params.librosId)}>
         <Text style={styles.TextoNombre}>Eliminar</Text>
      </TouchableOpacity>

        <StatusBar style="auto"/>
      </View>
    )
  }



  const styles = StyleSheet.create({
    titulo: {
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      fontSize: 20
    },
    sub: {
      fontSize: 16
    },
    TextoNombre: {
      fontSize: 16,
      textAlign: 'center',
      color: 'white'
    },
    BotonLista: {
      backgroundColor: 'red',
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      marginBottom: 3,
      padding: 5,
      marginTop: 5
    },
    BotonEditar: {
      backgroundColor: 'blue',
      padding: 10,
      marginTop: 10,
      marginBottom: 10,

    },
    TextoBotonEditar: {
      fontSize: 16,
      textAlign: 'center',
      color: 'white'
    }
    
  });
  