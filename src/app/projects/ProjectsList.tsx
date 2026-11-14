import Image from 'next/image';
import Link from 'next/link';
import styles from './projects.module.css';
import portfolioData from '@/data/portfolio.json';
import { CATEGORY_LABELS } from '@/data/types';

export default function ProjectsList() {
  const { projects } = portfolioData;
  return (
    <section className={styles.projects}>
      <header className={styles.header}>
        <p>Projetos · {projects.length}</p>
        <h1>Uma coleção de lugares pensados a partir do contexto.</h1>
      </header>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Link
            href={`/projects/${project.slug}`}
            className={styles.project}
            key={project.slug}
            aria-label={`Ver ${project.title}`}
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 900px) 33vw, 25vw"
              className={styles.image}
              priority={index < 4}
            />
            <div className={styles.projectInfo}>
              <p>{project.title}</p>
              <span>{CATEGORY_LABELS[project.category] ?? project.category} · {project.location}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
