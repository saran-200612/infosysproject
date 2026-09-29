import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSKU } from "../../Services/SKUService";

const SKUEntry = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState(false);

    // ✅ FIXED: Added category to state
    const [skuData, setSkuData] = useState({
        skuId: "",
        category: "",
        skuDescription: "",
    });

    useEffect(() => {
        setFlag(false);
    }, []);

    const createNewSKU = (event) => {
        event.preventDefault();
        saveSKU(skuData).then(() => {
            setFlag(true);
        }).catch(() => {
            alert("Failed to save SKU. Please try again.");
        });
    };

    const onChangeHandler = (event) => {
        setFlag(false);
        const { name, value } = event.target;
        setSkuData(values => ({ ...values, [name]: value }));
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!skuData.skuId.trim()) {
            tempErrors.skuId = "SKU Id is required";
            isValid = false;
        }

        // ✅ FIXED: Validate category
        if (!skuData.category.trim()) {
            tempErrors.category = "Category is required";
            isValid = false;
        }

        if (!skuData.skuDescription.trim()) {
            tempErrors.skuDescription = "SKU Description is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            createNewSKU(event);
        }
    };

    const returnBack = () => {
        navigate('/admin-menu');
    };

    // ✅ FIXED: Reset state properly using setState, not direct mutation
    const nextEntry = () => {
        setSkuData({
            skuId: "",
            category: "",
            skuDescription: "",
        });
        setFlag(false);
        setErrors({});
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .sku-root {
                    min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif;
                    background-color:#0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center;
                    background-attachment:fixed; position:relative;
                    display:flex; align-items:center; justify-content:center; padding:40px 20px; box-sizing:border-box;
                }
                .sku-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.85) 0%,rgba(8,15,35,0.8) 50%,rgba(5,10,25,0.9) 100%);
                    z-index:0;
                }
                .sku-card {
                    position:relative; z-index:1;
                    width:100%; max-width:500px;
                    background:rgba(10,20,45,0.65); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px;
                    box-shadow:0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                    padding:40px; text-align:center;
                }
                .sku-title {
                    font-size:26px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase; margin-bottom:4px;
                }
                .sku-subtitle {
                    font-size:12px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase; margin-bottom:32px;
                }
                .input-group { display:flex; flex-direction:column; gap:8px; margin-bottom:20px; text-align:left; }
                .input-label {
                    font-size:12px; color:rgba(14,165,233,0.8);
                    font-weight:600; letter-spacing:1px; text-transform:uppercase;
                }
                .sku-input {
                    background:rgba(5,10,25,0.5); border:1px solid rgba(14,165,233,0.2);
                    padding:12px 16px; border-radius:8px; color:#e0f2fe;
                    font-family:'Share Tech Mono',monospace; font-size:15px;
                    transition:all 0.2s; outline:none; width:100%; box-sizing:border-box;
                }
                .sku-input:focus {
                    border-color:rgba(14,165,233,0.6); box-shadow:0 0 12px rgba(14,165,233,0.2);
                    background:rgba(5,10,25,0.8);
                }
                .sku-input.error { border-color:rgba(248,113,113,0.5); }
                .error-text { color:#f87171; font-size:11px; margin-top:-4px; letter-spacing:0.5px; }
                
                .btn-group { display:flex; gap:16px; margin-top:32px; justify-content:center; }
                
                .sku-btn {
                    flex:1; background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border:none; padding:14px; border-radius:8px;
                    color:#fff; font-family:'Rajdhani',sans-serif; font-size:16px;
                    font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    cursor:pointer; transition:all 0.2s;
                }
                .sku-btn:hover { box-shadow:0 0 20px rgba(14,165,233,0.4); transform:translateY(-2px); }
                
                .cancel-btn {
                    flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
                    padding:14px; border-radius:8px; text-decoration:none;
                    color:#94a3b8; font-family:'Rajdhani',sans-serif; font-size:16px;
                    font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    cursor:pointer; transition:all 0.2s; display:inline-block; display:flex; align-items:center; justify-content:center;
                }
                .cancel-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }
                
                .success-msg {
                    margin-top:24px; padding:16px; border-radius:8px;
                    background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3);
                    color:#34d399; font-weight:600; font-size:14px; letter-spacing:0.5px;
                }
                .success-btn {
                    margin-top:12px; background:rgba(16,185,129,0.2); border:1px solid rgba(16,185,129,0.5); 
                    color:#fff; font-weight:600; padding:8px 16px; border-radius:6px;
                    cursor:pointer; font-family:'Rajdhani',sans-serif; font-size:13px; text-transform:uppercase; letter-spacing:1px;
                }
                .success-btn:hover { background:rgba(16,185,129,0.4); }
            `}</style>
            
            <div className="sku-root">
                <div className="sku-card">
                    <div className="sku-title">New SKU Entry</div>
                    <div className="sku-subtitle">Product Category Definition</div>

                    <form onSubmit={handleValidation}>
                        
                        <div className="input-group">
                            <label className="input-label">SKU ID</label>
                            <input
                                type="text"
                                name="skuId"
                                value={skuData.skuId}
                                onChange={onChangeHandler}
                                className={`sku-input ${errors.skuId ? 'error' : ''}`}
                                placeholder="e.g. BAR-PAS-PEN"
                            />
                            {errors.skuId && <div className="error-text">{errors.skuId}</div>}
                        </div>

                        <div className="input-group">
                            <label className="input-label">Category</label>
                            <input
                                list="categoryOptions"
                                name="category"
                                value={skuData.category}
                                onChange={onChangeHandler}
                                className={`sku-input ${errors.category ? 'error' : ''}`}
                                placeholder="e.g. Food, Dairy, Beverage"
                            />
                            <datalist id="categoryOptions">
                                <option value="Food" />
                                <option value="Dairy" />
                                <option value="Beverage" />
                                <option value="Apparel" />
                                <option value="Electronics" />
                                <option value="Stationery" />
                                <option value="Household" />
                            </datalist>
                            {errors.category && <div className="error-text">{errors.category}</div>}
                        </div>

                        <div className="input-group">
                            <label className="input-label">SKU Description</label>
                            <input
                                type="text"
                                name="skuDescription"
                                value={skuData.skuDescription}
                                onChange={onChangeHandler}
                                className={`sku-input ${errors.skuDescription ? 'error' : ''}`}
                                placeholder="e.g. Barilla Pasta Penne 500g"
                            />
                            {errors.skuDescription && <div className="error-text">{errors.skuDescription}</div>}
                        </div>

                        {flag && (
                            <div className="success-msg">
                                ✔ SKU saved successfully! <br/>
                                <button type="button" onClick={nextEntry} className="success-btn">
                                    ➕ Add Another SKU
                                </button>
                            </div>
                        )}

                        <div className="btn-group">
                            <button type="button" onClick={returnBack} className="cancel-btn">
                                Return
                            </button>
                            <button type="submit" className="sku-btn">
                                Save SKU
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default SKUEntry;