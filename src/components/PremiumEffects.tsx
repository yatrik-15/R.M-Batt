import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

// Flowing SVG Curve Component - Like Lusion's signature design element
// Now with parallax scroll effect
export const FlowingCurve = ({ className = '', scrollY }: { className?: string; scrollY?: MotionValue<number> }) => {
    // Create parallax transform based on scroll
    const y = scrollY ? useTransform(scrollY, [0, 1000], [0, -150]) : undefined;
    const x = scrollY ? useTransform(scrollY, [0, 1000], [0, 50]) : undefined;
    const rotate = scrollY ? useTransform(scrollY, [0, 2000], [0, 10]) : undefined;

    return (
        <motion.svg
            className={`absolute pointer-events-none ${className}`}
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ y, x, rotate }}
        >
            <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(234, 88, 12, 0.6)" />
                    <stop offset="50%" stopColor="rgba(251, 146, 60, 0.8)" />
                    <stop offset="100%" stopColor="rgba(234, 88, 12, 0.6)" />
                </linearGradient>
                <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <motion.path
                d="M-100,300 Q200,100 400,250 T700,200 T1000,350 T1300,250"
                stroke="url(#curveGradient)"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
                filter="url(#curveGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
            />
        </motion.svg>
    );
};

// Second flowing curve with different path
export const FlowingCurveAlt = ({ className = '', scrollY }: { className?: string; scrollY?: MotionValue<number> }) => {
    // Create parallax transform with opposite direction for depth effect
    const y = scrollY ? useTransform(scrollY, [0, 1000], [0, -100]) : undefined;
    const x = scrollY ? useTransform(scrollY, [0, 1000], [0, -30]) : undefined;
    const rotate = scrollY ? useTransform(scrollY, [0, 2000], [0, -8]) : undefined;

    return (
        <motion.svg
            className={`absolute pointer-events-none ${className}`}
            viewBox="0 0 1200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ y, x, rotate }}
        >
            <defs>
                <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0.5)" />
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.7)" />
                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.5)" />
                </linearGradient>
            </defs>
            <motion.path
                d="M-50,200 C150,50 350,350 550,150 S850,350 1050,100 L1250,200"
                stroke="url(#curveGradient2)"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
        </motion.svg>
    );
};

// Custom Magnetic Cursor Component
export const MagneticCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-cursor-magnetic]')) {
                setIsHovering(true);
                setCursorText(target.closest('[data-cursor-magnetic]')?.getAttribute('data-cursor-text') || 'VIEW');
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-cursor-magnetic]')) {
                setIsHovering(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-terracotta-600 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Cursor ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovering ? 100 : 40,
                    height: isHovering ? 100 : 40,
                    backgroundColor: isHovering ? 'rgba(234, 88, 12, 0.9)' : 'transparent',
                    border: isHovering ? 'none' : '1px solid rgba(234, 88, 12, 0.5)',
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {isHovering && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-white text-xs font-bold tracking-wider"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>
        </>
    );
};

// Magnetic Button Wrapper Component
export const MagneticButton = ({
    children,
    className = '',
    cursorText = 'VIEW'
}: {
    children: React.ReactNode;
    className?: string;
    cursorText?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = (e.clientX - centerX) * 0.3;
        const distY = (e.clientY - centerY) * 0.3;

        x.set(distX);
        y.set(distY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor-magnetic
            data-cursor-text={cursorText}
        >
            {children}
        </motion.div>
    );
};

// Animated Text Reveal Component
export const TextReveal = ({
    children,
    className = '',
    delay = 0
}: {
    children: string;
    className?: string;
    delay?: number;
}) => {
    const words = children.split(' ');

    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: delay + i * 0.1,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </span>
    );
};

// Floating Particles Background
export const FloatingParticles = ({ count = 20 }: { count?: number }) => {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-terracotta-400/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// Scroll Progress Indicator
export const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta-500 via-orange-400 to-terracotta-500 origin-left z-[9999]"
            style={{ scaleX: progress / 100 }}
        />
    );
};

// Parallax Image Component
export const ParallaxImage = ({
    src,
    alt,
    className = '',
    speed = 0.5
}: {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            setOffset(scrollProgress * 100 * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-[120%] object-cover"
                style={{ y: -offset }}
            />
        </div>
    );
};

// Staggered Grid Animation Container
export const StaggeredGrid = ({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.15,
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggeredItem = ({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 60,
                    scale: 0.9
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export default {
    FlowingCurve,
    FlowingCurveAlt,
    MagneticCursor,
    MagneticButton,
    TextReveal,
    FloatingParticles,
    ScrollProgress,
    ParallaxImage,
    StaggeredGrid,
    StaggeredItem
};
