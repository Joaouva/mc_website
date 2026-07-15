import Image from 'next/image';
import styles from './team.module.css';
import portfolioData from '@/data/portfolio.json';
import { TeamMember } from '@/data/types';
import { withBasePath } from '@/lib/basePath';

export const metadata = {
  title: 'Team',
  description: 'Meet the team behind MCA - Manuel Cruchinho Arquitectos, past and present.'
};

export default function TeamPage() {
  const { team } = portfolioData;

  return (
    <div className={`${styles.container} animate-slide-up`}>
      <div className="container">
        {/* Title block */}
        <div className={styles.titleBlock}>
          <p>Manuel Cruchinho Arquitectos</p>
          <h1 className="serif-title">The Team</h1>
        </div>

        {/* Team Grid */}
        <div className={styles.grid}>
          {team.map((member: TeamMember) => (
            <div key={member.slug} className={styles.card}>
              <div className={styles.imageOuterWrapper}>
                <div className={styles.imageInnerWrapper}>
                  <Image
                    src={withBasePath(member.photo)}
                    alt={member.name}
                    fill
                    className={`${styles.photo} ${!member.active ? styles.photoInactive : ''}`}
                    sizes="(max-width: 768px) 200px, 220px"
                  />
                </div>
              </div>

              <h3 className={styles.name}>{member.name}</h3>
              <p className={`${styles.role} ${!member.active ? styles.roleInactive : ''}`}>
                {member.role}
              </p>
              {!member.active && (
                <span className={styles.formerBadge}>Ex-Colaborador</span>
              )}
              <p className={styles.bio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
