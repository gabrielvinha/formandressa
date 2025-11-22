import React from 'react';
import { Heart, Lock, Zap } from 'lucide-react';

const Cards = () => {
    const cards = [
        {
            icon: <Heart size={32} color="var(--color-primary)" />,
            title: "Sua Frequência Atual",
            text: "Identifica quais padrões do coração e da alma ainda estão bloqueando sua prosperidade e paz."
        },
        {
            icon: <Lock size={32} color="var(--color-primary)" />,
            title: "O Ciclo Oculto da Escassez",
            text: "Mostra onde você está repetindo dores antigas, mesmo tentando mudar."
        },
        {
            icon: <Zap size={32} color="var(--color-primary)" />,
            title: "Seu Nível de Prontidão",
            text: "Avalia se você está pronta para ser guiada de perto no acompanhamento privado."
        }
    ];

    return (
        <section style={{ padding: '5rem 0', background: 'var(--color-bg)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>O que esse diagnóstico revela em você</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {cards.map((card, index) => (
                        <div key={index} className="glass-card" style={{
                            textAlign: 'center',
                            padding: '3rem 2rem',
                            transition: 'transform 0.3s ease'
                        }}>
                            <div style={{
                                background: 'rgba(212, 175, 55, 0.1)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                {card.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{card.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cards;
