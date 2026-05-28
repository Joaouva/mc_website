import { Suspense } from 'react';
import ProjectsList from './ProjectsList';
import styles from './projects.module.css';

export const metadata = {
  title: 'Works',
  description: 'Explore the architectural works of Manuel Cruchinho (MCA) - residential, interior, and urban public space portfolios.'
};

export default function ProjectsPage() {
  return (
    <div className={`${styles.projectsWrapper} animate-slide-up`}>
      {/* Title block */}
      <div className={styles.titleBlock}>
        <p>Architectural Portfolio</p>
        <h1 className="serif-title">Selected Works</h1>
      </div>

      {/* Projects list with clean React Suspense loading boundary */}
      <Suspense fallback={
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{
            display: 'inline-block',
            width: '30px',
            height: '30px',
            border: '2px solid var(--border-medium)',
            borderTopColor: 'var(--accent-terracotta)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: '20px', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-charcoal-muted)' }}>
            LOADING GALLERY...
          </p>
        </div>
      }>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
