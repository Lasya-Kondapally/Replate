// // // import React, { useState, useEffect } from 'react';
// // // import 'bootstrap-icons/font/bootstrap-icons.css';
// // // import { useNavigate } from 'react-router-dom';

// // // function HomePage() {
// // //   const navigate = useNavigate();

// // //   const handleSignupClick = () => {
// // //     navigate('/signup')
// // //   }

// // //   const handleLoginClick = () => {
// // //     navigate('/login');
// // //   };
// // //     const testimonials = [
// // //       {
// // //         quote: "Replate made it so easy to donate food. I felt truly helpful!",
// // //         author: "Anjali, Donor"
// // //       },
// // //       {
// // //         quote: "I was able to get meals when I needed them the most.",
// // //         author: "Ramesh, Receiver"
// // //       },
// // //       {
// // //         quote: "A seamless platform to support a good cause.",
// // //         author: "Neha, Volunteer"
// // //       }
// // //     ];
  
// // //     const [testimonialIndex, setTestimonialIndex] = useState(0);
  
// // //     useEffect(() => {
// // //       const interval = setInterval(() => {
// // //         setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
// // //       }, 6000); // auto-scroll every 6 seconds
  
// // //       return () => clearInterval(interval);
// // //     }, []);
  
// // //     const handleNextTestimonial = () => {
// // //       setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
// // //     };
// // //   return (
// // //     <div className="min-vh-100 bg-white text-dark" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
// // //       {/* HEADER */}
// // //       <header className="p-4 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#B99099' }}>
// // //         <div className="d-flex align-items-center">
// // //           <img src="/images/replate-logo.jpeg" alt="Replate Logo" style={{ height: '40px' }} />
// // //           <h1 className="h3 fw-bold mb-0 ms-2" style={{ fontFamily: "'Pacifico', cursive" }}>Replate</h1>
// // //         </div>
// // //         <nav>
// // //           <a href="#about" className="mx-3 text-white text-decoration-none">About</a>
// // //           <a href="#faq" className="mx-3 text-white text-decoration-none">FAQ</a>
// // //           <a href="#contact" className="mx-3 text-white text-decoration-none">Contact</a>
// // //           <button className="btn btn-outline-light ms-3" onClick={handleLoginClick}>Login</button>
// // //           <button className="btn btn-light text-success ms-2" onClick={handleSignupClick}>Signup</button>
// // //         </nav>
// // //       </header>

// // //       {/* HERO SECTION */}
// // //       <section
// // //         className="py-4 text-center text-white"
// // //         style={{
// // //           backgroundImage: 'url("/images/replate-banner.jpeg")',
// // //           backgroundSize: 'cover',
// // //           backgroundPosition: 'center',
// // //           backgroundRepeat: 'no-repeat'
// // //         }}
// // //       >
// // //         {/*<div style={{ backgroundColor: 'rgba(254, 251, 251, 0.14)', padding: '4rem' ,color:'#42002E'}}>
// // //           <h2 className="display-5 fw-bold mb-3">Join Hands to Feed the Needy</h2>
// // //           <p className="lead mb-4 fw-semibold">Donate food or receive it with dignity. Track your donations easily.</p>
// // //           <button className="btn btn-light text-success btn-lg me-3" >Donate Now</button>
// // //           <button className="btn btn-outline-light btn-lg">Receive Help</button>
// // //         </div>*/}
// // //         <div
// // //   style={{
// // //     backgroundColor: 'rgba(254, 251, 251, 0.14)',
// // //     padding: '4rem',
// // //     color: '#42002E',
// // //   }}
// // // >
// // //   <h2 className="display-5 fw-bold mb-3">Join Hands to Feed the Needy</h2>
// // //   <p className="lead mb-4 fw-semibold">
// // //     Donate food or receive it with dignity. Track your donations easily.
// // //   </p>
// // //   <button className="btn btn-light btn-lg me-3">Donate Now</button>
// // //   <button className="btn btn-outline-dark btn-lg">Receive Help</button>
// // // </div>
// // //       </section>

