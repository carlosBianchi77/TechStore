import { create } from "zustand";

export const useCarritoStore = create((set, get) => ({

    items: [],

    agregarProducto: (producto) => 
    set((state) => {
        const existe = state.items.find((item) => item.id === producto.id);

        if(existe) {
            return {
                items: state.items.map((item) => 
                    item.id === producto.id ? 
                    {...item, cantidad: item.cantidad + 1} : item,
                ),
            };
        }

        return {
            items: [...state.items, {...producto, cantidad: 1}],
        };
    }),

    eliminarProducto: (productoId) => 
        set((state) => ({
            items: state.items.filter((item) => item.id !== productoId),
        })),

    vaciarCarrito: () => set({ items: [] }),

    actualizarCantidad: (productoId, cantidad) =>
        set((state) => ({
            items: state.items.map((item) => 
                item.id === productoId ? { ...item, cantidad: cantidad } : item,
            ),
        })),

    getTotalItems: () => {
        const state = get();
        return state.items.reduce(
            (accumulator, item) => accumulator + item.cantidad,
            0,
        );
    },

    getTotalPrecio: () => {
        const state = get();
        return state.items.reduce(
            (accumulator, item) => accumulator + item.price * item.cantidad,
            0,
        );
    },
}));