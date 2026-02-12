import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimation } from 'framer-motion';

export default function FloatingButton({ onClick, children, className, phrases = [], onTransformToYes }) {
    const buttonRef = useRef(null);
    const controls = useAnimation();
    const [isMoved, setIsMoved] = useState(false);
    const [initialRect, setInitialRect] = useState(null);
    const [btnText, setBtnText] = useState(children);

    // Estado para controlar el flujo de frases
    const [remainingPhrases, setRemainingPhrases] = useState([]);
    const [isTransformed, setIsTransformed] = useState(false);

    // Inicializar frases al montar
    useEffect(() => {
        if (phrases.length > 0) {
            setRemainingPhrases([...phrases]);
        }
    }, [phrases]);

    // Mover el botón
    const moveButton = (advancePhrase = true) => {

        if (isTransformed) return;

        // Lógica de frases
        if (advancePhrase && phrases.length > 0) {
            if (remainingPhrases.length > 0) {
                // Tomar la siguiente frase (FIFO)
                const nextPhrase = remainingPhrases[0];
                setBtnText(nextPhrase);
                // Eliminarla de la lista de pendientes
                setRemainingPhrases(prev => prev.slice(1));
            } else {
                // Se acabaron las frases: Transformación
                setIsTransformed(true);
                setBtnText("Si quiero ❤️");

            }
        }

        // Si es la primera vez, capturamos coordenadas
        if (!isMoved && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setInitialRect({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
            setIsMoved(true);
            return;
        }

        // Cálculos de posición (igual que antes)
        const btnWidth = initialRect ? initialRect.width : (buttonRef.current?.offsetWidth || 100);
        const btnHeight = initialRect ? initialRect.height : (buttonRef.current?.offsetHeight || 50);
        const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        const marginX = vw * 0.1;
        const marginY = vh * 0.1;
        const minX = marginX;
        const maxX = vw - btnWidth - marginX;
        const minY = marginY;
        const maxY = vh - btnHeight - marginY;

        let newX, newY;
        if (minX < maxX) newX = minX + Math.random() * (maxX - minX);
        else newX = (vw - btnWidth) / 2;

        if (minY < maxY) newY = minY + Math.random() * (maxY - minY);
        else newY = (vh - btnHeight) / 2;

        // Si es el último paso (transformación), volver al origen y ajustar tamaño
        let targetWidth = btnWidth;
        let targetHeight = btnHeight;
        let targetFontSize = "11px"; // Tamaño original móvil

        if (remainingPhrases.length === 0 && phrases.length > 0) {
            targetWidth = 180; // Ancho del botón Sí
            // Centrar en el contenedor original: origLeft + (origWidth - newWidth) / 2
            newX = initialRect.left + (initialRect.width - targetWidth) / 2;
            newY = initialRect.top;
            targetFontSize = "18px"; // text-lg
        }

        controls.start({
            left: newX,
            top: newY,
            position: 'fixed',
            width: targetWidth,
            height: targetHeight,
            fontSize: targetFontSize,
            x: 0,
            y: 0,
            transition: { type: "spring", stiffness: 400, damping: 25 },
            // Si se transforma, cambiar estilos
            backgroundColor: remainingPhrases.length === 0 && phrases.length > 0 ? '#ff4d6d' : '#f8f9fa',
            color: remainingPhrases.length === 0 && phrases.length > 0 ? '#ffffff' : '#4a4e69',
            borderColor: remainingPhrases.length === 0 && phrases.length > 0 ? '#ff4d6d' : '#ff8fa3',
            scale: remainingPhrases.length === 0 && phrases.length > 0 ? 1.05 : 1 // Escala sutil para igualar al botón sí hover
        });
    };

    useEffect(() => {
        if (isMoved && initialRect) {
            controls.set({
                position: 'fixed',
                left: initialRect.left,
                top: initialRect.top,
                width: initialRect.width,
                height: initialRect.height,
                x: 0,
                y: 0
            });
            requestAnimationFrame(() => moveButton(false));
        }
    }, [isMoved]);

    const handleClick = (e) => {
        if (isTransformed && onTransformToYes) {
            onTransformToYes();
        } else if (onClick) {
            onClick(e);
        }
    };

    const buttonContent = (
        <motion.button
            ref={buttonRef}
            animate={controls}
            onHoverStart={!isTransformed ? moveButton : undefined}
            onTouchStart={(e) => {
                if (!isTransformed) {
                    e.preventDefault();
                    moveButton();
                }
            }}
            onClick={handleClick}
            className={`${className} cursor-pointer z-[9999] whitespace-nowrap select-none touch-manipulation transition-colors duration-300`}
            style={!isMoved ? { position: 'relative' } : { position: 'fixed', left: 0, top: 0 }}
        >
            {btnText}
        </motion.button>
    );

    if (isMoved) return createPortal(buttonContent, document.body);
    return buttonContent;
}
