import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { displayAllProducts, deleteAProduct } from '../../Services/ProductService';
import { getRole } from '../../Services/LoginService';

const ProductReport = () => {

    const [products, setProducts] = useState([]);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRole().then((res) => setRole(res.data));
        displayAllProducts()
            .then((res) => { 
                let allProducts = res.data;
                const activeRole = localStorage.getItem("role") || "";
                const userId = localStorage.getItem("userId") || "";
                
                if (activeRole.toLowerCase() === 'vendor') {
                    setProducts(allProducts.filter(p => p.vendorId === userId));
                } else {
                    setProducts(allProducts);
                }
                setLoading(false); 
            })
            .catch(() => { alert("Error loading products"); setLoading(false); });
    }, []);

    const removeProduct = (id) => {
        if (window.confirm(`Delete product ${id}?`)) {
            deleteAProduct(id).then(() =>
                setProducts(products.filter((p) => p.productId !== id))
            );
        }
    };

    const returnBack = () => {
        const resolvedRole = (localStorage.getItem("role") || role).toLowerCase().trim();
        if (resolvedRole === 'admin') navigate('/admin-menu');
        else if (resolvedRole === 'manager') navigate('/manager-menu');
        else if (resolvedRole === 'vendor') navigate('/vendor-menu');
        else navigate('/');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

                .pr-root {
                    min-height: 100vh;
                    width: 100%;
                    font-family: 'Rajdhani', sans-serif;
                    background-color: #0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.06) 0%, transparent 60%),
                        radial-gradient(ellipse at 80% 20%, rgba(56,189,248,0.04) 0%, transparent 50%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    position: relative;
                }

                .pr-root::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(135deg,
                        rgba(5,10,25,0.82) 0%,
                        rgba(8,15,35,0.75) 50%,
                        rgba(5,10,25,0.85) 100%
                    );
                    z-index: 0;
                }

                .pr-content { position: relative; z-index: 1; }

                .pr-header {
                    background: rgba(14,165,233,0.08);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(14,165,233,0.2);
                    padding: 16px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .pr-header-left { display: flex; align-items: center; gap: 12px; }

                .pr-header-icon {
                    width: 40px; height: 40px;
                    background: linear-gradient(135deg, #0ea5e9, #0284c7);
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px;
                    box-shadow: 0 0 20px rgba(14,165,233,0.4);
                }

                .pr-title {
                    font-size: 22px; font-weight: 700;
                    color: #e0f2fe; letter-spacing: 1.5px; text-transform: uppercase;
                }

                .pr-subtitle {
                    font-size: 11px; color: rgba(14,165,233,0.7);
                    letter-spacing: 2px; text-transform: uppercase;
                }

                .pr-return-btn {
                    background: rgba(14,165,233,0.15);
                    border: 1px solid rgba(14,165,233,0.4);
                    color: #7dd3fc;
                    padding: 9px 20px; border-radius: 8px;
                    font-family: 'Rajdhani', sans-serif;
                    font-size: 14px; font-weight: 600; letter-spacing: 1px;
                    cursor: pointer; transition: all 0.2s;
                }

                .pr-return-btn:hover {
                    background: rgba(14,165,233,0.28);
                    border-color: rgba(14,165,233,0.7);
                    color: #e0f2fe;
                    box-shadow: 0 0 16px rgba(14,165,233,0.25);
                }

                .pr-stats {
                    display: flex; gap: 16px;
                    padding: 20px 32px; flex-wrap: wrap;
                }

                .pr-stat-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; padding: 12px 20px;
                    min-width: 120px; backdrop-filter: blur(10px);
                }

                .pr-stat-label {
                    font-size: 10px; color: rgba(148,163,184,0.8);
                    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;
                }

                .pr-stat-value { font-size: 24px; font-weight: 700; color: #e0f2fe; }
                .pr-stat-value.ok  { color: #34d399; }
                .pr-stat-value.warn { color: #f87171; }

                .pr-table-wrap { padding: 0 32px 32px; overflow-x: auto; }

                .pr-table-glass {
                    background: rgba(10,20,45,0.55);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(14,165,233,0.15);
                    border-radius: 16px; overflow: hidden;
                    box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                }

                .pr-table { width: 100%; border-collapse: collapse; font-family: 'Rajdhani', sans-serif; }

                .pr-table thead tr {
                    background: rgba(14,165,233,0.1);
                    border-bottom: 1px solid rgba(14,165,233,0.2);
                }

                .pr-table thead th {
                    padding: 14px 14px; text-align: left;
                    font-size: 11px; font-weight: 600;
                    letter-spacing: 2px; text-transform: uppercase;
                    color: rgba(14,165,233,0.8); white-space: nowrap;
                }

                .pr-table thead th.right { text-align: right; }
                .pr-table thead th.center { text-align: center; }

                .pr-table tbody tr {
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.15s;
                }

                .pr-table tbody tr:hover { background: rgba(14,165,233,0.06); }
                .pr-table tbody tr:last-child { border-bottom: none; }

                .pr-table td {
                    padding: 13px 14px; font-size: 14px;
                    color: #cbd5e1; vertical-align: middle;
                }

                .pr-table td.right { text-align: right; }
                .pr-table td.center { text-align: center; }

                .mono { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #7dd3fc; }
                .price { font-family: 'Share Tech Mono', monospace; font-size: 13px; color: #e2e8f0; }

                .badge {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 3px 9px; border-radius: 20px;
                    font-size: 11px; font-weight: 600; letter-spacing: 0.5px; white-space: nowrap;
                }

                .badge-ok  { background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.3); color: #34d399; }
                .badge-warn { background: rgba(248,113,113,0.12); border: 1px solid rgba(248,113,113,0.3); color: #f87171; }

                .action-col { display: flex; flex-direction: column; gap: 5px; min-width: 116px; }
                .action-row { display: flex; gap: 5px; }

                .btn-act {
                    flex: 1;
                    padding: 5px 4px;
                    border-radius: 6px;
                    font-family: 'Rajdhani', sans-serif;
                    font-size: 12px; font-weight: 600; letter-spacing: 0.3px;
                    cursor: pointer; border: 1px solid transparent;
                    transition: all 0.18s; text-align: center;
                    white-space: nowrap; text-decoration: none; display: block;
                    line-height: 1.4;
                }

                .btn-buy  { background: rgba(52,211,153,0.14); border-color: rgba(52,211,153,0.3); color: #34d399; }
                .btn-buy:hover { background: rgba(52,211,153,0.26); box-shadow: 0 0 8px rgba(52,211,153,0.2); color: #6ee7b7; }

                .btn-iss  { background: rgba(251,191,36,0.14); border-color: rgba(251,191,36,0.3); color: #fbbf24; }
                .btn-iss:hover { background: rgba(251,191,36,0.26); box-shadow: 0 0 8px rgba(251,191,36,0.2); color: #fde68a; }
                .btn-iss.disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }

                .btn-prc  { background: rgba(148,163,184,0.1); border-color: rgba(148,163,184,0.22); color: #94a3b8; }
                .btn-prc:hover { background: rgba(148,163,184,0.2); color: #cbd5e1; }

                .btn-del  { background: rgba(248,113,113,0.12); border-color: rgba(248,113,113,0.28); color: #f87171; }
                .btn-del:hover { background: rgba(248,113,113,0.24); box-shadow: 0 0 8px rgba(248,113,113,0.2); color: #fca5a5; }

                .stock-low { color: #f87171; font-weight: 700; }
                .stock-ok  { color: #34d399; font-weight: 600; }

                .pr-empty { text-align: center; padding: 60px; color: rgba(148,163,184,0.5); font-size: 16px; letter-spacing: 1px; }
                .pr-loader { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 60px; color: rgba(14,165,233,0.6); font-size: 14px; letter-spacing: 2px; }
                .spinner { width: 18px; height: 18px; border: 2px solid rgba(14,165,233,0.2); border-top-color: #0ea5e9; border-radius: 50%; animation: spin 0.8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="pr-root">
                <div className="pr-content">

                    {/* Header */}
                    <div className="pr-header">
                        <div className="pr-header-left">
                            <div className="pr-header-icon">📦</div>
                            <div>
                                <div className="pr-title">
                                    {(localStorage.getItem("role") || role).toLowerCase() === 'vendor' ? 'Vendor Inventory' : 'Product Inventory'}
                                </div>
                                <div className="pr-subtitle">SmartShelfX · {(localStorage.getItem("role") || role).toLowerCase() === 'vendor' ? 'Vendor View' : 'Live Stock View'}</div>
                            </div>
                        </div>
                        <button className="pr-return-btn" onClick={returnBack}>← Dashboard</button>
                    </div>

                    {/* Stats */}
                    {!loading && products.length > 0 && (
                        <div className="pr-stats">
                            <div className="pr-stat-card">
                                <div className="pr-stat-label">Total Products</div>
                                <div className="pr-stat-value">{products.length}</div>
                            </div>
                            <div className="pr-stat-card">
                                <div className="pr-stat-label">In Stock</div>
                                <div className="pr-stat-value ok">{products.filter(p => p.status).length}</div>
                            </div>
                            <div className="pr-stat-card">
                                <div className="pr-stat-label">Reorder Alert</div>
                                <div className="pr-stat-value warn">{products.filter(p => !p.status).length}</div>
                            </div>
                            <div className="pr-stat-card">
                                <div className="pr-stat-label">Total Stock Value</div>
                                <div className="pr-stat-value" style={{fontSize:'18px'}}>
                                    ₹{products.reduce((s, p) => s + (p.purchasePrice * p.stock), 0).toLocaleString('en-IN')}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="pr-table-wrap">
                        <div className="pr-table-glass">
                            {loading ? (
                                <div className="pr-loader"><div className="spinner"></div>LOADING INVENTORY...</div>
                            ) : products.length === 0 ? (
                                <div className="pr-empty">No products found in inventory.</div>
                            ) : (
                                <table className="pr-table">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>SKU</th>
                                            <th>Name</th>
                                            <th>Vendor</th>
                                            <th className="right">Buy ₹</th>
                                            <th className="right">Sale ₹</th>
                                            <th className="right">Stock</th>
                                            <th className="right">Reorder</th>
                                            <th className="center">Status</th>
                                            {(localStorage.getItem("role") || role).toLowerCase() !== 'vendor' && <th className="center">Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((p) => (
                                            <tr key={p.productId}>
                                                <td><span className="mono">{p.productId}</span></td>
                                                <td><span className="mono">{p.skuId}</span></td>
                                                <td style={{fontWeight:600, color:'#e2e8f0'}}>{p.productName}</td>
                                                <td style={{color:'#94a3b8'}}>{p.vendorId}</td>
                                                <td className="right"><span className="price">₹{p.purchasePrice}</span></td>
                                                <td className="right"><span className="price">₹{p.salesPrice}</span></td>
                                                <td className="right">
                                                    <span className={p.status ? 'stock-ok' : 'stock-low'}>{p.stock}</span>
                                                </td>
                                                <td className="right" style={{color:'#64748b'}}>{p.reorderLevel}</td>
                                                <td className="center">
                                                    {p.status
                                                        ? <span className="badge badge-ok">✓ OK</span>
                                                        : <span className="badge badge-warn">⚠ Reorder</span>
                                                    }
                                                </td>
                                                {(localStorage.getItem("role") || role).toLowerCase() !== 'vendor' && (
                                                <td className="center">
                                                    <div className="action-col">
                                                        {(<div className="action-row">
                                                            <Link to={`/edit-stock/${p.productId}/1`} className="btn-act btn-buy">📥 Buy</Link>
                                                            <Link
                                                                to={p.status ? `/edit-stock/${p.productId}/2` : '#'}
                                                                className={`btn-act btn-iss${!p.status ? ' disabled' : ''}`}
                                                                onClick={e => { if (!p.status) e.preventDefault(); }}
                                                            >
                                                                📤 Issue
                                                            </Link>
                                                        </div>)}
                                                        {(localStorage.getItem("role") || role || "").toLowerCase() === 'admin' && (
                                                            <div className="action-row">
                                                                <Link to={`/edit-price/${p.productId}`} className="btn-act btn-prc">💰 Price</Link>
                                                                <button onClick={() => removeProduct(p.productId)} className="btn-act btn-del" style={{flex:1}}>🗑 Del</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                )}
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

export default ProductReport;