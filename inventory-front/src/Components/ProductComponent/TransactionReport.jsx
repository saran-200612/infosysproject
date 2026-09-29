import React from 'react';
import {useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import {findTransactionByType} from '../../Services/TransactionService';
import { getRole} from '../../Services/LoginService';

const TransactionReport = () => {

    const [transactions, setTransactions] = useState([]);
    let navigate = useNavigate();
    const param = useParams();
    const [flag,setFlag]=useState("");
    const [role,setRole]=useState("");
    const [loading,setLoading]=useState(true);
    const [fetchError,setFetchError]=useState(null);

    useEffect(() => {
        getRole().then(response => {
            setRole(response.data);
        });
        // Inlined to avoid missing-dependency lint warning
        findTransactionByType(param.pid).then(response => {
            const activeRole = localStorage.getItem("role") || "";
            const currentUserId = localStorage.getItem("userId") || "";
            
            if (activeRole.toLowerCase() === "vendor") {
                setTransactions(response.data.filter(t => t.userId === currentUserId));
            } else {
                setTransactions(response.data);
            }
            setFlag(param.pid);
            setLoading(false);
        }).catch(() => {
            setFetchError("Could not load transactions. Please check the backend connection.");
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const returnBack = () => {
        // Prefer localStorage (synchronous, set at login, persists across tabs)
        // to avoid async race conditions where `role` state may still be "".
        const resolvedRole = (localStorage.getItem("role") || role).toLowerCase().trim();

        if (resolvedRole === "admin")
            navigate('/admin-menu');
        else if (resolvedRole === "manager")
            navigate('/manager-menu');
        else if (resolvedRole === "vendor")
            navigate('/vendor-menu');
        else
            // Unknown / unresolved role → go to login, NOT admin-menu
            navigate('/');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .tr-root {
                    min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif;
                    background-color:#0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center;
                    background-attachment:fixed; position:relative;
                }
                .tr-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%);
                    z-index:0;
                }
                .tr-content { position:relative; z-index:1; }
                .tr-header {
                    background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
                    border-bottom:1px solid rgba(14,165,233,0.2);
                    padding:16px 32px; display:flex; align-items:center; justify-content:space-between;
                }
                .tr-header-left { display:flex; align-items:center; gap:12px; }
                .tr-header-icon {
                    width:40px; height:40px;
                    background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border-radius:10px; display:flex; align-items:center;
                    justify-content:center; font-size:18px;
                    box-shadow:0 0 20px rgba(14,165,233,0.4);
                }
                .tr-title {
                    font-size:22px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase;
                }
                .tr-subtitle {
                    font-size:11px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase;
                }
                .tr-return-btn {
                    background:rgba(14,165,233,0.15);
                    border:1px solid rgba(14,165,233,0.4); color:#7dd3fc;
                    padding:9px 20px; border-radius:8px;
                    font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:600; letter-spacing:1px;
                    cursor:pointer; transition:all 0.2s;
                }
                .tr-return-btn:hover {
                    background:rgba(14,165,233,0.28);
                    border-color:rgba(14,165,233,0.7); color:#e0f2fe;
                    box-shadow:0 0 16px rgba(14,165,233,0.25);
                }
                .tr-table-wrap { padding:24px 32px; overflow-x:auto; }
                .tr-table-glass {
                    background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px; overflow:hidden;
                    box-shadow:0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                }
                .tr-table { width:100%; border-collapse:collapse; font-family:'Rajdhani',sans-serif; }
                .tr-table thead tr {
                    background:rgba(14,165,233,0.1);
                    border-bottom:1px solid rgba(14,165,233,0.2);
                }
                .tr-table thead th {
                    padding:14px 16px; text-align:left; font-size:11px;
                    font-weight:600; letter-spacing:2px; text-transform:uppercase;
                    color:rgba(14,165,233,0.8); white-space:nowrap;
                }
                .tr-table tbody tr {
                    border-bottom:1px solid rgba(255,255,255,0.04);
                    transition:background 0.15s;
                }
                .tr-table tbody tr:hover { background:rgba(14,165,233,0.06); }
                .tr-table tbody tr:last-child { border-bottom:none; }
                .tr-table td {
                    padding:13px 16px; font-size:14px;
                    color:#cbd5e1; vertical-align:middle;
                }
                .mono { font-family:'Share Tech Mono',monospace; font-size:12px; color:#7dd3fc; }
                .price { font-family:'Share Tech Mono',monospace; font-size:13px; color:#e2e8f0; }
                .muted { color:#94a3b8; }
                .tr-empty {
                    text-align:center; padding:60px;
                    color:rgba(148,163,184,0.5); font-size:16px; letter-spacing:1px;
                }
                .tr-loader {
                    display:flex; align-items:center; justify-content:center;
                    gap:8px; padding:60px; color:rgba(14,165,233,0.6);
                    font-size:14px; letter-spacing:2px;
                }
                .spinner {
                    width:18px; height:18px;
                    border:2px solid rgba(14,165,233,0.2);
                    border-top-color:#0ea5e9; border-radius:50%;
                    animation:spin 0.8s linear infinite;
                }
                @keyframes spin { to { transform:rotate(360deg); } }
            `}</style>

            <div className="tr-root">
                <div className="tr-content">

                    {/* Header */}
                    <div className="tr-header">
                        <div className="tr-header-left">
                            <div className="tr-header-icon">
                                {flag === "IN" ? "📥" : "📤"}
                            </div>
                            <div>
                                <div className="tr-title">
                                    {flag === "IN" ? "Stock Purchase Report" : "Stock Issue Report"}
                                </div>
                                <div className="tr-subtitle">
                                    Transaction History · {flag} Type
                                </div>
                            </div>
                        </div>
                        <button className="tr-return-btn" onClick={returnBack}>
                            ← Dashboard
                        </button>
                    </div>

                    {/* Table */}
                    <div className="tr-table-wrap">
                        <div className="tr-table-glass">
                            {loading ? (
                                <div className="tr-loader">
                                    <div className="spinner"></div>
                                    LOADING TRANSACTIONS...
                                </div>
                            ) : fetchError ? (
                                <div className="tr-empty" style={{color:'#f87171'}}>
                                    ❌ {fetchError}
                                </div>
                            ) : transactions.length === 0 ? (
                                <div className="tr-empty">
                                    No transactions found. Use Stock Entry (Buy / Issue) to create transactions.
                                </div>
                            ) : (
                                <table className="tr-table">
                                    <thead>
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Product ID</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Transaction Value</th>
                                            <th>User ID</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction) => (
                                            <tr key={transaction.transactionId}>
                                                <td><span className="mono">{transaction.transactionId}</span></td>
                                                <td><span className="mono">{transaction.productId}</span></td>
                                                <td><span className="price">₹{transaction.rate}</span></td>
                                                <td>{transaction.quantity}</td>
                                                <td><span className="price">₹{transaction.transactionValue}</span></td>
                                                <td><span className="muted">{transaction.userId}</span></td>
                                                <td><span className="muted">{transaction.transactionDate}</span></td>
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
}

export default TransactionReport;