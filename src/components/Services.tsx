
import { Icons } from './Icons';

const Services = () => {
    const services = [
        { icon: <Icons.PenTool />, title: "Custom Signboards", desc: "Bespoke fabrications tailored to your architectural needs." },
        { icon: <Icons.Layers />, title: "Acrylic Solutions", desc: "Laser-cut, polished, and illuminated acrylic displays." },
        { icon: <Icons.Lightbulb />, title: "LED Integration", desc: "Advanced lighting modules for energy efficiency and impact." },
        { icon: <Icons.Star />, title: "Brand Identity", desc: "Comprehensive signage guides for corporate consistency." },
    ];

    return (
        <section id="services" className="py-32 relative bg-slate-50">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-50/50 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 reveal">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">Capabilities</h2>
                    <p className="text-slate-500 leading-relaxed text-lg">
                        We combine traditional craftsmanship with cutting-edge technology to deliver signage solutions that endure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-12 relative overflow-hidden group reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 mb-8 text-terracotta-500 bg-orange-50 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-terracotta-500 group-hover:text-white transition-all duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900 group-hover:text-terracotta-500 transition-colors">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">{service.desc}</p>
                            </div>
                            {/* Decorative Number */}
                            <span className="absolute bottom-6 right-6 text-6xl font-serif text-slate-100 font-bold">{`0${index + 1}`}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
