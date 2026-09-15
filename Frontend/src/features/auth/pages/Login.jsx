import { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { loading, submitting, error, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedIn = await handleLogin(email, password);
        if (loggedIn) {
            navigate("/");
        }
    }

    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-screen__content">
                    <div className="loading-screen__spinner" />
                    <h1>Loading...</h1>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    
                    {error && <p role="alert">{error}</p>}
                    <button disabled={submitting} className="button primary-button" type="submit">
                        {submitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login
