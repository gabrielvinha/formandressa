import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem'
        }}>
            <div className="container">
                <p>© 2025 Andressa Campos – Frequência da Alma. Página interna para alunas.</p>
            </div>
        </footer>
    );
};

export default Footer;
