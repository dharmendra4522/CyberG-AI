// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import InteractiveBackground from "../components/InteractiveBackground"; // Path check kar lein

// // --- Icon Components (Aapke theme ke anusaar) ---
// const UserIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> );
// const MailIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
// const LockIcon = () => ( <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> );
// const GoogleIcon = () => ( <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.018,35.345,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg> );

// const RegisterPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

    
//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');

//         console.log("Dummy Register Call with:", { name, email, password });
//         setTimeout(() => {
//             if (email === 'test@test.com') {
//                 setMessage('Email already registered');
//             } else {
//                 setMessage('Registration successful! Redirecting to login...');
//                 setTimeout(() => navigate('/login'), 1500);
//             }
//             setLoading(false);
//         }, 1500);
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
//             <InteractiveBackground />
//             <div className="relative z-10 w-full max-w-md bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-cyber p-8">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gradient">CyberG AI</h1>
//                     <p className="text-muted-foreground mt-2">Create your account to continue</p>
//                 </div>

//                 {message && <p className="text-center text-primary mb-4">{message}</p>}

//                 <form onSubmit={handleRegister} className="space-y-6">
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                             className="w-full py-3 pl-10 pr-4 bg-input text-foreground border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
//                         />
//                     </div>
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
//                         {loading ? 'Creating Account...' : 'Create Account'}
//                     </button>
//                 </form>

//                 <div className="relative my-6">
//                     <div className="absolute inset-0 flex items-center">
//                         <span className="w-full border-t border-border"></span>
//                     </div>
//                     <div className="relative flex justify-center text-xs uppercase">
//                         <span className="bg-card px-2 text-muted-foreground">OR CONTINUE WITH</span>
//                     </div>
//                 </div>

//                 <button 
//                     type="button" 
//                     className="w-full flex items-center justify-center py-3 px-4 bg-secondary text-secondary-foreground border rounded-md hover:bg-muted transition-colors duration-300"
//                     onClick={() => alert('Google Sign-up coming soon!')}
//                 >
//                     <GoogleIcon />
//                     Sign up with Google
//                 </button>

//                 <p className="text-center text-muted-foreground mt-6 text-sm">
//                     Already have an account?{' '}
//                     <Link to="/login" className="font-semibold text-primary hover:underline">
//                         Sign In
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default RegisterPage;

