import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import '../styles/navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const isInterviewPage = location.pathname.startsWith('/interview/')

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <header className='app-navbar'>
            <div className='app-navbar__left'>
                {isInterviewPage && (
                    <Link to='/' className='app-navbar__back'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                    </Link>
                )}
                <Link to='/' className='app-navbar__brand'>
                    Interview<span>Master</span>
                </Link>
            </div>
            <div className='app-navbar__right'>
                {user && <span className='app-navbar__user'>Hi, {user.username}</span>}
                <button type='button' onClick={onLogout} className='app-navbar__logout'>
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Navbar
