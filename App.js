

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ListProduct from './screens/ListProduct';
import CreateProduct from './screens/CreateProduct';
import ShowProduct from './screens/ShowProduct';
import EditProduct from './screens/EditProduct';



export default function App() {

  const Stack = createStackNavigator();

  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='List' component={ListProduct}/>
        <Stack.Screen name='Create' component={CreateProduct}/>
        <Stack.Screen name='Show' component={ShowProduct}/>
        <Stack.Screen name='Edit' component={EditProduct}/>

      </Stack.Navigator>
    )
  }


  return (
<NavigationContainer>
  <MyStack/>
</NavigationContainer>
  )
}