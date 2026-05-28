import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import portfolioData from '@/data/portfolio.json';
import { Project } from '@/data/types';

export default function Home() {
  const { general, projects } = portfolioData;
  
  // Pick the first two projects as featured projects on the homepage
  const featuredProjects: Project[] = projects.slice(0, 2);

  return (
    <div className="animate-slide-up">
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
            alt="Minimalist Architectural Concrete House"
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>MCA — {general.name}</p>
          <h1 className={`${styles.heroTitle} serif-title`}>
            Silence is the ultimate luxury in architecture.
          </h1>
          <Link href="/projects" className="btn-minimal" style={{ borderColor: 'white', color: 'white', marginTop: '16px' }}>
            Explore Projects
          </Link>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className={styles.introSection}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <p>Minimalism & Purpose</p>
              <h2 className="serif-title" style={{ marginTop: '16px' }}>
                Criamos espaços que expressam identidade, respeitam o ambiente e inspiram serenidade.
              </h2>
            </div>
            <div className={styles.introRight}>
              <p>
                {general.bio[0]} {general.bio[4]}
              </p>
              <div className={styles.introButtons}>
                <Link href="/practice" className="btn-minimal">
                  About Me
                </Link>
                <Link href="/contact" className="btn-minimal" style={{ borderColor: 'var(--accent-terracotta)', color: 'var(--accent-terracotta)' }}>
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Gallery */}
      <section style={{ padding: '40px 0 100px 0' }}>
        <div className="container">
          <div className={styles.featuredHeader}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-terracotta)', marginBottom: '8px' }}>
                Portfolio Highlight
              </p>
              <h2 className="serif-title" style={{ fontSize: '2.2rem' }}>Featured Works</h2>
            </div>
            <Link href="/projects" className="navLink" style={{ fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              View All Projects →
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectCard}>
                <div className={styles.projectImageWrapper}>
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className={styles.projectImage}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={styles.projectOverlay}></div>
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <span className={styles.projectCategory}>{project.category}</span>
                  </div>
                  <span className={styles.projectYear}>{project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Architectural Values / Philosophy */}
      <section className={styles.philosophySection}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent-terracotta)', marginBottom: '12px' }}>
            Our Pillars
          </p>
          <h2 className="serif-title" style={{ fontSize: '2.2rem' }}>Design Philosophy</h2>
          
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyItem}>
              <div className={styles.philosophyNumber}>I</div>
              <h3>Identidade</h3>
              <p>
                Cada projeto arquitetónico deve ser um espelho da alma, refletindo fielmente a identidade, rotinas e necessidades únicas de cada habitante.
              </p>
            </div>

            <div className={styles.philosophyItem}>
              <div className={styles.philosophyNumber}>II</div>
              <h3>Sustentabilidade</h3>
              <p>
                Projetar com o amanhã em mente. Adotamos materiais ecológicos, técnicas bioclimáticas e design circular para construir um futuro sustentável.
              </p>
            </div>

            <div className={styles.philosophyItem}>
              <div className={styles.philosophyNumber}>III</div>
              <h3>Luz e Espaço</h3>
              <p>
                A luz natural é o elemento estruturante primordial. Desenhamos volumes geométricos que celebram a entrada de sol e enquadram paisagens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
