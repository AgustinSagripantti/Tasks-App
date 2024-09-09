// Importa componentes y módulos de React Native para construir la interfaz de usuario
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
// Importa el icono AntDesign de Expo
import { AntDesign } from "@expo/vector-icons";

// Componente para representar una tarea
export default function Task({ title, id, completed, toggleTodo, clearTodo }) {
  // Renderiza el componente
  return (
    <Pressable
      onPress={() => toggleTodo(id)} // Alterna el estado completado cuando se presiona
      style={styles.container}
    >
      <View style={styles.todoContainer}>
        <Text
          style={[
            styles.todoText,
            { textDecorationLine: completed === 1 ? "line-through" : "none" },
          ]}
        >
          {title} {/* Muestra el título de la tarea */}
        </Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => clearTodo(id)} // Elimina la tarea cuando se presiona el botón
        >
          <AntDesign name="closecircleo" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10, // Espaciado vertical interno
    borderBottomWidth: 1, // Ancho del borde inferior
    borderBottomColor: "#E0E0E0", // Color del borde inferior
    backgroundColor: "#fff", // Color de fondo del contenedor
  },
  todoContainer: {
    flexDirection: "row", // Dirección de los elementos en fila
    alignItems: "center", // Alinea los elementos en el centro verticalmente
    justifyContent: "space-between", // Espacia los elementos uniformemente
    paddingHorizontal: 15, // Espaciado horizontal interno
  },
  todoText: {
    fontSize: 16, // Tamaño de la fuente
    color: "black", // Color del texto
  },
  clearButton: {
    padding: 10, // Espaciado interno del botón
  },
});
