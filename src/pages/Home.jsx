import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

export const Home = () => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await fetch("https://dummyjson.com/products?limit=0");
                if (!respuesta.ok) {
                    throw new Error("Error al obtener los productos");
                }
                const data = await respuesta.json();

                const productosElectronicos = data.products.filter((producto) => producto.category === "smartphones" && producto.title.toLowerCase().includes("iphone"));
                setProductos(productosElectronicos);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }
        obtenerProductos();
    }, [])

    return (
        <main className="home">
            <section className="home-hero">
            <h1>Bienvenido a <span>TechStore</span></h1>

            <p>
                TechStore es tu tienda online de tecnología, donde encontrarás una gran variedad de productos para mejorar tu experiencia digital, con opciones para todos los gustos y necesidades. 💻🎧
                </p>

            <nav className="home-acciones">
                <Link to={"/productos"} className="home-boton">Explorar productos</Link>
            </nav>
            </section>

            <section className="productos-destacados">
                <h2>Productos destacados</h2>
                <div className="productos-grid">
                    {
                        productos.slice(0,4).map((producto) => (
                            <article className="producto-card" key={producto.id}>
                                <div className="producto-imagen-contenedor">
                                    <img className="producto-imagen" src={producto.thumbnail} alt={producto.title} />
                                </div>
                                <h3 className="producto-nombre">{producto.title}</h3>
                                <p className="producto-precio">${producto.price.toFixed(2)}</p>
                            </article>
                        ))
                    }
                </div>

                <Link to="/productos" className="home-boton">Ver todos los productos →</Link>
                </section>
        </main>
        );
    };

    