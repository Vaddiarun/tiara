import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdSpa, MdLocalFlorist } from 'react-icons/md';
import { IoWaterOutline, IoLeafOutline } from 'react-icons/io5';

// Simple, clean spa-themed icons
const iconComponents = [
    MdSpa,
    MdLocalFlorist,
    IoWaterOutline,
    IoLeafOutline
];

const FallingIcons = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Create a set of random falling items
        const newItems = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            Icon: iconComponents[Math.floor(Math.random() * iconComponents.length)],
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 12 + Math.random() * 8,
            size: 32 + Math.random() * 24,
            color: Math.random() > 0.5 ? '#5C3B44' : '#A0A051',
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ y: -80, x: `${item.x}vw`, opacity: 0, rotate: 0 }}
                    animate={{
                        y: '110vh',
                        opacity: [0, 0.3, 0.3, 0],
                        rotate: 360,
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear",
                    }}
                    style={{
                        color: item.color,
                        fontSize: item.size,
                    }}
                    className="absolute"
                >
                    <item.Icon />
                </motion.div>
            ))}
        </div>
    );
};

export default FallingIcons;
