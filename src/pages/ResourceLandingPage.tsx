import { useEffect, useState } from 'react';
import AppHeader from '../components/layout/AppHeader';
import './ResourceLandingPage.css';
import { Link, useParams } from "react-router-dom";
import { supabase } from '../lib/supabase';

export default function ResourceLandingPage() {
  const { slug } = useParams();

  const [name, setName] = useState('');
  const [work_email, setWorkEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [i_am_a_part_of, setIAmAPartOf] = useState('I am part of...');
  const [selectedCode, setSelectedCode] = useState('🇦🇪 +971');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const track = document.getElementById('marqueeTrack');
    if (track && !track.getAttribute('data-tripled')) {
      const original = track.innerHTML;
      track.innerHTML = original + original + original;
      track.setAttribute('data-tripled', 'true');
    }

    const codeTrigger = document.getElementById('codeTrigger');
    const codeMenu = document.getElementById('codeMenu');
    const overlay = document.getElementById('overlay');

    const handleTriggerClick = (e: Event) => {
      e.stopPropagation();
      codeMenu?.classList.toggle('open');
      codeTrigger?.classList.toggle('open');
    };

    const handleMenuClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const li = target.closest('li');
      if (!li) return;
      const code = li.getAttribute('data-code');
      if (code) setSelectedCode(code);
      codeMenu?.classList.remove('open');
      codeTrigger?.classList.remove('open');
    };

    const handleDocumentClick = () => {
      codeMenu?.classList.remove('open');
      codeTrigger?.classList.remove('open');
    };

    const handleOverlayClick = (e: Event) => {
      if (e.target === overlay) closeModal();
    };

    codeTrigger?.addEventListener('click', handleTriggerClick);
    codeMenu?.addEventListener('click', handleMenuClick);
    document.addEventListener('click', handleDocumentClick);
    overlay?.addEventListener('click', handleOverlayClick);

    return () => {
      codeTrigger?.removeEventListener('click', handleTriggerClick);
      codeMenu?.removeEventListener('click', handleMenuClick);
      document.removeEventListener('click', handleDocumentClick);
      overlay?.removeEventListener('click', handleOverlayClick);
    };
  }, []);

  const openModal = () => {
    document.getElementById('overlay')?.classList.add('open');
  };

  const closeModal = () => {
    document.getElementById('overlay')?.classList.remove('open');
  };
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (
    !name.trim() ||
    !work_email.trim() ||
    !phone_number.trim() ||
    i_am_a_part_of === 'I am part of...'
  ) {
    setError('Please fill in all 4 fields.');
    return;
  }

  setError('');

    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("report_requests").insert({
      user_id: user!.id,
      name,
      work_email,
      phone_number: `${selectedCode} ${phone_number}`,
      i_am_a_part_of,
    });

    setSubmitted(true);
    setName('');
    setWorkEmail('');
    setPhoneNumber('');
    setIAmAPartOf('I am part of...');
    setSelectedCode('🇦🇪 +971');

    setIsSubmitting(false);

    setTimeout(() => {
        setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <AppHeader />

      <section className="wrap hero">
        <div className="hero-copy">
          <span className="eyebrow-tag">Free report for teams new to Web3</span>
          <h1>Get your team <span className="accent">blockchain-ready</span> before your next Web3 decision costs you</h1>
          <p className="sub">Download the plain-English report that explains the 6 concepts every non-technical team needs before touching a wallet, a contract, or a token.</p>
          <div className="hero-actions">
            <div className="btn-row">
              <button className="cta-btn" onClick={openModal}>Get the free report →</button>
              <Link
                to={`/resource/${slug}/details`}
                className="cta-btn cta-btn-secondary"
              >
                Proceed to this resource →
              </Link>
            </div>
            <span className="meta-line">6 CONCEPTS · 12-MIN READ · NO JARGON</span>
          </div>
        </div>
      </section>

      <section className="trust wrap">
        <div className="trust-label">Trusted by teams learning blockchain the practical way</div>
        <div className="marquee">
          <div className="marquee-track" id="marqueeTrack">
            <span className="trust-logo serif">Fintra</span>
            <span className="trust-logo sans-bold">Northpeak</span>
            <span className="trust-logo heart"><span className="hrt">♥</span>Ledgerly</span>
            <span className="trust-logo sans-slant">Vaultify</span>
            <span className="trust-logo dot">Coreline</span>
            <span className="trust-logo mono">Meridian</span>
          </div>
        </div>
      </section>

      <section className="features wrap">
        <div className="section-head">
          <h2>What the report helps you <span className="b">understand</span> before you commit to blockchain</h2>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon">🧩</div>
            <h3>The 6 core concepts</h3>
            <p>See the ideas most teams skip before evaluating a wallet, a chain, or a vendor pitch.</p>
          </div>
          <div className="card">
            <div className="card-icon">🕵️</div>
            <h3>Jargon that hides risk</h3>
            <p>Custody, gas fees, and irreversible transactions — explained plainly, before anything gets signed off.</p>
          </div>
          <div className="card">
            <div className="card-icon">✅</div>
            <h3>Questions to ask first</h3>
            <p>Know which questions to bring to any Web3 vendor before you sign, deploy, or move a single token.</p>
          </div>
        </div>

        <div className="cta-center">
          <button className="cta-btn" onClick={openModal}>Get the free report →</button>
        </div>
      </section>

      <footer id="br-footer" className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-company">
            <div className="footer-brand">
              <div className="logo-mark">B</div>
              <div className="brand-name">BlockReady</div>
            </div>
            <p className="footer-desc">Empowering everyone, regardless of background or experience, to learn crypto and Web3 through structured, unbiased, AI-powered education. Unlock the endless opportunities of this new digital era!</p>
            <ul className="social-links">
              <li><a href="https://www.linkedin.com/company/blockreadycom" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.77 0 5-2.24 5-5v-14c0-2.76-2.23-5-5-5zm-11.5 20h-3v-11h3v11zm-1.5-12.3c-.97 0-1.75-.79-1.75-1.75S5.03 4.2 6 4.2s1.75.79 1.75 1.75S6.97 7.7 6 7.7zM20 20h-3v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91V20h-3v-11h2.88v1.5h.04c.4-.75 1.37-1.54 2.83-1.54 3.03 0 3.59 2 3.59 4.58V20z"></path></svg>
              </a></li>
              <li><a href="https://www.facebook.com/blockreadycom" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </a></li>
              <li><a href="https://x.com/blockreadycom" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
              </a></li>
              <li><a href="https://www.pinterest.com/blockready" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12a11.996 11.996 0 007.672 11.24c-.106-.955-.203-2.42.042-3.463.222-.96 1.428-6.115 1.428-6.115s-.364-.727-.364-1.8c0-1.685.977-2.942 2.193-2.942 1.034 0 1.533.776 1.533 1.707 0 1.04-.66 2.595-1.001 4.037-.284 1.2.6 2.18 1.78 2.18 2.136 0 3.776-2.25 3.776-5.497 0-2.875-2.067-4.884-5.021-4.884-3.421 0-5.431 2.565-5.431 5.217 0 1.035.398 2.147.895 2.75a.36.36 0 01.083.345c-.09.38-.29 1.2-.33 1.366-.052.22-.17.266-.392.16-1.456-.68-2.366-2.814-2.366-4.53 0-3.687 2.68-7.072 7.731-7.072 4.06 0 7.214 2.892 7.214 6.763 0 4.03-2.54 7.275-6.07 7.275-1.185 0-2.299-.616-2.68-1.344l-.73 2.79c-.263 1.003-.976 2.26-1.456 3.027A11.987 11.987 0 0024 12C24 5.373 18.627 0 12 0z"></path></svg>
              </a></li>
              <li><a href="https://www.quora.com/profile/Blockready" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Quora">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.534 2 12.103c0 5.568 4.486 10.103 10 10.103 1.553 0 3.021-.347 4.337-.97l1.863 1.967a1 1 0 001.472-1.354l-1.51-1.594C20.625 18.787 22 15.645 22 12.103 22 6.534 17.514 2 12 2zm0 2c4.439 0 8 3.61 8 8.103 0 2.568-1.136 4.848-2.909 6.334-.475-.533-1.022-.976-1.623-1.312C17.098 16.233 18 14.351 18 12.103 18 8.686 15.314 6 12 6s-6 2.686-6 6.103 2.686 6.103 6 6.103c.498 0 .978-.06 1.435-.174a4.998 4.998 0 012.292 2.007C14.416 21.215 13.22 21.49 12 21.49c-4.439 0-8-8.61-8-8.103C4 7.61 7.561 4 12 4z"></path><path d="M12 8a4.104 4.104 0 100 8.207A4.104 4.104 0 0012 8zm0 2a2.103 2.103 0 110 4.207A2.103 2.103 0 0112 10z"></path></svg>
              </a></li>
              <li><a href="https://medium.com/@blockready" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M2.846 6.54c.03-.297-.083-.59-.302-.787L.367 3.177v-.26H7.56l5.53 12.124 4.86-12.124h6.8v.26l-1.77 1.694a.534.534 0 00-.204.51v13.366a.534.534 0 00.204.51l1.73 1.694v.26h-8.57v-.26l1.79-1.74c.175-.175.175-.226.175-.51V8.16l-4.98 12.975h-.67L7.01 8.16v8.68a1.174 1.174 0 00.32.96l2.33 2.83v.26H.177v-.26l2.33-2.83a1.136 1.136 0 00.34-.96V6.54z"></path></svg>
              </a></li>
            </ul>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <p className="footer-col-title">Company</p>
              <ul className="footer-col-list">
                <li><a href="/about">About Us</a></li>
                <li><a href="/policies">Policies</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/book">Book a call</a></li>
                <li><a href="/affiliates">Affiliates</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Our Services</p>
              <ul className="footer-col-list">
                <li><a href="/course-outline">Course Outline</a></li>
                <li><a href="/syllabus">Course Guide</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/enterprise">Enterprises</a></li>
                <li><a href="/offers/z3EPBkkB">Free Course</a></li>
                <li><a href="/web3-questions-and-answers">Web3 FAQs</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Helpful Links</p>
              <ul className="footer-col-list">
                <li><a href="/quiz">Take the Quiz</a></li>
                <li><a href="/crypto-glossary">Crypto Glossary</a></li>
                <li><a href="/whats-new">Whats New</a></li>
                <li><a href="/nft_certificates">NFT Certificates</a></li>
                <li><a href="/demo">Demo</a></li>
                <li>
                  <a href="https://wa.me/971588815010" target="_blank" rel="noopener noreferrer" className="live-chat-link">
                    Live Chat
                    <span className="ping-indicator"><span className="ping-outer"></span><span className="ping-inner"></span></span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Contact Us</p>
              <ul className="footer-col-list contact-list">
                <li>
                  <a href="mailto:support@blockready.com" className="contact-item">
                    <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>support@blockready.com</span>
                  </a>
                </li>
                <li>
                  <span className="contact-item">
                    <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>Dubai, United Arab Emirates</span>
                  </span>
                </li>
                <li>
                  <a href="tel:+971588815010" className="contact-item">
                    <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span>+971 588815010</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <p className="copyright">© 2026 Blockready</p>
          <p className="rights">All rights reserved.</p>
        </div>
      </footer>

      <div className="overlay" id="overlay">
        <div className="modal">
          <div className="modal-head">
            <h3>Get The 6-Concept Primer</h3>
            <button className="modal-close" onClick={closeModal}>✕</button>
          </div>
          <p className="desc">Enter your details and we'll send you The 6-Concept Primer: the plain-English report that gets your team blockchain-ready before your next Web3 decision.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <span className="ic">👤</span>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <span className="ic">✉️</span>
              <input
                type="email"
                placeholder="Work email"
                value={work_email}
                onChange={(e) => setWorkEmail(e.target.value)}
              />
            </div>

            <div className="field phone-field">
              <div className="phone-row">
                <button type="button" className="code-trigger" id="codeTrigger">
                  <span id="codeSelected">{selectedCode}</span>
                  <span className="code-caret">▾</span>
                </button>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <ul className="code-menu" id="codeMenu">
                <li data-code="🇦🇪 +971"><span className="flag">🇦🇪</span><span className="country">UAE</span><span className="dial">+971</span></li>
                <li data-code="🇺🇸 +1"><span className="flag">🇺🇸</span><span className="country">USA</span><span className="dial">+1</span></li>
                <li data-code="🇬🇧 +44"><span className="flag">🇬🇧</span><span className="country">UK</span><span className="dial">+44</span></li>
                <li data-code="🇮🇳 +91"><span className="flag">🇮🇳</span><span className="country">India</span><span className="dial">+91</span></li>
                <li data-code="🇦🇺 +61"><span className="flag">🇦🇺</span><span className="country">Australia</span><span className="dial">+61</span></li>
                <li data-code="🇸🇬 +65"><span className="flag">🇸🇬</span><span className="country">Singapore</span><span className="dial">+65</span></li>
                <li data-code="🇸🇦 +966"><span className="flag">🇸🇦</span><span className="country">Saudi Arabia</span><span className="dial">+966</span></li>
                <li data-code="🇶🇦 +974"><span className="flag">🇶🇦</span><span className="country">Qatar</span><span className="dial">+974</span></li>
                <li data-code="🇧🇭 +973"><span className="flag">🇧🇭</span><span className="country">Bahrain</span><span className="dial">+973</span></li>
                <li data-code="🇰🇼 +965"><span className="flag">🇰🇼</span><span className="country">Kuwait</span><span className="dial">+965</span></li>
                <li data-code="🇴🇲 +968"><span className="flag">🇴🇲</span><span className="country">Oman</span><span className="dial">+968</span></li>
                <li data-code="🇪🇬 +20"><span className="flag">🇪🇬</span><span className="country">Egypt</span><span className="dial">+20</span></li>
                <li data-code="🇿🇦 +27"><span className="flag">🇿🇦</span><span className="country">South Africa</span><span className="dial">+27</span></li>
                <li data-code="🇩🇪 +49"><span className="flag">🇩🇪</span><span className="country">Germany</span><span className="dial">+49</span></li>
                <li data-code="🇫🇷 +33"><span className="flag">🇫🇷</span><span className="country">France</span><span className="dial">+33</span></li>
                <li data-code="🇪🇸 +34"><span className="flag">🇪🇸</span><span className="country">Spain</span><span className="dial">+34</span></li>
                <li data-code="🇮🇹 +39"><span className="flag">🇮🇹</span><span className="country">Italy</span><span className="dial">+39</span></li>
                <li data-code="🇳🇱 +31"><span className="flag">🇳🇱</span><span className="country">Netherlands</span><span className="dial">+31</span></li>
                <li data-code="🇸🇪 +46"><span className="flag">🇸🇪</span><span className="country">Sweden</span><span className="dial">+46</span></li>
                <li data-code="🇨🇭 +41"><span className="flag">🇨🇭</span><span className="country">Switzerland</span><span className="dial">+41</span></li>
                <li data-code="🇯🇵 +81"><span className="flag">🇯🇵</span><span className="country">Japan</span><span className="dial">+81</span></li>
                <li data-code="🇰🇷 +82"><span className="flag">🇰🇷</span><span className="country">South Korea</span><span className="dial">+82</span></li>
                <li data-code="🇨🇳 +86"><span className="flag">🇨🇳</span><span className="country">China</span><span className="dial">+86</span></li>
                <li data-code="🇭🇰 +852"><span className="flag">🇭🇰</span><span className="country">Hong Kong</span><span className="dial">+852</span></li>
                <li data-code="🇵🇰 +92"><span className="flag">🇵🇰</span><span className="country">Pakistan</span><span className="dial">+92</span></li>
                <li data-code="🇧🇩 +880"><span className="flag">🇧🇩</span><span className="country">Bangladesh</span><span className="dial">+880</span></li>
                <li data-code="🇮🇩 +62"><span className="flag">🇮🇩</span><span className="country">Indonesia</span><span className="dial">+62</span></li>
                <li data-code="🇲🇾 +60"><span className="flag">🇲🇾</span><span className="country">Malaysia</span><span className="dial">+60</span></li>
                <li data-code="🇵🇭 +63"><span className="flag">🇵🇭</span><span className="country">Philippines</span><span className="dial">+63</span></li>
                <li data-code="🇧🇷 +55"><span className="flag">🇧🇷</span><span className="country">Brazil</span><span className="dial">+55</span></li>
                <li data-code="🇲🇽 +52"><span className="flag">🇲🇽</span><span className="country">Mexico</span><span className="dial">+52</span></li>
                <li data-code="🇨🇦 +1"><span className="flag">🇨🇦</span><span className="country">Canada</span><span className="dial">+1</span></li>
                <li data-code="🇳🇬 +234"><span className="flag">🇳🇬</span><span className="country">Nigeria</span><span className="dial">+234</span></li>
                <li data-code="🇰🇪 +254"><span className="flag">🇰🇪</span><span className="country">Kenya</span><span className="dial">+254</span></li>
              </ul>
            </div>

            <div className="field">
              <span className="ic">🏢</span>
              <select
                value={i_am_a_part_of}
                onChange={(e) => setIAmAPartOf(e.target.value)}
              >
                <option>A startup</option>
                <option>An enterprise team</option>
                <option>An agency</option>
                <option>Just exploring</option>
              </select>
            </div>

            {error && <p className="form-error">{error}</p>}


            <button className="send-btn" type="submit" disabled={isSubmitting}>
              {submitted ? 'Submitted' : isSubmitting ? 'Submitting...' : 'Send me the report →'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}