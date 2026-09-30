import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 80,
    });

    AOS.refresh();
  }, []);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/dashboard");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="vitta-trader-landing">
      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div className="landing-background-effects">
        <div className="landing-glow landing-glow-one"></div>
        <div className="landing-glow landing-glow-two"></div>
        <div className="landing-glow landing-glow-three"></div>

        <div className="landing-grid-bg"></div>

        <span className="landing-particle landing-particle-1"></span>
        <span className="landing-particle landing-particle-2"></span>
        <span className="landing-particle landing-particle-3"></span>
        <span className="landing-particle landing-particle-4"></span>
        <span className="landing-particle landing-particle-5"></span>
      </div>

      {/* =====================================================
          FIRST SECTION
          NAVBAR + HERO + FEATURES
      ===================================================== */}

      <section className="landing-first-section">
        <header className="landing-navbar">
          <div className="landing-container landing-navbar-inner">
            <div className="landing-logo">
              <img src="/images/Logo.png" alt="VittaTrader" />
            </div>

            <div className="landing-navbar-actions">
              <button
                type="button"
                className="landing-nav-login"
                onClick={goToLogin}
              >
                Login
              </button>

              <button
                type="button"
                className="landing-nav-register"
                onClick={goToRegister}
              >
                Register
              </button>
            </div>
          </div>
        </header>

        {/* <div className="landing-hero">
          <div className="landing-container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-5" data-aos="fade-left">
                <div className="landing-hero-content" data-aos="fade-right">
                  <span className="landing-eyebrow">
                    YOUR PARTNER IN FINANCIAL GROWTH
                  </span>

                  <h1>
                    Smarter
                    <br />
                    Wealth Management
                    <br />
                    <span>Stronger Trading Support</span>
                  </h1>

                  <p>
                    A powerful platform to manage your clients, track
                    performance, get powerful trading support and build
                    long-term wealth — all in one place.
                  </p>

                  <div className="landing-hero-buttons">
                    <button
                      type="button"
                      className="landing-blue-btn"
                      onClick={goToRegister}
                    >
                      Register Now
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>

                    <button
                      type="button"
                      className="landing-green-outline-btn"
                      onClick={goToLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
<div className="landing-hero">
  <div className="landing-container">
    <div className="row align-items-center">

      <div
        className="col-12 col-lg-7 col-xl-6"
        data-aos="fade-left"
      >

        <div
          className="landing-hero-content"
          data-aos="fade-right"
        >

          <span className="landing-eyebrow">
            YOUR PARTNER IN FINANCIAL GROWTH
          </span>

          <h1>
            Smarter
            <br />
            Wealth Management
            <br />
            <span>
              Stronger Trading Support
            </span>
          </h1>

          <p>
            A powerful platform to manage your clients,
            track performance, get powerful trading support
            and build long-term wealth — all in one place.
          </p>

          <div className="landing-hero-buttons">

            <button
              type="button"
              className="landing-blue-btn"
              onClick={goToRegister}
            >
              Register Now
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <button
              type="button"
              className="landing-green-outline-btn"
              onClick={goToLogin}
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  </div>
</div>
        {/* =====================================================
            FEATURE ROW
        ===================================================== */}

        <div className="landing-feature-section">
          <div className="landing-container">
            <div className="row g-0">
              <LandingFeature
                icon="fa-solid fa-chart-column"
                title="Wealth Management"
                text="Manage portfolios and track growth with ease."
                theme="blue"
              />

              <LandingFeature
                icon="fa-solid fa-arrow-trend-up"
                title="Trading Support"
                text="Get insights and tools to make smarter trading decisions."
                theme="green"
              />

              <LandingFeature
                icon="fa-solid fa-users"
                title="Client Management"
                text="Easily manage and nurture all your clients in one place."
                theme="blue"
              />

              <LandingFeature
                icon="fa-regular fa-file-lines"
                title="Reports & Analytics"
                text="Detailed reports to track performance and progress."
                theme="green"
              />
            </div>
          </div>
        </div>
      </section>



      <section className="landing-free-section">
        {/* ================= BACKGROUND VIDEO ================= */}

        <div className="landing-free-video-wrap">
          {/* <video
      className="landing-free-bg-video"
      autoPlay
      loop
      muted
      playsInline
    >
      <source
        src="/public/images/graph3.mp4"
        type="video/mp4"
      />
    </video> */}

          {/* <div className="landing-free-video-overlay"></div> */}
          {/* <div className="landing-free-video-glow"></div> */}
        </div>



        <div className="landing-container">
          <div className="landing-free-card">
            <div className="landing-free-card-video-wrap">
              {/* <video
        className="landing-free-card-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/images/graph3.mp4"
          type="video/mp4"
        />
      </video> */}

              <div className="landing-free-card-video-overlay"></div>
            </div>

            <div className="landing-free-card-content">
              <div className="row align-items-center g-4">
                {/* LEFT */}

                <div className="col-12 col-lg-5" data-aos="fade-left">
                  <div className="landing-free-content" data-aos="fade-right">
                    <span className="landing-small-heading">
                      TRY BEFORE YOU COMMIT
                    </span>

                    <h2>
                      <span>7 DAYS</span>
                      FREE ACCESS
                    </h2>

                    <p>
                      Explore the complete platform with all features. No
                      commitment. See how VittaTrader can simplify your
                      business.
                    </p>

                    <button
                      type="button"
                      className="landing-blue-btn"
                      onClick={goToRegister}
                    >
                      Register Now
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>

                {/* RIGHT VIDEO */}

                <div className="col-12 col-lg-7" data-aos="fade-right">
                  <div
                    className="landing-free-video-visual"
                    data-aos="fade-left"
                  >
                    <video
                      className="landing-free-right-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="/images/Lap2.mp4" type="video/mp4" />
                    </video>

                    <div className="landing-free-right-video-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          THIRD SECTION
          PLATFORM PRICING
      ===================================================== */}

      <section className="landing-platform-section">
        <div className="landing-side-candles landing-side-candles-left"></div>

        <div className="landing-side-candles landing-side-candles-right"></div>

        <div className="landing-container">
          <div className="landing-section-title" data-aos="fade-up">
            <span>SIMPLE &amp; TRANSPARENT PRICING</span>

            <h2>One Platform. One Plan.</h2>

            <p>
              Full access to everything you need for wealth management and
              trading support.
            </p>
          </div>

          {/* <div className="landing-platform-price-card">

            <h3>
              Platform Access
            </h3>


            <div className="landing-platform-price">

              <strong>
                ₹1,000
              </strong>

              <span>
                /month
              </span>

            </div>


            <small>
              + GST
            </small>


            <div className="landing-platform-divider"></div>


            <ul className="landing-check-list">

              <CheckItem text="Complete platform access" />

              <CheckItem text="Wealth management tools" />

              <CheckItem text="Trading support & insights" />

              <CheckItem text="Client management" />

              <CheckItem text="Reports & analytics" />

              <CheckItem text="Easy setup & onboarding" />

            </ul>

          </div> */}
          <div
            className="landing-platform-price-card landscape"
            data-aos="zoom-in-up"
          >
            {/* LEFT SIDE */}

            <div className="landing-platform-price-left">
              <span className="landing-platform-plan-label">
                PLATFORM ACCESS
              </span>

              <h3>
                Everything You Need,
                <br />
                In One Platform
              </h3>

              <div className="landing-platform-price">
                <strong>₹1,000</strong>

                <span>/month</span>
              </div>

              <small>+ GST</small>

              <button
                type="button"
                className="landing-platform-cta"
                onClick={goToRegister}
              >
                Get Started
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            {/* RIGHT SIDE */}

            <div className="landing-platform-price-right">
              <div className="landing-platform-feature-heading">
                <span>INCLUDED IN YOUR PLAN</span>

                <h4>Complete platform access</h4>
              </div>

              <div className="landing-platform-features-grid">
                <CheckItem text="Complete platform access" />

                <CheckItem text="Wealth management tools" />

                <CheckItem text="Trading support & insights" />

                <CheckItem text="Client management" />

                <CheckItem text="Reports & analytics" />

                <CheckItem text="Easy setup & onboarding" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOURTH SECTION
          CLIENT PRICING
      ===================================================== */}

      <section className="landing-client-section">
        <div className="landing-container">
          <div className="landing-client-card">
            <div className="row align-items-center g-4">
              {/* LEFT */}

              <div className="col-12 col-lg-7" data-aos="fade-right">
                <span className="landing-small-heading">
                  FLEXIBLE CLIENT-BASED PRICING
                </span>

                <h2>Grow with Your Clients</h2>

                <p>Pay only for the clients you onboard to the platform.</p>

                <div className="row align-items-center g-4">
                  <div className="col-12 col-md-5">
                    <div className="landing-client-price">
                      <strong>₹600</strong>

                      <span>per client</span>

                      <small>+ GST</small>
                    </div>
                  </div>

                  <div className="col-12 col-md-7">
                    <ul className="landing-check-list landing-client-list">
                      <CheckItem text="Add clients as your business grows" />

                      <CheckItem text="Manage all clients in one place" />

                      <CheckItem text="No complicated plans" />

                      <CheckItem text="Pay only for active clients" />

                      <CheckItem text="Perfect for advisory and trading teams" />
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT IMAGE */}

              <div className="col-12 col-lg-5" data-aos="fade-left">
                <div className="landing-client-image-wrap">
                  <img
                    src="/images/icon.png"
                    alt="Grow with your clients"
                    className="landing-client-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <section className="landing-final-cta">
        <div className="landing-final-bg"></div>

        <div className="landing-final-overlay"></div>

        <div className="landing-container">
          <div className="landing-final-content" data-aos="zoom-in">
            <span data-aos="zoom-in-up">READY TO GET STARTED?</span>

            <h2 data-aos="zoom-in-up">
              Simplify Your Wealth &amp; Trading Operations
            </h2>

            <p data-aos="zoom-out">
              Join now and get 7 days free access to experience the platform.
            </p>

            <div className="landing-final-buttons">
              <button
                data-aos="fade-right"
                type="button"
                className="landing-blue-btn"
                onClick={goToRegister}
              >
                Register Now
                <i className="fa-solid fa-arrow-right"></i>
              </button>

              <button
                data-aos="fade-left"
                type="button"
                className="landing-green-outline-btn"
                onClick={goToLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-inner">
            <div className="landing-footer-brand">
              <img src="/images/Logo.png" alt="VittaTrader" />
            </div>

            <p>
              A complete platform for wealth management, trading support and
              client growth.
            </p>

            <div className="landing-footer-links">
              <button type="button" onClick={() => navigate("/privacy-policy")}>
                Privacy Policy
              </button>

              <span></span>

              <button
                type="button"
                onClick={() => navigate("/terms-conditions")}
              >
                Terms &amp; Conditions
              </button>
            </div>

            <span className="landing-footer-divider"></span>

            <small>© 2026 VittaTrader. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =====================================================
   FEATURE
===================================================== */

function LandingFeature({ icon, title, text, theme }) {
  return (
    <div
      className="col-12 col-sm-6 col-lg-3"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <div className="landing-feature">
        <div className={`landing-feature-icon ${theme}`}>
          <i className={icon}></i>
        </div>

        <h3>{title}</h3>

        <p>{text}</p>
      </div>
    </div>
  );
}

/* =====================================================
   CHECK ITEM
===================================================== */

function CheckItem({ text }) {
  return (
    <li>
      <i className="fa-solid fa-circle-check"></i>

      <span>{text}</span>
    </li>
  );
}

export default Landing;
