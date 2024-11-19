# Proyecto Final: Sistema de Trueques

Este proyecto es una aplicación web para gestionar un sistema de trueques basado en ASP.NET Core MVC, con autenticación y autorización utilizando **ASP.NET Identity** y una base de datos **SQLite**.

## **Requisitos Previos**

1. **Sistema Operativo**:
   - Windows, Linux o macOS.
2. **.NET SDK**:
   - Versión requerida: **7.0** o superior (probado con .NET 8.0 y 9.0).
   - [Descargar .NET SDK](https://dotnet.microsoft.com/download).
3. **Visual Studio Code**:
   - [Descargar Visual Studio Code](https://code.visualstudio.com/).
4. **SQLite**:
   - Debe estar instalado y configurado:
     - **Windows**: Descárgalo desde [SQLite](https://www.sqlite.org/download.html).
     - **Linux**:
       ```bash
       sudo apt install sqlite3
       ```
     - **macOS**:
       ```bash
       brew install sqlite
       ```

---

## **Clonar el Proyecto**

Ejecuta el siguiente comando para clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/proyecto-final.git
cd proyecto-final
```

---

## **Configuración del Proyecto**

### **1. Restaurar Paquetes de NuGet**

Restaura los paquetes necesarios para el proyecto:

```bash
dotnet restore
```

### **2. Configuración de la Cadena de Conexión**

Asegúrate de que el archivo `appsettings.json` tenga configurada la cadena de conexión para SQLite:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=ProyectoFinal.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## **Migraciones y Base de Datos**

### **1. Crear y Aplicar Migraciones**

Si necesitas crear la base de datos desde cero, utiliza los siguientes comandos:

1. Generar la primera migración:
   ```bash
   dotnet ef migrations add InitialCreate
   ```

2. Aplicar la migración a la base de datos:
   ```bash
   dotnet ef database update
   ```

### **2. Verificar la Base de Datos**

Una vez aplicada la migración, verifica que el archivo `ProyectoFinal.db` haya sido generado. Puedes abrirlo con herramientas como **DB Browser for SQLite**.

---

## **Ejecución del Proyecto**

### **1. Ejecutar el Proyecto**

Inicia el servidor de desarrollo con el siguiente comando:

```bash
dotnet run
```

### **2. Acceder a la Aplicación**

Abre tu navegador y accede a la URL proporcionada por la terminal, normalmente:

```
https://localhost:5001
```

---

## **Credenciales por Defecto (para Pruebas)**

Si deseas probar rápidamente el sistema, puedes registrar usuarios desde la aplicación y asignarles roles. Los roles disponibles son:

- **Comprador**
- **Vendedor**

---

## **Paquetes Utilizados**

Los paquetes necesarios se instalaron a través de NuGet. Aquí tienes la lista completa con sus versiones:

| Paquete                                   | Versión |
|------------------------------------------|---------|
| `Microsoft.EntityFrameworkCore`          | 9.0.0   |
| `Microsoft.EntityFrameworkCore.Sqlite`   | 9.0.0   |
| `Microsoft.EntityFrameworkCore.Tools`    | 9.0.0   |
| `Microsoft.AspNetCore.Identity`          | 9.0.0   |
| `Microsoft.AspNetCore.Identity.EntityFrameworkCore` | 9.0.0   |

---

## **Estructura del Proyecto**

El proyecto sigue el patrón **MVC**. Aquí se explica brevemente la estructura de las carpetas:

- **Models**: Contiene los modelos como `Comic`, `Oferta`, `Mensaje`, `Subasta`, y los relacionados con Identity (`ApplicationUser`, `ApplicationRole`).
- **Controllers**: Define los controladores como `UsuariosController` para manejar la lógica de registro, inicio de sesión y logout.
- **Views**: Contiene las vistas de Razor, como `Register.cshtml`, `Login.cshtml` y vistas de CRUD para cada entidad.
- **Migrations**: Incluye las migraciones generadas con Entity Framework Core.

---

## **Problemas Comunes y Soluciones**

1. **`SQLite Error: no such table`**
   - Verifica que hayas aplicado las migraciones:
     ```bash
     dotnet ef database update
     ```

2. **`No service for type 'RoleManager<IdentityRole>' has been registered`**
   - Asegúrate de que `AddIdentity` esté configurado en `Program.cs`.

3. **Error 404 en Login o Register**
   - Verifica que las rutas de las vistas y los controladores estén configuradas correctamente.

4. **El paquete no es compatible con .NET 8.0**
   - Actualiza el proyecto a .NET 9.0 si es necesario o instala las versiones compatibles.

---

## **Contribuir**

No se aceptan contribuciones.

---
