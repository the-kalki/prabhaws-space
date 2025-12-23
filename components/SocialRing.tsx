'use client';

import { useState, useEffect } from 'react';
import SocialLink from './SocialLink';

const SOCIAL_LINKS = [
    { label: 'GitHub', iconSrc: '/github.svg', href: 'https://github.com/the-kalki', brandColor: '#2b3137', iconColor: '#ffffff' },
    { label: 'Reddit', iconSrc: '/reddit.svg', href: 'https://reddit.com/user/th3_willy', brandColor: '#FF4500', iconColor: '#ffffff' },
    { label: 'Mail', iconSrc: '/gmail.svg', href: 'mailto:kalki@duck.com', brandColor: '#D44638', iconColor: '#ffffff' },
    { label: 'LinkedIn', iconSrc: '/linkedin.svg', href: 'https://linkedin.com/in/prabhaw-kr', brandColor: '#0A66C2', iconColor: '#ffffff' },
    { label: 'Portfolio', iconSrc: '/portfolio.jpg', href: 'https://prabhaw.vercel.app/', brandColor: '#8B5CF6', iconColor: '#ffffff' },
    { label: 'X', iconSrc: '/twitterx.svg', href: 'https://x.com/prabhaw_kr/', brandColor: '#000000', iconColor: '#ffffff' },
];

export default function SocialRing() {
    const [radius, setRadius] = useState(180);
    const totalLinks = SOCIAL_LINKS.length;

    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;
            if (width < 640) setRadius(125); // Slightly tighter for mobile safety
            else if (width < 768) setRadius(180);
            else if (width < 1024) setRadius(220);
            else setRadius(260);
        };

        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {SOCIAL_LINKS.map((link, index) => {
                const angle = (index / totalLinks) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <div key={link.label} className="pointer-events-auto absolute">
                        <SocialLink
                            label={link.label}
                            iconSrc={link.iconSrc}
                            href={link.href}
                            brandColor={link.brandColor}
                            x={x}
                            y={y}
                            delay={0.5 + index * 0.1}
                        />
                    </div>
                );
            })}
        </div>
    );
}
