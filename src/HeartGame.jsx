import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function HeartGame({ onComplete }) {
    const [hearts, setHearts] = useState([]);
    const [score, setScore] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const containerRef = useRef(null);
    const targetScore = 10;

    // Engendrar corazones
    useEffect(() => {
        if (gameWon) return;

        const spawnInterval = setInterval(() => {
            const id = Date.now();
            const startX = Math.random() * 90 + 5; // 5% to 95% width
            const speed = Math.random() * 3 + 4; // 4 to 7 seconds duration (mucho más lento)

            setHearts(prev => [
                ...prev,
                { id, x: startX, speed }
            ]);
        }, 1000); // Nuevo corazón cada 1s 

        return () => clearInterval(spawnInterval);
    }, [gameWon]);


    const handleHeartClick = (id) => {
        setHearts(prev => prev.filter(h => h.id !== id));
        setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= targetScore && !gameWon) {
                setGameWon(true);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                setTimeout(onComplete, 2000);
            }
            return newScore;
        });
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg overflow-hidden touches-none">

            {/* Instrucciones y Progreso */}
            <div className="absolute top-10 z-[60] w-full px-8 text-center">
                <h2 className="font-pacifico text-3xl text-primary mb-4 animate-bounce">
                    ¡Atrapa {targetScore} corazones!
                </h2>
                <div className="w-full max-w-md mx-auto bg-white/50 rounded-full h-6 border-2 border-primary/30 backdrop-blur-sm overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / targetScore) * 100}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                <p className="mt-2 text-text font-bold text-lg">{score} / {targetScore}</p>

                {/* Tutorial Cursor */}
                <motion.div
                    className="mt-4 flex flex-col items-center justify-center opacity-80"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 0.9, 1],
                            y: [0, 5, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="text-4xl filter drop-shadow-md">👆</span>
                    </motion.div>
                    <p className="text-sm text-primary font-bold mt-1">¡Tócalos!</p>
                </motion.div>
            </div>

            {/* Área de Juego */}
            <AnimatePresence>
                {hearts.map(heart => (
                    <motion.button
                        key={heart.id}
                        initial={{ top: -50, left: `${heart.x}%`, opacity: 0, scale: 0 }}
                        animate={{ top: '110%', opacity: 1, scale: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }} // Efecto al hacer click/desaparecer
                        transition={{
                            top: { duration: heart.speed, ease: "linear" },
                            default: { duration: 0.5 } // Opacity y scale rápidos
                        }}
                        className="absolute text-5xl cursor-pointer select-none filter drop-shadow-lg hover:scale-110 active:scale-90"
                        onClick={() => handleHeartClick(heart.id)}
                        onTouchStart={(e) => {
                            e.preventDefault();
                            handleHeartClick(heart.id);
                        }}
                    >
                        ❤️
                    </motion.button>
                ))}
            </AnimatePresence>
        </div>
    );
}
