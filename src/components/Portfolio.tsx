import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from './Icons';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    category: string;
    img: string;
    materials: string[];
    dimensions: string;
    description: string;
    color: string;
}

const projects: Project[] = [
    {
        id: "apex-tower",
        title: "Apex Tower",
        category: "Corporate Identity",
        img: "https://picsum.photos/seed/building1/600/800",
        materials: ["Brushed Stainless Steel", "LED Backlighting", "Acrylic Face"],
        dimensions: "8ft x 4ft x 6in",
        description: "Premium corporate signage featuring brushed stainless steel construction with integrated LED backlighting. The three-dimensional letters create a commanding presence in the building's lobby, reflecting the company's commitment to excellence and innovation.",
        color: "#f8fafc"
    },
    {
        id: "luxe-residences",
        title: "Luxe Residences",
        category: "3D Metal Lettering",
        img: "https://picsum.photos/seed/metal/600/800",
        materials: ["Brass with Gold Plating", "Powder-Coated Aluminum", "Weather-Resistant Coating"],
        dimensions: "12ft x 3ft x 8in",
        description: "Elegant 3D metal lettering with gold-plated brass finish, designed to withstand outdoor elements while maintaining its luxurious appearance. Each letter is individually crafted and mounted for maximum visual impact.",
        color: "#f1f5f9"
    },
    {
        id: "zenith-corp",
        title: "Zenith Corp",
        category: "Acrylic Fascia",
        img: "https://picsum.photos/seed/acrylic/600/800",
        materials: ["High-Grade Acrylic", "RGB LED System", "Aluminum Frame"],
        dimensions: "10ft x 5ft x 4in",
        description: "Modern acrylic fascia signage with programmable RGB LED system, allowing for dynamic color changes and animations. The sleek design combines transparency with bold branding for a contemporary corporate aesthetic.",
        color: "#e2e8f0"
    },
    {
        id: "neon-district",
        title: "Neon District",
        category: "LED Neon Installations",
        img: "https://picsum.photos/seed/neon/600/800",
        materials: ["Flexible LED Neon", "Transparent Acrylic Backing", "Smart Control System"],
        dimensions: "15ft x 6ft x 2in",
        description: "Vibrant LED neon installation featuring flexible neon tubing with smart control capabilities. Energy-efficient and fully customizable, this installation creates an eye-catching focal point with retro-modern appeal.",
        color: "#cbd5e1"
    },
    {
        id: "velocity-logistics",
        title: "Velocity Logistics",
        category: "Fleet Branding",
        img: "https://picsum.photos/seed/logistics/600/800",
        materials: ["3M Vinyl Wrap", "UV-Resistant Laminate", "Reflective Elements"],
        dimensions: "15ft x 6ft x 2in",
        description: "Comprehensive fleet branding solution using premium 3M vinyl materials with UV-resistant laminate. The design incorporates reflective elements for enhanced visibility and safety while maintaining brand consistency across the entire fleet.",
        color: "#94a3b8"
    },
    {
        id: "the-coffee-lab",
        title: "The Coffee Lab",
        category: "Branding Suite",
        img: "https://picsum.photos/seed/coffee/600/800",
        materials: ["Reclaimed Wood", "Laser-Cut Metal", "Chalkboard Paint", "Edison Bulbs"],
        dimensions: "Various (Complete Store)",
        description: "Complete branding suite for artisanal coffee shop, combining rustic reclaimed wood with modern laser-cut metal elements. The design includes menu boards, wall signage, and ambient lighting to create a warm, inviting atmosphere.",
        color: "#64748b"
    },
];

const Card = ({
    i,
    project,
    progress,
    range,
    targetScale,
    handleCardClick
}: {
    i: number;
    project: Project;
    progress: MotionValue<number>;
    range: number[];
    targetScale: number;
    handleCardClick: (project: Project) => void;
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`,
                    top: `calc(-5vh + ${i * 25}px)`
                }}
                className="flex flex-col relative -top-[25%] h-[550px] w-full max-w-5xl rounded-3xl p-6 md:p-10 origin-top border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_-15px_rgba(234,88,12,0.4)] transition-shadow duration-500 backdrop-blur-sm"
            >
                <div className="flex flex-col md:flex-row h-full gap-6 md:gap-12 group cursor-pointer" onClick={() => handleCardClick(project)}>
                    {/* Image Section - Stack on mobile, Left on desktop */}
                    <div className="w-full md:w-[40%] h-full relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-white/20">
                        <motion.div style={{ scale: imageScale }} className="w-full h-full">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="object-cover w-full h-full group-hover:brightness-110 transition-all duration-500"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/10 transition-all duration-500"></div>
                    </div>

                    {/* Content Section - Stack on mobile, Right on desktop */}
                    <div className="w-full md:w-[60%] flex flex-col justify-between py-2 md:py-4">
                        <div>
                            <div className="flex items-center space-x-3 mb-3 md:mb-6">
                                <span className="w-2 h-2 rounded-full bg-terracotta-500 shadow-[0_0_8px_rgba(234,88,12,0.6)] group-hover:scale-125 transition-transform duration-300"></span>
                                <span className="text-terracotta-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">{project.category}</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-3 md:mb-6 leading-tight group-hover:text-terracotta-600 transition-colors duration-300 drop-shadow-sm">{project.title}</h3>
                            <p className="text-slate-700 leading-relaxed text-sm md:text-lg line-clamp-3 md:line-clamp-none">{project.description}</p>
                        </div>

                        <div className="flex items-center text-slate-900 font-bold uppercase tracking-[0.2em] text-xs md:text-sm group-hover:translate-x-2 transition-transform duration-300 mt-4 md:mt-0">
                            View Project <Icons.ArrowRight className="ml-2 w-4 h-4 text-terracotta-500 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Portfolio = () => {
    const navigate = useNavigate();
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const handleCardClick = (project: Project) => {
        navigate(`/portfolio/${project.id}`);
    };

    return (
        <section ref={container} id="portfolio" className="relative bg-white">
            {/* Header Section */}
            <div className="container mx-auto px-6 mb-20 relative z-10">
                <div className="flex flex-col items-start text-left">
                    <span className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Selected Works</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6">Masterpieces</h2>
                    <p className="max-w-xl text-slate-500 text-lg">
                        Explore our collection of premium signage solutions, where precision engineering meets artistic vision.
                    </p>
                </div>
            </div>

            {/* Cards Stack */}
            <div className="container mx-auto px-6 pb-[20vh]">
                {projects.map((project, index) => {
                    const targetScale = 1; // Keep all cards the same size
                    return (
                        <Card
                            key={index}
                            i={index}
                            project={project}
                            progress={scrollYProgress}
                            range={[index * 0.25, 1]}
                            targetScale={targetScale}
                            handleCardClick={handleCardClick}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Portfolio;