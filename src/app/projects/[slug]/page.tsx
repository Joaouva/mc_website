import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './project-detail.module.css';
import portfolioData from '@/data/portfolio.json';
import { CATEGORY_LABELS } from '@/data/types';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return portfolioData.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find((item) => item.slug === slug);
  return { title: project?.title ?? 'Projeto não encontrado', description: project?.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioData.projects.find((item) => item.slug.toLowerCase() === slug.toLowerCase());

  if (!project) {
    return <div className={styles.notFoundWrapper}><h1>404</h1><Link href="/projects">Voltar aos projetos</Link></div>;
  }

  const [heroImage, ...detailImages] = project.images;

  return (
    <article className={styles.container}>
      <header className={styles.headerInfo}>
        <Link href="/projects" className={styles.backBtn}>← Projetos</Link>
        <p>{CATEGORY_LABELS[project.category] ?? project.category}</p>
        <h1 className={styles.title}>{project.title}</h1>
      </header>
      {heroImage && <div className={styles.imageCardFull}><Image src={heroImage} alt={project.title} fill priority sizes="100vw" className={styles.galleryImage} /></div>}
      <section className={styles.contentSplit}>
        <div className={styles.description}><p>{project.description}</p></div>
        <dl className={styles.sidebar}>
          <div><dt>Tipologia</dt><dd>{CATEGORY_LABELS[project.category] ?? project.category}</dd></div>
          <div><dt>Localização</dt><dd>{project.location}</dd></div>
          <div><dt>Ano</dt><dd>{project.year}</dd></div>
        </dl>
      </section>
      {detailImages.length > 0 && <section className={styles.detailImagesRow}>
        {detailImages.map((image, index) => <div className={styles.imageCardHalf} key={image}>
          <Image src={image} alt={`${project.title} — vista ${index + 2}`} fill sizes="(max-width: 768px) 100vw, 45vw" className={styles.galleryImage} />
        </div>)}
      </section>}
    </article>
  );
}
