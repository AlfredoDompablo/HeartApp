import { useState } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import FloatingButton from './FloatingButton'

function App() {
  const [yesPressed, setYesPressed] = useState(false)

  const handleYesClick = () => {
    setYesPressed(true)

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg overflow-hidden relative selection:bg-primary selection:text-white font-quicksand">

      {/* Background Heart Animation using CSS classes defined in index.css and tailwind config */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] -z-10 rounded-full animate-heartbeat pointer-events-none heart-bg"></div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-8 md:p-12 glass rounded-[2rem] max-w-[90%] w-[500px] text-center mx-4"
      >

        {yesPressed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-pacifico text-4xl md:text-5xl text-primary mb-6 leading-tight">
              ¡Sabía que dirías que sí! ❤️
            </h1>
            <p className="text-2xl text-text font-bold mt-4">Te amo muchísimo</p>
          </motion.div>
        ) : (
          <div>
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

              <div className="relative w-full md:w-auto min-w-[180px] h-[50px]">
                <FloatingButton className="absolute inset-0 w-full h-full flex items-center justify-center px-8 py-3 text-lg rounded-full font-bold bg-[#f8f9fa] text-text border-2 border-secondary hover:bg-white shadow-sm">
                  No, gracias
                </FloatingButton>
              </div>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  )
}

export default App
