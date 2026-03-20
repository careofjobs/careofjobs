import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from './Loader';

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}
