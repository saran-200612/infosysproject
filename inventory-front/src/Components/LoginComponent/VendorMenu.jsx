import React from "react";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/LoginService';

const VendorMenu = () => {
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
                .vm-root {
                    min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif;
                    background-color:#0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center;
                    background-attachment:fixed; position:relative;
                }
                .vm-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%);
                    z-index:0;
                }
                .vm-content { position:relative; z-index:1; }
                .vm-header {
                    background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
                    border-bottom:1px solid rgba(14,165,233,0.2);
                    padding:16px 32px; display:flex; align-items:center; justify-content:space-between;
                }
                .vm-header-left { display:flex; align-items:center; gap:12px; }
                .vm-header-icon {
                    width:40px; height:40px;
                    background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border-radius:10px; display:flex; align-items:center;
                    justify-content:center; font-size:18px;
                    box-shadow:0 0 20px rgba(14,165,233,0.4);
                }
                .vm-title {
                    font-size:22px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase;
                }
                .vm-subtitle {
                    font-size:11px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase;
                }
                .vm-logout {
                    background:rgba(248,113,113,0.15);
                    border:1px solid rgba(248,113,113,0.4); color:#f87171;
                    padding:9px 20px; border-radius:8px;
                    font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s;
                }
                .vm-logout:hover { background:rgba(248,113,113,0.28); color:#fca5a5; }
                .vm-grid {
                    display:grid; grid-template-columns:1fr 1fr;
                    gap:20px; padding:40px 60px; max-width:1000px; margin:0 auto;
                }
                .vm-card {
                    background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px;
                    padding:32px 24px; cursor:pointer; transition:all 0.25s;
                    display:flex; flex-direction:column; align-items:center;
                    gap:12px; text-align:center;
                    box-shadow:0 8px 32px rgba(0,0,0,0.3);
                }
                .vm-card:hover {
                    background:rgba(14,165,233,0.12);
                    border-color:rgba(14,165,233,0.4);
                    transform:translateY(-3px);
                    box-shadow:0 16px 40px rgba(0,0,0,0.4), 0 0 20px rgba(14,165,233,0.1);
                }
                .vm-card-icon { font-size:36px; }
                .vm-card-label {
                    font-size:16px; font-weight:600; color:#e0f2fe;
                    letter-spacing:0.5px;
                }
                .vm-card-desc {
                    font-size:11px; color:rgba(148,163,184,0.7);
                    letter-spacing:1px; text-transform:uppercase;
                }
                .vm-card.yellow { border-color:rgba(251,191,36,0.3); }
                .vm-card.yellow:hover { border-color:rgba(251,191,36,0.6); background:rgba(251,191,36,0.08); }
                .vm-card.teal   { border-color:rgba(20,184,166,0.3); }
                .vm-card.teal:hover { border-color:rgba(20,184,166,0.6); background:rgba(20,184,166,0.1); }
                .vm-card.indigo { border-color:rgba(99,102,241,0.3); }
                .vm-card.indigo:hover { border-color:rgba(99,102,241,0.6); background:rgba(99,102,241,0.1); }
                .vm-card.orange { border-color:rgba(251,146,60,0.3); }
                .vm-card.orange:hover { border-color:rgba(251,146,60,0.6); background:rgba(251,146,60,0.08); }
            `}</style>

            <div className="vm-root">
                <div className="vm-content">

                    {/* Header */}
                    <div className="vm-header">
                        <div className="vm-header-left">
                            <div className="vm-header-icon">🏪</div>
                            <div>
                                <div className="vm-title">Vendor Dashboard</div>
                                <div className="vm-subtitle">SmartShelfX · Vendor Portal</div>
                            </div>
                        </div>
                        <button className="vm-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    {/* Grid Menu */}
                    <div className="vm-grid">

                        <div className="vm-card yellow" onClick={() => navigate("/product-repo")}>
                            <div className="vm-card-icon">📦</div>
                            <div className="vm-card-label">View Products</div>
                            <div className="vm-card-desc">Browse vendor inventory</div>
                        </div>

                        <div className="vm-card teal" onClick={() => navigate("/sku-repo")}>
                            <div className="vm-card-icon">📋</div>
                            <div className="vm-card-label">View SKUs</div>
                            <div className="vm-card-desc">Product catalog</div>
                        </div>

                        <div className="vm-card indigo" onClick={() => navigate("/transaction-report/IN")}>
                            <div className="mm-card-icon" style={{fontSize:'36px'}}>📥</div>
                            <div className="vm-card-label">Purchase History (IN)</div>
                            <div className="vm-card-desc">Stock supplied by you</div>
                        </div>

                        <div className="vm-card orange" onClick={() => navigate("/transaction-report/OUT")}>
                            <div className="mm-card-icon" style={{fontSize:'36px'}}>📤</div>
                            <div className="vm-card-label">Issue History (OUT)</div>
                            <div className="vm-card-desc">Stock issued records</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default VendorMenu;