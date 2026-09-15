import { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { loading, submitting, error: authError, handleRegister } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await handleRegister(username, email, password);
            navigate('/');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Registration failed');
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

    const displayError = error || authError;

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                
                <form onSubmit={handleSubmit}>
                    {displayError && <p role='alert'>{displayError}</p>}

                    <div className="input-group">
                        <label htmlFor="Username">Username</label>
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            id="Username" 
                            name="Username" 
                            placeholder="Enter your username" 
                            required 
                        />
                    </div>

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

                    <button disabled={submitting} className="button primary-button" type="submit">
                        {submitting ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register
