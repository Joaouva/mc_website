'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './projects.module.css';
import portfolioData from '@/data/portfolio.json';
import { CATEGORY_LABELS, Project } from '@/data/types';

export default function ProjectsList() {
  const { projects } = portfolioData;
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '');
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  if (!activeProject) return null;

  const selectProject = (project: Project) => setActiveSlug(project.slug);

  return (
    <section className={styles.projects}>
      <header className={styles.header}>
        <p>Projetos</p>
        <h1>Uma coleção de lugares pensados a partir do contexto.</h1>
      </header>

      <div className={styles.layout}>
        <div className={styles.pills} aria-label="Selecionar projeto">
          {projects.map((project, index) => (
            <button
              className={`${styles.pill} ${project.slug === activeSlug ? styles.activePill : ''}`}
              key={project.slug}
              onClick={() => selectProject(project)}
              onMouseEnter={() => selectProject(project)}
              onFocus={() => selectProject(project)}
              aria-pressed={project.slug === activeSlug}
            >
              <span>0{index + 1}</span>{project.title}
            </button>
          ))}
        </div>

        <article className={styles.feature} key={activeProject.slug}>
          <Link href={`/projects/${activeProject.slug}`} className={styles.imageLink} aria-label={`Ver ${activeProject.title}`}>
            <Image src={activeProject.images[0]} alt={activeProject.title} fill priority sizes="(max-width: 768px) 100vw, 60vw" className={styles.featureImage} />
          </Link>
          <div className={styles.featureCopy}>
            <div><p>{CATEGORY_LABELS[activeProject.category] ?? activeProject.category}</p><p>{activeProject.location} · {activeProject.year}</p></div>
            <div><h2>{activeProject.title}</h2><p>{activeProject.description}</p><Link href={`/projects/${activeProject.slug}`} className={styles.detailLink}>Ver projeto <span>↘</span></Link></div>
          </div>
        </article>
      </div>
    </section>
  );
}
