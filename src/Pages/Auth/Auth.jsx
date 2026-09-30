// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import "./Auth.css";
// import { registerUser,LoginUser } from "../../Api/authApi";

// function Auth({ registerMode = false }) { 
//    const navigate = useNavigate();

// const [isRegister, setIsRegister] = useState(registerMode);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [registerForm, setRegisterForm] = useState({
//     company_name: "",
//     company_code: "",
//     company_email: "",
//     company_phone: "",
//     gstin: "",
//     logo: null,
//     admin_email: "",
//     password: "",
//   });



//   const handleLoginChange = (e) => {
//     setLoginForm({
//       ...loginForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRegisterChange = (e) => {
//     const { name, value, files } = e.target;

//     setRegisterForm({
//       ...registerForm,
//       [name]: name === "logo" ? files[0] || null : value,
//     });
//   };

//   const changeMode = (register) => {
//     setIsRegister(register);
//     setShowPassword(false);
//   };

//  const handleLogin = async (e) => {
//   e.preventDefault();

//   const payload = {
//     email: loginForm.email,
//     password: loginForm.password,
//   };

//   try {
//     setLoading(true);

//     const res = await LoginUser(payload);

//     if (res.status === 200) {
//       const data = res.data.data;

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user_id", data.user_id);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("tenant_id", data.tenant_id);
//       localStorage.setItem("domain", data.domain);
// localStorage.setItem("hasAccount", "true");

//       await Swal.fire({
//         icon: "success",
//         title: res.data.title,
//         text: res.data.message,
//         timer: 1000,
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//       });

