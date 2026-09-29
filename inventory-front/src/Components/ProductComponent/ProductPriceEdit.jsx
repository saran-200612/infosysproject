import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, editProductPrice } from '../../Services/ProductService';

const ProductPriceEdit = () => {
    const param = useParams();
    let navigate = useNavigate();

    const [newPrice, setNewPrice] = useState("");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [product, setProduct] = useState({
        productId: "", productName: "", skuId: "",
        purchasePrice: 0.0, salesPrice: 0.0,
        reorderLevel: 0.0, stock: 0.0,
        vendorId: "", status: true
    });
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setFlag(false);
        getProductById(param.pid)
            .then(response => { 
                setProduct(response.data); 
                if (response.data && response.data.purchasePrice) {
                    setNewPrice(response.data.purchasePrice);
                }
            })
            .catch(error => { console.error(error); });
    }, [param.pid]);

    const returnBack = () => { navigate('/product-repo'); };

    const onChangeHandler = (event) => { 
        setNewPrice(event.target.value); 
        if (error) setError("");
    };

    const updatePrice = (event) => {
        event.preventDefault();
        const priceVal = parseFloat(newPrice);
        if (!String(newPrice).trim() || isNaN(priceVal) || priceVal <= 0) {
            setError("Please enter a valid price greater than 0");
            return;
        }

        setIsSaving(true);
        const updatedProduct = { ...product, purchasePrice: priceVal };
        editProductPrice(updatedProduct)
            .then(() => { 
                setFlag(true); 
                setProduct(prev => ({
                    ...prev,
                    purchasePrice: priceVal,
                    salesPrice: priceVal + (priceVal * 0.20)
                }));
                setTimeout(() => {
                    navigate('/product-repo');
                }, 1200);
            })
            .catch(err => { 
                console.error(err); 
                alert("Error updating price. Please try again."); 
            })
            .finally(() => setIsSaving(false));
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .ppe-root { min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif; background-color:#0a0e1a;
                    background-image:radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                    url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center; background-attachment:fixed; position:relative; }
                .ppe-root::before { content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%); z-index:0; }
                .ppe-content { position:relative; z-index:1; }
                .ppe-header { background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
                    border-bottom:1px solid rgba(14,165,233,0.2); padding:16px 32px;
                    display:flex; align-items:center; justify-content:space-between; }
                .ppe-title { font-size:22px; font-weight:700; color:#e0f2fe; letter-spacing:1.5px; text-transform:uppercase; }
                .ppe-subtitle { font-size:11px; color:rgba(14,165,233,0.7); letter-spacing:2px; text-transform:uppercase; }
                .ppe-btn { background:rgba(14,165,233,0.15); border:1px solid rgba(14,165,233,0.4); color:#7dd3fc;
                    padding:9px 20px; border-radius:8px; font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; }
                .ppe-btn:hover { background:rgba(14,165,233,0.28); color:#e0f2fe; }
                .ppe-wrap { max-width:560px; margin:40px auto; padding:0 20px; }
                .ppe-card { background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px; padding:32px;
                    box-shadow:0 24px 48px rgba(0,0,0,0.4); }
                .ppe-row { display:flex; justify-content:space-between; align-items:center;
                    padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); font-size:14px; }
                .ppe-row:last-of-type { border-bottom:none; }
                .ppe-key { color:rgba(14,165,233,0.7); font-weight:600; letter-spacing:0.5px; }
                .ppe-val { color:#e2e8f0; font-family:'Share Tech Mono',monospace; font-size:13px; }
                .ppe-divider { border:none; border-top:1px solid rgba(14,165,233,0.15); margin:20px 0; }
                .ppe-label { display:block; font-size:12px; font-weight:600; letter-spacing:1.5px;
                    text-transform:uppercase; color:rgba(14,165,233,0.7); margin-bottom:6px; }
                .ppe-input { width:100%; padding:10px 14px; background:rgba(255,255,255,0.05);
                    border:1px solid rgba(14,165,233,0.2); border-radius:8px; color:#e2e8f0;
                    font-family:'Share Tech Mono',monospace; font-size:14px; outline:none;
                    transition:border-color 0.2s; box-sizing:border-box; }
                .ppe-input:focus { border-color:rgba(14,165,233,0.5); background:rgba(255,255,255,0.08); }
                .ppe-input.error { border-color:rgba(248,113,113,0.6); }
                .error-text { color:#f87171; font-size:11px; margin-top:4px; letter-spacing:0.5px; }
                .ppe-actions { display:flex; gap:10px; margin-top:20px; }
                .ppe-save { flex:1; padding:11px; background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border:none; border-radius:8px; color:#fff; font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s; }
                .ppe-save:hover { background:linear-gradient(135deg,#38bdf8,#0ea5e9); }
                .ppe-save:disabled { opacity:0.6; cursor:not-allowed; }
                .ppe-return { flex:1; padding:11px; background:rgba(14,165,233,0.15);
                    border:1px solid rgba(14,165,233,0.4); border-radius:8px; color:#7dd3fc;
                    font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; }
                .ppe-return:hover { background:rgba(14,165,233,0.28); color:#e0f2fe; }
                .ppe-success { margin-top:14px; background:rgba(52,211,153,0.12);
                    border:1px solid rgba(52,211,153,0.3); border-radius:8px;
                    padding:12px; text-align:center; color:#34d399; font-weight:600; }
            `}</style>

            <div className="ppe-root">
                <div className="ppe-content">

                    <div className="ppe-header">
                        <div>
                            <div className="ppe-title">💰 Edit Product Price</div>
                            <div className="ppe-subtitle">{product.productId} · {product.productName}</div>
                        </div>
                        <button className="ppe-btn" onClick={returnBack}>← Back</button>
                    </div>

                    <div className="ppe-wrap">
                        <div className="ppe-card">

                            <div className="ppe-row"><span className="ppe-key">Product ID</span><span className="ppe-val">{product.productId}</span></div>
                            <div className="ppe-row"><span className="ppe-key">SKU ID</span><span className="ppe-val">{product.skuId}</span></div>
                            <div className="ppe-row"><span className="ppe-key">Product Name</span><span className="ppe-val">{product.productName}</span></div>
                            <div className="ppe-row"><span className="ppe-key">Current Purchase Price</span><span className="ppe-val">₹{product.purchasePrice}</span></div>
                            <div className="ppe-row"><span className="ppe-key">Sales Price (+20% margin)</span><span className="ppe-val">₹{product.salesPrice}</span></div>
                            <div className="ppe-row"><span className="ppe-key">Current Stock</span><span className="ppe-val">{product.stock}</span></div>
                            <div className="ppe-row"><span className="ppe-key">Vendor</span><span className="ppe-val">{product.vendorId}</span></div>

                            <hr className="ppe-divider" />

                            <label className="ppe-label">New Purchase Price (₹)</label>
                            <input
                                type="number"
                                step="any"
                                className={`ppe-input ${error ? 'error' : ''}`}
                                value={newPrice}
                                onChange={onChangeHandler}
                                placeholder="Enter new price"
                            />
                            {error && <div className="error-text">{error}</div>}

                            <div className="ppe-actions">
                                <button className="ppe-save" onClick={updatePrice} disabled={isSaving}>
                                    {isSaving ? "Updating..." : "💾 Save Price"}
                                </button>
                                <button className="ppe-return" onClick={returnBack}>Return</button>
                            </div>

                            {flag && <div className="ppe-success">✅ Product Price Updated Successfully! Redirecting...</div>}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductPriceEdit;