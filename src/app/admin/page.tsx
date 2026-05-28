'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import portfolioData from '@/data/portfolio.json';
import { PortfolioData, Project, GeneralInfo, ContactInfo } from '@/data/types';

export default function AdminPage() {
  // 1. Passphrase Barrier State
  const [passphrase, setPassphrase] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // 2. CMS Working Data State (Loaded from JSON)
  const [data, setData] = useState<PortfolioData>({
    general: { name: '', title: '', studioName: '', logoUrl: '', profileImage: '', bio: [] },
    contact: { email: '', phone: '', address: '', instagram: '', linkedin: '' },
    projects: []
  });

  // 3. UI Active States
  const [activeTab, setActiveTab] = useState<'general' | 'bio' | 'projects'>('general');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(true);

  // Load the initial static data on client mounting
  useEffect(() => {
    setData(portfolioData as PortfolioData);
    
    // Check if running on local development port
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      setIsLocalMode(isLocal);
    }
  }, []);

  // Simple, elegant passphrase validation check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default security key (simple, zero-cost developer gate)
    if (passphrase === 'arquitetura' || passphrase === 'mcaStudio') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorreto. Por favor tente novamente.');
    }
  };

  // General & Contact inputs handlers
  const handleGeneralChange = (key: keyof GeneralInfo, value: string) => {
    setData(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [key]: value
      }
    }));
  };

  const handleContactChange = (key: keyof ContactInfo, value: string) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value
      }
    }));
  };

  // Biography line updates
  const handleBioLineChange = (index: number, value: string) => {
    setData(prev => {
      const updatedBio = [...prev.general.bio];
      updatedBio[index] = value;
      return {
        ...prev,
        general: { ...prev.general, bio: updatedBio }
      };
    });
  };

  const addBioLine = () => {
    setData(prev => ({
      ...prev,
      general: {
        ...prev.general,
        bio: [...prev.general.bio, 'Novo parágrafo de biografia...']
      }
    }));
  };

  const removeBioLine = (index: number) => {
    setData(prev => {
      const updatedBio = prev.general.bio.filter((_, idx) => idx !== index);
      return {
        ...prev,
        general: { ...prev.general, bio: updatedBio }
      };
    });
  };

  // Selected Project fields updates
  const handleProjectFieldChange = (index: number, key: keyof Project, value: any) => {
    setData(prev => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [key]: value
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const handleTagsChange = (index: number, tagsString: string) => {
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    handleProjectFieldChange(index, 'tags', tagsArray);
  };

  // Manage Selected Project Image list URLs
  const handleProjectImageUrlChange = (projIndex: number, imgIndex: number, url: string) => {
    setData(prev => {
      const updatedProjects = [...prev.projects];
      const updatedImages = [...updatedProjects[projIndex].images];
      updatedImages[imgIndex] = url;
      updatedProjects[projIndex] = {
        ...updatedProjects[projIndex],
        images: updatedImages
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const addProjectImageField = (projIndex: number) => {
    setData(prev => {
      const updatedProjects = [...prev.projects];
      updatedProjects[projIndex] = {
        ...updatedProjects[projIndex],
        images: [...updatedProjects[projIndex].images, 'https://images.unsplash.com/...']
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const removeProjectImageField = (projIndex: number, imgIndex: number) => {
    setData(prev => {
      const updatedProjects = [...prev.projects];
      const updatedImages = updatedProjects[projIndex].images.filter((_, idx) => idx !== imgIndex);
      updatedProjects[projIndex] = {
        ...updatedProjects[projIndex],
        images: updatedImages
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  // Add, Delete, Reorder Projects
  const createNewProject = () => {
    const newSlug = `new-project-${Date.now()}`;
    const newProj: Project = {
      slug: newSlug,
      title: 'New Project Title',
      category: 'residential',
      year: new Date().getFullYear().toString(),
      location: 'Portugal',
      description: 'Describe the project details...',
      tags: ['Residential', 'Minimalist'],
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200']
    };

    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
    setSelectedProjectIndex(data.projects.length);
  };

  const deleteProject = (index: number) => {
    if (!window.confirm('Tem a certeza que deseja eliminar este projeto?')) return;
    setData(prev => {
      const updated = prev.projects.filter((_, idx) => idx !== index);
      return { ...prev, projects: updated };
    });
    setSelectedProjectIndex(0);
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === data.projects.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    setData(prev => {
      const reordered = [...prev.projects];
      const temp = reordered[index];
      reordered[index] = reordered[targetIndex];
      reordered[targetIndex] = temp;
      return { ...prev, projects: reordered };
    });
    setSelectedProjectIndex(targetIndex);
  };

  // Write changes back to server file (Development only)
  const saveToDisk = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      
      setSaveStatus(result);
      if (res.ok) {
        setShowSuccessModal(true);
      }
    } catch (e: any) {
      setSaveStatus({
        success: false,
        message: `Network Error: Failed to contact CMS API. ${e.message || e}`
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Export JSON download utility for production environments
  const exportJsonConfig = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'portfolio.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Passphrase Barrier lock screen UI
  if (!isAuthenticated) {
    return (
      <div className={`${styles.lockScreen} animate-slide-up`}>
        <div style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-terracotta)',
          color: 'white',
          fontSize: '1rem',
          margin: '0 auto 20px auto'
        }}>
          🔒
        </div>
        <h1>MCA Studio CMS</h1>
        <p>Introduza a palavra-passe para aceder ao editor visual.</p>
        
        <form onSubmit={handleLogin} className="form-fields" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <input
              type="password"
              required
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="form-input"
              placeholder="Palavra-passe (ex: arquitetura)"
              style={{ textAlign: 'center' }}
            />
          </div>
          {loginError && (
            <p style={{ color: 'var(--accent-terracotta)', fontSize: '0.75rem', marginTop: '-8px' }}>
              {loginError}
            </p>
          )}
          <button type="submit" className="btn-terracotta" style={{ width: '100%' }}>
            Aceder ao Editor
          </button>
        </form>
      </div>
    );
  }

  const selectedProject = data.projects[selectedProjectIndex];

  return (
    <div className={`${styles.container} container animate-slide-up`}>
      {/* Dynamic Success overlay message notification */}
      {showSuccessModal && (
        <div className={styles.successOverlay} onClick={() => setShowSuccessModal(false)}>
          <div className={styles.successModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.successModalIcon}>✓</div>
            <h2 className="serif-title">Alterações Guardadas!</h2>
            <p>
              {isLocalMode
                ? 'Os seus dados foram escritos diretamente no ficheiro "src/data/portfolio.json". As alterações estão guardadas no código e prontas a serem publicadas no git!'
                : 'As alterações foram efetuadas no seu browser. Como o servidor está em modo de produção (read-only), deve descarregar o ficheiro configurado e substituir "src/data/portfolio.json" na pasta do seu projeto.'}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {!isLocalMode && (
                <button onClick={exportJsonConfig} className="btn-terracotta" style={{ fontSize: '0.8rem' }}>
                  Descarregar portfolio.json
                </button>
              )}
              <button onClick={() => setShowSuccessModal(false)} className="btn-minimal" style={{ fontSize: '0.8rem' }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main CMS Header */}
      <header className={styles.dashboardHeader}>
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--accent-terracotta)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Manuel Cruchinho Arquitectos
          </p>
          <h1>Content Management Studio</h1>
        </div>

        <div className={styles.headerActions}>
          <button onClick={exportJsonConfig} className="btn-minimal" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
            Export JSON
          </button>
          <button
            onClick={saveToDisk}
            disabled={isSaving}
            className="btn-terracotta"
            style={{ fontSize: '0.8rem', padding: '10px 24px' }}
          >
            {isSaving ? 'A GUARDAR...' : 'GUARDAR ALTERAÇÕES'}
          </button>
        </div>
      </header>

      {/* Read-only warning info block in production environments */}
      {!isLocalMode && (
        <div className={styles.alertInfo}>
          <span>
            ⚠️ <strong>Modo de Produção Activo:</strong> O salvamento direto no disco está bloqueado neste servidor remoto. Descarregue o ficheiro editado usando "Export JSON" para atualizar o projeto.
          </span>
          <button onClick={exportJsonConfig} className="btn-minimal" style={{ borderColor: 'var(--accent-terracotta)', color: 'var(--accent-terracotta)', padding: '6px 14px', fontSize: '0.7rem' }}>
            Download JSON
          </button>
        </div>
      )}

      {/* Tab Navigation buttons */}
      <nav className={styles.tabsBar}>
        <button
          onClick={() => setActiveTab('general')}
          className={`${styles.tabBtn} ${activeTab === 'general' ? styles.activeTabBtn : ''}`}
        >
          General & Contact
        </button>
        <button
          onClick={() => setActiveTab('bio')}
          className={`${styles.tabBtn} ${activeTab === 'bio' ? styles.activeTabBtn : ''}`}
        >
          Biography Details
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.activeTabBtn : ''}`}
        >
          Projects Portfolio
        </button>
      </nav>

      {/* 1. GENERAL & CONTACT INFO TAB PANEL */}
      {activeTab === 'general' && (
        <div className={styles.editorGrid}>
          <div className={styles.formCard}>
            <h2 className="serif-title" style={{ fontSize: '1.25rem', marginBottom: '24px', color: 'var(--text-charcoal)' }}>
              General Information
            </h2>
            
            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label">Architect Name</label>
                <input
                  type="text"
                  value={data.general.name}
                  onChange={(e) => handleGeneralChange('name', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Professional Title</label>
                <input
                  type="text"
                  value={data.general.title}
                  onChange={(e) => handleGeneralChange('title', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label">Studio Trademark</label>
                <input
                  type="text"
                  value={data.general.studioName}
                  onChange={(e) => handleGeneralChange('studioName', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Profile Image URL</label>
                <input
                  type="text"
                  value={data.general.profileImage}
                  onChange={(e) => handleGeneralChange('profileImage', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <h2 className="serif-title" style={{ fontSize: '1.25rem', marginBottom: '24px', color: 'var(--text-charcoal)' }}>
              Contact coordinates
            </h2>

            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  value={data.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Studio Telephone</label>
                <input
                  type="text"
                  value={data.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className="form-group">
                <label className="form-label">Instagram Link</label>
                <input
                  type="text"
                  value={data.contact.instagram}
                  onChange={(e) => handleContactChange('instagram', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn Link</label>
                <input
                  type="text"
                  value={data.contact.linkedin}
                  onChange={(e) => handleContactChange('linkedin', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '10px' }}>
              <label className="form-label">Studio Address</label>
              <textarea
                value={data.contact.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                className="form-textarea"
                style={{ minHeight: '80px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. BIOGRAPHY PARAGRAPHS TAB PANEL */}
      {activeTab === 'bio' && (
        <div className={styles.formCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="serif-title" style={{ fontSize: '1.25rem', color: 'var(--text-charcoal)' }}>
              Biography Paragraphs
            </h2>
            <button onClick={addBioLine} className={styles.addBtn}>
              + Adicionar Parágrafo
            </button>
          </div>

          <div className={styles.bioList}>
            {data.general.bio.map((paragraph, index) => (
              <div key={index} className={styles.bioItem}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-sand-darker)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  marginTop: '10px'
                }}>
                  {index + 1}
                </div>
                <textarea
                  value={paragraph}
                  onChange={(e) => handleBioLineChange(index, e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '85px', flex: 1 }}
                />
                <button
                  onClick={() => removeBioLine(index)}
                  className={styles.removeBtn}
                  title="Eliminar parágrafo"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {data.general.bio.length === 0 && (
            <p style={{ color: 'var(--text-charcoal-muted)', textAlign: 'center', padding: '40px' }}>
              Sem parágrafos de biografia definidos. Clique em adicionar para criar um.
            </p>
          )}
        </div>
      )}

      {/* 3. PROJECTS LIST TAB PANEL */}
      {activeTab === 'projects' && (
        <div className={styles.projectManagerGrid}>
          {/* Projects sidebar selector list */}
          <aside className={styles.projectSidebar}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className={styles.sidebarTitle}>Projetos</span>
              <button onClick={createNewProject} className="btn-minimal" style={{ padding: '4px 10px', fontSize: '0.65rem' }}>
                + Novo
              </button>
            </div>

            <div className={styles.projectList}>
              {data.projects.map((project, index) => (
                <div key={project.slug} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <button
                    onClick={() => setSelectedProjectIndex(index)}
                    className={`${styles.projectItemBtn} ${
                      selectedProjectIndex === index ? styles.activeProjectItemBtn : ''
                    }`}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {project.title || 'Untitled'}
                    </span>
                  </button>
                  <div className={styles.projectOrderControls}>
                    <button onClick={() => moveProject(index, 'up')} className={styles.orderBtn} title="Subir">▲</button>
                    <button onClick={() => moveProject(index, 'down')} className={styles.orderBtn} title="Descer">▼</button>
                  </div>
                </div>
              ))}
            </div>

            {data.projects.length === 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-charcoal-muted)', textAlign: 'center', padding: '20px 0' }}>
                Sem projetos na lista.
              </p>
            )}
          </aside>

          {/* Form details editor for selected project */}
          {selectedProject ? (
            <div className={styles.formCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                <h2 className="serif-title" style={{ fontSize: '1.25rem', color: 'var(--text-charcoal)' }}>
                  Detalhes do Projeto: <span style={{ color: 'var(--accent-terracotta)' }}>{selectedProject.title}</span>
                </h2>
                <button
                  onClick={() => deleteProject(selectedProjectIndex)}
                  className="btn-minimal"
                  style={{
                    borderColor: 'var(--accent-terracotta)',
                    color: 'var(--accent-terracotta)',
                    padding: '6px 14px',
                    fontSize: '0.7rem'
                  }}
                >
                  Eliminar Projeto
                </button>
              </div>

              <div className={styles.formRow}>
                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    value={selectedProject.title}
                    onChange={(e) => handleProjectFieldChange(selectedProjectIndex, 'title', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL Slug Identifier (lowercase, no spaces)</label>
                  <input
                    type="text"
                    value={selectedProject.slug}
                    onChange={(e) => handleProjectFieldChange(selectedProjectIndex, 'slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="form-input"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className="form-group">
                  <label className="form-label">Project Category</label>
                  <select
                    value={selectedProject.category}
                    onChange={(e) => handleProjectFieldChange(selectedProjectIndex, 'category', e.target.value)}
                    className="form-input"
                    style={{ background: 'var(--bg-sand-lighter)' }}
                  >
                    <option value="residential">Residential</option>
                    <option value="interior">Interior | Design</option>
                    <option value="urban">Urban | Public Space</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className={styles.formRow} style={{ margin: 0 }}>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        value={selectedProject.year}
                        onChange={(e) => handleProjectFieldChange(selectedProjectIndex, 'year', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        value={selectedProject.location}
                        onChange={(e) => handleProjectFieldChange(selectedProjectIndex, 'location', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Keywords / Tags (comma-separated list)</label>
                <input
                  type="text"
                  value={selectedProject.tags.join(', ')}
                  onChange={(e) => handleTagsChange(selectedProjectIndex, e.target.value)}
                  className="form-input"
                  placeholder="ex: Residential, Minimalist, Sustainable"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label">Project Description</label>
                <textarea
                  value={selectedProject.description}
                  onChange={(e) => handleProjectFieldChange(selectedProjectIndex, 'description', e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Dynamic Project image URLs manager */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Image Portfolio Links</label>
                  <button
                    onClick={() => addProjectImageField(selectedProjectIndex)}
                    className="btn-minimal"
                    style={{ padding: '4px 10px', fontSize: '0.65rem' }}
                  >
                    + Adicionar Imagem
                  </button>
                </div>

                <div className={styles.imagesList}>
                  {selectedProject.images.map((url, imgIndex) => (
                    <div key={imgIndex} className={styles.imageItem}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-charcoal-muted)', width: '60px' }}>
                        Image {imgIndex + 1}:
                      </span>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleProjectImageUrlChange(selectedProjectIndex, imgIndex, e.target.value)}
                        className="form-input"
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={() => removeProjectImageField(selectedProjectIndex, imgIndex)}
                        className={styles.removeBtn}
                        title="Remover Imagem"
                        disabled={selectedProject.images.length <= 1} /* Keep at least one image */
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.formCard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
              <p style={{ color: 'var(--text-charcoal-muted)' }}>Escolha um projeto na barra lateral para começar a editar.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