// // //       {/* HORIZONTAL CARD */}
// // //       <section className="my-5">
// // //         <div className="container">
// // //           <div className="card shadow-sm border-0" style={{ backgroundColor: '#F9D0CD' }}>
// // //             <div className="card-body d-flex flex-column justify-content-center p-4">
// // //               <h4 className="card-title mb-3 text-dark">
// // //                 <i className="bi bi-heart-fill me-2" style={{ color: '#C96349' }}></i>
// // //                 Why Replate?
// // //               </h4>
// // //               <p className="card-text fs-5 text-dark">
// // //                 Replate is committed to fighting hunger and food waste by connecting those who have food with those who need it. Join us in creating a dignified, sustainable, and impactful movement.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Impact & Testimonial Cards */}
// // //       <section className="my-5">
// // //         <div className="container">
// // //           <div className="row g-4">
// // //             {/* Our Impact */}
// // //             <div className="col-md-6">
// // //               <div className="card h-100 shadow-sm" style={{ backgroundColor: '#AECBB8' }}>
// // //                 <div className="card-body text-center">
// // //                   <h5 className="card-title">🍽️ Our Impact</h5>
// // //                   <p className="card-text fw-bold" style={{ fontSize: '1.5rem' }}>10,000+ meals donated</p>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* What People Say */}
// // //             <div className="col-md-6">
// // //               <div className="card h-100 shadow-sm" style={{ backgroundColor: '#E7C878' }}>
// // //                 <div className="card-body text-center">
// // //                   <h5 className="card-title">💬 What People Say</h5>
// // //                   <blockquote className="blockquote mb-2">
// // //                     <p>"{testimonials[testimonialIndex].quote}"</p>
// // //                     <footer className="blockquote-footer">{testimonials[testimonialIndex].author}</footer>
// // //                   </blockquote>
// // //                   <button onClick={handleNextTestimonial} className="btn btn-sm btn-outline-dark rounded-circle">
// // //                   <i className="bi bi-arrow-right"></i>
// // //                 </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ABOUT */}
// // // <section id="about" className="px-4 mt-5">
// // //   <div className="card shadow-sm border-0 mb-4">
// // //     <div className="card-body" style={{ backgroundColor: '#EDB18B' }}>
// // //       <h3 className="h4 fw-semibold mb-2">About</h3>
// // //       <p>
// // //         This platform connects food donors and receivers through a simple chatbot and dashboard system.
// // //       </p>
// // //     </div>
// // //   </div>
// // // </section>

// // // {/* FAQ */}
// // // <section id="faq" className="px-4 pb-4">
// // //   <div className="card shadow-sm border-0  bg-light">
// // //     <div className="card-body"style={{ backgroundColor: '#FEE088' }}>
// // //       <h3 className="h4 fw-semibold mb-2">FAQ</h3>
// // //       <p>
// // //         <strong>Q:</strong> How does this work?<br />
// // //         <strong>A:</strong> Log in, use the bot to donate or request food, and track it!
// // //       </p>
// // //     </div>
// // //   </div>
// // // </section>

// // // {/* CONTACT */}
// // // <section id="contact" className="px-4" >
// // //   <div className="card shadow-sm border-0">
// // //     <div className="card-body" style={{ backgroundColor: '#CDD558' }}>
// // //       <h3 className="h4 fw-semibold mb-2">Contact</h3>
// // //       <p>
// // //         Email us at: <a href="mailto:support@fooddonate.com" className="text-success">support@fooddonate.com</a>
// // //       </p>
// // //     </div>
// // //   </div>
// // // </section>

// // //       {/* FOOTER */}
// // //       <footer className="p-4 text-center text-white mt-5" style={{ backgroundColor: '#B99099' }}>
// // //         © 2025 Replate
// // //       </footer>
// // //     </div>
// // //   );
// // // }

// // // export default HomePage;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//   const navigate = useNavigate();

//   const handleSignupClick = () => {
//     navigate('/signup')
//   }

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   // Handle Donate Now button click
//   const handleDonateNowClick = () => {
//     navigate('/login');
//   };

//   // Handle Receive Help button click
//   const handleReceiveHelpClick = () => {
//     navigate('/login');
//   };

//   const testimonials = [
//     {
//       quote: "Replate made it so easy to donate food. I felt truly helpful!",
//       author: "Anjali, Donor"
//     },
//     {
//       quote: "I was able to get meals when I needed them the most.",
//       author: "Ramesh, Receiver"
//     },
//     {
//       quote: "A seamless platform to support a good cause.",
//       author: "Neha, Volunteer"
//     }
//   ];

//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 6000); // auto-scroll every 6 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const handleNextTestimonial = () => {
//     setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
//   };

