import { motion } from 'framer-motion';

// Sample project images - these will slide horizontally
const projectImages = [
    "https://picsum.photos/seed/sign1/400/500",
    "https://picsum.photos/seed/sign2/400/500",
    "https://picsum.photos/seed/sign3/400/500",
    "https://picsum.photos/seed/sign4/400/500",
    "https://picsum.photos/seed/sign5/400/500",
    "https://picsum.photos/seed/sign6/400/500",
];

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden pt-20 pb-16" style={{ background: 'linear-gradient(135deg, #fef3e2 0%, #fee8d0 50%, #fff7ed 100%)' }}>
            {/* Top Section: Heading and Subtitle with container */}
            <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    {/* Left: Main Heading */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-slate-900 leading-[0.9] tracking-tight">
                            R.M Batt
                        </h1>
                    </motion.div>

                    {/* Right: Subtitle */}
                    <motion.div
                        className="flex-1 max-w-md"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                            Premium signage solutions — Crafting nameplates, stamps, engraving, 3D letters, and custom branding that make lasting impressions.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section: Full-width Sliding Images */}
            <div className="relative w-full overflow-hidden">
                {/* Sliding images container */}
                <motion.div
                    className="flex gap-4 md:gap-6"
                    animate={{
                        x: [0, -1800], // Adjust based on image widths
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Render images twice for seamless loop */}
                    {[...projectImages, ...projectImages, ...projectImages].map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-64 md:w-80 lg:w-96 h-80 md:h-96 lg:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-200 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={src}
                                alt={`Project ${(index % projectImages.length) + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
