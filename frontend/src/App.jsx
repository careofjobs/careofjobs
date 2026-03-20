import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';

// New static pages
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Contact from './pages/Contact';

// Auth & Admin
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Simple inline 404 page — nothing fancy needed here
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="glass-card p-12 max-w-md mx-auto">
        <div className="text-6xl font-extrabold text-white mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-zinc-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#09090b] text-[#e4e4e7] selection:bg-[#8b5cf6]/30">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Static Legal & Info Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Admin Routes */}
              <Route path="/admin/post-job" element={
                <ProtectedRoute requireAdmin={true}>
                  <PostJob />
                </ProtectedRoute>
              } />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

