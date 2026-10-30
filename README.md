# TechStore 🛒

## Proyecto final de la Diplomatura Universitaria en Desarrollo Web Full Stack.

## DESCRIPCIÓN

TechStore es una tienda online de productos tecnológicos desarrollada con React.

El proyecto simula un ecommerce, permitiendo explorar un catálogo de productos, consultar sus detalles y gestionar un carrito de compras mediante una interfaz moderna, intuitiva y responsive.

## TECNOLOGÍAS UTILIZADAS

- HTML5
- CSS3
- JavaScript
- React
- Vite
- React Router
- Zustand
- Material UI
- Git
- GitHub

## FUNCIONALIDADES

- Visualización de catálogo de productos.
- Obtención de productos mediante API externa.
- Filtrado de productos por categoría.
- Búsqueda de productos.
- Visualización de detalles de cada producto.
- Agregar productos al carrito.
- Eliminar productos del carrito.
- Modificar cantidades de productos.
- Cálculo automático del subtotal.
- Cálculo del total de la compra.
- Visualización de cantidad de productos en el carrito.
- Formulario de contacto.
- Navegación entre páginas mediante React Router.
- Gestión global del estado del carrito con Zustand.
- Diseño responsive adaptable a distintos dispositivos.

## DISEÑO

La interfaz fue desarrollada con un diseño moderno y minimalista, utilizando componentes reutilizables y estilos personalizados con CSS. Se buscó construir una experiencia de compra intuitiva, con una navegación clara y una interfaz adaptable a diferentes tamaños de pantalla.

## EJEMPLO DE FRAGMENTO DE CÓDIGO

Ejemplo de implementación de una función para agregar productos al carrito utilizando Zustand:

```javascript
agregarProducto: (producto) =>
    set((state) => {
        const existe = state.items.find(
            (item) => item.id === producto.id
        );

        if (existe) {
            return {
                items: state.items.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                ),
            };
        }

        return {
            items: [...state.items, { ...producto, cantidad: 1 }],
        };
    }),
```
