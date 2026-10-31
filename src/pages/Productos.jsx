
import { useEffect, useState } from "react";
import "./Tienda.css";
import { useCarritoStore } from "../store/carritoStore";

export const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productoAgregado, setProductoAgregado] = useState(null);

    const agregarProducto = useCarritoStore(
        (state) => state.agregarProducto
    );

    const mostrarMensajeExito = (productoId) => {
        setProductoAgregado(productoId);

        setTimeout(() => {
            setProductoAgregado((actual) =>
                actual === productoId ? null : actual
            );
        }, 2500);
    };

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await fetch(
                    "https://dummyjson.com/products?limit=0"
                );

                if (!respuesta.ok) {
                    throw new Error("Error al obtener los productos");
                }

                const data = await respuesta.json();

                const productosElectronicos = data.products.filter(
                    (producto) =>
                        [
                            "smartphones",
                            "laptops",
                            "tablets",
                            "mobile-accessories",
                        ].includes(producto.category)
                );

                setProductos(productosElectronicos);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    if (cargando) {
        return <p className="productos-estado">Cargando productos...</p>;
    }

    if (error) {
        return <p className="productos-estado">{error}</p>;
    }

    const busquedaProductos = productos.filter((producto) =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="productos-page">
            <h1 className="productos-titulo">Nuestros productos</h1>

            <div className="buscador-contenedor">
                <input
                    className="buscador-input"
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {busquedaProductos.length === 0 && (
                <p className="productos-estado">
                    No se encontraron productos.
                </p>
            )}

            <ul className="productos-grid">
                {busquedaProductos.map((producto) => (
                    <li className="producto-card" key={producto.id}>
                        <div className="producto-imagen-contenedor">
                            <img
                                className="producto-imagen"
                                src={producto.thumbnail}
                                alt={producto.title}
                            />
                        </div>

                        <h2 className="producto-nombre">
                            {producto.title}
                        </h2>

                        <p className="producto-precio">
                            ${producto.price.toFixed(2)}
                        </p>

                        <div className="producto-acciones">
                            <button
                                type="button"
                                className="producto-boton"
                                onClick={() => {
                                    agregarProducto(producto);
                                    mostrarMensajeExito(producto.id);
                                }}
                            >
                                Agregar al carrito
                            </button>

                            <button
                                type="button"
                                className="producto-boton producto-boton-detalles"
                                onClick={() =>
                                    setProductoSeleccionado(producto)
                                }
                            >
                                Ver detalles
                            </button>
                        </div>

                        {productoAgregado === producto.id && (
                            <div
                                className="mensaje-exito"
                                role="status"
                            >
                                ✓ Producto agregado con éxito
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {productoSeleccionado && (
                <div
                    className="modal-detalles-overlay"
                    onClick={() => setProductoSeleccionado(null)}
                >
                    <section
                        className="modal-detalles"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-producto-titulo"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="modal-detalles-cerrar"
                            onClick={() => setProductoSeleccionado(null)}
                            aria-label="Cerrar detalles"
                        >
                            ×
                        </button>

                        <div className="modal-detalles-imagen">
                            <img
                                src={
                                    productoSeleccionado.images?.[0] ||
                                    productoSeleccionado.thumbnail
                                }
                                alt={productoSeleccionado.title}
                            />
                        </div>

                        <div className="modal-detalles-contenido">
                            <span className="modal-detalles-categoria">
                                {productoSeleccionado.category}
                            </span>

                            <h2 id="modal-producto-titulo">
                                {productoSeleccionado.title}
                            </h2>

                            <p className="modal-detalles-descripcion">
                                {productoSeleccionado.description}
                            </p>

                            <p className="modal-detalles-precio">
                                ${productoSeleccionado.price.toFixed(2)}
                            </p>

                            <button
                                type="button"
                                className="producto-boton modal-detalles-agregar"
                                onClick={() => {
                                    const productoId = productoSeleccionado.id;

                                    agregarProducto(productoSeleccionado);
                                    mostrarMensajeExito(productoId);
                                    setProductoSeleccionado(null);
                                }}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </section>
                </div>
            )}

            <button
                type="button"
                className="boton-volver-arriba"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
            >
                ↑ Volver arriba
            </button>
        </main>
    );
};
