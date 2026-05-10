import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Icons } from '../components/Icons';
import { FlowingCurve, FlowingCurveAlt, FloatingParticles, MagneticButton, TextReveal, StaggeredGrid, StaggeredItem } from '../components/PremiumEffects';

// Project data - will be imported from Portfolio component later
const projectsData: Record<string, {
    id: string;
    title: string;
    category: string;
    description: string;
    services: string[];
    recognitions: string[];
    images: string[];
}> = {
    'apex-tower': {
        id: 'apex-tower',
        title: 'Apex Tower',
        category: 'Corporate Identity',
        description: 'Premium corporate signage featuring brushed stainless steel construction with integrated LED backlighting. The three-dimensional letters create a commanding presence in the building\'s lobby, reflecting the company\'s commitment to excellence and innovation.',
        services: ['Concept', '3D Design', 'Motion Design', 'Compositing'],
        recognitions: ['Wallpaper*', 'Porsche Newsroom', 'Lllust'],
        images: [
            'https://picsum.photos/seed/building1-1/1200/800',
            'https://picsum.photos/seed/building1-2/1200/800',
            'https://picsum.photos/seed/building1-3/1200/800',
            'https://picsum.photos/seed/building1-4/1200/800',
            'https://picsum.photos/seed/building1-5/1200/800',
            'https://picsum.photos/seed/building1-6/1200/800',
            'https://picsum.photos/seed/building1-7/1200/800',
            'https://picsum.photos/seed/building1-8/1200/800',
            'https://picsum.photos/seed/building1-9/1200/800',
            'https://picsum.photos/seed/building1-10/1200/800',
            'https://picsum.photos/seed/building1-11/1200/800',
            'https://picsum.photos/seed/building1-12/1200/800',
        ]
    },
    'luxe-residences': {
        id: 'luxe-residences',
        title: 'Luxe Residences',
        category: '3D Metal Lettering',
        description: 'Elegant 3D metal lettering with gold-plated brass finish, designed to withstand outdoor elements while maintaining its luxurious appearance. Each letter is individually crafted and mounted for maximum visual impact.',
        services: ['Concept', '3D Design', 'Motion Design', 'Compositing'],
        recognitions: ['Design Award', 'Architecture Digest', 'Modern Home'],
        images: [
            'https://picsum.photos/seed/metal-1/1200/800',
            'https://picsum.photos/seed/metal-2/1200/800',
            'https://picsum.photos/seed/metal-3/1200/800',
            'https://picsum.photos/seed/metal-4/1200/800',
            'https://picsum.photos/seed/metal-5/1200/800',
            'https://picsum.photos/seed/metal-6/1200/800',
            'https://picsum.photos/seed/metal-7/1200/800',
            'https://picsum.photos/seed/metal-8/1200/800',
            'https://picsum.photos/seed/metal-9/1200/800',
            'https://picsum.photos/seed/metal-10/1200/800',
        ]
    },
    'zenith-corp': {
        id: 'zenith-corp',
        title: 'Zenith Corp',
        category: 'Acrylic Fascia',
        description: 'Modern acrylic fascia signage with programmable RGB LED system, allowing for dynamic color changes and animations. The sleek design combines transparency with bold branding for a contemporary corporate aesthetic.',
        services: ['Concept', '3D Design', 'LED Programming', 'Installation'],
        recognitions: ['Tech Design Awards', 'Innovation Hub', 'Digital Trends'],
        images: [
            'https://picsum.photos/seed/acrylic-1/1200/800',
            'https://picsum.photos/seed/acrylic-2/1200/800',
            'https://picsum.photos/seed/acrylic-3/1200/800',
            'https://picsum.photos/seed/acrylic-4/1200/800',
            'https://picsum.photos/seed/acrylic-5/1200/800',
            'https://picsum.photos/seed/acrylic-6/1200/800',
            'https://picsum.photos/seed/acrylic-7/1200/800',
            'https://picsum.photos/seed/acrylic-8/1200/800',
            'https://picsum.photos/seed/acrylic-9/1200/800',
            'https://picsum.photos/seed/acrylic-10/1200/800',
            'https://picsum.photos/seed/acrylic-11/1200/800',
            'https://picsum.photos/seed/acrylic-12/1200/800',
            'https://picsum.photos/seed/acrylic-13/1200/800',
            'https://picsum.photos/seed/acrylic-14/1200/800',
        ]
    },
    'neon-district': {
        id: 'neon-district',
        title: 'Neon District',
        category: 'LED Neon Installations',
        description: 'Vibrant LED neon installation featuring flexible neon tubing with smart control capabilities. Energy-efficient and fully customizable, this installation creates an eye-catching focal point with retro-modern appeal.',
        services: ['Concept', 'LED Design', 'Smart Systems', 'Installation'],
        recognitions: ['Neon Art Awards', 'Urban Design', 'City Lights'],
        images: [
            'https://picsum.photos/seed/neon-1/1200/800',
            'https://picsum.photos/seed/neon-2/1200/800',
            'https://picsum.photos/seed/neon-3/1200/800',
            'https://picsum.photos/seed/neon-4/1200/800',
            'https://picsum.photos/seed/neon-5/1200/800',
            'https://picsum.photos/seed/neon-6/1200/800',
            'https://picsum.photos/seed/neon-7/1200/800',
            'https://picsum.photos/seed/neon-8/1200/800',
            'https://picsum.photos/seed/neon-9/1200/800',
            'https://picsum.photos/seed/neon-10/1200/800',
            'https://picsum.photos/seed/neon-11/1200/800',
        ]
    },
    'velocity-logistics': {
        id: 'velocity-logistics',
        title: 'Velocity Logistics',
        category: 'Fleet Branding',
        description: 'Comprehensive fleet branding solution using premium 3M vinyl materials with UV-resistant laminate. The design incorporates reflective elements for enhanced visibility and safety while maintaining brand consistency across the entire fleet.',
        services: ['Concept', 'Vinyl Design', 'Fleet Graphics', 'Application'],
        recognitions: ['Transport Design', 'Fleet Awards', 'Logistics Today'],
        images: [
            'https://picsum.photos/seed/fleet-1/1200/800',
            'https://picsum.photos/seed/fleet-2/1200/800',
            'https://picsum.photos/seed/fleet-3/1200/800',
            'https://picsum.photos/seed/fleet-4/1200/800',
            'https://picsum.photos/seed/fleet-5/1200/800',
            'https://picsum.photos/seed/fleet-6/1200/800',
            'https://picsum.photos/seed/fleet-7/1200/800',
            'https://picsum.photos/seed/fleet-8/1200/800',
            'https://picsum.photos/seed/fleet-9/1200/800',
            'https://picsum.photos/seed/fleet-10/1200/800',
            'https://picsum.photos/seed/fleet-11/1200/800',
            'https://picsum.photos/seed/fleet-12/1200/800',
            'https://picsum.photos/seed/fleet-13/1200/800',
        ]
    },
    'the-coffee-lab': {
        id: 'the-coffee-lab',
        title: 'The Coffee Lab',
        category: 'Branding Suite',
        description: 'Complete branding suite for artisanal coffee shop, combining rustic reclaimed wood with modern laser-cut metal elements. The design includes menu boards, wall signage, and ambient lighting to create a warm, inviting atmosphere.',
        services: ['Concept', 'Interior Branding', 'Signage', 'Lighting Design'],
        recognitions: ['Cafe Design Awards', 'Interior Digest', 'Hospitality'],
        images: [
            'https://picsum.photos/seed/coffee-1/1200/800',
            'https://picsum.photos/seed/coffee-2/1200/800',
            'https://picsum.photos/seed/coffee-3/1200/800',
            'https://picsum.photos/seed/coffee-4/1200/800',
            'https://picsum.photos/seed/coffee-5/1200/800',
            'https://picsum.photos/seed/coffee-6/1200/800',
            'https://picsum.photos/seed/coffee-7/1200/800',
            'https://picsum.photos/seed/coffee-8/1200/800',
            'https://picsum.photos/seed/coffee-9/1200/800',
            'https://picsum.photos/seed/coffee-10/1200/800',
        ]
    },
};

