import Image from 'next/image';
import styles from './practice.module.css';
import portfolioData from '@/data/portfolio.json';

export const metadata = {
  title: 'About',
  description: 'Learn about Manuel Cruchinho (MCA), his training at IST, his extensive background at SalaSul, and his architectural principles.'
};

export default function PracticePage() {
  const { general } = portfolioData;

  // Segment bio array blocks: first block for highlight, next blocks for details
  const bioHighlight = general.bio[0];
  const bioBody = general.bio.slice(1);

  return (
    <div className={`${styles.container} container animate-slide-up`}>
      {/* 1. Profile section */}
      <section className={styles.profileSection}>
        {/* Profile Image with decorative halo background */}
        <div className={styles.imageOuterWrapper}>
          <div className={styles.watercolorHalo}></div>
          <div className={styles.imageInnerWrapper}>
            <Image
              src={general.profileImage}
              alt={general.name}
              fill
              className={styles.profileImage}
              sizes="(max-width: 768px) 320px, 320px"
              priority
            />
          </div>
        </div>

        {/* Biography texts */}
        <div className={styles.bioContent}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent-terracotta)', marginBottom: '-16px' }}>
            About the Architect
          </p>
          <h1 className="serif-title" style={{ fontSize: '3rem', color: 'var(--text-charcoal)' }}>
            Manuel Cruchinho
          </h1>
          
          {/* Highlighted core introductory text */}
          <p className={styles.bioHighlight}>
            {bioHighlight}
          </p>

          {/* Core biography body lines */}
          {bioBody.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 2. Professional Timeline History */}
      <section className={styles.timelineSection}>
        <h2 className="serif-title">Curriculum Vitae</h2>
        
        <div className={styles.timelineGrid}>
          <div className="timeline">
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3 className={styles.timelineTitle}>Fundou MCA — Manuel Cruchinho Arquitectos</h3>
              <p className={styles.timelinePeriod}>2022 — Present</p>
              <p className={styles.timelineDesc}>
                Estabelecimento de prática independente de arquitetura em Lisboa, com especial enfoque em habitação minimalista, reabilitação urbana e desenvolvimento de projetos orientados para a sustentabilidade ecológica.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3 className={styles.timelineTitle}>Arquiteto Coordenador — Atelier SalaSul</h3>
              <p className={styles.timelinePeriod}>2014 — 2022</p>
              <p className={styles.timelineDesc}>
                Liderança no desenvolvimento e coordenação de múltiplos projetos residenciais, turísticos e comerciais. Especialista na reabilitação de edifícios históricos e fiscalização técnica de obras.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3 className={styles.timelineTitle}>Mestrado Integrado em Arquitetura — Instituto Superior Técnico</h3>
              <p className={styles.timelinePeriod}>2009 — 2014</p>
              <p className={styles.timelineDesc}>
                Formação técnica, geométrica e teórica de alto nível. Dissertação focada em integração urbana histórica, finalizada com distinção.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
