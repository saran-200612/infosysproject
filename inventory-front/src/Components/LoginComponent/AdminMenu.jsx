import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/LoginService';

const AdminMenu = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser().then(() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/');
        });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
                .am-root {
                    min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif;
                    background-color:#0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center;
                    background-attachment:fixed; position:relative;
                }
                .am-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%);
                    z-index:0;
                }
                .am-content { position:relative; z-index:1; }
                .am-header {
                    background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
                    border-bottom:1px solid rgba(14,165,233,0.2);
                    padding:16px 32px; display:flex; align-items:center; justify-content:space-between;
                }
                .am-header-left { display:flex; align-items:center; gap:12px; }
                .am-header-icon {
                    width:40px; height:40px;
                    background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border-radius:10px; display:flex; align-items:center;
                    justify-content:center; font-size:18px;
                    box-shadow:0 0 20px rgba(14,165,233,0.4);
                }
                .am-title {
                    font-size:22px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase;
                }
                .am-subtitle {
                    font-size:11px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase;
                }
                .am-logout {
                    background:rgba(248,113,113,0.15);
                    border:1px solid rgba(248,113,113,0.4); color:#f87171;
                    padding:9px 20px; border-radius:8px;
                    font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s;
                }
                .am-logout:hover { background:rgba(248,113,113,0.28); color:#fca5a5; }
                .am-grid {
                    display:grid; grid-template-columns:1fr 1fr;
                    gap:20px; padding:40px 60px; max-width:1000px; margin:0 auto;
                }
                .am-card {
                    background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px;
                    padding:32px 24px; cursor:pointer; transition:all 0.25s;
                    display:flex; flex-direction:column; align-items:center;
                    gap:12px; text-align:center;
                    box-shadow:0 8px 32px rgba(0,0,0,0.3);
                }
                .am-card:hover {
                    background:rgba(14,165,233,0.12);
                    border-color:rgba(14,165,233,0.4);
                    transform:translateY(-3px);
                    box-shadow:0 16px 40px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.1);
                }
                .am-card-icon { font-size:36px; }
                .am-card-label {
                    font-size:16px; font-weight:600; color:#e0f2fe;
                    letter-spacing:0.5px;
                }
                .am-card-desc {
                    font-size:11px; color:rgba(148,163,184,0.7);
                    letter-spacing:1px; text-transform:uppercase;
                }
                .am-card.blue   { border-color:rgba(59,130,246,0.3); }
                .am-card.blue:hover { border-color:rgba(59,130,246,0.6); background:rgba(59,130,246,0.1); }
                .am-card.green  { border-color:rgba(52,211,153,0.3); }
                .am-card.green:hover { border-color:rgba(52,211,153,0.6); background:rgba(52,211,153,0.1); }
                .am-card.purple { border-color:rgba(167,139,250,0.3); }
                .am-card.purple:hover { border-color:rgba(167,139,250,0.6); background:rgba(167,139,250,0.1); }
                .am-card.yellow { border-color:rgba(251,191,36,0.3); }
                .am-card.yellow:hover { border-color:rgba(251,191,36,0.6); background:rgba(251,191,36,0.08); }
                .am-card.indigo { border-color:rgba(99,102,241,0.3); }
                .am-card.indigo:hover { border-color:rgba(99,102,241,0.6); background:rgba(99,102,241,0.1); }
                .am-card.teal   { border-color:rgba(20,184,166,0.3); }
                .am-card.teal:hover { border-color:rgba(20,184,166,0.6); background:rgba(20,184,166,0.1); }
                .am-card.orange { border-color:rgba(251,146,60,0.3); }
                .am-card.orange:hover { border-color:rgba(251,146,60,0.6); background:rgba(251,146,60,0.08); }
                .am-card.cyan   { border-color:rgba(34,211,238,0.3); }
                .am-card.cyan:hover { border-color:rgba(34,211,238,0.6); background:rgba(34,211,238,0.1); }
            `}</style>

            <div className="am-root">
                <div className="am-content">

                    {/* Header */}
                    <div className="am-header">
                        <div className="am-header-left">
                            <div className="am-header-icon">📦</div>
                            <div>
                                <div className="am-title">Inventory Admin Dashboard</div>
                                <div className="am-subtitle">SmartShelfX · Control Panel</div>
                            </div>
                        </div>
                        <button className="am-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    {/* Grid Menu */}
                    <div className="am-grid">

                        <div className="am-card blue" onClick={() => navigate("/sku-entry")}>
                            <div className="am-card-icon">➕</div>
                            <div className="am-card-label">Add SKU</div>
                            <div className="am-card-desc">Create new SKU entry</div>
                        </div>

                        <div className="am-card green" onClick={() => navigate("/sku-repo")}>
                            <div className="am-card-icon">📋</div>
                            <div className="am-card-label">View SKU List</div>
                            <div className="am-card-desc">Browse all SKUs</div>
                        </div>

                        <div className="am-card purple" onClick={() => navigate("/product-entry")}>
                            <div className="am-card-icon">📦</div>
                            <div className="am-card-label">Add Product</div>
                            <div className="am-card-desc">Register new product</div>
                        </div>

                        <div className="am-card yellow" onClick={() => navigate("/product-repo")}>
                            <div className="am-card-icon">📋</div>
                            <div className="am-card-label">View Product List</div>
                            <div className="am-card-desc">Manage all products</div>
                        </div>

                        <div className="am-card indigo" onClick={() => navigate("/product-repo")}>
                            <div className="am-card-icon">🔄</div>
                            <div className="am-card-label">Stock Entry (IN / OUT)</div>
                            <div className="am-card-desc">Buy or issue stock</div>
                        </div>

                        <div className="am-card teal" onClick={() => navigate("/transaction-report/IN")}>
                            <div className="am-card-icon">📊</div>
                            <div className="am-card-label">View Purchase Transactions</div>
                            <div className="am-card-desc">All stock IN records</div>
                        </div>

                        <div className="am-card orange" onClick={() => navigate("/transaction-report/OUT")}>
                            <div className="am-card-icon">📊</div>
                            <div className="am-card-label">View Issue Transactions</div>
                            <div className="am-card-desc">All stock OUT records</div>
                        </div>

                        <div className="am-card cyan" onClick={() => navigate("/product-pie")}>
                            <div className="am-card-icon">📈</div>
                            <div className="am-card-label">Product Sales Analysis</div>
                            <div className="am-card-desc">Pie chart analytics</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;