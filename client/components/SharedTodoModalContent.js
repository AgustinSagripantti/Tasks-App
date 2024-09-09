// Importa React y los hooks necesarios para el componente
import React, { useState } from "react";
// Importa componentes y módulos de React Native para construir la interfaz de usuario
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
// Importa el componente BottomSheetModal de @gorhom para usar modales de hoja inferior
import { BottomSheetModal } from "@gorhom/bottom-sheet";
// Importa el icono AntDesign de Expo
import { AntDesign } from "@expo/vector-icons";

// Componente para mostrar un modal para compartir tareas
export default function SharedTodoModal({ todos, isVisible, onClose }) {
  // Define el estado para los usuarios compartidos y el mensaje del modal
  const [sharedWith, setSharedWith] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Función para manejar el envío del formulario de compartir
  const handleShare = () => {
    if (!sharedWith || !selectedTodo) {
      return; // No hace nada si el campo compartido o la tarea seleccionada están vacíos
    }

    // Lógica para compartir la tarea con el usuario especificado
    // Aquí se puede agregar la lógica para hacer la solicitud al servidor

    onClose(); // Cierra el modal
  };

  // Renderiza el componente
  return (
    <BottomSheetModal
      index={0} // El índice del modal en la pila de modales
      snapPoints={["50%"]} // Puntos de ajuste del modal
      onDismiss={onClose} // Llama a la función onClose cuando el modal se cierra
      isVisible={isVisible} // Controla la visibilidad del modal
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Share Task</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Muestra una lista de tareas para seleccionar */}
          {todos.map((todo) => (
            <TouchableOpacity
              key={todo.id}
              onPress={() => setSelectedTodo(todo.id)} // Selecciona la tarea al presionar
              style={[
                styles.todoItem,
                {
                  backgroundColor:
                    selectedTodo === todo.id ? "#E0E0E0" : "#FFFFFF",
                },
              ]}
            >
              <Text style={styles.todoText}>{todo.title}</Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Enter user ID to share with"
            value={sharedWith} // Valor del campo de texto
            onChangeText={setSharedWith} // Actualiza el estado del campo de texto
          />
          <Button title="Share" onPress={handleShare} /> {/* Botón para compartir */}
        </ScrollView>
      </View>
    </BottomSheetModal>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20, // Espaciado interno del contenedor del modal
    backgroundColor: "#FFFFFF", // Color de fondo del contenedor del modal
  },
  title: {
    fontSize: 24, // Tamaño de la fuente del título
    fontWeight: "bold", // Peso de la fuente del título
    marginBottom: 15, // Margen
    marginBottom: 15, // Margen inferior del título
  },
  scrollContainer: {
    flexGrow: 1, // Permite que el contenedor se expanda para ocupar todo el espacio disponible
  },
  todoItem: {
    padding: 15, // Espaciado interno del ítem de tarea
    borderRadius: 5, // Bordes redondeados del ítem de tarea
    marginBottom: 10, // Margen inferior entre ítems de tarea
  },
  todoText: {
    fontSize: 16, // Tamaño de la fuente del texto de tarea
    color: "#000000", // Color del texto de tarea
  },
  input: {
    borderWidth: 1, // Ancho del borde del campo de texto
    borderColor: "#E0E0E0", // Color del borde del campo de texto
    borderRadius: 5, // Bordes redondeados del campo de texto
    padding: 10, // Espaciado interno del campo de texto
    marginVertical: 15, // Margen vertical alrededor del campo de texto
    fontSize: 16, // Tamaño de la fuente del campo de texto
  },
});
