'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Avatar() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-[0_0_80px_-10px_rgba(139,92,246,0.5)] md:h-[300px] md:w-[300px]"
        >
            {/* Glow Effect */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                    filter: ['blur(16px)', 'blur(24px)', 'blur(16px)']
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-violet-500"
            />

            {/* Inner Avatar Image */}
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/10 bg-black/20 backdrop-blur-sm">
                <Image
                    src="/avatar.jpg"
                    alt="Prabhaw"
                    fill
                    sizes="(max-width: 768px) 192px, 300px"
                    priority
                    className="object-cover object-[center_25%] opacity-90 transition-opacity duration-500 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
            </div>
        </motion.div>
    );
}
