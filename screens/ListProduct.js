import { ScrollView, Text, TouchableOpacity, StyleSheet, View,} from "react-native";


import appFirebase from '../config/configuracion_firebase'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";

const db = getFirestore(appFirebase);

export default function ListProduct(props) {

  const [libros, setLibros] = useState([])

  useEffect(() =>{
      const getLibros = async() =>{

        try {
          const querySnapshot = await getDocs(collection(db, 'libros'))
          const docs = []
          querySnapshot.forEach((doc)=>{
            const { bookName, bookAuthor} = doc.data()
            docs.push({
              id:doc.id,
              bookName,
              bookAuthor,
            })
          })
          setLibros(docs)
        } catch (e) {
          console.error(e);
          
        }
      }
    
      getLibros()

    
  },[libros])

  

  return(
   <ScrollView>
    <TouchableOpacity style={styles.Boton} onPress={() =>props.navigation.navigate('Create')}>
      <Text style={styles.TextoBoton}>Agregar libros</Text>
    </TouchableOpacity>

    <View>
      <Text style={styles.TextoTitulo} >Lista de los libros</Text>
    </View>

    <View>
      {
        libros.map((libro)=>(
          <TouchableOpacity key={libro.id} style={styles.BotonLista}
          onPress={()=> props.navigation.navigate('Show', { librosId: libro.id })}
          >
            <Text style={styles.TextoNombre}>{libro.bookName}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  </ScrollView>
);}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Boton: {
    backgroundColor: 'gray',
    height: 35,
    borderColor: 'black',
    borderWidth: 1
  },
  TextoBoton: {
    fontSize: 18,
    textAlign: 'center'
  },
  TextoTitulo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  TextoNombre: {
    fontSize: 16
  },
  BotonLista: {
    backgroundColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 3,
    padding: 5
  },
});
