'use client';

import { useState, FormEvent } from 'react';
import styles from './contact.module.css';
import portfolioData from '@/data/portfolio.json';

export default function ContactPage() {
  const { contact } = portfolioData;

  // Client form state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate standard form submission server payload transition
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className={`${styles.container} container animate-slide-up`}>
      {/* Page Title Header */}
      <div className={styles.titleBlock}>
        <p>Get In Touch</p>
        <h1 className="serif-title">Contact</h1>
      </div>

      <div className={styles.grid}>
        {/* Left Side: Contact Information Details */}
        <div className={styles.infoColumn}>
          {/* Email Info */}
          <div className={styles.infoSection}>
            <h2>Email</h2>
            <a href={`mailto:${contact.email}`} className={styles.emailLink}>
              {contact.email}
            </a>
          </div>

          {/* Studio Address Info */}
          <div className={styles.infoSection}>
            <h2>Lisbon Studio</h2>
            <p className={styles.addressText}>
              {contact.address.split('\n').map((line, index) => (
                <span key={index} style={{ display: 'block' }}>
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Social Coordinates Info */}
          <div className={styles.infoSection}>
            <h2>Social Coordinates</h2>
            <div className={styles.socialList}>
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  Instagram
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Message Submission Form */}
        <div className={styles.formCard}>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className={styles.formFields}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="e.g. john@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  placeholder="Describe your architectural project, ideas, or timeline..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-terracotta"
                style={{ alignSelf: 'flex-start', marginTop: '12px' }}
              >
                {isSubmitting ? (
                  <span className={styles.btnText}>
                    <span className={styles.spinner}></span>
                    SENDING...
                  </span>
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={`${styles.successTitle} serif-title`}>Message Sent</h2>
              <p className={styles.successText}>
                Obrigado pelo seu contacto, Manuel Cruchinho. A sua mensagem foi enviada com sucesso. Entraremos em contacto brevemente.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn-minimal"
                style={{ marginTop: '30px', fontSize: '0.75rem', padding: '10px 24px' }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
