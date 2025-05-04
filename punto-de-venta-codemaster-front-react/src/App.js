import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CategoriaProvider } from './features/categorias/context/CategoriaContext';
import { ProductoProvider } from './features/productos/context/ProductoContext';
import { VentasProvider } from './features/ventas/context/VentasContext';
import { ClientesProvider } from './features/clientes/context/ClientesContext'; // Importación añadida

import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <CategoriaProvider>
        <ProductoProvider>
          <VentasProvider>
            <ClientesProvider> {/* Provider añadido */}
              <Router />
            </ClientesProvider>
          </VentasProvider>
        </ProductoProvider>
      </CategoriaProvider>
    </BrowserRouter>
  );
}

export default App;