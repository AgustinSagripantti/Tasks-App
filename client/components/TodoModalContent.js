// Importa los hooks necesarios de React
import React, { useState } from "react";
// Importa componentes y módulos de React Native para construir la interfaz de usuario
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";

// Componente para mostrar el contenido del modal de tareas
export default function TodoModalContent({ id, title }) {
  // Define el estado para el correo electrónico y el enfoque del campo de texto
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  // Función para manejar el envío del formulario de compartir
  const handleSubmit = async () => {
    // Verifica si el correo electrónico está vacío
    if (!email) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Realiza una solicitud para compartir la tarea con el usuario especificado
    try {
      const response = await fetch("http://localhost:8080/todos/shared_todos", {
        headers: {
          "x-api-key": "abcdef123456",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          todo_id: id, // ID de la tarea que se compartirá
          user_id: 1, // ID del usuario (valor codificado para el ejemplo)
          email: email, // Correo electrónico del usuario con quien se compartirá la tarea
        }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert(
        "Congratulations 🎉",
        `You successfully shared "${title}" with ${email}`,
        [{ text: "Okay" }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }

    // Limpia el campo de texto y oculta el teclado
    Keyboard.dismiss();
    setEmail("");
    setFocus(false);
  };

  // Renderiza el componente
  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Share your task</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={styles.description}>
        Enter the email of the user you want to share your task with. Share a
        task with someone and stay in sync with your goals every day.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())} // Actualiza el estado del correo electrónico
        onFocus={() => setFocus(true)} // Marca el campo de texto como enfocado
        onBlur={() => setFocus(false)} // Marca el campo de texto como desenfocado
        keyboardType="email-address" // Configura el teclado para direcciones de correo electrónico
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" }, // Cambia el estilo cuando el campo está enfocado
        ]}
        placeholder="Enter your contact email" // Texto del marcador de posición
      />
      <Button
        onPress={handleSubmit} // Llama a la función de envío al presionar el botón
        title="Share"
        disabled={email.length === 0} // Desactiva el botón si el campo de correo electrónico está vacío
      />
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15, // Espaciado horizontal interno del contenedor
  },
  title: {
    fontWeight: "900", // Peso de la fuente del título
    letterSpacing: 0.5, // Espaciado entre letras
    fontSize: 16, // Tamaño de la fuente del título
    textAlign: "center", // Alineación del texto del título
  },
  description: {
    color: "#56636F", // Color del texto de descripción
    fontSize: 13, // Tamaño de la fuente de descripción
    fontWeight: "normal", // Peso de la fuente de descripción
    width: "100%", // Ancho del contenedor de descripción
  },
  input: {
    borderWidth: 2, // Ancho del borde del campo de texto
    borderColor: "#00000020", // Color del borde del campo de texto
    padding: 15, // Espaciado interno del campo de texto
    borderRadius: 15, // Bordes redondeados del campo de texto
    marginVertical: 15, // Margen vertical alrededor del campo de texto
  },
});
