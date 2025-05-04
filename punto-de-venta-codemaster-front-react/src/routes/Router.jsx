import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoriaListPage from '../features/categorias/pages/CategoriaListPage';
import ProductoListPage from '../features/productos/pages/ProductoListPage';
import VentasPage from '../features/ventas/pages/VentasPage';
import NuevaVentaPage from '../features/ventas/pages/NuevaVentaPage';

// Importaciones del módulo de clientes
import ClientesPage from '../features/clientes/pages/ClientesPage';
import NuevoClientePage from '../features/clientes/pages/NuevoClientePage';
import EditarClientePage from '../features/clientes/pages/EditarClientePage';
import HomePage from '../features/home/pages/HomePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Ruta de inicio */}
        <Route index element={<HomePage />} />
        
        {/* Rutas de características */}
        <Route path="categorias" element={<CategoriaListPage />} />
        <Route path="productos" element={<ProductoListPage />} />
        
        {/* Rutas de ventas */}
        <Route path="ventas">
          <Route index element={<VentasPage />} />
          <Route path="nueva" element={<NuevaVentaPage />} />
        </Route>
        
        {/* Rutas de clientes (estructura anidada) */}
        <Route path="clientes">
          <Route index element={<ClientesPage />} />
          <Route path="nuevo" element={<NuevoClientePage />} />
          <Route path="editar/:id" element={<EditarClientePage />} />
        </Route>
        
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Route>
    </Routes>
  );
};

export default Router;