// Stretchy Hero Image Component - expands from small to fullscreen on scroll
const StretchyHeroImage = ({ image, title }: { image: string; title: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Animate from small to full-screen
    // Initial: Small container with border radius
    // Final: Full viewport with no border radius
    // Animation completes at 100% scroll so user must scroll through entirely

    // Width: 45vw -> 100vw
    const width = useTransform(scrollYProgress, [0, 1], ['45vw', '100vw']);

    // Height: 50vh -> 100vh
    const height = useTransform(scrollYProgress, [0, 1], ['50vh', '100vh']);

    // Border radius: 24px -> 0px
    const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);

    // Horizontal position: centered left alignment -> full left
    const x = useTransform(scrollYProgress, [0, 1], ['5vw', '0vw']);

    // Vertical position
    const y = useTransform(scrollYProgress, [0, 1], ['15vh', '0vh']);

    // 3D perspective transforms for stretchy effect
    // This creates the asymmetric stretching look
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -8, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);
    const skewY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 2, -1, 0]);
    const skewX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, -3, 2, 0]);

    // Scale for the bouncy feel
    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1.02, 1]);

    // Opacity for overlay content
    const overlayOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: '150vh' }} // Scroll space for animation - user must scroll through this entirely
        >
            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-start justify-start"
                style={{ perspective: '1500px' }}
            >
                <motion.div
                    style={{
                        width,
                        height,
                        borderRadius,
                        x,
                        y,
                        rotateY,
                        rotateX,
                        skewX,
                        skewY,
                        scale,
                        transformStyle: 'preserve-3d',
                    }}
                    className="relative overflow-hidden shadow-2xl origin-top-left will-change-transform"
                >
                    {/* Image */}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Play button and content overlay - appears when expanded */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ opacity: overlayOpacity }}
                    >
                        {/* Decorative crosses grid */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Top row */}
                            <span className="absolute top-4 left-4 text-white/50 text-xl">+</span>
                            <span className="absolute top-4 left-1/4 text-white/50 text-xl">+</span>
                            <span className="absolute top-4 left-1/2 text-white/50 text-xl">+</span>
                            <span className="absolute top-4 left-3/4 text-white/50 text-xl">+</span>
                            <span className="absolute top-4 right-4 text-white/50 text-xl">+</span>

                            {/* Bottom row */}
                            <span className="absolute bottom-4 left-4 text-white/50 text-xl">+</span>
                            <span className="absolute bottom-4 left-1/4 text-white/50 text-xl">+</span>
                            <span className="absolute bottom-4 left-1/2 text-white/50 text-xl">+</span>
                            <span className="absolute bottom-4 left-3/4 text-white/50 text-xl">+</span>
                            <span className="absolute bottom-4 right-4 text-white/50 text-xl">+</span>
                        </div>

                        {/* Play button */}
                        <button className="group flex items-center space-x-6">
                            <span className="text-white text-4xl md:text-6xl font-serif font-bold tracking-wider opacity-90">PLAY</span>
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Icons.Play className="w-6 h-6 md:w-8 md:h-8 text-terracotta-900 ml-1" />
                            </div>
                            <span className="text-white text-4xl md:text-6xl font-serif font-bold tracking-wider opacity-90">REEL</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Side content - visible when not fullscreen */}
                <motion.div
                    className="absolute right-8 top-1/2 -translate-y-1/2 max-w-md hidden lg:block"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
                        x: useTransform(scrollYProgress, [0, 0.3], [0, 100])
                    }}
                >
                    <h2 className="text-4xl font-serif font-bold text-terracotta-900 mb-4">{title}</h2>
                    <p className="text-terracotta-700 text-lg leading-relaxed">
                        Scroll to explore the full project showcase and experience our premium craftsmanship.
                    </p>
                    <div className="mt-6 flex items-center space-x-2 text-terracotta-600">
                        <Icons.ArrowDown className="w-5 h-5 animate-bounce" />
                        <span className="text-sm font-bold uppercase tracking-widest">Scroll to Expand</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Scroll-locked horizontal gallery component
