'use client';

import { useState, useEffect } from 'react';
import SocialLink from './SocialLink';

const SOCIAL_LINKS = [
    { label: 'GitHub', iconSrc: '/github.svg', href: 'https://github.com/the-kalki' },
    { label: 'Reddit', iconSrc: '/reddit.svg', href: 'https://reddit.com/user/th3_willy' },
    { label: 'Mail', iconSrc: '/gmail.svg', href: 'mailto:kalki@duck.com' },
    { label: 'LinkedIn', iconSrc: '/linkedin.svg', href: 'https://linkedin.com/in/prabhaw-kr' },
    { label: 'Portfolio', iconSrc: '/logo.jpg', href: 'https://prabhaw.vercel.app/' },
    { label: 'X', iconSrc: '/twitterx.svg', href: 'https://x.com/prabhaw_kr/' },
];

export default function SocialRing() {
    const [radius, setRadius] = useState(180);
    const totalLinks = SOCIAL_LINKS.length;

    useEffect(() => {
        const handleResize = () => {
            // Slightly increased radius for the larger avatar
            setRadius(window.innerWidth < 768 ? 160 : 280);
        };

        handleResize(); // Initial set
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {SOCIAL_LINKS.map((link, index) => {
                // Calculate position on the circle
                const angle = (index / totalLinks) * 2 * Math.PI - Math.PI / 2; // Start from top (-90deg)
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <div key={link.label} className="pointer-events-auto absolute">
                        <SocialLink
                            label={link.label}
                            iconSrc={link.iconSrc}
                            href={link.href}
                            x={x}
                            y={y}
                        />
                    </div>
                );
            })}
        </div>
    );
}
