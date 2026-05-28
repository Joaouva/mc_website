import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import portfolioData from '@/data/portfolio.json';

export const metadata: Metadata = {
  title: {
    default: `${portfolioData.general.name} | ${portfolioData.general.title}`,
    template: `%s | ${portfolioData.general.name}`
  },
  description: 'Portfolio of Manuel Cruchinho (MCA) - Minimalist Architecture, Sustainable Design, & Space Planning in Lisbon, Portugal.',
  keywords: ['Architecture', 'Manuel Cruchinho', 'Lisbon Architect', 'Minimalist Design', 'Sustainable Architecture', 'MCA', 'Interior Design'],
  authors: [{ name: 'Manuel Cruchinho' }],
  creator: 'Manuel Cruchinho',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="watercolor-bg">
        {/* Navigation Bar */}
        <Navbar />

        {/* Core Layout Main Wrapper */}
        <main className="main-content">
          {children}
        </main>

        {/* Minimalist Architectural Footer */}
        <footer style={{
          padding: '60px 0 40px 0',
          borderTop: '1px solid var(--border-light)',
          marginTop: '80px',
          backgroundColor: 'transparent'
        }}>
          <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            {/* Minimal Logo Monogram */}
            <div style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: 'var(--text-charcoal)',
              color: 'var(--bg-sand)',
              fontSize: '0.75rem',
              fontWeight: 400
            }}>
              MC
            </div>

            {/* Navigation links in footer */}
            <div style={{
              display: 'flex',
              gap: '24px',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              <a href="/projects" style={{ opacity: 0.6 }}>Projects</a>
              <a href="/practice" style={{ opacity: 0.6 }}>About Me</a>
              <a href="/contact" style={{ opacity: 0.6 }}>Contact</a>
              <a href="/admin" style={{ opacity: 0.6 }}>CMS</a>
            </div>

            {/* Copyright & Location */}
            <div style={{
              textAlign: 'center',
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
              color: 'var(--text-charcoal-muted)',
              lineHeight: '1.8'
            }}>
              <p>© {currentYear} {portfolioData.general.studioName}. All rights reserved.</p>
              <p style={{ marginTop: '4px', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Lisbon, Portugal
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
