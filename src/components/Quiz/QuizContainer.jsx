import React, { useState } from 'react';
import { questions } from './quizData';
import { supabase } from '../../lib/supabase';
import { ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizContainer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [formData, setFormData] = useState({ whatsapp: '', email: '' });

    const handleAnswer = (answer) => {
        setAnswers({ ...answers, [questions[currentStep].id]: answer });
        if (currentStep < questions.length) {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 300);
        }
    };

    const handleTextAnswer = (e) => {
        setAnswers({ ...answers, [questions[currentStep].id]: e.target.value });
    };

    const nextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitQuiz = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Map answers to the field names expected by Netlify
        const formattedAnswers = {};
        Object.keys(answers).forEach(key => {
            formattedAnswers[`question_${key}`] = answers[key];
        });

        const formDataToSubmit = {
            'form-name': 'leads',
            ...formattedAnswers,
            ...formData
        };

        const encode = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode(formDataToSubmit)
            });

            setIsCompleted(true);
        } catch (error) {
            console.error('Error submitting:', error);
            alert('Ocorreu um erro ao enviar. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = ((currentStep) / questions.length) * 100;

    if (isCompleted) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'var(--color-primary)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Check size={40} color="#000" />
                    </div>
                    <h2 style={{ marginBottom: '1rem' }}>Diagnóstico Enviado!</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Suas respostas foram recebidas com sucesso. <br />
                        A Andressa e a equipe irão analisar seu perfil e entrarão em contato caso você seja selecionada.
                    </p>
                </div>
            </div>
        );
    }

    if (currentStep === questions.length) {
        return (
            <section className="container" style={{ padding: '4rem 0' }}>
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Importante antes de enviar...</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                        Responder esse questionário não garante sua vaga. <br />
                        A Andressa e a equipe vão analisar cada perfil com atenção e só vão chamar as pessoas certas para esse acompanhamento privado em grupo.
                        Se o seu momento for o ideal, você será contatada diretamente.
                    </p>

                    <form onSubmit={submitQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>WhatsApp (com DDD)</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                required
                                placeholder="(00) 00000-0000"
                                value={formData.whatsapp}
                                onChange={handleFormChange}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>E-mail principal</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={handleFormChange}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem'
                                }}
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ marginTop: '1rem' }}>
                            {isSubmitting ? 'ENVIANDO...' : 'ENVIAR DIAGNÓSTICO PARA ANÁLISE'}
                        </button>
                        <p style={{ fontSize: '0.8rem', textAlign: 'center', opacity: 0.7 }}>
                            Se você for selecionada, a Andressa entra em contato pessoalmente.
                        </p>
                    </form>
                </div>
            </section>
        );
    }

    const currentQuestion = questions[currentStep];

    return (
        <section className="container" style={{ padding: '4rem 0', minHeight: '800px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    <span>Questão {currentStep + 1} de {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '2px', transition: 'width 0.5s ease' }}></div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                maxWidth: '1000px',
                margin: '0 auto'
            }} className="quiz-layout">

                <motion.div
                    key={`img-${currentStep}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="quiz-image-container"
                >
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(157, 78, 221, 0.2)',
                        aspectRatio: '3/4'
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(15, 5, 24, 0.8))'
                        }}></div>
                        <img
                            src={currentQuestion.image}
                            alt="Question Context"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    key={`q-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)', // Responsive font size
                        marginBottom: '2rem',
                        lineHeight: 1.2
                    }}>
                        {currentQuestion.question}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {currentQuestion.options && currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                style={{
                                    padding: 'clamp(1rem, 2vw, 1.2rem)', // Responsive padding
                                    textAlign: 'left',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', // Responsive font size
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    lineHeight: 1.4
                                }}
                                className="quiz-option"
                            >
                                {option}
                                <ChevronRight size={20} style={{ opacity: 0.5, flexShrink: 0, marginLeft: '10px' }} />
                            </button>
                        ))}

                        {currentQuestion.type === 'scale' && (
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {[...Array(11)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        style={{
                                            width: '50px', height: '50px',
                                            borderRadius: '50%',
                                            border: '1px solid var(--color-primary)',
                                            background: 'transparent',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '1.1rem'
                                        }}
                                        className="scale-btn"
                                    >
                                        {i}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === 'text' && (
                            <div>
                                <textarea
                                    rows={5}
                                    onChange={handleTextAnswer}
                                    value={answers[currentQuestion.id] || ''}
                                    placeholder="Escreva aqui..."
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1.1rem', marginBottom: '1rem'
                                    }}
                                />
                                <button onClick={nextStep} className="btn-primary" style={{ width: '100%' }}>
                                    Continuar
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .quiz-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .quiz-image-container {
            display: block !important; /* Show image on mobile */
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
          .quiz-image-container > div {
            aspect-ratio: 16/9 !important; /* Shorter aspect ratio for mobile to save space */
            box-shadow: 0 0 20px rgba(157, 78, 221, 0.2) !important;
          }
        }
        .quiz-option:hover {
          background: rgba(212, 175, 55, 0.1) !important;
          border-color: var(--color-primary) !important;
          transform: translateX(5px);
        }
        .scale-btn:hover {
          background: var(--color-primary) !important;
          color: #000 !important;
        }
      `}</style>
        </section>
    );
};

export default QuizContainer;
