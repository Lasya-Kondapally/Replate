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
          <img src="/images/replate-logo.jpeg" alt="Replate Logo" style={{ height: '40px' }} />
          <h1 className="h3 fw-bold mb-0 ms-2" style={{ fontFamily: "'Pacifico', cursive" }}>Replate</h1>
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
        {/*<div style={{ backgroundColor: 'rgba(254, 251, 251, 0.14)', padding: '4rem' ,color:'#42002E'}}>
          <h2 className="display-5 fw-bold mb-3">Join Hands to Feed the Needy</h2>
          <p className="lead mb-4 fw-semibold">Donate food or receive it with dignity. Track your donations easily.</p>
          <button className="btn btn-light text-success btn-lg me-3" >Donate Now</button>
          <button className="btn btn-outline-light btn-lg">Receive Help</button>
        </div>*/}
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
  <button className="btn btn-light btn-lg me-3">Donate Now</button>
  <button className="btn btn-outline-dark btn-lg">Receive Help</button>
</div>
      </section>

      {/* HORIZONTAL CARD */}
      <section className="my-5">
        <div className="container">
          <div className="card shadow-sm border-0" style={{ backgroundColor: '#F9D0CD' }}>
            <div className="card-body d-flex flex-column justify-content-center p-4">
              <h4 className="card-title mb-3 text-dark">
                <i className="bi bi-heart-fill me-2" style={{ color: '#C96349' }}></i>
                Why Replate?
              </h4>
              <p className="card-text fs-5 text-dark">
                Replate is committed to fighting hunger and food waste by connecting those who have food with those who need it. Join us in creating a dignified, sustainable, and impactful movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Testimonial Cards */}
      <section className="my-5">
        <div className="container">
          <div className="row g-4">
            {/* Our Impact */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm" style={{ backgroundColor: '#AECBB8' }}>
                <div className="card-body text-center">
                  <h5 className="card-title">🍽️ Our Impact</h5>
                  <p className="card-text fw-bold" style={{ fontSize: '1.5rem' }}>10,000+ meals donated</p>
                </div>
              </div>
            </div>

            {/* What People Say */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm" style={{ backgroundColor: '#E7C878' }}>
                <div className="card-body text-center">
                  <h5 className="card-title">💬 What People Say</h5>
                  <blockquote className="blockquote mb-2">
                    <p>"{testimonials[testimonialIndex].quote}"</p>
                    <footer className="blockquote-footer">{testimonials[testimonialIndex].author}</footer>
                  </blockquote>
                  <button onClick={handleNextTestimonial} className="btn btn-sm btn-outline-dark rounded-circle">
                  <i className="bi bi-arrow-right"></i>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
<section id="about" className="px-4 mt-5">
  <div className="card shadow-sm border-0 mb-4">
    <div className="card-body" style={{ backgroundColor: '#EDB18B' }}>
      <h3 className="h4 fw-semibold mb-2">About</h3>
      <p>
        This platform connects food donors and receivers through a simple chatbot and dashboard system.
      </p>
    </div>
  </div>
</section>

{/* FAQ */}
<section id="faq" className="px-4 pb-4">
  <div className="card shadow-sm border-0  bg-light">
    <div className="card-body"style={{ backgroundColor: '#FEE088' }}>
      <h3 className="h4 fw-semibold mb-2">FAQ</h3>
      <p>
        <strong>Q:</strong> How does this work?<br />
        <strong>A:</strong> Log in, use the bot to donate or request food, and track it!
      </p>
    </div>
  </div>
</section>

{/* CONTACT */}
<section id="contact" className="px-4" >
  <div className="card shadow-sm border-0">
    <div className="card-body" style={{ backgroundColor: '#CDD558' }}>
      <h3 className="h4 fw-semibold mb-2">Contact</h3>
      <p>
        Email us at: <a href="mailto:support@fooddonate.com" className="text-success">support@fooddonate.com</a>
      </p>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="p-4 text-center text-white mt-5" style={{ backgroundColor: '#B99099' }}>
        © 2025 Replate
      </footer>
    </div>
  );
}

export default HomePage;