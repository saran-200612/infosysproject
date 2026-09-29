import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveNewProduct, productIdGenerator } from "../../Services/ProductService";
import { getUsersByRole } from "../../Services/LoginService";
import { getAllCategories, getSkuIdByCategory } from "../../Services/SKUService";

const ProductEntry = () => {

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    skuId: "",
    purchasePrice: "",
    salesPrice: "",
    reorderLevel: "",
    stock: "",
    vendorId: "",
    status: true
  });

  const [newId, setNewId] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [skuCategoryList, setSkuCategoryList] = useState([]);
  const [skuIdList, setSkuIdList] = useState([]);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    productIdGenerator().then((res) => { setNewId(res.data); });
    getUsersByRole("Vendor").then((res) => { setVendorList(res.data); });
    getAllCategories().then((res) => { setSkuCategoryList(res.data); });
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct((values) => ({ ...values, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
    if (value && value !== "---") {
      getSkuIdByCategory(value).then((res) => { setSkuIdList(res.data); });
    } else {
      setSkuIdList([]);
    }
  };

  const returnBack = () => {
    const role = (localStorage.getItem("role") || "").toLowerCase();
    if (role === "manager") {
      navigate("/manager-menu");
    } else {
      navigate("/admin-menu");
    }
  };

  const saveProduct = () => {
    setIsSaving(true);
    let newProduct = {
      productId: newId,
      productName: product.productName.trim(),
      skuId: product.skuId,
      purchasePrice: parseFloat(product.purchasePrice) || 0,
      salesPrice: 0.0,
      stock: parseFloat(product.stock) || 0,
      reorderLevel: parseFloat(product.reorderLevel) || 0,
      vendorId: product.vendorId,
      status: true
    };

    if (newProduct.stock <= newProduct.reorderLevel) {
      newProduct.status = false;
    }

    saveNewProduct(newProduct)
      .then(() => {
        setFlag(true);
        setTimeout(() => navigate('/product-repo'), 1200);
      })
      .catch((err) => {
        console.error("Failed to save product:", err);
        alert("Failed to save product. Please verify all details and try again.");
      })
      .finally(() => setIsSaving(false));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!product.productName.trim()) {
      tempErrors.productName = "Product Name is required";
      isValid = false;
    }

    if (!category || category === "---") {
      tempErrors.category = "Category is required";
      isValid = false;
    }

    if (!product.skuId || product.skuId === "---") {
      tempErrors.skuId = "SKU ID is required";
      isValid = false;
    }

    if (!String(product.purchasePrice).trim() || isNaN(product.purchasePrice) || parseFloat(product.purchasePrice) <= 0) {
      tempErrors.purchasePrice = "Valid purchase price (> 0) is required";
      isValid = false;
    }

    if (!String(product.stock).trim() || isNaN(product.stock) || parseFloat(product.stock) < 0) {
      tempErrors.stock = "Valid stock quantity (>= 0) is required";
      isValid = false;
    }

    if (!String(product.reorderLevel).trim() || isNaN(product.reorderLevel) || parseFloat(product.reorderLevel) < 0) {
      tempErrors.reorderLevel = "Valid reorder level (>= 0) is required";
      isValid = false;
    }

    if (!product.vendorId || product.vendorId === "---") {
      tempErrors.vendorId = "Vendor assignment is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveProduct();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        .pe-root { min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif; background-color:#0a0e1a;
          background-image:radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
          url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
          background-size:cover; background-position:center; background-attachment:fixed; position:relative; }
        .pe-root::before { content:''; position:fixed; inset:0;
          background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%); z-index:0; }
        .pe-content { position:relative; z-index:1; }
        .pe-header { background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(14,165,233,0.2); padding:16px 32px;
          display:flex; align-items:center; justify-content:space-between; }
        .pe-title { font-size:22px; font-weight:700; color:#e0f2fe; letter-spacing:1.5px; text-transform:uppercase; }
        .pe-subtitle { font-size:11px; color:rgba(14,165,233,0.7); letter-spacing:2px; text-transform:uppercase; }
        .pe-btn { background:rgba(14,165,233,0.15); border:1px solid rgba(14,165,233,0.4); color:#7dd3fc;
          padding:9px 20px; border-radius:8px; font-family:'Rajdhani',sans-serif;
          font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; text-decoration:none; display:inline-block; }
        .pe-btn:hover { background:rgba(14,165,233,0.28); color:#e0f2fe; }
        .pe-form-wrap { max-width:560px; margin:40px auto; padding:0 20px; }
        .pe-card { background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
          border:1px solid rgba(14,165,233,0.15); border-radius:16px; padding:32px;
          box-shadow:0 24px 48px rgba(0,0,0,0.4); }
        .pe-label { display:block; font-size:12px; font-weight:600; letter-spacing:1.5px;
          text-transform:uppercase; color:rgba(14,165,233,0.7); margin-bottom:6px; }
        .pe-input { width:100%; padding:10px 14px; background:rgba(255,255,255,0.05);
          border:1px solid rgba(14,165,233,0.2); border-radius:8px; color:#e2e8f0;
          font-family:'Rajdhani',sans-serif; font-size:14px; outline:none;
          transition:border-color 0.2s; box-sizing:border-box; }
        .pe-input:focus { border-color:rgba(14,165,233,0.5); background:rgba(255,255,255,0.08); }
        .pe-input.error { border-color:rgba(248,113,113,0.6); }
        .pe-input option { background:#0a0e1a; color:#e2e8f0; }
        .pe-field { margin-bottom:18px; }
        .error-text { color:#f87171; font-size:11px; margin-top:4px; letter-spacing:0.5px; }
        .pe-save-btn { width:100%; padding:12px; background:linear-gradient(135deg,#0ea5e9,#0284c7);
          border:none; border-radius:8px; color:#fff; font-family:'Rajdhani',sans-serif;
          font-size:15px; font-weight:700; letter-spacing:1px; cursor:pointer; transition:all 0.2s; margin-top:8px; }
        .pe-save-btn:hover { background:linear-gradient(135deg,#38bdf8,#0ea5e9); }
        .pe-save-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .pe-success { margin-top:16px; background:rgba(52,211,153,0.12); border:1px solid rgba(52,211,153,0.3);
          border-radius:8px; padding:12px; text-align:center; color:#34d399; font-weight:600; }
      `}</style>

      <div className="pe-root">
        <div className="pe-content">

          <div className="pe-header">
            <div>
              <div className="pe-title">📦 New Product Entry</div>
              <div className="pe-subtitle">Add product to inventory</div>
            </div>
            <button type="button" onClick={returnBack} className="pe-btn">← Dashboard</button>
          </div>

          <div className="pe-form-wrap">
            <div className="pe-card">
              <form onSubmit={handleValidation}>

                <div className="pe-field">
                  <label className="pe-label">Product ID</label>
                  <input className="pe-input" value={newId} readOnly style={{fontFamily:'Share Tech Mono, monospace'}} />
                </div>

                <div className="pe-field">
                  <label className="pe-label">Product Name</label>
                  <input
                    name="productName"
                    className={`pe-input ${errors.productName ? 'error' : ''}`}
                    value={product.productName}
                    onChange={onChangeHandler}
                    placeholder="e.g. Milk 1L, Basmati Rice 5kg"
                  />
                  {errors.productName && <div className="error-text">{errors.productName}</div>}
                </div>

                <div className="pe-field">
                  <label className="pe-label">SKU Category</label>
                  <select 
                    className={`pe-input ${errors.category ? 'error' : ''}`} 
                    value={category} 
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category...</option>
                    {skuCategoryList.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <div className="error-text">{errors.category}</div>}
                </div>

                <div className="pe-field">
                  <label className="pe-label">SKU ID</label>
                  <select 
                    name="skuId" 
                    className={`pe-input ${errors.skuId ? 'error' : ''}`} 
                    value={product.skuId} 
                    onChange={onChangeHandler}
                  >
                    <option value="">Select SKU...</option>
                    {skuIdList.map((sku, index) => (
                      <option key={index} value={sku}>{sku}</option>
                    ))}
                  </select>
                  {errors.skuId && <div className="error-text">{errors.skuId}</div>}
                </div>

                <div className="pe-field">
                  <label className="pe-label">Purchase Price (₹)</label>
                  <input 
                    name="purchasePrice" 
                    type="number"
                    step="any"
                    value={product.purchasePrice}
                    className={`pe-input ${errors.purchasePrice ? 'error' : ''}`} 
                    onChange={onChangeHandler} 
                    placeholder="e.g. 500" 
                  />
                  {errors.purchasePrice && <div className="error-text">{errors.purchasePrice}</div>}
                </div>

                <div className="pe-field">
                  <label className="pe-label">Initial Stock</label>
                  <input 
                    name="stock" 
                    type="number"
                    step="any"
                    value={product.stock}
                    className={`pe-input ${errors.stock ? 'error' : ''}`} 
                    onChange={onChangeHandler} 
                    placeholder="e.g. 200" 
                  />
                  {errors.stock && <div className="error-text">{errors.stock}</div>}
                </div>

                <div className="pe-field">
                  <label className="pe-label">Reorder Level</label>
                  <input 
                    name="reorderLevel" 
                    type="number"
                    step="any"
                    value={product.reorderLevel}
                    className={`pe-input ${errors.reorderLevel ? 'error' : ''}`} 
                    onChange={onChangeHandler} 
                    placeholder="e.g. 50" 
                  />
                  {errors.reorderLevel && <div className="error-text">{errors.reorderLevel}</div>}
                </div>

                <div className="pe-field">
                  <label className="pe-label">Vendor</label>
                  <select 
                    name="vendorId" 
                    className={`pe-input ${errors.vendorId ? 'error' : ''}`} 
                    value={product.vendorId} 
                    onChange={onChangeHandler}
                  >
                    <option value="">Select Vendor...</option>
                    {vendorList.map((vendor, index) => (
                      <option key={index} value={vendor}>{vendor}</option>
                    ))}
                  </select>
                  {errors.vendorId && <div className="error-text">{errors.vendorId}</div>}
                </div>

                <button type="submit" className="pe-save-btn" disabled={isSaving}>
                  {isSaving ? "Saving..." : "💾 Save Product"}
                </button>

              </form>

              {flag && (
                <div className="pe-success">✅ Product Saved Successfully! Redirecting...</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductEntry;