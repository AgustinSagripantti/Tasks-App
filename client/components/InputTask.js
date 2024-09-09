// Importa React y los hooks necesarios para el componente
import React, { useEffect, useState } from "react";
// Importa componentes y módulos de React Native para construir la interfaz de usuario
import {
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Animated,
} from "react-native";
// Importa el icono AntDesign de Expo
import { AntDesign } from "@expo/vector-icons";

// Componente para ingresar nuevas tareas
export default function InputTask({ todos, setTodos }) {
  // Define el estado para mostrar emojis, el mensaje de la tarea, y la animación de desvanecimiento
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0.1));

  // useEffect maneja la visibilidad de los emojis cuando se muestra u oculta el teclado
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setShowEmojies(true);
      // Animación para mostrar los emojis con desvanecimiento
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setShowEmojies(false);
      // Animación para ocultar los emojis con desvanecimiento
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      // Limpia las suscripciones del teclado cuando el componente se desmonta
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Función para manejar el envío de la nueva tarea
  const handleSubmit = async () => {
    if (messageBody === "") {
      return; // No hace nada si el mensaje está vacío
    } else {
      // Realiza una solicitud POST para agregar la nueva tarea
      const response = await fetch("http://localhost:8080/todos", {
        headers: {
          "x-api-key": "abcdef123456",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          title: messageBody,
        }),
      });
      // Convierte la respuesta en JSON
      const newTodo = await response.json();
      // Actualiza el estado de todos con la nueva tarea
      setTodos([...todos, { ...newTodo, shared_with_id: null }]);
      Keyboard.dismiss(); // Cierra el teclado
      setMessageBody(""); // Limpia el mensaje
    }
  };

  // Componente para renderizar emojis
  const RenderEmoji = ({ emoji }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji); // Agrega el emoji al mensaje
        }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableHighlight>
    );
  };

  // Renderiza el componente
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Muestra los emojis si showEmojies es true */}
        {showEmojies && (
          <Animated.View
            style={[
              styles.emojiesContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            {/* Renderiza varios emojis */}
            <RenderEmoji emoji="✅" />
            <RenderEmoji emoji="🚨" />
            <RenderEmoji emoji="📝" />
            <RenderEmoji emoji="🎁" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🎉" />
            <RenderEmoji emoji="🏃🏻‍♂️" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task" // Texto de marcador de posición
            scrollEnabled={true}
            onChangeText={setMessageBody} // Actualiza el mensaje con el texto ingresado
            defaultValue={messageBody} // Valor predeterminado del campo de texto
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={40}
              color={messageBody ? "black" : "#00000050"} // Cambia el color según el contenido del mensaje
              style={{ paddingLeft: 5 }}
            />
          </Pressable>
          {/* <MaterialCommunityIcons
            name="arrow-up-circle"
            size={40}
            color={messageBody ? "black" : "#00000050"}
            style={{ paddingLeft: 5 }}
            onPress={handleSubmit}
          /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Obtiene el ancho de la ventana para ajustar el tamaño del campo de texto
const { width: windowWidth } = Dimensions.get("window");

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff", // Color de fondo del contenedor
    borderTopWidth: 1, // Ancho del borde superior
    borderTopColor: "#E0E0E0", // Color del borde superior
    padding: 5, // Espaciado interior del contenedor
  },
  inputContainer: {
    flexDirection: "row", // Dirección de los elementos en fila
    alignItems: "center", // Alinea los elementos en el centro verticalmente
  },
  containerTextInput: {
    flex: 1, // Ocupa todo el espacio disponible
    paddingVertical: 10, // Espaciado vertical interno
    paddingHorizontal: 15, // Espaciado horizontal interno
    borderRadius: 30, // Bordes redondeados
    borderWidth: 1, // Ancho del borde
    borderColor: "#E0E0E0", // Color del borde
    fontSize: 16, // Tamaño de la fuente
    color: "black", // Color del texto
  },
  emojiesContainer: {
    width: windowWidth, // Ancho del contenedor de emojis
    flexDirection: "row", // Dirección de los elementos en fila
    justifyContent: "space-around", // Espacia los elementos uniformemente
    backgroundColor: "#E9E9EF", // Color de fondo del contenedor de emojis
    paddingVertical: 10, // Espaciado vertical interno
    paddingHorizontal: 15, // Espaciado horizontal interno
    borderTopWidth: 1, // Ancho del borde superior
    borderTopColor: "#E0E0E0", // Color del borde superior
  },
  emoji: {
    fontSize: 30, // Tamaño de la fuente para los emojis
  },
});
