
import { useState } from "react";
import { FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa";
import { IoIosArrowForward, IoMdMenu, IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-black text-white py-3 fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* IZQUIERDA */}
        <div className="flex items-center space-x-4">
          <h1 className="text-red-600 font-extrabold text-xl">SUPER QUADS</h1>
          <div className="hidden md:flex space-x-4 text-sm">
            <a href="#tour" className="hover:text-red-500">Tour</a>
            <a href="#galeria" className="hover:text-red-500">Galería de Aventuras</a>
            <a href="#acerca" className="hover:text-red-500">Acerca de</a>
          </div>
        </div>

        {/* DERECHA */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full bg-white text-black hover:text-red-500"><FaWhatsapp /></button>
          <button className="p-2 rounded-full bg-white text-black hover:text-red-500"><FaTiktok /></button>
          <button className="p-2 rounded-full bg-white text-black hover:text-red-500"><FaInstagram /></button>
          <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
            RESERVAR <IoIosArrowForward className="ml-2" />
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuOpen && (
        <div className="md:hidden bg-black py-4 flex flex-col items-center space-y-4">
          <a href="#tour" className="hover:text-red-500">Tour</a>
          <a href="#galeria" className="hover:text-red-500">Galería de Aventuras</a>
          <a href="#acerca" className="hover:text-red-500">Acerca de</a>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-white text-black"><FaWhatsapp /></button>
            <button className="p-2 rounded-full bg-white text-black"><FaTiktok /></button>
            <button className="p-2 rounded-full bg-white text-black"><FaInstagram /></button>
          </div>
          <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
            RESERVAR <IoIosArrowForward className="ml-2" />
          </button>
        </div>
      )}
    </nav>
  );
}
