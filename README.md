# oldNetFlix--backEnd

1ª parte:
API REST con NodeJs y Express con motivos didácticos

## Comenzando 🚀

### Pre-requisitos 📋

Dependencias

```
bcryptjs
cookie-parser
debug
express
jwt-simple
moment
mongoose
morgan
```

devDependencies

```
nodemon

```

### Instalación 🔧


```
Clonar o descargar el zip
```

después

```
npm install

```

para inicializar

```
nodemon ./bin/www

```

## Ejecutando las pruebas ⚙️

```
HOST  http://localhost:3000

```

### ENDPOINTS PÚBLICOS
```
 GET /movies
 
Obtiene todos los datos de peliculas de la  BBDD
- No necesita autorización.

```
```
 GET /movies/estrenos
 
Obtiene estrenos de peliculas de la BBDD
- No necesita autorización.

```
```
GET /movies/:id

Obtiene película por id.
- No necesita autorización.
```
```
GET /movies/generos/:gender

Obtiene películas por género
- No necesita autorización.
- Búsqueda por 'string'.

```
```
GET /movies/:title

Obtiene películas por título
-- No necesita autorización.
- Búsqueda por 'string'.

```

### ENDPOINTS PRIVADOS USERS
```
POST /users/me

Obtenemos los datos de un usuario
- Autenticación requerida por Token en header
- Body requerido con 'password:value y username:value'
```
```
POST /users/login

Login de usuario
- Body requerido con 'password:value y username:value'
- limitado a tres sesiones simultaneas.
- Entrega Token de autenticación
```
```
POST /users/recupass

Restablece un password
- Body requerido con 'password:value , username:value , _id:idUser'
```
```
PATCH /users/logout

Logout de usuario
- Autenticacion por token requerido.
- Al cerrar sesión utiliza el token para comparar en base de datos y eliminarlo del Array tokens.
```
```
POST /users/register

Registra en BBDD a un usuario
- Body requerido con 'password:value y username:value'
```
```
PATCH /users/changepass/:id

Cambia el password de un usuario
- Autenticación requerida por Token en Header
- Body requerido con 'password:value' con nuevo valor.
```
```
PATCH /users/changename/:id

- Autenticación requerida por Token en Header
- Body requerido con 'username:value' con nuevo valor.
```

### ENDPOINTS PRIVADOS PEDIDOS
```
GET /pedidos/:id

Consulta de pedido de Usuario
- Autenticación requerida por Token en Header
```
```
POST /pedidos/:id

Crea un alquiler de película si no existe y si existe lo actualiza.
- Autenticación requerida por Token en Header
- Body requerido con '"movie_id":number' como id de película.
- Limitado a una película por usuario
```


## Construido con 🛠️

* [WebStorm](https://www.jetbrains.com/es-es/webstorm/) - IDE para javaScript
* [Postman](https://www.getpostman.com/) - plataforma de colaboración para el desarrollo de API
* [Robo 3T](https://robomongo.org/) - Gestor de bases de datos para MongoDB


