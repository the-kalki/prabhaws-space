'use client';

import { motion } from 'framer-motion';

export default function Title() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-[-100px] text-center"
        >
            <h1 className="text-2xl font-light tracking-[0.2em] text-foreground/90 md:text-3xl">
                PRABHAW’S SPACE
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
