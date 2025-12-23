'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    decreasing: boolean;
    speed: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
}

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Create stars
            const starCount = Math.floor((width * height) / 2000); // Responsive star count
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    alpha: Math.random(),
                    decreasing: Math.random() > 0.5,
                    speed: Math.random() * 0.05 + 0.01,
                });
            }
        };

        const renderLoop = () => {
            ctx.clearRect(0, 0, width, height);

            // Dark Mode: Deep Cosmic Space
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
            gradient.addColorStop(0, '#0f172a');
            gradient.addColorStop(1, '#020617');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Stars
            ctx.fillStyle = '#ffffff';
            stars.forEach((star) => {
                if (star.decreasing) {
                    star.alpha -= star.speed;
                    if (star.alpha <= 0.2) star.decreasing = false;
                } else {
                    star.alpha += star.speed;
                    if (star.alpha >= 1) star.decreasing = true;
                }

                star.y -= star.speed * 2;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }

                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Shooting Stars
            if (Math.random() < 0.02 && shootingStars.length < 3) {
                shootingStars.push({
                    x: Math.random() * width,
                    y: Math.random() * (height / 2),
                    length: Math.random() * 80 + 20,
                    speed: Math.random() * 10 + 10,
                    opacity: 1,
                });
            }

            ctx.strokeStyle = '#ffffff';
            ctx.lineCap = 'round';
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.x += star.speed;
                star.y += star.speed;
                star.opacity -= 0.02;

                if (star.opacity <= 0 || star.x > width || star.y > height) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = star.opacity;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - star.length, star.y - star.length);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        init();
        renderLoop();

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 h-full w-full bg-transparent"
        />
    );
}