//   return (
//     <div className="min-vh-100 bg-white text-dark" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
//       {/* HEADER */}
//       <header className="p-4 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#B99099' }}>
//         <div className="d-flex align-items-center">
//           <img src="/images/replate-logo.jpeg" alt="Replate Logo" style={{ height: '40px' }} />
//           <h1 className="h3 fw-bold mb-0 ms-2" style={{ fontFamily: "'Pacifico', cursive" }}>Replate</h1>
//         </div>
//         <nav>
//           <a href="#about" className="mx-3 text-white text-decoration-none">About</a>
//           <a href="#faq" className="mx-3 text-white text-decoration-none">FAQ</a>
//           <a href="#contact" className="mx-3 text-white text-decoration-none">Contact</a>
//           <button className="btn btn-outline-light ms-3" onClick={handleLoginClick}>Login</button>
//           <button className="btn btn-light text-success ms-2" onClick={handleSignupClick}>Signup</button>
//         </nav>
//       </header>

//       {/* HERO SECTION */}
//       <section
//         className="py-4 text-center text-white"
//         style={{
//           backgroundImage: 'url("/images/replate-banner.jpeg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: 'rgba(254, 251, 251, 0.14)',
//             padding: '4rem',
//             color: '#42002E',
//           }}
//         >
//           <h2 className="display-5 fw-bold mb-3">Join Hands to Feed the Needy</h2>
//           <p className="lead mb-4 fw-semibold">
//             Donate food or receive it with dignity. Track your donations easily.
//           </p>
//           <button 
//             className="btn btn-light btn-lg me-3"
//             onClick={handleDonateNowClick}
//           >
//             Donate Now
//           </button>
//           <button 
//             className="btn btn-outline-dark btn-lg"
//             onClick={handleReceiveHelpClick}
//           >
//             Receive Help
//           </button>
//         </div>
//       </section>

//       {/* HORIZONTAL CARD WITH GRAPHICS */}
//       <section className="my-5">
//         <div className="container">
//           <div 
//             className="card shadow-sm border-0 position-relative overflow-hidden" 
//             style={{ 
//               backgroundColor: '#F9D0CD',
//               background: 'linear-gradient(135deg, #F9D0CD 0%, #F5C2BD 50%, #F1B4AD 100%)'
//             }}
//           >
//             {/* Floating food icons */}
//             <div 
//               className="position-absolute" 
//               style={{ 
//                 top: '10px', 
//                 right: '20px', 
//                 fontSize: '2rem', 
//                 opacity: '0.3',
//                 animation: 'float 3s ease-in-out infinite'
//               }}
//             >
//               🍎
//             </div>
//             <div 
//               className="position-absolute" 
//               style={{ 
//                 bottom: '15px', 
//                 left: '30px', 
//                 fontSize: '1.5rem', 
//                 opacity: '0.4',
//                 animation: 'float 3s ease-in-out infinite 1s'
//               }}
//             >
//               🥖
//             </div>
//             <div 
//               className="position-absolute" 
//               style={{ 
//                 top: '50%', 
//                 right: '10%', 
//                 fontSize: '1.8rem', 
//                 opacity: '0.25',
//                 animation: 'float 3s ease-in-out infinite 2s'
//               }}
//             >
//               🥗
//             </div>
            
//             <div className="card-body d-flex flex-column justify-content-center p-4 position-relative" style={{ zIndex: 2 }}>
//               <h4 className="card-title mb-3 text-dark d-flex align-items-center">
//                 <div 
//                   className="me-3 d-flex align-items-center justify-content-center rounded-circle"
//                   style={{ 
//                     width: '50px', 
//                     height: '50px', 
//                     background: 'linear-gradient(45deg, #C96349, #E07A5F)',
//                     boxShadow: '0 4px 15px rgba(201, 99, 73, 0.3)'
//                   }}
//                 >
//                   <i className="bi bi-heart-fill text-white" style={{ fontSize: '1.5rem' }}></i>
//                 </div>
//                 Why Replate?
//               </h4>
//               <p className="card-text fs-5 text-dark">
//                 Replate is committed to fighting hunger and food waste by connecting those who have food with those who need it. Join us in creating a dignified, sustainable, and impactful movement.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Impact & Testimonial Cards WITH ENHANCED GRAPHICS */}
//       <section className="my-5">
//         <div className="container">
//           <div className="row g-4">
//             {/* Our Impact Card */}
//             <div className="col-md-6">
//               <div 
//                 className="card h-100 shadow-sm position-relative overflow-hidden" 
//                 style={{ 
//                   background: 'linear-gradient(135deg, #AECBB8 0%, #9BC5A7 50%, #88BF96 100%)',
//                   border: 'none'
//                 }}
//               >
//                 {/* Background pattern */}
//                 <div 
//                   className="position-absolute w-100 h-100"
//                   style={{
//                     background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                     opacity: 0.3
//                   }}
//                 ></div>
                
