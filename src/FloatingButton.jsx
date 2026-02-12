import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimation } from 'framer-motion';

export default function FloatingButton({ onClick, children, className }) {
    const buttonRef = useRef(null);
    const controls = useAnimation();
    const [isMoved, setIsMoved] = useState(false);
    const [initialRect, setInitialRect] = useState(null);

    // Mover el botón a una posición segura aleatoria
    const moveButton = () => {
        // Si es la primera vez, capturamos coordenadas para el Portal
        if (!isMoved && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setInitialRect({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
            setIsMoved(true);
            // El resto de la lógica ocurrirá en el useEffect o en el siguiente ciclo cuando el Portal se monte
            return;
        }

        const btnWidth = initialRect ? initialRect.width : (buttonRef.current?.offsetWidth || 100);
        const btnHeight = initialRect ? initialRect.height : (buttonRef.current?.offsetHeight || 50);

        // Viewport dimensions
        const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
        const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

        // SAFE ZONE: Márgenes (10% por cada lado)
        const marginX = vw * 0.1;
        const marginY = vh * 0.1;

        // Límites estrictos
        const minX = marginX;
        const maxX = vw - btnWidth - marginX;
        const minY = marginY;
        const maxY = vh - btnHeight - marginY;

        let newX, newY;

        if (minX < maxX) {
            newX = minX + Math.random() * (maxX - minX);
        } else {
            newX = (vw - btnWidth) / 2;
        }

        if (minY < maxY) {
            newY = minY + Math.random() * (maxY - minY);
        } else {
            newY = (vh - btnHeight) / 2;
        }

        controls.start({
            left: newX,
            top: newY,
            position: 'fixed',
            width: btnWidth, // Maintain dimensions
            height: btnHeight,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        });
    };

    // Efecto para activar el movimiento INMEDIATAMENTE después de montar el Portal
    useEffect(() => {
        if (isMoved && initialRect) {
            // Primero lo colocamos visualmente donde estaba (sin animación) para evitar saltos
            controls.set({
                position: 'fixed',
                left: initialRect.left,
                top: initialRect.top,
                width: initialRect.width,
                height: initialRect.height,
                x: 0,
                y: 0
            });

            // Forzar un reflow o usar timeout pequeño para iniciar el movimiento
            requestAnimationFrame(() => {
                moveButton();
            });
        }
    }, [isMoved]);


    const buttonContent = (
        <motion.button
            ref={buttonRef}
            animate={controls}
            onHoverStart={moveButton}
            onTouchStart={(e) => {
                e.preventDefault();
                moveButton();
            }}
            className={`${className} cursor-pointer z-[9999] whitespace-nowrap select-none touch-manipulation`}
            style={!isMoved ? { position: 'relative' } : { position: 'fixed', left: 0, top: 0 }}
        >
            {children}
        </motion.button>
    );

    if (isMoved) {
        return createPortal(buttonContent, document.body);
    }

    return buttonContent;
}
