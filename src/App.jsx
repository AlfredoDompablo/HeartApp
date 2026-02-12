import { useState } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import FloatingButton from './FloatingButton'
import HeartGame from './HeartGame'
import RelationshipTimer from './RelationshipTimer'

const PHRASES = [
  " ",
  "Poque no?",
  "Eso es una grosería",
  "¿Me odias?",
  "¿Me dices que sí?",
];

function App() {
  const [yesPressed, setYesPressed] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  const handleHeartExplosion = () => {
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
    });

    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.8 },
      shapes: [heart],
      colors: ['#ff4d6d', '#ff8fa3', '#c9184a'],
      scalar: 2
    });
  }

  const handleYesClick = () => {
    setYesPressed(true)
    // ... confetti logic remains same ...
    // Confetti explosion origin from center
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff8fa3', '#ffffff', '#c9184a']
    });

    // Side canons
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff4d6d', '#ff8fa3'] });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff4d6d', '#ff8fa3'] });
    }, 250);

    // Continuous rain
    const duration = 3000;
    const end = Date.now() + duration;

    // Simple helper for animation frame
    const animateConfetti = () => {
      if (Date.now() > end) return;
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff4d6d', '#ff8fa3'] });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff4d6d', '#ff8fa3'] });
      requestAnimationFrame(animateConfetti);
    };
    animateConfetti();
  }

  if (!gameCompleted) {
    return <HeartGame onComplete={() => setGameCompleted(true)} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg overflow-hidden relative selection:bg-primary selection:text-white font-quicksand">

      {/* Background Heart Animation using CSS classes defined in index.css and tailwind config */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] -z-10 rounded-full animate-heartbeat pointer-events-none heart-bg"></div>

      {/* Main Glass Card */}
      <div
        className="relative z-10 p-8 md:p-12 glass rounded-[2rem] max-w-[90%] w-[500px] text-center mx-4 animate-fade-in"
      >

        {yesPressed ? (
          <div className="mt-8">
            <h1 className="font-pacifico text-4xl md:text-5xl text-primary mb-6 leading-tight">
              ¡Me haces la persona más feliz del mundo!
            </h1>
            <p className="text-2xl text-text font-bold mt-4">Te amo muchísimo ❤️</p>
            <img
              src="/cat_inlove.gif"
              alt="Gatos enamorados"
              className="w-48 h-48 object-cover rounded-xl shadow-lg mx-auto my-6 border-4 border-white/50"
            />
            <RelationshipTimer />
            <button
              onClick={handleHeartExplosion}
              className="mt-8 px-6 py-2 bg-white/80 text-primary font-bold rounded-full shadow-md hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
            >
              🎉 ¡Celebrar con Amor! 🎉
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-6">
              <img
                src="/nailong.jpg"
                alt="Nailong esperando respuesta"
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg animate-bounce-slow"
              />
            </div>
            <h1 className="font-pacifico text-4xl md:text-5xl text-primary mb-6 leading-tight animate-bounce-slow">
              ¿Quieres ser mi San Valentín?
            </h1>
            <p className="text-xl mb-10 text-text font-medium">
              Prometo hacerte muy feliz ❤️
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8 min-h-[160px] md:min-h-[60px]">
              <button
                onClick={handleYesClick}
                className="px-8 py-3 text-lg border-none rounded-full cursor-pointer transition-all duration-300 font-bold bg-primary text-white shadow-lg hover:scale-110 hover:bg-[#ff2a55] hover:shadow-xl w-full md:w-auto min-w-[180px] whitespace-nowrap z-50 transform hover:-translate-y-1"
              >
                ¡Sí, claro que sí!
              </button>

              <div className="relative w-full md:w-auto min-w-[240px] h-[50px]">
                <FloatingButton
                  className="absolute inset-0 w-full h-full flex items-center justify-center px-4 py-3 text-[10px] md:text-[13px] leading-tight rounded-full font-bold bg-[#f8f9fa] text-text border-2 border-secondary hover:bg-white shadow-sm"
                  phrases={PHRASES}
                  onTransformToYes={handleYesClick}
                >
                  Claro que no, ¿que ganaria con eso?
                </FloatingButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
