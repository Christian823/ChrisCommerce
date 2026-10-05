# E-commerce API

Esta es mi API REST desarrollada con Laravel para manejar usuarios, productos y órdenes de compra sencillos.

El proyecto permite registrar e iniciar sesión con usuarios, consultar productos y realizar operaciones CRUD sobre los productos. Las operaciones de creación, edición y eliminación están protegidas mediante autenticación con Laravel Sanctum.

## Requisitos

Antes de instalar el proyecto es necesario tener:

- PHP 8.3 o superior
- Composer
- MySQL
- Git

También es recomendable utilizar Postman para probar los endpoints de la API.

## Instalación

### 1. Clonar el repositorio


git clone URL_DEL_REPOSITORIO


Entrar a la carpeta:


cd e-commerce


### 2. Instalar las dependencias


composer install




### 3. Configurar la base de datos

Crear una base de datos en MySQL, por ejemplo:

CREATE DATABASE e_commerce;


Luego configurar la conexión en el archivo `.env`:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_commerce
DB_USERNAME=root
DB_PASSWORD=


El usuario y contraseña pueden cambiar dependiendo de la configuración local de MySQL.

### 4. Crear las tablas

Ejecutar las migraciones:


php artisan migrate


El proyecto utiliza las tablas principales:

- users
- products
- orders
- order_items
- payments

### 5. Agregar los datos iniciales

El proyecto incluye un seeder para agregar productos de prueba.

Se puede ejecutar con:


php artisan db:seed


También se puede crear nuevamente toda la base de datos y ejecutar los seeders con:


php artisan migrate:fresh --seed


**Importante:** `migrate:fresh` elimina las tablas existentes antes de volver a crearlas, por lo que no debe utilizarse si se quieren conservar los datos actuales.

### 6. Iniciar el servidor


php artisan serve


Por defecto la aplicación estará disponible en:


http://127.0.0.1:8000


Los endpoints de la API utilizan el prefijo:

http://127.0.0.1:8000/api


## Autenticación

La API utiliza Laravel Sanctum.

Primero se debe registrar un usuario:


POST /api/register


Después se puede iniciar sesión:


POST /api/login


Al iniciar sesión correctamente la API devuelve un Bearer Token.

Ejemplo:


{
    "token": "1|TOKEN_GENERADO",
    "type_token": "Bearer"
}


Para utilizar endpoints protegidos se debe enviar el token en el header:


Authorization: Bearer TOKEN_GENERADO

Al realizar las pruebas con Postman también se recomienda utilizar:

Accept: application/json
Content-Type: application/json


## Endpoints principales

### Usuarios


POST /api/register
POST /api/login


### Productos


GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}


Los métodos `GET` son públicos.

Para utilizar `POST`, `PUT` y `DELETE` es necesario estar autenticado.

### Órdenes


POST /api/orders


La creación de órdenes también requiere autenticación.

El usuario de la orden se obtiene automáticamente a partir del Bearer Token.

Ejemplo de una orden:


{
    "estado": "pendiente",
    "productos": [
        {
            "id_producto": 1,
            "cantidad": 2
        }
    ]
}


El precio de cada producto se obtiene directamente desde la base de datos y los productos pertenecientes a la orden son almacenados en `order_items`.

## Probar la API

Se puede utilizar Postman para realizar las peticiones.

Por ejemplo, para obtener todos los productos:

```text
GET http://127.0.0.1:8000/api/products
```

Para una ruta protegida, iniciar sesión primero y copiar el token recibido.

En Postman seleccionar:


Authorization
→ Bearer Token
→ pegar el token


## Errores comunes

Si Laravel muestra:


could not find driver


verificar que PHP tenga habilitado el driver de MySQL:


php -m | grep -i mysql


Debería aparecer `pdo_mysql`.

Si una ruta protegida no devuelve JSON, verificar que la petición tenga:


Accept: application/json


Si se obtiene:


401 Unauthorized


verificar que el Bearer Token sea válido y que se esté enviando en la petición.

Si se obtiene:


405 Method Not Allowed


verificar que se esté utilizando el método HTTP correcto (`GET`, `POST`, `PUT` o `DELETE`).

## Tecnologías utilizadas

- Laravel
- PHP
- MySQL
- Laravel Sanctum
- Postman