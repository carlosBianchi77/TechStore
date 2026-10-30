import React from 'react'
import { Link } from "react-router-dom";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCarritoStore } from "../store/carritoStore"


export const Header = () => {

    const totalItems = useCarritoStore((state) => state.getTotalItems());

    return (
    <header className='header'>
        <h1 className='logo'>TechStore</h1>
        <nav className='nav' aria-label='Navegación principal'>
            <Link to={"/"}>Inicio</Link>
            <Link to={"/productos"}>Productos</Link>
            <Link to={"/carrito"} className='link-carrito' aria-label={`Carrito de compras, ${totalItems} productos`}><ShoppingCartIcon />{totalItems > 0 && (<span className='contador-carrito'>{totalItems}</span>)}</Link>
            <Link to={"/contacto"}>Contacto</Link>
        </nav>
    </header>
)
}

