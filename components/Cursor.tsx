'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface Bubble {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function Cursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isInteractive, setIsInteractive] = useState(false);
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [foregroundRgb, setForegroundRgb] = useState('15, 23, 42');
    const bubbleIdCounter = useRef(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Get the foreground-rgb CSS variable value
        const getForegroundRgb = () => {
            const root = document.documentElement;
            const computed = getComputedStyle(root).getPropertyValue('--foreground-rgb').trim();
            return computed || '15, 23, 42';
        };

        setForegroundRgb(getForegroundRgb());

        // Update when theme changes
        const observer = new MutationObserver(() => {
            setForegroundRgb(getForegroundRgb());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);

            // Check if hovering over interactive element
            const target = e.target as HTMLElement;
            const isOverInteractive = !!target.closest('a, button, .interactive-avatar');
            setIsInteractive(isOverInteractive);

            // Spawn bubble if not over interactive - Adjusted concentration for "natural" feel
            if (!isOverInteractive && Math.random() > 0.7) {
                const id = bubbleIdCounter.current++;
                const newBubble: Bubble = {
                    id,
                    x: e.clientX,
                    y: e.clientY,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    size: Math.random() * 15 + 8,
                };
                setBubbles((prev) => [...prev.slice(-20), newBubble]);

                // Auto-remove bubble after animation duration
                setTimeout(() => {
                    setBubbles((prev) => prev.filter((b) => b.id !== id));
                }, 1500);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) setIsVisible(false);

        return () => window.removeEventListener('mousemove', moveCursor);
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <AnimatePresence>
                {bubbles.map((bubble) => (
                    <motion.div
                        key={bubble.id}
                        initial={{ opacity: 0.8, scale: 0, x: bubble.x, y: bubble.y }}
                        animate={{
                            opacity: 0,
                            scale: 1.5,
                            y: bubble.y - 100, // Drifts further for natural feel
                            x: bubble.x + (Math.random() - 0.5) * 60
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full"
                        style={{
                            width: bubble.size,
                            height: bubble.size,
                            backgroundColor: bubble.color,
                            boxShadow: `0 0 15px ${bubble.color}33`,
                        }}
                    />
                ))}
            </AnimatePresence>

            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 items-center justify-center md:flex"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    animate={{
                        scale: isInteractive ? 1.5 : 1,
                        backgroundColor: isInteractive ? `rgba(${foregroundRgb}, 0.2)` : `rgba(${foregroundRgb}, 0.1)`,
                        borderColor: isInteractive ? `rgba(${foregroundRgb}, 0.6)` : `rgba(${foregroundRgb}, 0.4)`,
                    }}
                    className="h-full w-full rounded-full border backdrop-blur-[2px] transition-all duration-300"
                />
                {/* Inner Dot */}
                {!isInteractive && (
                    <div className="absolute h-1.5 w-1.5 rounded-full bg-foreground opacity-80" />
                )}
            </motion.div>
        </>
    );
}
