import React from 'react';

function HomePage() {
  return (
    <div className="min-vh-100 bg-white text-dark">
      <header className="p-4 bg-success text-white d-flex justify-content-between align-items-center">
        <h1 className="h3 fw-bold">Replate</h1>
        <nav>
          <a href="#about" className="mx-3 text-white text-decoration-none">About</a>
          <a href="#faq" className="mx-3 text-white text-decoration-none">FAQ</a>
          <a href="#contact" className="mx-3 text-white text-decoration-none">Contact</a>
          <button className="btn btn-outline-light ms-3">Login</button>
          <button className="btn btn-light text-success ms-2">Signup</button>
        </nav>
      </header>

      <section className="py-5 text-center bg-light">
        <h2 className="display-5 fw-bold mb-3">Join Hands to Feed the Needy</h2>
        <p className="lead mb-4">Donate food or receive it with dignity. Track your donations easily.</p>
        <button className="btn btn-success btn-lg">Get Started</button>
      </section>

      <section id="about" className="p-4">
        <h3 className="h4 fw-semibold mb-2">About</h3>
        <p>This platform connects food donors and receivers through a simple chatbot and dashboard system.</p>
      </section>

      <section id="faq" className="p-4 bg-light">
        <h3 className="h4 fw-semibold mb-2">FAQ</h3>
        <p><strong>Q:</strong> How does this work?<br /><strong>A:</strong> Log in, use the bot to donate or request food, and track it!</p>
      </section>

      <section id="contact" className="p-4">
        <h3 className="h4 fw-semibold mb-2">Contact</h3>
        <p>Email us at: <a href="mailto:support@fooddonate.com" className="text-success">support@fooddonate.com</a></p>
      </section>

      <footer className="p-4 text-center bg-success text-white">
        © 2025 Replate
      </footer>
    </div>
  );
}

export default HomePage;
