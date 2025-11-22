import React, { useState } from 'react';
import Hero from './components/Hero';
import Cards from './components/Cards';
import Bio from './components/Bio';
import QuizContainer from './components/Quiz/QuizContainer';
import Footer from './components/Footer';
import './index.css';

function App() {
    const scrollToQuiz = () => {
        const quizElement = document.getElementById('quiz-section');
        if (quizElement) {
            quizElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app-container">
            <Hero onStart={scrollToQuiz} />
            <Cards />

            {/* CTA Strip */}
            <section className="cta-strip" style={{
                background: 'linear-gradient(90deg, #1a0b2e 0%, #2d1b4e 100%)',
                padding: '4rem 0',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div className="container">
                    <h2 style={{ marginBottom: '1rem' }}>Esse diagnóstico é analisado pessoalmente pela Andressa e equipe.</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Responda com calma. Cada resposta conta.</p>
                    <button onClick={scrollToQuiz} className="btn-primary">QUERO RESPONDER AGORA</button>
                </div>
            </section>

            <Bio />

            <div id="quiz-section">
                <QuizContainer />
            </div>

            <Footer />
        </div>
    );
}

export default App;
