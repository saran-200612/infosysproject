import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllSKUs, deleteSKUById } from "../../Services/SKUService";
import { getRole } from '../../Services/LoginService';
import { displayAllProducts } from '../../Services/ProductService';

const SKUReport = () => {

    let navigate = useNavigate();
    const [role, setRole] = useState("");
    const [skuList, setSkuList] = useState([]);
    const [loading, setLoading] = useState(true);

    const setRoleData = () => {
        getRole().then((response) => {
            setRole(response.data);
        });
    };

    const setSKURecords = () => {
        const activeRole = localStorage.getItem("role") || "";
        const userId = localStorage.getItem("userId") || "";

        getAllSKUs().then((skuRes) => {
            let allSkus = skuRes.data;

            if (activeRole.toLowerCase() === 'vendor') {
                displayAllProducts().then((prodRes) => {
                    const vendorProducts = prodRes.data.filter(p => p.vendorId === userId);
                    const vendorSkuIds = [...new Set(vendorProducts.map(p => p.skuId))];
                    setSkuList(allSkus.filter(sku => vendorSkuIds.includes(sku.skuId)));
                    setLoading(false);
                }).catch(() => {
                    setSkuList([]);
                    setLoading(false);
                });
            } else {
                setSkuList(allSkus);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        setRoleData();
        setSKURecords();
    }, []);

    const returnBack = () => {
        const resolvedRole = (localStorage.getItem("role") || role).toLowerCase().trim();
        if (resolvedRole === 'admin')
            navigate('/admin-menu');
        else if (resolvedRole === 'manager')
            navigate('/manager-menu');
        else if (resolvedRole === 'vendor')
            navigate('/vendor-menu');
        else
            navigate('/');
    };

    const deleteSKU = (id) => {
        deleteSKUById(id).then(() => {
            let remainSkus = skuList.filter((sku) => sku.skuId !== id);
            setSkuList(remainSkus);
        });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .sku-root { min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif; background-color:#0a0e1a;
                    background-image: radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                    url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center; background-attachment:fixed; position:relative; }
                .sku-root::before { content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%); z-index:0; }
                .sku-content { position:relative; z-index:1; }
                .sku-header { background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
                    border-bottom:1px solid rgba(14,165,233,0.2); padding:16px 32px;
                    display:flex; align-items:center; justify-content:space-between; }
                .sku-title { font-size:22px; font-weight:700; color:#e0f2fe; letter-spacing:1.5px; text-transform:uppercase; }
                .sku-subtitle { font-size:11px; color:rgba(14,165,233,0.7); letter-spacing:2px; text-transform:uppercase; }
                .sku-btn { background:rgba(14,165,233,0.15); border:1px solid rgba(14,165,233,0.4); color:#7dd3fc;
                    padding:9px 20px; border-radius:8px; font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:600; letter-spacing:1px; cursor:pointer; transition:all 0.2s; }
                .sku-btn:hover { background:rgba(14,165,233,0.28); color:#e0f2fe; }
                .sku-table-wrap { padding:24px 32px; }
                .sku-table-glass { background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px; overflow:hidden;
                    box-shadow:0 0 0 1px rgba(255,255,255,0.03) inset,0 24px 48px rgba(0,0,0,0.4); }
                .sku-table { width:100%; border-collapse:collapse; font-family:'Rajdhani',sans-serif; }
                .sku-table thead tr { background:rgba(14,165,233,0.1); border-bottom:1px solid rgba(14,165,233,0.2); }
                .sku-table thead th { padding:14px; text-align:left; font-size:11px; font-weight:600;
                    letter-spacing:2px; text-transform:uppercase; color:rgba(14,165,233,0.8); }
                .sku-table tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
                .sku-table tbody tr:hover { background:rgba(14,165,233,0.06); }
                .sku-table tbody tr:last-child { border-bottom:none; }
                .sku-table td { padding:13px 14px; font-size:14px; color:#cbd5e1; vertical-align:middle; }
                .mono { font-family:'Share Tech Mono',monospace; font-size:12px; color:#7dd3fc; }
                .btn-upd { background:rgba(56,189,248,0.14); border:1px solid rgba(56,189,248,0.3); color:#38bdf8;
                    padding:5px 12px; border-radius:6px; font-family:'Rajdhani',sans-serif;
                    font-size:12px; font-weight:600; cursor:pointer; transition:all 0.18s; text-decoration:none; display:inline-block; }
                .btn-upd:hover { background:rgba(56,189,248,0.26); color:#7dd3fc; }
                .btn-del { background:rgba(248,113,113,0.12); border:1px solid rgba(248,113,113,0.28); color:#f87171;
                    padding:5px 12px; border-radius:6px; font-family:'Rajdhani',sans-serif;
                    font-size:12px; font-weight:600; cursor:pointer; transition:all 0.18s; margin-left:6px; }
                .btn-del:hover { background:rgba(248,113,113,0.24); color:#fca5a5; }
                .sku-loader { display:flex; align-items:center; justify-content:center; gap:8px;
                    padding:60px; color:rgba(14,165,233,0.6); font-size:14px; letter-spacing:2px; }
                .spinner { width:18px; height:18px; border:2px solid rgba(14,165,233,0.2);
                    border-top-color:#0ea5e9; border-radius:50%; animation:spin 0.8s linear infinite; }
                @keyframes spin { to { transform:rotate(360deg); } }
            `}</style>

            <div className="sku-root">
                <div className="sku-content">

                    <div className="sku-header">
                        <div>
                            <div className="sku-title">
                                {(localStorage.getItem("role") || role).toLowerCase() === 'vendor' ? '📋 Vendor SKU List' : '📋 SKU List'}
                            </div>
                            <div className="sku-subtitle">
                                {(localStorage.getItem("role") || role).toLowerCase() === 'vendor' ? 'Vendor View' : 
                                 (localStorage.getItem("role") || role).toLowerCase() === 'admin' ? 'Admin View' : 'Manager View'}
                            </div>
                        </div>
                        <button className="sku-btn" onClick={returnBack}>← Dashboard</button>
                    </div>

                    <div className="sku-table-wrap">
                        <div className="sku-table-glass">
                            {loading ? (
                                <div className="sku-loader"><div className="spinner"></div>LOADING SKUs...</div>
                            ) : (
                                <table className="sku-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>SKU ID</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            {(localStorage.getItem("role") || role || "").toLowerCase() === 'admin' && <th>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {skuList.map((sku, index) => (
                                            <tr key={sku.skuId}>
                                                <td>{index + 1}</td>
                                                <td><span className="mono">{sku.skuId}</span></td>
                                                <td style={{color:'#94a3b8'}}>{sku.category}</td>
                                                <td>{sku.skuDescription}</td>
                                                {(localStorage.getItem("role") || role || "").toLowerCase() === 'admin' &&
                                                    <td>
                                                        <Link to={`/update-sku/${sku.skuId}`} className="btn-upd">✏️ Update</Link>
                                                        <button onClick={() => deleteSKU(sku.skuId)} className="btn-del">🗑 Delete</button>
                                                    </td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SKUReport;