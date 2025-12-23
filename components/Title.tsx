'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TARGET_TEXT = "PRABHAW'S SPACE";
const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?";
const CYCLES = 3;
const SPEED = 40;

export default function Title({ className }: { className?: string }) {
    const [text, setText] = useState(TARGET_TEXT);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let pos = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const scrambled = TARGET_TEXT.split("").map((char, index) => {
                if (char === ' ') return ' ';
                if (pos / CYCLES > index) {
                    return char;
                }
                const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
                return randomChar;
            }).join("");

            setText(scrambled);
            pos++;

            if (pos >= TARGET_TEXT.length * CYCLES) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setText(TARGET_TEXT);
            }
        }, SPEED);
    };

    useEffect(() => {
        scramble();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-center cursor-default z-30 ${className}`}
            onMouseEnter={scramble}
        >
            <h1 className="text-xl font-light tracking-[0.1em] text-foreground/90 md:text-3xl md:tracking-[0.2em] font-mono whitespace-nowrap">
                {text}
            </h1>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-foreground/50 to-transparent"
            />
        </motion.div>
    );
}
