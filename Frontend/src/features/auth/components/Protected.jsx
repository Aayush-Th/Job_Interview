import { useAuth } from '../hooks/useAuth';
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loading-screen__content'>
                    <div className='loading-screen__spinner' />
                    <h1>Verifying session...</h1>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default Protected;