//       window.location.assign(`http://${data.domain}:5173/dashboard`);
//     }
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: error.response?.data?.title || "Login Failed",
//       text: error.response?.data?.message || "Invalid email or password.",
//       timer: 3000,
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleRegister = async (e) => {
//   e.preventDefault();

//   if (
//     !registerForm.company_name ||
//     !registerForm.company_code ||
//     !registerForm.company_email ||
//     !registerForm.company_phone ||
//     !registerForm.admin_email ||
//     !registerForm.password
//   ) {
//     Swal.fire({
//       icon: "warning",
//       title: "Required Fields",
//       text: "Please fill all required fields.",
//       timer: 2500,
//       position: "top-end",
//       toast: true,
//       showConfirmButton: false,
//     });
//     return;
//   }

//   const formData = new FormData();

//   formData.append("company_name", registerForm.company_name);
//   formData.append("company_code", registerForm.company_code);
//   formData.append("company_email", registerForm.company_email);
//   formData.append("company_phone", registerForm.company_phone);
//   formData.append("gstin", registerForm.gstin);
//   formData.append("admin_email", registerForm.admin_email);
//   formData.append("password", registerForm.password);

//   if (registerForm.logo) {
//     formData.append("logo", registerForm.logo);
//   }

//   try {
//     setLoading(true);

//     const res = await registerUser(formData);

//     if (res.status === 200 || res.status === 201) {
//       Swal.fire({
//         icon: "success",
//         title: res.data?.title || "Success",
//         text: res.data?.message || "Tenant registered successfully.",
//         timer: 2500,
//         position: "top-end",
//         toast: true,
//         showConfirmButton: false,
//       });

//       setRegisterForm({
//         company_name: "",
//         company_code: "",
//         company_email: "",
//         company_phone: "",
//         gstin: "",
//         logo: null,
//         admin_email: "",
//         password: "",
//       });

//       // setShowPassword(false);
//       // setIsRegister(false);
//       setShowPassword(false);
// navigate("/login");
//     }
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: error.response?.data?.title || "Registration Failed",
//       text:
//         error.response?.data?.message ||
//         "Something went wrong. Please try again.",
//       timer: 3000,
//       position: "top-end",
//       toast: true,
//       showConfirmButton: false,
//     });
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="auth-page">
//       {/* BACKGROUND */}

//       <div className="auth-background">
//         <div className="auth-orb auth-orb-one"></div>
//         <div className="auth-orb auth-orb-two"></div>
//         <div className="auth-orb auth-orb-three"></div>

//         <div className="auth-grid-lines"></div>

//         <div className="auth-floating-particle particle-one"></div>
//         <div className="auth-floating-particle particle-two"></div>
//         <div className="auth-floating-particle particle-three"></div>
//         <div className="auth-floating-particle particle-four"></div>
//         <div className="auth-floating-particle particle-five"></div>
//       </div>

//       <div className="auth-wrapper">
//         {/* LEFT */}

//         <div className="auth-intro">
//           <div className="auth-intro-logo">
//             <img
//               src="/images/VittaLokiLogo.png"
//               alt="Vittalokhi"
//             />
//           </div>

//           <div className="auth-intro-badge">
//             <span></span>
//             Smart Trading Workspace
//           </div>

//           <h1>
//             Trading intelligence
//             <br />
//             <span>built for clarity.</span>
//           </h1>

//           <p>
//             Monitor markets, clients, positions, P&amp;L,
//             targets and trading activity from one powerful
//             workspace.
//           </p>
//         </div>

//         {/* RIGHT */}

//         <div className="auth-card-area">
//           <div
//             className={`auth-card ${
//               isRegister ? "auth-register-card" : ""
//             }`}
//           >
//             <div className="auth-card-logo">
//               <img
//                 src="/images/VittaLokiLogo.png"
//                 alt="Vittalokhi"
//               />
//             </div>

//             {/* HEADER */}

//             <div className="auth-card-header">
//               <div className="auth-card-icon">
//                 <i
//                   className={
//                     isRegister
//                       ? "fa-solid fa-building"
//                       : "fa-solid fa-arrow-right-to-bracket"
//                   }
//                 ></i>
//               </div>

//               <div>
//                 <span className="auth-welcome-label">
//                   {isRegister
//                     ? "REGISTER COMPANY"
//                     : "WELCOME BACK"}
//                 </span>

//                 <h2>
//                   {isRegister
//                     ? "Create your workspace"
//                     : "Sign in to Vittalokhi"}
//                 </h2>

//                 <p>
//                   {isRegister
//                     ? "Register your company to get started."
//                     : "Enter your credentials to continue."}
//                 </p>
//               </div>
//             </div>

//             {/* LOGIN */}

//             {!isRegister ? (
//               <form
//                 className="auth-form"
//                 onSubmit={handleLogin}
//               >
//                 <div className="auth-field">
//                   <label>Email Address</label>

//                   <div className="auth-input-wrapper">
//                     <i className="fa-regular fa-envelope"></i>

//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your email"
//                       value={loginForm.email}
//                       onChange={handleLoginChange}
//                       autoComplete="email"
//                     />
//                   </div>
//                 </div>

//                 <div className="auth-field">
//                   <label>Password</label>

//                   <div className="auth-input-wrapper auth-password-wrapper">
//                     <i className="fa-solid fa-lock"></i>

//                     <input
//                       type={
//                         showPassword
//                           ? "text"
//                           : "password"
//                       }
//                       name="password"
//                       placeholder="Enter your password"
//                       value={loginForm.password}
//                       onChange={handleLoginChange}
//                       autoComplete="current-password"
//                     />

//                     <button
//                       type="button"
//                       className="auth-password-eye"
//                       onClick={() =>
//                         setShowPassword(
//                           (current) => !current
//                         )
//                       }
//                     >
//                       <i
//                         className={
//                           showPassword
//                             ? "fa-regular fa-eye-slash"
//                             : "fa-regular fa-eye"
//                         }
//                       ></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="auth-form-options">
//                   <label className="auth-remember">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) =>
//                         setRememberMe(
//                           e.target.checked
//                         )
//                       }
//                     />

//                     <span className="auth-checkbox"></span>

//                     Remember me
//                   </label>

//                   <button
//                     type="button"
//                     className="auth-forgot-btn"
//                     onClick={() =>
//                       showAlert(
//                         "info",
//                         "Forgot Password",
//                         "Password recovery can be connected here."
//                       )
//                     }
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>

//                 <button
//                   type="submit"
//                   className="auth-login-btn"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="auth-loader"></span>
//                       Signing In...
//                     </>
//                   ) : (
//                     <>
//                       Sign In
//                       <i className="fa-solid fa-arrow-right"></i>
//                     </>
//                   )}
//                 </button>
//               </form>
//             ) : (
//               /* REGISTER */

//               <form
//                 className="auth-form"
//                 onSubmit={handleRegister}
//               >
//                 <div className="auth-register-row">
//                   <div className="auth-field">
//                     <label>Company Name</label>

//                     <div className="auth-input-wrapper">
//                       <i className="fa-regular fa-building"></i>

//                       <input
//                         type="text"
//                         name="company_name"
//                         placeholder="ABC Securities Pvt Ltd"
//                         value={registerForm.company_name}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="auth-field">
//                     <label>Company Code</label>

//                     <div className="auth-input-wrapper">
//                       <i className="fa-solid fa-code"></i>

//                       <input
//                         type="text"
//                         name="company_code"
//                         placeholder="abc"
//                         value={registerForm.company_code}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="auth-register-row">
//                   <div className="auth-field">
//                     <label>Company Email</label>

//                     <div className="auth-input-wrapper">
//                       <i className="fa-regular fa-envelope"></i>

//                       <input
//                         type="email"
//                         name="company_email"
//                         placeholder="info@abc.com"
//                         value={registerForm.company_email}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="auth-field">
//                     <label>Company Phone</label>

//                     <div className="auth-input-wrapper">
//                       <i className="fa-solid fa-phone"></i>

//                       <input
//                         type="tel"
//                         name="company_phone"
//                         placeholder="9876543210"
//                         value={registerForm.company_phone}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="auth-register-row">
//                   <div className="auth-field">
//                     <label>GSTIN</label>

//                     <div className="auth-input-wrapper">
//                       <i className="fa-solid fa-file-invoice"></i>

//                       <input
//                         type="text"
//                         name="gstin"
//                         placeholder="32ABCDE1234F1Z5"
//                         value={registerForm.gstin}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="auth-field">
//                     <label>Company Logo</label>

//                     <div className="auth-input-wrapper auth-file-wrapper">
//                       <i className="fa-regular fa-image"></i>

//                       <input
//                         type="file"
//                         name="logo"
//                         accept="image/*"
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="auth-register-row">
//                   <div className="auth-field">
//                     <label>Admin Email</label>

//                     <div className="auth-input-wrapper">
//                       <i className="fa-solid fa-user-shield"></i>

//                       <input
//                         type="email"
//                         name="admin_email"
//                         placeholder="admin@abc.com"
//                         value={registerForm.admin_email}
//                         onChange={handleRegisterChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="auth-field">
//                     <label>Password</label>

//                     <div className="auth-input-wrapper auth-password-wrapper">
//                       <i className="fa-solid fa-lock"></i>

//                       <input
//                         type={
//                           showPassword
//                             ? "text"
//                             : "password"
//                         }
//                         name="password"
//                         placeholder="Create password"
//                         value={registerForm.password}
//                         onChange={handleRegisterChange}
//                         autoComplete="new-password"
//                       />

//                       <button
//                         type="button"
//                         className="auth-password-eye"
//                         onClick={() =>
//                           setShowPassword(
//                             (current) => !current
//                           )
//                         }
//                       >
//                         <i
//                           className={
//                             showPassword
//                               ? "fa-regular fa-eye-slash"
//                               : "fa-regular fa-eye"
//                           }
//                         ></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="auth-login-btn"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="auth-loader"></span>
//                       Creating Account...
//                     </>
//                   ) : (
//                     <>
//                       Register Company
//                       <i className="fa-solid fa-arrow-right"></i>
//                     </>
//                   )}
//                 </button>
//               </form>
//             )}

//             {/* SWITCH */}

//             <div className="auth-account-area">
//               <span>
//                 {isRegister
//                   ? "Already registered?"
//                   : "Don't have an account?"}
//               </span>

//               <button
//                 type="button"
//                 onClick={() =>
//                   changeMode(!isRegister)
//                 }
//               >
//                 {isRegister
//                   ? "Sign In"
//                   : "Register"}
//               </button>
//             </div>

//             <div className="auth-divider">
//               <span></span>
//               <p>Secure Access</p>
//               <span></span>
//             </div>

//             <div className="auth-security">
//               <i className="fa-solid fa-shield-halved"></i>

//               <div>
//                 <strong>Protected Workspace</strong>

//                 <span>
//                   Your session is protected with secure
//                   access controls.
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="auth-footer">
//             <span>© 2026 Vittalokhi</span>
//             <span className="auth-footer-dot"></span>
//             <span>Trading Intelligence Platform</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Auth;