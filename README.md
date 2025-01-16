# **Manejo de Plantas - Frontend- FORBTECH**

## **Descripción**
Este proyecto es el frontend de una aplicación para gestionar plantas, desarrollado con **Angular** y estilizado con **Tailwind CSS**. La aplicación permite interactuar con un backend (que incluye autenticación con **JWT**) para realizar las siguientes acciones:

- Gestionar plantas (crear, leer, actualizar y eliminar).
- Visualizar lecturas y alertas.
- Mostrar detalles de países utilizando datos de una API externa ([Rest Countries](https://restcountries.com/)).

---

## **Características principales**
- **Autenticación con JWT**: Inicio de sesión seguro para acceder a las funcionalidades de la aplicación.
- **Dashboard interactivo**:
  - **Sidebar** con cuatro secciones principales:
    - **Dashboard**: Resumen de información.
    - **Plantas**: Gestión de plantas con opción de crear, actualizar y eliminar.
    - **Lecturas**: Detalle de lecturas asociadas a las plantas.
    - **Países**: Información de países, incluida su bandera.
  - **Tarjetas dinámicas**:
    - Resumen de lecturas y alertas.
    - Listado de plantas con su país y bandera.
    - Detalle de un país seleccionado.
- **Tailwind CSS**: Diseño moderno y responsivo.

---

## **Requisitos**
- **Node.js** (versión 16 o superior).
- **Angular CLI** (versión 15 o superior).
- **Backend** funcionando en local o servidor remoto.
- Navegador web compatible con ES6.

---

## **Instalación**

### **1. Clonar el repositorio**
```bash
git clone https://github.com/tu_usuario/tu_proyecto_frontend.git
cd tu_proyecto_frontend
