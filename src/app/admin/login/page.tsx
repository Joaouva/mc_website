'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: signInError } = await createClient().auth.signInWithPassword({ email, password });

      if (signInError) {
        setError('Não foi possível iniciar sessão. Confirme o email e a palavra-passe.');
        return;
      }

      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Não foi possível iniciar sessão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.lockScreen}>
      <h1>MCA Studio</h1>
      {isSupabaseConfigured ? (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label className="form-label" htmlFor="password">Palavra-passe</label>
          <input className="form-input" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p className={styles.loginError}>{error}</p>}
          <button className="btn-minimal" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'A entrar…' : 'Entrar'}
          </button>
        </form>
      ) : (
        <p>Supabase ainda não está configurado. Adicione as variáveis de ambiente antes de ativar o acesso ao editor.</p>
      )}
    </main>
  );
}