//                 {/* Floating icons */}
//                 <div 
//                   className="position-absolute"
//                   style={{ 
//                     top: '15px', 
//                     right: '15px', 
//                     fontSize: '2.5rem', 
//                     opacity: '0.2',
//                     animation: 'pulse 2s ease-in-out infinite'
//                   }}
//                 >
//                   📊
//                 </div>
//                 <div 
//                   className="position-absolute"
//                   style={{ 
//                     bottom: '10px', 
//                     left: '10px', 
//                     fontSize: '1.8rem', 
//                     opacity: '0.3',
//                     animation: 'pulse 2s ease-in-out infinite 0.5s'
//                   }}
//                 >
//                   🎯
//                 </div>
                
//                 <div className="card-body text-center position-relative" style={{ zIndex: 2 }}>
//                   <div 
//                     className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
//                     style={{ 
//                       width: '70px', 
//                       height: '70px', 
//                       background: 'linear-gradient(45deg, #7AB88F, #5A9B6F)',
//                       boxShadow: '0 6px 20px rgba(122, 184, 143, 0.4)'
//                     }}
//                   >
//                     <span style={{ fontSize: '2rem' }}>🍽️</span>
//                   </div>
//                   <h5 className="card-title fw-bold text-dark">Our Impact</h5>
//                   <p className="card-text fw-bold text-dark" style={{ fontSize: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//                     10,000+ meals donated
//                   </p>
//                   <div className="mt-3">
//                     <div 
//                       className="progress mx-auto" 
//                       style={{ height: '8px', width: '80%', background: 'rgba(255,255,255,0.3)' }}
//                     >
//                       <div 
//                         className="progress-bar" 
//                         style={{ 
//                           width: '75%', 
//                           background: 'linear-gradient(90deg, #7AB88F, #5A9B6F)',
//                           animation: 'progressFill 2s ease-out'
//                         }}
//                       ></div>
//                     </div>
//                     <small className="text-muted mt-2 d-block">Growing every day!</small>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* What People Say Card */}
//             <div className="col-md-6">
//               <div 
//                 className="card h-100 shadow-sm position-relative overflow-hidden" 
//                 style={{ 
//                   background: 'linear-gradient(135deg, #E7C878 0%, #E3C066 50%, #DFB854 100%)',
//                   border: 'none'
//                 }}
//               >
//                 {/* Background pattern */}
//                 <div 
//                   className="position-absolute w-100 h-100"
//                   style={{
//                     background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
//                     opacity: 0.2
//                   }}
//                 ></div>
                
//                 {/* Quote marks */}
//                 <div 
//                   className="position-absolute"
//                   style={{ 
//                     top: '10px', 
//                     left: '15px', 
//                     fontSize: '3rem', 
//                     opacity: '0.2',
//                     color: '#B8860B',
//                     fontFamily: 'serif'
//                   }}
//                 >
//                   "
//                 </div>
//                 <div 
//                   className="position-absolute"
//                   style={{ 
//                     bottom: '10px', 
//                     right: '15px', 
//                     fontSize: '3rem', 
//                     opacity: '0.2',
//                     color: '#B8860B',
//                     fontFamily: 'serif',
//                     transform: 'rotate(180deg)'
//                   }}
//                 >
//                   "
//                 </div>
                
