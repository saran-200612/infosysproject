import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import ManagerMenu from './Components/LoginComponent/ManagerMenu';
import VendorMenu from './Components/LoginComponent/VendorMenu';

import ProductStockEdit from './Components/ProductComponent/ProductStockEdit';

import SKUEntry from './Components/SKUComponent/SKUEntry';
import SKUReport from './Components/SKUComponent/SKUReport';
import SKUEdit from './Components/SKUComponent/SKUEdit';

import ProductEntry from './Components/ProductComponent/ProductEntry';
import ProductReport from './Components/ProductComponent/ProductReport';
import ProductPriceEdit from './Components/ProductComponent/ProductPriceEdit';
import ProductPieAnalysis from './Components/AnalysisComponent/ProductPieAnalysis';

import TransactionReport from './Components/ProductComponent/TransactionReport';

// Role guard — reads role from localStorage (set at login, persists across tabs)
const RoleRoute = ({ element, allowedRoles }) => {
  const role = (localStorage.getItem("role") || "").toLowerCase();
  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.map(r => r.toLowerCase()).includes(role)) return <Navigate to="/" />;
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-background">
        <Routes>

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />

          <Route path="/admin-menu" element={<RoleRoute element={<AdminMenu />} allowedRoles={["admin"]} />} />
          <Route path="/manager-menu" element={<RoleRoute element={<ManagerMenu />} allowedRoles={["manager"]} />} />
          <Route path="/vendor-menu" element={<RoleRoute element={<VendorMenu />} allowedRoles={["vendor"]} />} />

          <Route path="/edit-stock/:pid/:no" element={<RoleRoute element={<ProductStockEdit />} allowedRoles={["admin","manager"]} />} />

          <Route path="/sku-entry" element={<RoleRoute element={<SKUEntry />} allowedRoles={["admin"]} />} />
          <Route path="/sku-repo" element={<RoleRoute element={<SKUReport />} allowedRoles={["admin","manager","vendor"]} />} />
          <Route path="/update-sku/:skuno" element={<RoleRoute element={<SKUEdit />} allowedRoles={["admin"]} />} />

          <Route path="/product-entry" element={<RoleRoute element={<ProductEntry />} allowedRoles={["admin","manager"]} />} />
          <Route path="/product-repo" element={<RoleRoute element={<ProductReport />} allowedRoles={["admin","manager","vendor"]} />} />
          <Route path="/edit-price/:pid" element={<RoleRoute element={<ProductPriceEdit />} allowedRoles={["admin"]} />} />

          <Route path="/transaction-report/:pid" element={<RoleRoute element={<TransactionReport />} allowedRoles={["admin","manager","vendor"]} />} />

          <Route path="/product-pie" element={<RoleRoute element={<ProductPieAnalysis />} allowedRoles={["admin","manager"]} />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;