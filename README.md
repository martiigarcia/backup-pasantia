## LEER PREVIO A INSTALACION Y EJECUCION DEL PROGRAMA:

# Previo a la ejecucion del programa:

1- en el telefono tener activadas las opciones de programador/desarrollador activar la opcion de depuracion por USB e instalar aplicaciones por USB

# Para la instalacion:

1- en el archivo package.json cortar (momentaneamente) la dependencia "react-native-reanimated": "...", y correr el comando npm install

2- una vez instaladas todas las dependencias del package.json, pegar la dependencia cortada "react-native-reanimated": "...", y volver a correr el comando npm install

# COMANDOS DE EJECUCION DE RN:

adb devices --> para verificar que exista un dispositivo conectado.

adb reverse tcp:8080 tcp:8080 --> para configurar los puertos y que funcione

npx react-native run-android --> para correr la app