//                 <div className="card-body text-center position-relative d-flex flex-column justify-content-center" style={{ zIndex: 2 }}>
//                   <div 
//                     className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
//                     style={{ 
//                       width: '70px', 
//                       height: '70px', 
//                       background: 'linear-gradient(45deg, #D4AF37, #B8860B)',
//                       boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)'
//                     }}
//                   >
//                     <span style={{ fontSize: '2rem' }}>💬</span>
//                   </div>
//                   <h5 className="card-title fw-bold text-dark">What People Say</h5>
//                   <blockquote className="blockquote mb-3">
//                     <p className="fst-italic" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
//                       "{testimonials[testimonialIndex].quote}"
//                     </p>
//                     <footer className="blockquote-footer mt-2">
//                       <strong>{testimonials[testimonialIndex].author}</strong>
//                     </footer>
//                   </blockquote>
//                   <button 
//                     onClick={handleNextTestimonial} 
//                     className="btn btn-outline-dark rounded-circle mx-auto"
//                     style={{ 
//                       width: '45px', 
//                       height: '45px',
//                       border: '2px solid rgba(0,0,0,0.3)',
//                       transition: 'all 0.3s ease'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.background = 'rgba(0,0,0,0.1)';
//                       e.target.style.transform = 'scale(1.1)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.background = 'transparent';
//                       e.target.style.transform = 'scale(1)';
//                     }}
//                   >
//                     <i className="bi bi-arrow-right"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ENHANCED SECTION CARDS */}
//       {/* ABOUT */}
//       <section id="about" className="px-4 mt-5">
//         <div className="card shadow-sm border-0 mb-4 position-relative overflow-hidden">
//           <div 
//             className="card-body position-relative" 
//             style={{ 
//               background: 'linear-gradient(135deg, #EDB18B 0%, #E9A679 50%, #E59B67 100%)'
//             }}
//           >
//             {/* Background icon */}
//             <div 
//               className="position-absolute"
//               style={{ 
//                 top: '10px', 
//                 right: '20px', 
//                 fontSize: '4rem', 
//                 opacity: '0.15',
//                 color: '#D2691E'
//               }}
//             >
//               ℹ️
//             </div>
            
//             <div className="d-flex align-items-center mb-3">
//               <div 
//                 className="me-3 d-flex align-items-center justify-content-center rounded-circle"
//                 style={{ 
//                   width: '50px', 
//                   height: '50px', 
//                   background: 'linear-gradient(45deg, #D2691E, #CD853F)',
//                   boxShadow: '0 4px 15px rgba(210, 105, 30, 0.3)'
//                 }}
//               >
//                 <i className="bi bi-info-circle text-white" style={{ fontSize: '1.5rem' }}></i>
//               </div>
//               <h3 className="h4 fw-semibold mb-0 text-dark">About</h3>
//             </div>
//             <p className="mb-0 text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
//               This platform connects food donors and receivers through a simple chatbot and dashboard system.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section id="faq" className="px-4 pb-4">
//         <div className="card shadow-sm border-0 position-relative overflow-hidden">
//           <div 
//             className="card-body position-relative"
//             style={{ 
//               background: 'linear-gradient(135deg, #FEE088 0%, #FDD776 50%, #FCCE64 100%)'
//             }}
//           >
//             {/* Background icon */}
//             <div 
//               className="position-absolute"
//               style={{ 
//                 top: '10px', 
//                 right: '20px', 
//                 fontSize: '4rem', 
//                 opacity: '0.15',
//                 color: '#DAA520'
//               }}
//             >
//               ❓
//             </div>
            
//             <div className="d-flex align-items-center mb-3">
//               <div 
//                 className="me-3 d-flex align-items-center justify-content-center rounded-circle"
//                 style={{ 
//                   width: '50px', 
//                   height: '50px', 
//                   background: 'linear-gradient(45deg, #DAA520, #B8860B)',
//                   boxShadow: '0 4px 15px rgba(218, 165, 32, 0.3)'
//                 }}
//               >
//                 <i className="bi bi-question-circle text-white" style={{ fontSize: '1.5rem' }}></i>
//               </div>
//               <h3 className="h4 fw-semibold mb-0 text-dark">FAQ</h3>
//             </div>
//             <div className="text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
//               <p className="mb-2">
//                 <strong>Q:</strong> How does this work?
//               </p>
//               <p className="mb-0">
//                 <strong>A:</strong> Log in, use the bot to donate or request food, and track it!
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section id="contact" className="px-4">
//         <div className="card shadow-sm border-0 position-relative overflow-hidden">
//           <div 
//             className="card-body position-relative" 
//             style={{ 
//               background: 'linear-gradient(135deg, #CDD558 0%, #C8D046 50%, #C3CB34 100%)'
//             }}
//           >
//             {/* Background icon */}
//             <div 
//               className="position-absolute"
//               style={{ 
//                 top: '10px', 
//                 right: '20px', 
//                 fontSize: '4rem', 
//                 opacity: '0.15',
//                 color: '#9ACD32'
//               }}
//             >
//               📧
//             </div>
            
