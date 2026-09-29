import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getProductWiseTotalSale } from "../../Services/TransactionService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PALETTE = [
    "#38bdf8", "#818cf8", "#34d399", "#fbbf24", "#f472b6",
    "#a78bfa", "#fb923c", "#2dd4bf", "#4ade80", "#e879f9",
    "#60a5fa", "#f87171", "#c084fc", "#22d3ee", "#a3e635"
];

const ProductPieAnalysis = () => {
    let navigate = useNavigate();
    const [productSale, setProductSale] = useState([]);
    const [loading, setLoading] = useState(true);

    const setProductSaleData = () => {
        getProductWiseTotalSale()
            .then((response) => {
                setProductSale(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product sales:", error);
                setProductSale([]);
                setLoading(false);
            });
    };

    useEffect(() => { setProductSaleData(); }, []);

    const chartData = {
        labels: productSale.map((p) => p.productName),
        datasets: [{
            data: productSale.map((p) => p.totalSaleValue),
            backgroundColor: productSale.map((_, i) => PALETTE[i % PALETTE.length]),
            borderColor: 'rgba(10, 20, 45, 0.8)',
            borderWidth: 2,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#e0f2fe',
                    padding: 16,
                    font: {
                        family: "'Rajdhani', sans-serif",
                        size: 13,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(5, 10, 25, 0.9)',
                titleFont: { family: "'Rajdhani', sans-serif", size: 14 },
                bodyFont: { family: "'Share Tech Mono', monospace", size: 13 },
                padding: 12,
                borderColor: 'rgba(14, 165, 233, 0.4)',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        const val = context.raw || 0;
                        return ` ${context.label}: ₹${Number(val).toLocaleString('en-IN')}`;
                    }
                }
            }
        }
    };

    const returnBack = () => {
        const resolvedRole = (localStorage.getItem("role") || "").toLowerCase();
        if (resolvedRole === "admin") navigate('/admin-menu');
        else if (resolvedRole === "manager") navigate('/manager-menu');
        else navigate('/');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .pa-root { min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif; background-color:#0a0e1a;
                    background-image:radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                    url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center; background-attachment:fixed; position:relative; }
                .pa-root::before { content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%); z-index:0; }
                .pa-content { position:relative; z-index:1; }
                .pa-header { background:rgba(14,165,233,0.08); backdrop-filter:blur(20px);
                    border-bottom:1px solid rgba(14,165,233,0.2); padding:16px 32px;
                    display:flex; align-items:center; justify-content:space-between; }
                .pa-title { font-size:22px; font-weight:700; color:#e0f2fe; letter-spacing:1.5px; text-transform:uppercase; }
                .pa-subtitle { font-size:11px; color:rgba(14,165,233,0.7); letter-spacing:2px; text-transform:uppercase; }
                .pa-btn { background:rgba(14,165,233,0.15); border:1px solid rgba(14,165,233,0.4); color:#7dd3fc;
                    padding:9px 20px; border-radius:8px; font-family:'Rajdhani',sans-serif;
                    font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; }
                .pa-btn:hover { background:rgba(14,165,233,0.28); color:#e0f2fe; }
                .pa-body { display:flex; gap:32px; padding:32px; flex-wrap:wrap; }
                .pa-table-wrap { flex:1.2; min-width:320px; }
                .pa-table-glass { background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px; overflow:hidden;
                    box-shadow:0 24px 48px rgba(0,0,0,0.4); }
                .pa-table { width:100%; border-collapse:collapse; font-family:'Rajdhani',sans-serif; }
                .pa-table thead tr { background:rgba(14,165,233,0.1); border-bottom:1px solid rgba(14,165,233,0.2); }
                .pa-table thead th { padding:14px; text-align:left; font-size:11px; font-weight:600;
                    letter-spacing:2px; text-transform:uppercase; color:rgba(14,165,233,0.8); }
                .pa-table tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
                .pa-table tbody tr:hover { background:rgba(14,165,233,0.06); }
                .pa-table tbody tr:last-child { border-bottom:none; }
                .pa-table td { padding:13px 14px; font-size:14px; color:#cbd5e1; }
                .price { font-family:'Share Tech Mono',monospace; font-size:13px; color:#e2e8f0; }
                
                .pa-chart-wrap { flex:1; min-width:400px; background:rgba(10,20,45,0.55); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px; padding:24px;
                    box-shadow:0 24px 48px rgba(0,0,0,0.4); display:flex; flex-direction:column; align-items:center; gap:16px; }
                .pa-chart-title { font-size:14px; font-weight:600; letter-spacing:1.5px;
                    text-transform:uppercase; color:rgba(14,165,233,0.7); width:100%; text-align:center; border-bottom:1px solid rgba(14,165,233,0.2); padding-bottom:12px; margin-bottom:8px;}
                .pa-chart-container { width:100%; height:400px; position:relative; }
                
                .pa-empty { text-align:center; padding:60px 32px; color:rgba(148,163,184,0.6); font-size:16px; letter-spacing:1px;
                    background:rgba(10,20,45,0.55); border-radius:16px; border:1px solid rgba(14,165,233,0.15); margin:32px; }
                .pa-loader { display:flex; align-items:center; justify-content:center; gap:8px;
                    padding:60px; color:rgba(14,165,233,0.6); font-size:14px; letter-spacing:2px; }
                .spinner { width:18px; height:18px; border:2px solid rgba(14,165,233,0.2);
                    border-top-color:#0ea5e9; border-radius:50%; animation:spin 0.8s linear infinite; }
                @keyframes spin { to { transform:rotate(360deg); } }
                @media (max-width: 900px) { .pa-chart-wrap { min-width:100%; } .pa-table-wrap { min-width:100%; } }
            `}</style>

            <div className="pa-root">
                <div className="pa-content">

                    <div className="pa-header">
                        <div>
                            <div className="pa-title">📈 Product Sales Analysis</div>
                            <div className="pa-subtitle">Total Sale Value per Product</div>
                        </div>
                        <button className="pa-btn" onClick={returnBack}>← Dashboard</button>
                    </div>

                    {loading ? (
                        <div className="pa-loader"><div className="spinner"></div>LOADING DATA...</div>
                    ) : productSale.length === 0 ? (
                        <div className="pa-empty">
                            📊 No product sales recorded yet. Sales are calculated automatically when products are issued (Stock OUT).
                        </div>
                    ) : (
                        <div className="pa-body">

                            <div className="pa-table-wrap">
                                <div className="pa-table-glass">
                                    <table className="pa-table">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Total Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productSale.map((p, i) => (
                                                <tr key={i}>
                                                    <td style={{fontWeight:600, color:'#e2e8f0'}}>{p.productName}</td>
                                                    <td><span className="price">₹{Number(p.totalSaleValue).toLocaleString('en-IN')}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="pa-chart-wrap">
                                <div className="pa-chart-title">Sales Distribution</div>
                                <div className="pa-chart-container">
                                    <Pie data={chartData} options={chartOptions} />
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default ProductPieAnalysis;