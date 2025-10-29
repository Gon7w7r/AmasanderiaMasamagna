// src/data/productos.js
import torta1 from "../../public/images/torta1.jpg";
import torta2 from "../../public/images/torta2.png";
import torta3 from "../../public/images/torta3.jpg";
import torta4 from "../../public/images/torta4.jpg";
import torta5 from "../../public/images/torta5.jpg";
import torta6 from "../../public/images/torta6.jpg";
import torta7 from "../../public/images/torta7.jpg";
import torta8 from "../../public/images/torta8.jpg";

export const productos = [
  {
    id: 1,
    nombre: "Torta de Frutilla",
    descripcion: "Bizcocho suave con crema y frutillas frescas.",
    precio: 30000,
    categoria: "Pastel",
    stock: 5,
    imagen: torta1
  },
  {
    id: 2,
    nombre: "Torta de Vainilla",
    descripcion: "Clásica torta de vainilla con betún de mantequilla.",
    precio: 55000,
    categoria: "Pastel",
    stock: 3,
    imagen: torta2
  },
  {
    id: 3,
    nombre: "Torta de Moka",
    descripcion: "Torta húmeda con café y relleno de crema moka.",
    precio: 45000,
    categoria: "Pastel",
    stock: 0,
    imagen: torta3
  },
  {
    id: 4,
    nombre: "Pie de Limón",
    descripcion: "Pie de limón con merengue.",
    precio: 45000,
    categoria: "Pie",
    stock: 2,
    imagen: torta4
  },
  {
    id: 5,
    nombre: "Torta de Panqueque de Naranja",
    descripcion: "Torta de panqueque con fresco sabor a naranja.",
    precio: 65000,
    categoria: "Pastel",
    stock: 4,
    imagen: torta5
  },
  {
    id: 6,
    nombre: "Torta de Maracuyá",
    descripcion: "Bizcochuelo blanco con crema chantilly de maracuyá.",
    precio: 45000,
    categoria: "Pastel",
    stock: 0,
    imagen: torta6
  },
  {
    id: 7,
    nombre: "Torta de Yogurt",
    descripcion: "Bizcochuelo de chocolate con crema de yogurt y frambuesas.",
    precio: 35000,
    categoria: "Pastel",
    stock: 6,
    imagen: torta7
  },
  {
    id: 8,
    nombre: "Torta Selva Negra",
    descripcion: "Bizcocho de chocolate con crema, cerezas y dulce de guinda.",
    precio: 40000,
    categoria: "Pastel",
    stock: 1,
    imagen: torta8
  }
];
