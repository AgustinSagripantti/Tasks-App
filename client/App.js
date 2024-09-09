// Importa los hooks useEffect y useState de React para manejar efectos secundarios y estados
import { useEffect, useState } from "react";
// Importa componentes básicos de React Native para la interfaz de usuario
import { Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
// Importa los componentes personalizados InputTask y Task
import InputTask from "./components/InputTask";
import Task from "./components/Task";
// Importa el proveedor del BottomSheetModal para usar modales de hoja inferior
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// Importa el StatusBar de Expo para manejar la barra de estado del sistema
import { StatusBar } from "expo-status-bar";

// Componente principal de la aplicación
export default function App() {
  // Define el estado de los todos usando useState, inicializado como un array vacío
  const [todos, setTodos] = useState([]);

  // useEffect se ejecuta cuando el componente se monta para cargar los todos
  useEffect(() => {
    fetchTodos(); // Llama a la función para obtener los todos
  }, []); // El array vacío indica que el efecto solo se ejecuta al montar el componente

  // Función para obtener los todos desde el servidor
  async function fetchTodos() {
    // Realiza una solicitud GET a la URL especificada con un encabezado de clave API
    const response = await fetch("http://localhost:8080/todos/1", {
      headers: {
        "x-api-key": "abcdef123456",
      },
    });
    // Convierte la respuesta en JSON
    const data = await response.json();
    // Actualiza el estado de todos con los datos obtenidos
    setTodos(data);
  }

  // Función para eliminar una tarea por su ID
  function clearTodo(id) {
    // Filtra la lista de todos para eliminar la tarea con el ID especificado
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Función para alternar el estado completado de una tarea
  function toggleTodo(id) {
    // Mapea sobre la lista de todos y alterna el estado completado de la tarea con el ID especificado
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  // Renderiza el componente
  return (
    // Proveedor del BottomSheetModal para usar modales de hoja inferior en toda la aplicación
    <BottomSheetModalProvider>
      <StatusBar /> {/* Muestra la barra de estado */}
      <SafeAreaView style={styles.container}> {/* Contenedor seguro para la vista */}
        <FlatList
          data={todos} // Datos de la lista que se mostrarán
          contentContainerStyle={styles.contentContainerStyle} // Estilo para el contenedor de la lista
          keyExtractor={(todo) => todo.id} // Función para extraer claves únicas de cada ítem
          renderItem={({ item }) => (
            // Renderiza el componente Task para cada ítem en la lista
            <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
          )}
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>} // Componente de encabezado de la lista
        />
        {/* Componente para agregar nuevas tareas */}
        <InputTask todos={todos} setTodos={setTodos} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF", // Color de fondo
  },
  contentContainerStyle: {
    padding: 15, // Espaciado interior del contenedor de la lista
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15, // Margen inferior del título
  },
});
