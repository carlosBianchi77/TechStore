import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Productos } from "./pages/Productos";
import { Carrito } from "./pages/Carrito";
import { Contacto } from "./pages/Contacto";
import { useState } from "react";

function App () {
    return (
        <>
        <BrowserRouter>
        <Header />

        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/productos" element = {<Productos />} />
            <Route path="/carrito" element = {<Carrito />} />
            <Route path="/contacto" element = {<Contacto />} />

        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;