//             <div className="d-flex align-items-center mb-3">
//               <div 
//                 className="me-3 d-flex align-items-center justify-content-center rounded-circle"
//                 style={{ 
//                   width: '50px', 
//                   height: '50px', 
//                   background: 'linear-gradient(45deg, #9ACD32, #7CB342)',
//                   boxShadow: '0 4px 15px rgba(154, 205, 50, 0.3)'
//                 }}
//               >
//                 <i className="bi bi-envelope text-white" style={{ fontSize: '1.5rem' }}></i>
//               </div>
//               <h3 className="h4 fw-semibold mb-0 text-dark">Contact</h3>
//             </div>
//             <p className="mb-0 text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
//               Email us at: <a href="mailto:support@fooddonate.com" className="text-success fw-bold text-decoration-none">support@fooddonate.com</a>
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="p-4 text-center text-white mt-5" style={{ backgroundColor: '#B99099' }}>
//         © 2025 Replate
//       </footer>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
        
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 0.2; }
//           50% { transform: scale(1.1); opacity: 0.4; }
//         }
        
//         @keyframes progressFill {
//           0% { width: 0%; }
//           100% { width: 75%; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default HomePage;
import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup')
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle Donate Now button click
  const handleDonateNowClick = () => {
    navigate('/login');
  };

  // Handle Receive Help button click
  const handleReceiveHelpClick = () => {
    navigate('/login');
  };

  const testimonials = [
    {
      quote: "Replate made it so easy to donate food. I felt truly helpful!",
      author: "Anjali, Donor"
    },
    {
      quote: "I was able to get meals when I needed them the most.",
      author: "Ramesh, Receiver"
    },
    {
      quote: "A seamless platform to support a good cause.",
      author: "Neha, Volunteer"
    }
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // auto-scroll every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNextTestimonial = () => {
    setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
  };

  return (
    <div className="min-vh-100 bg-white text-dark" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* HEADER */}
      <header className="p-4 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#B99099' }}>
        <div className="d-flex align-items-center">
          {/*<img src="/images/replate-logo.jpeg" alt="Replate Logo" style={{ height: '40px' }} />*/}
          <span 
            style={{ 
              fontSize: '1.8rem', 
              marginLeft: '8px', 
              marginRight: '8px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          >
            🍽️
          </span>
          <h1 className="h3 fw-bold mb-0" style={{ fontFamily: "'Pacifico', cursive" }}>Replate</h1>
        </div>
        <nav>
          <a href="#about" className="mx-3 text-white text-decoration-none">About</a>
          <a href="#faq" className="mx-3 text-white text-decoration-none">FAQ</a>
          <a href="#contact" className="mx-3 text-white text-decoration-none">Contact</a>
          <button className="btn btn-outline-light ms-3" onClick={handleLoginClick}>Login</button>
          <button className="btn btn-light text-success ms-2" onClick={handleSignupClick}>Signup</button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        className="py-4 text-center text-white"
        style={{
          backgroundImage: 'url("/images/replate-banner.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(254, 251, 251, 0.14)',
            padding: '4rem',
            color: '#42002E',
          }}
        >
          <h2 className="display-5 fw-bold mb-3">Join Hands to Feed the Needy</h2>
          <p className="lead mb-4 fw-semibold">
            Donate food or receive it with dignity. Track your donations easily.
          </p>
          <button 
            className="btn btn-light btn-lg me-3"
            onClick={handleDonateNowClick}
          >
            Donate Now
          </button>
          <button 
            className="btn btn-outline-dark btn-lg"
            onClick={handleReceiveHelpClick}
          >
            Receive Help
          </button>
        </div>
      </section>

      {/* HORIZONTAL CARD WITH GRAPHICS */}
      <section className="my-5">
        <div className="container">
          <div 
            className="card shadow-sm border-0 position-relative overflow-hidden hover-card" 
            style={{ 
              backgroundColor: '#F9D0CD',
              background: 'linear-gradient(135deg, #F9D0CD 0%, #F5C2BD 50%, #F1B4AD 100%)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            {/* Floating food icons */}
            <div 
              className="position-absolute" 
              style={{ 
                top: '10px', 
                right: '20px', 
                fontSize: '2rem', 
                opacity: '0.3',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              🍎
            </div>
            <div 
              className="position-absolute" 
              style={{ 
                bottom: '15px', 
                left: '30px', 
                fontSize: '1.5rem', 
                opacity: '0.4',
                animation: 'float 3s ease-in-out infinite 1s'
              }}
            >
              🥖
            </div>
            <div 
              className="position-absolute" 
              style={{ 
                top: '50%', 
                right: '10%', 
                fontSize: '1.8rem', 
                opacity: '0.25',
                animation: 'float 3s ease-in-out infinite 2s'
              }}
            >
              🥗
            </div>
            
            <div className="card-body d-flex flex-column justify-content-center p-4 position-relative" style={{ zIndex: 2 }}>
              <h4 className="card-title mb-3 text-dark d-flex align-items-center">
                <div 
                  className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: 'linear-gradient(45deg, #C96349, #E07A5F)',
                    boxShadow: '0 4px 15px rgba(201, 99, 73, 0.3)'
                  }}
                >
                  <i className="bi bi-heart-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                </div>
                Why Replate?
              </h4>
              <p className="card-text fs-5 text-dark">
                Replate is committed to fighting hunger and food waste by connecting those who have food with those who need it. Join us in creating a dignified, sustainable, and impactful movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Testimonial Cards WITH ENHANCED GRAPHICS */}
      <section className="my-5">
        <div className="container">
          <div className="row g-4">
            {/* Our Impact Card */}
            <div className="col-md-6">
              <div 
                className="card h-100 shadow-sm position-relative overflow-hidden hover-card" 
                style={{ 
                  background: 'linear-gradient(135deg, #AECBB8 0%, #9BC5A7 50%, #88BF96 100%)',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                {/* Background pattern */}
                <div 
                  className="position-absolute w-100 h-100"
                  style={{
                    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3
                  }}
                ></div>
                
                {/* Floating icons */}
                <div 
                  className="position-absolute"
                  style={{ 
                    top: '15px', 
                    right: '15px', 
                    fontSize: '2.5rem', 
                    opacity: '0.2',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                >
                  📊
                </div>
                <div 
                  className="position-absolute"
                  style={{ 
                    bottom: '10px', 
                    left: '10px', 
                    fontSize: '1.8rem', 
                    opacity: '0.3',
                    animation: 'pulse 2s ease-in-out infinite 0.5s'
                  }}
                >
                  🎯
                </div>
                
                <div className="card-body text-center position-relative" style={{ zIndex: 2 }}>
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: 'linear-gradient(45deg, #7AB88F, #5A9B6F)',
                      boxShadow: '0 6px 20px rgba(122, 184, 143, 0.4)'
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>🍽️</span>
                  </div>
                  <h5 className="card-title fw-bold text-dark">Our Impact</h5>
                  <p className="card-text fw-bold text-dark" style={{ fontSize: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    10,000+ meals donated
                  </p>
                  <div className="mt-3">
                    <div 
                      className="progress mx-auto" 
                      style={{ height: '8px', width: '80%', background: 'rgba(255,255,255,0.3)' }}
                    >
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: '75%', 
                          background: 'linear-gradient(90deg, #7AB88F, #5A9B6F)',
                          animation: 'progressFill 2s ease-out'
                        }}
                      ></div>
                    </div>
                    <small className="text-muted mt-2 d-block">Growing every day!</small>
                  </div>
                </div>
              </div>
            </div>

            {/* What People Say Card */}
            <div className="col-md-6">
              <div 
                className="card h-100 shadow-sm position-relative overflow-hidden hover-card" 
                style={{ 
                  background: 'linear-gradient(135deg, #E7C878 0%, #E3C066 50%, #DFB854 100%)',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                {/* Background pattern */}
                <div 
                  className="position-absolute w-100 h-100"
                  style={{
                    background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.2
                  }}
                ></div>
                
                {/* Quote marks */}
                <div 
                  className="position-absolute"
                  style={{ 
                    top: '10px', 
                    left: '15px', 
                    fontSize: '3rem', 
                    opacity: '0.2',
                    color: '#B8860B',
                    fontFamily: 'serif'
                  }}
                >
                  "
                </div>
                <div 
                  className="position-absolute"
                  style={{ 
                    bottom: '10px', 
                    right: '15px', 
                    fontSize: '3rem', 
                    opacity: '0.2',
                    color: '#B8860B',
                    fontFamily: 'serif',
                    transform: 'rotate(180deg)'
                  }}
                >
                  "
                </div>
                
                <div className="card-body text-center position-relative d-flex flex-column justify-content-center" style={{ zIndex: 2 }}>
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      background: 'linear-gradient(45deg, #D4AF37, #B8860B)',
                      boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)'
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>💬</span>
                  </div>
                  <h5 className="card-title fw-bold text-dark">What People Say</h5>
                  <blockquote className="blockquote mb-3">
                    <p className="fst-italic" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                      "{testimonials[testimonialIndex].quote}"
                    </p>
                    <footer className="blockquote-footer mt-2">
                      <strong>{testimonials[testimonialIndex].author}</strong>
                    </footer>
                  </blockquote>
                  <button 
                    onClick={handleNextTestimonial} 
                    className="btn btn-outline-dark rounded-circle mx-auto"
                    style={{ 
                      width: '45px', 
                      height: '45px',
                      border: '2px solid rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(0,0,0,0.1)';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED SECTION CARDS */}
      {/* ABOUT */}
      <section id="about" className="px-4 mt-5">
        <div className="card shadow-sm border-0 mb-4 position-relative overflow-hidden hover-card" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div 
            className="card-body position-relative" 
            style={{ 
              background: 'linear-gradient(135deg, #EDB18B 0%, #E9A679 50%, #E59B67 100%)'
            }}
          >
            {/* Background icon */}
            <div 
              className="position-absolute"
              style={{ 
                top: '10px', 
                right: '20px', 
                fontSize: '4rem', 
                opacity: '0.15',
                color: '#D2691E'
              }}
            >
              ℹ️
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <div 
                className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(45deg, #D2691E, #CD853F)',
                  boxShadow: '0 4px 15px rgba(210, 105, 30, 0.3)'
                }}
              >
                <i className="bi bi-info-circle text-white" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <h3 className="h4 fw-semibold mb-0 text-dark">About</h3>
            </div>
            <p className="mb-0 text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              This platform connects food donors and receivers through a simple chatbot and dashboard system.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 pb-4">
        <div className="card shadow-sm border-0 position-relative overflow-hidden hover-card" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div 
            className="card-body position-relative"
            style={{ 
              background: 'linear-gradient(135deg, #FEE088 0%, #FDD776 50%, #FCCE64 100%)'
            }}
          >
            {/* Background icon */}
            <div 
              className="position-absolute"
              style={{ 
                top: '10px', 
                right: '20px', 
                fontSize: '4rem', 
                opacity: '0.15',
                color: '#DAA520'
              }}
            >
              ❓
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <div 
                className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(45deg, #DAA520, #B8860B)',
                  boxShadow: '0 4px 15px rgba(218, 165, 32, 0.3)'
                }}
              >
                <i className="bi bi-question-circle text-white" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <h3 className="h4 fw-semibold mb-0 text-dark">FAQ</h3>
            </div>
            <div className="text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              <p className="mb-2">
                <strong>Q:</strong> How does this work?
              </p>
              <p className="mb-0">
                <strong>A:</strong> Log in, use the bot to donate or request food, and track it!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-4">
        <div className="card shadow-sm border-0 position-relative overflow-hidden hover-card" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}>
          <div 
            className="card-body position-relative" 
            style={{ 
              background: 'linear-gradient(135deg, #CDD558 0%, #C8D046 50%, #C3CB34 100%)'
            }}
          >
            {/* Background icon */}
            <div 
              className="position-absolute"
              style={{ 
                top: '10px', 
                right: '20px', 
                fontSize: '4rem', 
                opacity: '0.15',
                color: '#9ACD32'
              }}
            >
              📧
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <div 
                className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(45deg, #9ACD32, #7CB342)',
                  boxShadow: '0 4px 15px rgba(154, 205, 50, 0.3)'
                }}
              >
                <i className="bi bi-envelope text-white" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <h3 className="h4 fw-semibold mb-0 text-dark">Contact</h3>
            </div>
            <p className="mb-0 text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Email us at: <a href="mailto:support@fooddonate.com" className="text-success fw-bold text-decoration-none">support@fooddonate.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-4 text-center text-white mt-5" style={{ backgroundColor: '#B99099' }}>
        © 2025 Replate
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 75%; }
        }

        .hover-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}

export default HomePage;