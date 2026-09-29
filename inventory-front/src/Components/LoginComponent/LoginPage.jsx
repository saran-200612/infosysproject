import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [flag, setFlag] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const validateLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        validateUser(loginData.username, loginData.password)
            .then((response) => {
                let role = String(response.data).toLowerCase();
                // Save role to localStorage so it persists across tabs & page refreshes
                localStorage.setItem("role", role);
                localStorage.setItem("userId", loginData.username);

                if (role === "admin")
                    navigate("/admin-menu");
                else if (role === "manager")
                    navigate("/manager-menu");
                else if (role === "vendor")
                    navigate("/vendor-menu");
                else
                    setFlag(false);
            })
            .catch(() => setFlag(false))
            .finally(() => setIsLoading(false));
    };

    const onChangeHandler = (event) => {
        setFlag(true);
        const { name, value } = event.target;
        setLoginData(values => ({ ...values, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!loginData.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!loginData.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) validateLogin(event);
    };

    const registerNewUser = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
                .login-root {
                    min-height:100vh; width:100%; font-family:'Rajdhani',sans-serif;
                    background-color:#0a0e1a;
                    background-image:
                        radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.06) 0%,transparent 60%),
                        url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=60');
                    background-size:cover; background-position:center;
                    background-attachment:fixed; position:relative;
                    display:flex; align-items:center; justify-content:center;
                }
                .login-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%);
                    z-index:0;
                }
                .login-card {
                    position:relative; z-index:1;
                    width:100%; max-width:420px;
                    background:rgba(10,20,45,0.65); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px;
                    box-shadow:0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                    padding:40px; text-align:center;
                }
                .login-icon {
                    width:64px; height:64px; margin:0 auto 20px;
                    background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border-radius:16px; display:flex; align-items:center; justify-content:center;
                    font-size:32px; box-shadow:0 0 20px rgba(14,165,233,0.4);
                }
                .login-title {
                    font-size:26px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase; margin-bottom:4px;
                }
                .login-subtitle {
                    font-size:12px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase; margin-bottom:32px;
                }
                .login-form { display:flex; flex-direction:column; gap:20px; text-align:left; }
                .input-group { display:flex; flex-direction:column; gap:8px; }
                .input-label {
                    font-size:12px; color:rgba(14,165,233,0.8);
                    font-weight:600; letter-spacing:1px; text-transform:uppercase;
                }
                .login-input {
                    background:rgba(5,10,25,0.5); border:1px solid rgba(14,165,233,0.2);
                    padding:12px 16px; border-radius:8px; color:#e0f2fe;
                    font-family:'Share Tech Mono',monospace; font-size:15px;
                    transition:all 0.2s; outline:none;
                }
                .login-input:focus {
                    border-color:rgba(14,165,233,0.6); box-shadow:0 0 12px rgba(14,165,233,0.2);
                    background:rgba(5,10,25,0.8);
                }
                .login-input.error { border-color:rgba(248,113,113,0.5); }
                .error-text { color:#f87171; font-size:11px; margin-top:-4px; letter-spacing:0.5px; }
                .login-btn {
                    margin-top:10px; background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border:none; padding:14px; border-radius:8px;
                    color:#fff; font-family:'Rajdhani',sans-serif; font-size:16px;
                    font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    cursor:pointer; transition:all 0.2s;
                }
                .login-btn:hover:not(:disabled) {
                    box-shadow:0 0 20px rgba(14,165,233,0.4); transform:translateY(-2px);
                }
                .login-btn:disabled { opacity:0.7; cursor:not-allowed; }
                .reg-link {
                    margin-top:24px; font-size:14px; color:#94a3b8;
                }
                .reg-btn {
                    background:none; border:none; color:#38bdf8;
                    font-family:'Rajdhani',sans-serif; font-weight:600; font-size:14px;
                    cursor:pointer; padding:0; margin-left:4px;
                }
                .reg-btn:hover { color:#e0f2fe; text-decoration:underline; }
            `}</style>
            
            <div className="login-root">
                <div className="login-card">
                    <div className="login-icon">🔐</div>
                    <div className="login-title">Inventory System</div>
                    <div className="login-subtitle">Secure Authorization Portal</div>

                    <form onSubmit={handleValidation} className="login-form">
                        <div className="input-group">
                            <label className="input-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={loginData.username}
                                onChange={onChangeHandler}
                                className={`login-input ${errors.username ? 'error' : ''}`}
                                placeholder="Enter Username"
                            />
                            {errors.username && <div className="error-text">{errors.username}</div>}
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={onChangeHandler}
                                className={`login-input ${errors.password ? 'error' : ''}`}
                                placeholder="Enter Password"
                            />
                            {errors.password && <div className="error-text">{errors.password}</div>}
                        </div>

                        {!flag && (
                            <div className="error-text" style={{textAlign:'center', marginTop:'8px', fontSize:'13px'}}>
                                ❌ Invalid credentials or unauthorized role
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="login-btn">
                            {isLoading ? "Authenticating..." : "Access System"}
                        </button>
                    </form>

                    <div className="reg-link">
                        Don't have an account? 
                        <button type="button" onClick={registerNewUser} className="reg-btn">Register</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;