'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import portfolioData from '@/data/portfolio.json';

const introImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&auto=format&fit=crop&q=85';

export default function HomeExperience() {
  const [hasEntered, setHasEntered] = useState(false);
  const { general, projects } = portfolioData;

  useEffect(() => {
    const timer = window.setTimeout(() => setHasEntered(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={styles.experience}>
      <section className={`${styles.intro} ${hasEntered ? styles.introComplete : ''}`} aria-hidden={hasEntered}>
        <div className={styles.introModel}>
          <div className={`${styles.wireBlock} ${styles.wireBlockOne}`} />
          <div className={`${styles.wireBlock} ${styles.wireBlockTwo}`} />
          <div className={`${styles.wireBlock} ${styles.wireBlockThree}`} />
          <div className={styles.wireGround} />
        </div>
        <p className={styles.introMark}>MCA</p>
        <p className={styles.introCaption}>Um estudo em espaço, luz e matéria</p>
        <button className={styles.enterButton} onClick={() => setHasEntered(true)}>Entrar</button>
      </section>

      <div className={`${styles.home} ${hasEntered ? styles.homeVisible : ''}`}>
        <section className={styles.hero}>
          <Image src={introImage} alt="Arquitetura residencial contemporânea" fill priority sizes="100vw" className={styles.heroImage} />
          <div className={styles.heroCaption}>
            <p>MCA — Manuel Cruchinho Arquitectos</p>
            <h1>Espaços para habitar com clareza.</h1>
            <Link href="/projects" className={styles.textLink}>Ver projetos <span>↘</span></Link>
          </div>
        </section>

        <section className={styles.statement}>
          <p className={styles.kicker}>O atelier</p>
          <div>
            <h2>Cada projeto começa por escutar: o lugar, a matéria e a forma de viver de quem o vai habitar.</h2>
            <p>{general.bio[0]}</p>
            <Link href="/practice" className={styles.textLink}>Conhecer o atelier <span>↘</span></Link>
          </div>
        </section>

        <section className={styles.selected}>
          <div className={styles.sectionHeading}><p>Projetos selecionados</p><Link href="/projects">Todos os projetos <span>↘</span></Link></div>
          <div className={styles.projectPair}>
            {projects.slice(0, 2).map((project, index) => (
              <Link href={`/projects/${project.slug}`} className={`${styles.project} ${index === 1 ? styles.projectOffset : ''}`} key={project.slug}>
                <div className={styles.projectImage}><Image src={project.images[0]} alt={project.title} fill sizes="(max-width: 768px) 100vw, 45vw" /></div>
                <div className={styles.projectMeta}><span>{project.title}</span><span>{project.location}, {project.year}</span></div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
