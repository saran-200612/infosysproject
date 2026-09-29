import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';

const RegisterUser = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [inventoryUser, setInventoryUser] = useState({
        username: "",
        password: "",
        personalName: "",
        email: "",
        role: "",
    });
    const [flag, setFlag] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        setFlag(false);
    }, []);

    const createNewUser = (event) => {
        event.preventDefault();
        if (inventoryUser.password === confirmPassword) {
            registerNewUser(inventoryUser).then(() => {
                setFlag(true);
            });
        }
    };

    const onChangeHandler = (event) => {
        event.persist();
        setFlag(false);
        const name = event.target.name;
        const value = event.target.value;
        setInventoryUser(values => ({ ...values, [name]: value }));
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!inventoryUser.username.trim()) {
            tempErrors.username = "User Name is required";
            isValid = false;
        }

        if (!inventoryUser.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }
        // ✅ FIXED: was inventoryUser.passwordlength (missing dot) — now inventoryUser.password.length
        else if (inventoryUser.password.length < 5 || inventoryUser.password.length > 10) {
            tempErrors.password = "Password must be 5-10 characters long";
            isValid = false;
        }
        else if (inventoryUser.password !== confirmPassword) {
            tempErrors.password = "Both the passwords are not matched";
            isValid = false;
        }

        if (!inventoryUser.personalName.trim()) {
            tempErrors.personalName = "Personal Name is required";
            isValid = false;
        }

        if (!inventoryUser.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!emailPattern.test(inventoryUser.email)) {
            tempErrors.email = "Invalid Email Format";
            isValid = false;
        }

        if (!inventoryUser.role.trim()) {
            tempErrors.role = "Role is required";
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            createNewUser(event);
        }
    };

    const returnBack = () => {
        navigate('/');
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
                    padding:40px 20px; box-sizing:border-box;
                }
                .login-root::before {
                    content:''; position:fixed; inset:0;
                    background:linear-gradient(135deg,rgba(5,10,25,0.82) 0%,rgba(8,15,35,0.75) 50%,rgba(5,10,25,0.85) 100%);
                    z-index:0;
                }
                .login-card {
                    position:relative; z-index:1;
                    width:100%; max-width:800px; /* Wider for 2 columns */
                    background:rgba(10,20,45,0.65); backdrop-filter:blur(24px);
                    border:1px solid rgba(14,165,233,0.15); border-radius:16px;
                    box-shadow:0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px rgba(0,0,0,0.4);
                    padding:40px; text-align:center;
                }
                .login-title {
                    font-size:26px; font-weight:700; color:#e0f2fe;
                    letter-spacing:1.5px; text-transform:uppercase; margin-bottom:4px;
                }
                .login-subtitle {
                    font-size:12px; color:rgba(14,165,233,0.7);
                    letter-spacing:2px; text-transform:uppercase; margin-bottom:32px;
                }
                .form-grid {
                    display:grid; grid-template-columns: 1fr 1fr; gap:24px; text-align:left;
                }
                @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
                
                .input-group { display:flex; flex-direction:column; gap:8px; }
                .input-label {
                    font-size:12px; color:rgba(14,165,233,0.8);
                    font-weight:600; letter-spacing:1px; text-transform:uppercase;
                }
                .login-input {
                    background:rgba(5,10,25,0.5); border:1px solid rgba(14,165,233,0.2);
                    padding:12px 16px; border-radius:8px; color:#e0f2fe;
                    font-family:'Share Tech Mono',monospace; font-size:15px;
                    transition:all 0.2s; outline:none; width:100%; box-sizing:border-box;
                }
                .login-input:focus {
                    border-color:rgba(14,165,233,0.6); box-shadow:0 0 12px rgba(14,165,233,0.2);
                    background:rgba(5,10,25,0.8);
                }
                select.login-input { cursor:pointer; }
                select.login-input option { background:#0a142d; color:#e0f2fe; }
                
                .login-input.error { border-color:rgba(248,113,113,0.5); }
                .error-text { color:#f87171; font-size:11px; margin-top:-4px; letter-spacing:0.5px; }
                
                .btn-group { display:flex; gap:16px; margin-top:32px; justify-content:center; }
                
                .login-btn {
                    flex:1; max-width:200px;
                    background:linear-gradient(135deg,#0ea5e9,#0284c7);
                    border:none; padding:14px; border-radius:8px;
                    color:#fff; font-family:'Rajdhani',sans-serif; font-size:16px;
                    font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    cursor:pointer; transition:all 0.2s;
                }
                .login-btn:hover { box-shadow:0 0 20px rgba(14,165,233,0.4); transform:translateY(-2px); }
                
                .cancel-btn {
                    flex:1; max-width:200px;
                    background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
                    padding:14px; border-radius:8px; text-decoration:none;
                    color:#94a3b8; font-family:'Rajdhani',sans-serif; font-size:16px;
                    font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
                    cursor:pointer; transition:all 0.2s; display:inline-block; display:flex; align-items:center; justify-content:center;
                }
                .cancel-btn:hover { background:rgba(255,255,255,0.1); color:#fff; }
                
                .success-msg {
                    margin-top:24px; padding:16px; border-radius:8px;
                    background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3);
                    color:#34d399; font-weight:600; letter-spacing:1px;
                }
                .success-btn {
                    background:none; border:none; color:#fff; font-weight:700; text-decoration:underline;
                    cursor:pointer; font-family:'Rajdhani',sans-serif; font-size:14px; margin-left:8px;
                }
            `}</style>

            <div className="login-root">
                <div className="login-card">
                    <div className="login-title">New Identity Registration</div>
                    <div className="login-subtitle">System Access Provisioning</div>

                    <form onSubmit={handleValidation}>
                        <div className="form-grid">
                            
                            <div className="input-group">
                                <label className="input-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={inventoryUser.username}
                                    onChange={onChangeHandler}
                                    className={`login-input ${errors.username ? 'error' : ''}`}
                                    placeholder="e.g. jdoe123"
                                />
                                {errors.username && <div className="error-text">{errors.username}</div>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">Personal Name</label>
                                <input
                                    type="text"
                                    name="personalName"
                                    value={inventoryUser.personalName}
                                    onChange={onChangeHandler}
                                    className={`login-input ${errors.personalName ? 'error' : ''}`}
                                    placeholder="e.g. John Doe"
                                />
                                {errors.personalName && <div className="error-text">{errors.personalName}</div>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={inventoryUser.email}
                                    onChange={onChangeHandler}
                                    className={`login-input ${errors.email ? 'error' : ''}`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <div className="error-text">{errors.email}</div>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">System Role</label>
                                <select 
                                    name="role" 
                                    value={inventoryUser.role} 
                                    onChange={onChangeHandler}
                                    className={`login-input ${errors.role ? 'error' : ''}`}
                                >
                                    <option value="" disabled>Select Role...</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                {errors.role && <div className="error-text">{errors.role}</div>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={inventoryUser.password}
                                    onChange={onChangeHandler}
                                    className={`login-input ${errors.password ? 'error' : ''}`}
                                    placeholder="5-10 characters"
                                />
                                {errors.password && <div className="error-text">{errors.password}</div>}
                            </div>

                            <div className="input-group">
                                <label className="input-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    className={`login-input ${errors.confirmPassword ? 'error' : ''}`}
                                    placeholder="Re-enter password"
                                />
                                {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                            </div>

                        </div>

                        {flag && (
                            <div className="success-msg">
                                ✔ Identity Provisioned Successfully.
                                <button type="button" onClick={returnBack} className="success-btn">
                                    PROCEED TO LOGIN
                                </button>
                            </div>
                        )}

                        <div className="btn-group">
                            <button type="button" onClick={returnBack} className="cancel-btn">
                                Cancel
                            </button>
                            <button type="submit" className="login-btn">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterUser;