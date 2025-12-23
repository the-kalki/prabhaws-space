'use client';

import React, { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

// Font URL for Text3D (Standard Three.js font)
const FONT_URL = '/fonts/helvetiker_regular.typeface.json';
// Note: We might need to ensure this font exists or use a remote one. 
// A reliable remote one: https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json
// But usually better to have it local. For now I will point to a CDN or just hope we can load it.
// Actually, let's use a standard google font converted to json or just standard helvetiker from a CDN for sure.
const CDN_FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';


function Word({ position, text, color = '#a78bfa' }: { position: [number, number, number], text: string, color?: string }) {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position,
        args: [6, 2, 1], // Increased box size for larger text
        rotation: [0, 0, 0], // Start flat
        material: { friction: 0.8, restitution: 0.2 }, // Less bouncy, more stable
        angularDamping: 0.5, // Stop spinning faster
        linearDamping: 0.5,
        angularFactor: [0, 1, 0], // Lock X and Z rotation (can only spin around Y)
        linearFactor: [1, 1, 0]   // Lock Z movement (can only move in X and Y)
    }));

    const handleHover = () => {
        // Apply a random upward/sideways impulse on hover
        api.applyImpulse(
            [(Math.random() - 0.5) * 5, Math.random() * 5 + 2, (Math.random() - 0.5) * 5], // Impulse vector
            [0, 0, 0] // World point of application (center of mass)
        );
    };

    return (
        <mesh
            ref={ref as any}
            onPointerOver={handleHover}
        >
            <Center>
                <Text3D
                    font={CDN_FONT_URL}
                    size={1.5}
                    height={0.5}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.04}
                    bevelSize={0.04}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {text}
                    <meshStandardMaterial color={color} />
                </Text3D>
            </Center>
        </mesh>
    );
}

function Floor() {
    const { viewport } = useThree();
    // Position floor just below the visible area
    const [ref] = usePlane(() => ({
        position: [0, -viewport.height / 2 + 0.5, 0],
        rotation: [-Math.PI / 2, 0, 0],
        material: { friction: 0.3, restitution: 0.5 }
    }));
    return (
        <mesh ref={ref as any}>
            <planeGeometry args={[viewport.width, 10]} />
            <meshBasicMaterial visible={false} />
        </mesh>
    );
}

function Walls() {
    const { viewport } = useThree();
    const width = viewport.width;

    // Left Wall
    usePlane(() => ({ position: [-width / 2, 0, 0], rotation: [0, Math.PI / 2, 0] }));
    // Right Wall
    usePlane(() => ({ position: [width / 2, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
    // Ceiling
    usePlane(() => ({ position: [0, viewport.height / 2, 0], rotation: [Math.PI / 2, 0, 0] }));

    return null;
}

function Scene() {
    const { viewport } = useThree();

    return (
        <Physics gravity={[0, -5, 0]}>
            <Word position={[-viewport.width / 4, viewport.height / 2, 0]} text="Prabhaw's" />
            <Word position={[viewport.width / 4, viewport.height / 2 + 2, 0]} text="Space" />
            <Floor />
            <Walls />
        </Physics>
    );
}

export default function FallingText() {
    return (
        <div className="absolute inset-0 pointer-events-auto z-10">
            <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 40 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Scene />
            </Canvas>
        </div>
    );
}
