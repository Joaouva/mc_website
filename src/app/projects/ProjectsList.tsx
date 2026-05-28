'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './projects.module.css';
import portfolioData from '@/data/portfolio.json';
import { Project, CATEGORY_LABELS } from '@/data/types';

export default function ProjectsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const { projects } = portfolioData;

  // Filter projects based on the active category
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      router.push('/projects');
    } else {
      router.push(`/projects?category=${category}`);
    }
  };

  const categories = [
    { key: 'all', label: 'ALL PROJECTS' },
    { key: 'residential', label: 'RESIDENTIAL' },
    { key: 'interior', label: 'INTERIOR | DESIGN' },
    { key: 'urban', label: 'URBAN | PUBLIC' }
  ];

  return (
    <div className="container">
      {/* Category Navigation Bar */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`${styles.filterBtn} ${
              activeCategory === cat.key ? styles.activeFilterBtn : ''
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid Display */}
      {filteredProjects.length > 0 ? (
        <div className={styles.grid}>
          {filteredProjects.map((project: Project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.info}>
                <div className={styles.meta}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <span className={styles.categoryLabel}>
                    {CATEGORY_LABELS[project.category] || project.category}
                  </span>
                </div>
                <span className={styles.yearLabel}>{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.noProjects}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