const ScrollLockedGallery = ({ images, title }: { images: string[]; title: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Calculate horizontal movement based on number of images
    // Each image is 80vw + 2rem gap (approx 85vw total per image)
    const totalImages = images.length;

    // Calculate exact movement needed: move all images except the last one
    // First image starts at 7.5vw padding, each image + gap is ~85vw
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ['0vw', `-${(totalImages - 1) * 85}vw`]
    );

    return (
        // Container height: just enough scroll space for all images without extra gap at end
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${totalImages * 80}vh` }}
        >
            {/* Sticky wrapper that stays in viewport */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div
                    style={{ x }}
                    className="flex gap-8 pl-[7.5vw] will-change-transform"
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-[80vw] group"
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
                                <img
                                    src={image}
                                    alt={`${title} - Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-terracotta-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Image counter */}
                                <div className="absolute bottom-6 right-6 bg-terracotta-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm">
                                    {index + 1} / {totalImages}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const PortfolioDetail = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const project = projectId ? projectsData[projectId] : null;

    // Track global scroll for parallax background effects
    const { scrollY } = useScroll();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-terracotta-50">
                <div className="text-center">
                    <h1 className="text-4xl font-serif font-bold text-terracotta-900 mb-4">Project Not Found</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-terracotta-600 hover:text-terracotta-700 font-bold uppercase tracking-widest text-sm"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-terracotta-50 relative">
            {/* Background decorative elements - contained in overflow-hidden */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Floating Particles Background */}
                <FloatingParticles count={30} />

                {/* Flowing Curves - Lusion-style design elements with parallax scroll */}
                <FlowingCurve scrollY={scrollY} className="w-[150%] h-[600px] top-[10%] -left-[25%] opacity-60" />
                <FlowingCurveAlt scrollY={scrollY} className="w-[120%] h-[400px] top-[60%] -right-[20%] opacity-40" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-terracotta-50/90 backdrop-blur-md border-b border-terracotta-200/50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back Button */}
                        <MagneticButton cursorText="BACK">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-2 text-terracotta-900 hover:text-terracotta-600 transition-colors duration-300 group"
                            >
                                <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                                <span className="font-bold uppercase tracking-widest text-xs">Back</span>
                            </button>
                        </MagneticButton>

                        {/* Logo */}
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <span className="text-2xl font-serif font-bold text-terracotta-900 tracking-wider">RM BATT</span>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            <MagneticButton cursorText="CONTACT">
                                <button className="hidden md:flex items-center space-x-2 bg-terracotta-600 text-white px-5 py-2.5 rounded-full hover:bg-terracotta-700 transition-colors duration-300 font-bold uppercase tracking-widest text-xs">
                                    <span>Let's Talk</span>
                                    <Icons.ArrowRight className="w-4 h-4" />
                                </button>
                            </MagneticButton>
                            <button className="text-terracotta-900 hover:text-terracotta-600 transition-colors duration-300">
                                <Icons.Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stretchy Hero Image */}
            <section className="w-full relative z-10">
                <StretchyHeroImage image={project.images[0]} title={project.title} />
            </section>

            {/* Project Details Section */}
            <section className="container mx-auto px-6 py-16 md:py-24 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Title with Text Reveal */}
                    <div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-terracotta-900 mb-8 leading-tight">
                            <TextReveal>{`${project.title}:`}</TextReveal>
                            <span className="block mt-2 text-terracotta-700">
                                <TextReveal delay={0.3}>{project.category}</TextReveal>
                            </span>
                        </h1>
                    </div>

                    {/* Right Column - Description & Details with Staggered Animation */}
                    <StaggeredGrid className="space-y-8 md:pt-16">
                        <StaggeredItem>
                            <p className="text-terracotta-800 text-lg leading-relaxed">
                                {project.description}
                            </p>
                        </StaggeredItem>

                        {/* Services */}
                        <StaggeredItem>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-terracotta-600 font-bold mb-4">Services</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.services.map((service, idx) => (
                                        <motion.span
                                            key={idx}
                                            className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-terracotta-900 font-medium text-sm border border-terracotta-200 hover:border-terracotta-400 hover:bg-terracotta-50 transition-all duration-300"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            {service}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </StaggeredItem>

                        {/* Recognitions */}
                        <StaggeredItem>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-terracotta-600 font-bold mb-4">Recognitions</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.recognitions.map((recognition, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex items-center space-x-2 text-terracotta-900 font-medium"
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500"></span>
                                            <span>{recognition}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </StaggeredItem>

                        {/* Watch Video Button */}
                        <StaggeredItem>
                            <MagneticButton cursorText="PLAY">
                                <button className="flex items-center space-x-3 bg-white text-terracotta-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold uppercase tracking-widest text-xs group border-2 border-terracotta-200 hover:border-terracotta-400">
                                    <Icons.Play className="w-4 h-4 fill-current text-terracotta-600" />
                                    <span>Watch Video</span>
                                </button>
                            </MagneticButton>
                        </StaggeredItem>
                    </StaggeredGrid>
                </div>
            </section>

            {/* Scroll-Locked Horizontal Gallery */}
            <section className="w-full">
                <ScrollLockedGallery images={project.images} title={project.title} />
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-16 md:py-24 relative z-10">
                <motion.div
                    className="relative bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-orange-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"
                            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 relative z-10">
                        <TextReveal>Ready to Create Your Masterpiece?</TextReveal>
                    </h2>
                    <p className="text-terracotta-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                        Let's discuss how we can bring your vision to life with premium signage solutions.
                    </p>
                    <MagneticButton cursorText="LET'S GO" className="inline-block relative z-10">
                        <button
                            onClick={() => navigate('/#contact')}
                            className="bg-white text-terracotta-600 hover:bg-terracotta-50 px-8 py-4 rounded-full font-bold tracking-wide text-sm uppercase transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
                        >
                            Get in Touch
                        </button>
                    </MagneticButton>
                </motion.div>
            </section>

            {/* Footer Spacer */}
            <div className="h-24"></div>
        </div>
    );
};

export default PortfolioDetail;
