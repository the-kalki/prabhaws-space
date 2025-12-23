'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useState, useRef } from 'react';

interface SocialLinkProps {
    label: string;
    icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    iconSrc?: string;
    href: string;
    brandColor?: string;
    x: number;
    y: number;
    delay?: number;
}

export default function SocialLink({ label, icon: Icon, iconSrc, href, brandColor = '#8B5CF6', x, y, delay = 0.2 }: SocialLinkProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const containerRef = useRef<HTMLAnchorElement>(null);

    // Magnetic effect values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const rotateX = useSpring(useTransform(mouseY, [-40, 40], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-40, 40], [-15, 15]), springConfig);
    const shiftX = useSpring(useTransform(mouseX, [-40, 40], [-8, 8]), springConfig);
    const shiftY = useSpring(useTransform(mouseY, [-40, 40], [-8, 8]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleClick = (e: React.MouseEvent) => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.a
            ref={containerRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${label}`}
            className="absolute flex items-center justify-center preserve-3d -translate-x-1/2 -translate-y-1/2 group"
            style={{ x, y, left: '50%', top: '50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            whileHover={{ scale: 1.15 }}
        >
            {/* Click Popup Label */}
            <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{
                    opacity: showPopup ? 1 : 0,
                    y: showPopup ? -80 : 0,
                    scale: showPopup ? 1 : 0.8
                }}
                className="pointer-events-none absolute left-1/2 top-0 z-50 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md"
            >
                Opening {label}...
            </motion.div>

            <motion.div
                className="relative h-16 w-16 perspective-1000 md:h-24 md:w-24 preserve-3d"
                style={{ rotateX, rotateY, x: shiftX, y: shiftY }}
            >
                <motion.div
                    animate={{ rotateY: isHovered ? 1260 : 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative h-full w-full preserve-3d"
                >
                    {/* Brand Glow (Hidden by default, shown on hover) */}
                    <div
                        className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl"
                        style={{ backgroundColor: brandColor, filter: `blur(40px)` }}
                    />

                    {/* Front Face - True Floating (No Border/BG) */}
                    <div
                        className="absolute inset-0 flex h-full w-full backface-hidden items-center justify-center transition-all duration-300"
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{ x: isHovered ? ['-100%', '100%'] : '-100%' }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-45"
                            />
                        </div>

                        {iconSrc ? (
                            <div className={`relative h-7 w-7 md:h-10 md:w-10 ${['GitHub', 'X'].includes(label) ? 'dark-icon-wrapper' : ''}`}>
                                <Image
                                    src={iconSrc}
                                    alt={label}
                                    fill
                                    className="object-contain transition-all"
                                />
                            </div>
                        ) : Icon && (
                            <Icon className="h-7 w-7 text-white md:h-10 md:w-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" strokeWidth={1.5} />
                        )}
                    </div>

                    {/* Back Face */}
                    <div
                        className="absolute inset-0 flex h-full w-full backface-hidden items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md rotate-y-180"
                        style={{ background: `linear-gradient(135deg, ${brandColor}44, ${brandColor}22)` }}
                    >
                        <span className="px-2 text-center text-[8px] font-bold tracking-tight text-white uppercase md:text-[10px]">
                            {label}
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.a>
    );
}
