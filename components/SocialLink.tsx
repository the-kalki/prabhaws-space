'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface SocialLinkProps {
    label: string;
    icon?: any;
    iconSrc?: string;
    href: string;
    color?: string;
    x: number;
    y: number;
}

export default function SocialLink({ label, icon: Icon, iconSrc, href, x, y }: SocialLinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute flex items-center justify-center preserve-3d -translate-x-1/2 -translate-y-1/2"
            style={{ x, y, left: '50%', top: '50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
        >
            <div className="relative h-16 w-16 perspective-1000 md:h-24 md:w-24">
                <motion.div
                    animate={{ rotateY: isHovered ? 1260 : 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative h-full w-full preserve-3d"
                >
                    {/* Front Face */}
                    <div className="absolute inset-0 flex h-full w-full backface-hidden items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md transition-colors duration-300">
                        {iconSrc ? (
                            <img
                                src={iconSrc}
                                alt={label}
                                className={`h-7 w-7 object-contain transition-all md:h-10 md:w-10 ${['GitHub', 'X', 'Medium', 'Mail'].includes(label) ? 'dark:invert' : ''
                                    }`}
                            />
                        ) : Icon && (
                            <Icon className="h-7 w-7 text-foreground/80 md:h-10 md:w-10" strokeWidth={1.5} />
                        )}
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 flex h-full w-full backface-hidden items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 shadow-[0_0_15px_rgba(139,92,246,0.3)] backdrop-blur-md rotate-y-180">
                        <span className="px-2 text-center text-[8px] font-bold tracking-tight text-foreground uppercase md:text-[10px]">
                            {label}
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.a>
    );
}
