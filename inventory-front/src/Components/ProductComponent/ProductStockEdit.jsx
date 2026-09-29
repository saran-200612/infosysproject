import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, editProductStock } from '../../Services/ProductService';
import { getUserId, getUsersByRole } from '../../Services/LoginService';
import { transactionIdGenerate, saveTransaction } from '../../Services/TransactionService';

const ProductStockEdit = () => {

    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        skuId: "",
        purchasePrice: 0.0,
        salesPrice: 0.0,
        reorderLevel: 0.0,
        stock: 0.0,
        vendorId: "",
        status: true,
    });

    const [newId, setNewId] = useState(0);
    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState("");
    const [userId, setUserId] = useState("");
    const [vendors, setVendors] = useState([]);
    const [tdate, setTdate] = useState(new Date().toISOString().split('T')[0]);

    const navigate = useNavigate();
    const param = useParams();

    const [quantity, setQuantity] = useState(0.0);
    const [transValue, setTransValue] = useState(null);
    const [warns, setWarns] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    useEffect(() => {
        // Inlined to avoid missing-dependency lint warnings
        getProductById(param.pid).then(response => {
            setProduct(response.data);
            setFlag(param.no);
        });
        getUserId().then(response => {
            setUserId(response.data);
        });
        transactionIdGenerate(param.no).then(response => {
            setNewId(response.data);
        }).catch(err => {
            console.error("Transaction ID fetch failed:", err);
        });
        getUsersByRole("Vendor").then(response => {
            setVendors(response.data);
        }).catch(err => {
            console.error("Failed to load vendors:", err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const returnBack = () => {
        navigate('/product-repo');
    };

    const clearAll = () => {
        setQuantity(0.0);
    };

    const stockEdit = (event) => {
        event.preventDefault();

        const parsedQty = parseFloat(quantity);

        const updatedTransaction = {
            transactionId: newId,
            productId: product.productId,
            quantity: parsedQty,
            userId: userId,
            transactionDate: tdate,
            transactionType: flag === "1" ? "IN" : "OUT",
            rate: flag === "1" ? product.purchasePrice : product.salesPrice,
            transactionValue: 0.0,
        };
        updatedTransaction.transactionValue =
            parseFloat(updatedTransaction.rate) * parsedQty;

        // Reset previous status
        setSaveError(null);
        setIsSaving(true);

        // Both API calls must succeed together
        Promise.all([
            saveTransaction(updatedTransaction),
            editProductStock(product, quantity, flag)
        ])
            .then(() => {
                setTransValue(updatedTransaction.transactionValue);
                // Check reorder level only after confirmed stock update
                if (flag === "2") {
                    const balance = parseFloat(product.stock) - parseFloat(quantity);
                    if (balance <= parseFloat(product.reorderLevel))
                        setWarns("Stock reached Re-Order Level.");
                }
            })
            .catch(err => {
                console.error("Stock update failed:", err);
                setSaveError(
                    "Transaction failed. One or both operations could not be saved."
                );
            })
            .finally(() => setIsSaving(false));
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!String(quantity).trim()) {
            tempErrors.quantity = "Transaction Quantity is required";
            isValid = false;
        } else if (parseFloat(quantity) <= 0) {
            tempErrors.quantity = "Quantity must be > 0";
            isValid = false;
        }

        if (flag === "2") {
            if (parseFloat(quantity) > product.stock) {
                tempErrors.quantity = "Exceeds available stock";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        if (isValid) {
            stockEdit(event);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .stock-root {
                    min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif;
                    background-color:#0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center;
                    background-attachment:fixed; position:relative;
                    display:flex; align-items:center; justify-content:center;
                    padding:40px 20px; box-sizing:border-box;
                }
                .stock-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.85) 0%,rgba(8,15,35,0.8) 50%,rgba(5,10,25,0.9) 100%);
                    z-index:0;
                }
                .stock-card {
                    position:relative; z-index:1;
                    width:100%; max-width:900px;
                    background:rgba(10,20,45,0.65); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px;
                    box-shadow:0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                    padding:40px; 
                }
                .stock-title {
                    text-align:center; font-size:28px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase; margin-bottom:4px;
                }
                .stock-subtitle {
                    text-align:center; font-size:12px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase; margin-bottom:32px;
                }
                .stock-grid {
                    display:grid; grid-template-columns: 1fr 1fr; gap:32px;
                }
                @media (max-width: 768px) { .stock-grid { grid-template-columns: 1fr; } }
                
                .section-card {
                    background:rgba(5,10,25,0.4); border:1px solid rgba(14,165,233,0.1);
                    border-radius:12px; padding:24px;
                }
                .section-header {
                    font-size:16px; font-weight:600; color:#38bdf8;
                    letter-spacing:1px; text-transform:uppercase; margin-bottom:20px;
                    border-bottom:1px solid rgba(14,165,233,0.1); padding-bottom:8px;
                }
                
                .detail-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
                .detail-label { font-size:13px; color:rgba(224,242,254,0.7); font-weight:500; text-transform:uppercase; }
                .detail-value { font-family:'Share Tech Mono',monospace; font-size:14px; color:#e0f2fe; }
                
                .input-group { display:flex; flex-direction:column; gap:8px; margin-bottom:16px; }
                .input-label {
                    font-size:12px; color:rgba(14,165,233,0.8);
                    font-weight:600; letter-spacing:1px; text-transform:uppercase;
                }
                .stock-input {
                    background:rgba(5,10,25,0.5); border:1px solid rgba(14,165,233,0.2);
                    padding:10px 14px; border-radius:8px; color:#e0f2fe;
                    font-family:'Share Tech Mono',monospace; font-size:15px;
                    transition:all 0.2s; outline:none; width:100%; box-sizing:border-box;
                }
                .stock-input:focus { border-color:rgba(14,165,233,0.6); box-shadow:0 0 12px rgba(14,165,233,0.2); background:rgba(5,10,25,0.8); }
                select.stock-input { cursor:pointer; }
                select.stock-input option { background:#0a142d; color:#e0f2fe; }
                
                .stock-input.error { border-color:rgba(248,113,113,0.5); }
                .error-text { color:#f87171; font-size:11px; margin-top:-4px; letter-spacing:0.5px; }
                
                .btn-group { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:24px; }
                
                .action-btn {
                    padding:12px; border-radius:8px; border:none; color:#fff;
                    font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700;
                    letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:all 0.2s;
                }
                .btn-save { background:linear-gradient(135deg,#059669,#047857); }
                .btn-save:hover { box-shadow:0 0 20px rgba(5,150,105,0.4); transform:translateY(-2px); }
                .btn-save:disabled { opacity:0.6; cursor:not-allowed; transform:none; box-shadow:none; }
                
                .btn-reset { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); }
                .btn-reset:hover { background:rgba(255,255,255,0.1); }
                
                .btn-return { background:linear-gradient(135deg,#d97706,#b45309); }
                .btn-return:hover { box-shadow:0 0 20px rgba(217,119,6,0.4); transform:translateY(-2px); }
                
                .alert-box {
                    margin-top:20px; padding:12px 16px; border-radius:8px; font-weight:600; font-size:14px;
                }
                .alert-success { background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); color:#34d399; }
                .alert-error { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); color:#f87171; }
                .alert-warn { background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); color:#fbbf24; }
            `}</style>

            <div className="stock-root">
                <div className="stock-card">
                    <div className="stock-title">
                        {parseInt(flag) === 1 ? "Stock Purchase Entry" : "Stock Issue Entry"}
                    </div>
                    <div className="stock-subtitle">Inventory Management</div>

                    <div className="stock-grid">
                        
                        {/* Left Side: Details */}
                        <div className="section-card">
                            <div className="section-header">Product Details</div>
                            
                            <div className="detail-row">
                                <span className="detail-label">Product ID</span>
                                <span className="detail-value">{product.productId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">SKU ID</span>
                                <span className="detail-value">{product.skuId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Product Name</span>
                                <span className="detail-value" style={{fontFamily:'Rajdhani'}}>{product.productName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">{parseInt(flag) === 1 ? "Purchase Price" : "Sales Price"}</span>
                                <span className="detail-value">₹{parseInt(flag) === 1 ? product.purchasePrice : product.salesPrice}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Re-Order Level</span>
                                <span className="detail-value">{product.reorderLevel}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Current Stock</span>
                                <span className="detail-value">{product.stock}</span>
                            </div>
                            
                            <div className="input-group" style={{marginTop:'16px'}}>
                                <label className="input-label">Vendor Allocation</label>
                                <select 
                                    className="stock-input"
                                    value={product.vendorId}
                                    onChange={(e) => setProduct({...product, vendorId: e.target.value})}
                                    disabled={parseInt(flag) === 2} // Usually only pick vendor on purchase
                                >
                                    <option value="" disabled>Select Vendor...</option>
                                    {vendors.map((vendorName) => (
                                        <option key={vendorName} value={vendorName}>
                                            {vendorName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="section-card">
                            <div className="section-header">Transaction Detail</div>
                            
                            <form onSubmit={handleValidation}>
                                <div className="input-group">
                                    <label className="input-label">Transaction ID</label>
                                    <input className="stock-input" value={newId} readOnly style={{opacity:0.6}} />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Transaction Date</label>
                                    <input 
                                        type="date" className="stock-input" 
                                        value={tdate} 
                                        onChange={(event) => setTdate(event.target.value)} 
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Quantity</label>
                                    <input 
                                        type="number" className={`stock-input ${errors.quantity ? 'error' : ''}`}
                                        value={quantity} 
                                        onChange={(event) => setQuantity(event.target.value)} 
                                    />
                                    {errors.quantity && <div className="error-text">{errors.quantity}</div>}
                                </div>

                                <div className="btn-group">
                                    <button type="button" className="action-btn btn-return" onClick={returnBack}>
                                        Return
                                    </button>
                                    <button type="button" className="action-btn btn-reset" onClick={clearAll}>
                                        Reset
                                    </button>
                                    <button type="submit" className="action-btn btn-save" disabled={isSaving}>
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>

                            {transValue !== null && !saveError && (
                                <div className="alert-box alert-success">
                                    ✔ Transaction Saved! Value: ₹{transValue}
                                </div>
                            )}
                            {saveError && (
                                <div className="alert-box alert-error">
                                    ❌ {saveError}
                                </div>
                            )}
                            {warns && !saveError && (
                                <div className="alert-box alert-warn">
                                    ⚠️ {warns}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductStockEdit;