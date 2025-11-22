import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = ({ onStart }) => {
    return (
        <section style={{
            position: 'relative',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '4rem 1rem',
            overflow: 'hidden'
        }}>
            {/* Responsive Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: -1
            }}>
                <picture>
                    <source media="(max-width: 768px)" srcSet="/banner_mobile.png" />
                    <img
                        src="/banner_desktop.png"
                        alt="Background"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.4)' // Darken for text readability
                        }}
                    />
                </picture>
            </div>

            <div className="container animate-fade-in">
                <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--color-primary)',
                    borderRadius: '50px',
                    color: 'var(--color-primary)',
                    fontSize: '0.9rem',
                    marginBottom: '2rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    Seleção Privada
                </span>

                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)', // Reduced min size for mobile
                    marginBottom: '1.5rem',
                    lineHeight: 1.2,
                    wordWrap: 'break-word'
                }}>
                    Acompanhamento em Grupo da <br />
                    <span className="text-gradient">Frequência da Alma</span>
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.1rem)', // Responsive body text
                    color: 'var(--color-text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    lineHeight: 1.6
                }}>
                    Se você já é aluna, este é o próximo passo natural da sua jornada.
                    A Andressa está formando um grupo pequeno e guiado de perto para mulheres que realmente estão prontas para destravar vida emocional, prosperidade e clareza espiritual usando os 40 mil neurônios do coração.
                </p>

                <button onClick={onStart} className="btn-primary">
                    INICIAR DIAGNÓSTICO
                </button>

                <div style={{ marginTop: '4rem', opacity: 0.5, animation: 'bounce 2s infinite' }}>
                    <ArrowDown size={32} color="var(--color-primary)" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
