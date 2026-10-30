import { useState } from "react";
import "./Contacto.css";

export const Contacto = () => {

    const [mensajeExito, setMensajeExito] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensajeExito("¡Formulario completado correctamente!")
        e.currentTarget.reset();
    }



    return (
        <div className="contacto">
            <h1>Contactanos</h1>
            <p>¿Tenés alguna consulta? Completá el formulario y nos pondremos en contacto con vos</p>

            <form onSubmit={handleSubmit}>
                <div className="form-grupo">
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text" id="nombre" placeholder="Ingresa tu nombre" required onChange={() => setMensajeExito("")} />
                </div>

                <div className="form-grupo">
                    <label htmlFor="apellido">Apellido: </label>
                    <input type="text" id="apellido" placeholder="Ingresa tu apellido" required onChange={() => setMensajeExito("")}  />
                </div>

                <div className="form-grupo">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" placeholder="Ingresa tu email" required onChange={() => setMensajeExito("")}  />
                </div>

                <div className="form-grupo">
                    <label htmlFor="asunto">Asunto: </label>
                    <input type="text" id="asunto" placeholder="Asunto del mensaje" required onChange={() => setMensajeExito("")}  />
                </div>

                <div className="form-grupo">
                    <label htmlFor="mensaje">Mensaje: </label>
                    <textarea id="mensaje" placeholder="Ingresa tu mensaje" required onChange={() => setMensajeExito("")} ></textarea>
                </div>

                <button>Enviar</button>
                {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
            </form>
        </div>
        );
    };
