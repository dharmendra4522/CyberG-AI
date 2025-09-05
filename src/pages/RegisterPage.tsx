import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Real API ke liye isse uncomment karein

// --- Icon Components (Aapke theme ke anusaar) ---
const UserIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> );
const MailIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
const LockIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> );

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // --- DUMMY API SIMULATION ---
        console.log("Dummy Register Call with:", { name, email, password });
        setTimeout(() => {
            if (email === 'test@test.com') {
                setMessage('Email already registered');
            } else {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            }
            setLoading(false);
        }, 1500);

        /* // --- REAL API CALL ---
        try {
            const response = await axios.post('/auth/register', { name, email, password });
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
        */
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md bg-card border rounded-lg shadow-elevated p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gradient">CyberG AI</h1>
                    <p className="text-muted-foreground mt-2">Create your account to continue</p>
                </div>

                {message && <p className="text-center text-primary mb-4">{message}</p>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon /></div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="text-center text-muted-foreground mt-6 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

