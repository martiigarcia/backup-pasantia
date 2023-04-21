## Gestion Deportiva
Con la aplicación Gestión Deportiva vas a poder hacer el seguimiento deportivo de jugadores de basket.

* Leer atentamente previo a la instalacion y ejecucion del proyecto

# Requisitos previos
Antes de correr la aplicación, asegúrate de tener instalado lo siguiente:

* Node.js
* Java Development Kit (JDK)
* Android Studio y SDK de Android
* Dispositivo Android conectado por USB:
  * En el telefono tener activadas las opciones de programador/desarrollador activar la opcion de depuracion por USB e instalar aplicaciones por USB.

  * Verificar tener suficiente espacio de almacenamiento en el dispositivo, sino al momento de ejecutar la aplicacion no va a funcionar.
* Configurar las variables de entorno:

  * ANDROID_HOME: Ruta donde se encuentra instalado el SDK de Android.

  * JAVA_HOME: Ruta donde se encuentra instalado el JDK de Java.
* React Native CLI: necesario para crear, compilar y ejecutar proyectos de React Native desde la línea de comandos.

***
* Para poder ejecutar el comando adb devices, necesitas tener instalado el Android SDK (Software Development Kit) en tu computadora. El SDK incluye el archivo adb.exe que es utilizado para comunicar con dispositivos Android a través de la depuración USB.
  También necesitas tener instalados los controladores USB adecuados para tu dispositivo Android en tu computadora. Esto permitirá que el dispositivo sea reconocido cuando lo conectes a través de un cable USB.
  Si estás usando un sistema operativo Windows, también debes agregar la ruta donde se encuentra el archivo adb.exe a la variable de entorno PATH. De esta manera, podrás ejecutar el comando adb desde cualquier directorio en la línea de comandos.
***



Una vez que se tienen instalados y configurados estos elementos, se puede inicar a instalar dependencias y luego ejecutar la aplicacion en el dispositivo emulado o conectado mediante el comando "npx react-native run-android" en la terminal de comandos.
Para esto, seguir atentamente los siuigntes pasos:

  
# Instalación:

1. Clona este repositorio: 
```bash
git clone <URL del repositorio>
```

2. En el archivo package.json cortar (momentaneamente) la dependencia "react-native-reanimated": "...", y correr el comando 
```bash
npm install
```

3. Una vez instaladas todas las dependencias del package.json, pegar la dependencia cortada "react-native-reanimated": "...", y volver a correr el comando 
```bash
npm install
```

# Ejecución de la aplicación en el dispositivo:

1- 
```bash
adb devices 
```
Para verificar que exista un dispositivo conectado (si dice unauthorized verificar de volver a conectar y dar permisos).
* Pueden existir mas de un dispositivo contectado


2- 
```bash
adb reverse tcp:8080 tcp:8080 
```
Para configurar los puertos y que funcione
* En caso de existir mas de un dispositivo conectado, ejecutar el comando: 

  ```bash 
  adb -s 16f53bc0 reverse tcp:8080 tcp:8080
  ```
  
    Donde 16f53bc0 es el nombre del dispositivo que aparecia en "List of devices attached", resultado del comando anterior.

3- 
```bash
npx react-native run-android
```
Para correr la app



![comandosDeInicio.png](pictures_readme\comandosDeInicio.png)

Si todo ha ido bien, deberías ver la aplicación corriendo en tu dispositivo.

# Troubleshooting
* Si tienes problemas al compilar la aplicación, asegúrate de haber configurado correctamente el SDK de Android en tu PATH. Puedes revisar la documentación oficial de React Native para más información.
* Si el dispositivo no es detectado, asegúrate de tener el driver USB adecuado instalado y habilitado la depuración USB en el dispositivo.
* Si la aplicación no se inicia correctamente, intenta ejecutar npx react-native start --reset-cache para borrar la caché de Metro.

# Contribuciones
Si encuentras algún problema o tienes alguna sugerencia para mejorar la aplicación, por favor crea una issue o envía un pull request.