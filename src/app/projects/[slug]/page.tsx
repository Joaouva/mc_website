import Link from 'next/link';
import Image from 'next/image';
import styles from './project-detail.module.css';
import portfolioData from '@/data/portfolio.json';
import { Project, CATEGORY_LABELS } from '@/data/types';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate Static Parameters for compile-time static HTML export
export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug
  }));
}

// Generate Dynamic Metadata for prime SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found'
    };
  }

  return {
    title: project.title,
    description: project.description
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Find project in our JSON content store
  const project: Project | undefined = portfolioData.projects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return (
      <div className={`${styles.notFoundWrapper} container animate-slide-up`}>
        <h1 className="serif-title">404</h1>
        <p style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-charcoal-muted)', marginBottom: '40px' }}>
          Project Not Found
        </p>
        <Link href="/projects" className="btn-minimal">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Segment images: first image is the hero, others are detail images
  const heroImage = project.images[0];
  const detailImages = project.images.slice(1);

  return (
    <div className={`${styles.container} container animate-slide-up`}>
      {/* Back button */}
      <Link href="/projects" className={styles.backBtn}>
        ← Back to Projects
      </Link>

      {/* Header section */}
      <header className={styles.headerInfo}>
        <h1 className={`${styles.title} serif-title`}>{project.title}</h1>
        <div className={styles.metaRow}>
          <span>{project.year}</span>
          <span className={styles.metaSeparator}>•</span>
          <span>{project.location}</span>
        </div>
      </header>

      {/* Two-column Content split */}
      <section className={styles.contentSplit}>
        {/* Main description */}
        <div className={styles.description}>
          <p>{project.description}</p>
        </div>

        {/* Details Sidebar panel */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3>Category</h3>
            <span className={styles.sidebarValue}>
              {CATEGORY_LABELS[project.category] || project.category}
            </span>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Location</h3>
            <span className={styles.sidebarValue}>{project.location}</span>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Year</h3>
            <span className={styles.sidebarValue}>{project.year}</span>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3>Keywords</h3>
              <div className={styles.tagList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tagItem}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      {/* Visual Image Gallery */}
      <section>
        <h2 className={`${styles.galleryTitle} serif-title`}>Gallery</h2>
        
        <div className={styles.galleryGrid}>
          {/* Main Hero Shot */}
          {heroImage && (
            <div className={styles.imageCardFull}>
              <Image
                src={heroImage}
                alt={`${project.title} - Featured View`}
                fill
                className={styles.galleryImage}
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* Grid detailing supplementary shots (grouped in pairs) */}
          {detailImages.length > 0 && (
            <div className={styles.detailImagesRow}>
              {detailImages.map((img, index) => (
                <div key={index} className={styles.imageCardHalf}>
                  <Image
                    src={img}
                    alt={`${project.title} - View ${index + 2}`}
                    fill
                    className={styles.galleryImage}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
