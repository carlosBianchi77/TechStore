
import { useState } from "react";
import "./Tienda.css";
import { useCarritoStore } from "../store/carritoStore";

export const Carrito = () => {
    const [busqueda, setBusqueda] = useState("");

    const carrito = useCarritoStore((state) => state.items);

    const eliminarProducto = useCarritoStore(
        (state) => state.eliminarProducto
    );

    const actualizarCantidad = useCarritoStore(
        (state) => state.actualizarCantidad
    );

    const totalItems = useCarritoStore(
        (state) => state.getTotalItems()
    );

    const totalPrecio = useCarritoStore(
        (state) => state.getTotalPrecio()
    );

    const busquedaCarrito = carrito.filter((producto) =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="carrito-page">
            <div className="buscador-contenedor carrito-buscador">
                <input
                    className="buscador-input"
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {carrito.length > 0 && busquedaCarrito.length === 0 && (
                <p className="carrito-mensaje">
                    No se encontraron productos.
                </p>
            )}

            {carrito.length === 0 ? (
                <p className="carrito-vacio">
                    No hay productos agregados.
                </p>
            ) : (
                <>
                    <ul className="productos-grid carrito-grid">
                        {busquedaCarrito.map((producto) => (
                            <li
                                className="producto-card"
                                key={producto.id}
                            >
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

                                <div className="carrito-cantidad">
                                    <span className="carrito-cantidad-label">
                                        Cantidad
                                    </span>

                                    <div className="carrito-cantidad-controles">
                                        <button
                                            type="button"
                                            className="carrito-cantidad-boton"
                                            onClick={() =>
                                                actualizarCantidad(
                                                    producto.id,
                                                    producto.cantidad - 1
                                                )
                                            }
                                            disabled={producto.cantidad <= 1}
                                            aria-label="Disminuir cantidad"
                                        >
                                            −
                                        </button>

                                        <span className="carrito-cantidad-numero">
                                            {producto.cantidad}
                                        </span>

                                        <button
                                            type="button"
                                            className="carrito-cantidad-boton"
                                            onClick={() =>
                                                actualizarCantidad(
                                                    producto.id,
                                                    producto.cantidad + 1
                                                )
                                            }
                                            aria-label="Aumentar cantidad"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="carrito-subtotal">
                                    <span className="carrito-subtotal-label">
                                        Subtotal
                                    </span>

                                    <span className="carrito-subtotal-precio">
                                        $
                                        {(
                                            producto.price *
                                            producto.cantidad
                                        ).toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="carrito-eliminar"
                                    onClick={() =>
                                        eliminarProducto(producto.id)
                                    }
                                >
                                    Eliminar producto
                                </button>
                            </li>
                        ))}
                    </ul>

                    <section className="carrito-resumen">
                        <div className="carrito-resumen-detalle">
                            <span>Total de unidades </span>
                            <strong>{totalItems}</strong>
                        </div>

                        <div className="carrito-resumen-total">
                            <span>Total a pagar</span>
                            <h2>${totalPrecio.toFixed(2)}</h2>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};
