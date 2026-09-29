import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSKU, getSKUById } from '../../Services/SKUService';

const SKUEdit = () => {

    const navigate = useNavigate();
    const param = useParams();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const [sku, setSku] = useState({
        skuId: "",
        category: "",
        skuDescription: "",
    });

    useEffect(() => {
        getSKUById(param.skuno).then((response) => {
            setSku(response.data);
            setLoading(false);
        }).catch(() => {
            alert("Failed to load SKU data.");
            setLoading(false);
        });
    }, [param.skuno]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        // ✅ FIXED: use setState instead of direct mutation
        setSku(prev => ({ ...prev, [name]: value }));
    };

    const editSKU = (event) => {
        event.preventDefault();
        updateSKU(sku).then(() => {
            alert("SKU Updated Successfully!");
            // ✅ FIXED: was /sku-list which doesn't exist in App.js
            navigate("/sku-repo");
        }).catch(() => {
            alert("Failed to update SKU. Please try again.");
        });
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!sku.category.trim()) {
            tempErrors.category = "Category is required";
            isValid = false;
        }

        if (!sku.skuDescription.trim()) {
            tempErrors.skuDescription = "SKU Description is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) editSKU(event);
    };

    const returnBack = () => {
        // ✅ FIXED: was /sku-list which doesn't exist in App.js
        navigate("/sku-repo");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <p className="text-slate-400">Loading SKU data...</p>
            </div>
        );
    }

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
                .sku-input[readonly] {
                    background:rgba(0,0,0,0.2); color:rgba(224,242,254,0.5);
                    cursor:not-allowed; border-color:rgba(255,255,255,0.05); box-shadow:none;
                }
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
            `}</style>
            
            <div className="sku-root">
                <div className="sku-card">
                    <div className="sku-title">Edit SKU Information</div>
                    <div className="sku-subtitle">Modify Category & Description</div>

                    <form onSubmit={handleValidation}>
                        
                        <div className="input-group">
                            <label className="input-label">SKU ID</label>
                            <input
                                type="text"
                                name="skuId"
                                value={sku.skuId}
                                className="sku-input"
                                readOnly
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Category</label>
                            <input
                                list="categoryOptions"
                                name="category"
                                value={sku.category || ""}
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
                                value={sku.skuDescription || ""}
                                onChange={onChangeHandler}
                                className={`sku-input ${errors.skuDescription ? 'error' : ''}`}
                                placeholder="e.g. Barilla Pasta Penne 500g"
                            />
                            {errors.skuDescription && <div className="error-text">{errors.skuDescription}</div>}
                        </div>

                        <div className="btn-group">
                            <button type="button" onClick={returnBack} className="cancel-btn">
                                Cancel
                            </button>
                            <button type="submit" className="sku-btn">
                                Update SKU
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default SKUEdit;