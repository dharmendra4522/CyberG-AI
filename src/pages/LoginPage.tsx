// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// // import axios from 'axios'; // Real API ke liye isse uncomment karein

// // --- Icon Components (Aapke theme ke anusaar) ---
// const MailIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
// const LockIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> );

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');

//         // --- DUMMY API SIMULATION (FOR TESTING WITHOUT BACKEND) ---
//         console.log("Dummy Login Call with:", { email, password });

//         setTimeout(() => {
//             if (email === 'test@test.com' && password === 'password123') {
//                 // Nakli success response banayein
//                 const dummyApiResponse = {
//                     success: true,
//                     message: "Login successful",
//                     data: {
//                         user: { id: "user-123", email: "test@test.com", name: "Test User" },
//                         accessToken: "DUMMY_ACCESS_TOKEN_12345",
//                         refreshToken: "DUMMY_REFRESH_TOKEN_67890"
//                     }
//                 };

//                 // localStorage mein data save karein
//                 localStorage.setItem('accessToken', dummyApiResponse.data.accessToken);
//                 localStorage.setItem('user', JSON.stringify(dummyApiResponse.data.user));

//                 setMessage('Login successful! Redirecting...');
//                 setTimeout(() => {
//                     navigate('/'); // Homepage ya Dashboard par
//                 }, 1500);

//             } else {
//                 // Nakli error response
//                 setMessage('Invalid email or password');
//             }
//             setLoading(false);
//         }, 1500); // 1.5 second ka delay, API jaisa feel dene ke liye

//         /* // --- REAL API CALL (JAB BACKEND READY HO, ISE UNCOMMENT KAREIN) ---
//         try {
//             const response = await axios.post('/auth/login', { email, password });
//             console.log("API Response:", response.data);

//             if (response.data.success && response.data.data) {
//                 localStorage.setItem('accessToken', response.data.data.accessToken);
//                 localStorage.setItem('user', JSON.stringify(response.data.data.user));
//                 setMessage('Login successful! Redirecting...');
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 1500);
//             }
//         } catch (error: any) {
//             console.error("Login Error:", error.response);
//             setMessage(error.response?.data?.message || 'Login failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//         */
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-background p-4">
//             <div className="w-full max-w-md bg-card border rounded-lg shadow-elevated p-8">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
//                     <p className="text-muted-foreground mt-2">Sign in to your CyberG AI account</p>
//                 </div>

//                 {message && <p className="text-center text-primary mb-4">{message}</p>}

//                 <form onSubmit={handleLogin} className="space-y-6">
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon /></div>
//                         <input
//                             type="email"
//                             placeholder="Email Address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
//                         />
//                     </div>
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
//                         />
//                     </div>
//                     <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300">
//                         {loading ? 'Signing In...' : 'Sign In'}
//                     </button>
//                 </form>
//                 <p className="text-center text-muted-foreground mt-6 text-sm">
//                     Don't have an account?{' '}
//                     <Link to="/register" className="font-semibold text-primary hover:underline">
//                         Sign Up
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

