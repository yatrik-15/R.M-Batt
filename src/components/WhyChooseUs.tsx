
import { Icons } from './Icons';

const WhyChooseUs = () => {
    const stats = [
        { val: "15+", label: "Years Experience" },
        { val: "500+", label: "Projects Delivered" },
        { val: "100%", label: "Client Satisfaction" },
    ];

    return (
        <section id="why-us" className="py-24 bg-white border-y border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <span className="text-terracotta-500 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Our Promise</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-slate-900">Uncompromising Quality</h2>
                        <div className="space-y-6 text-slate-600">
                            <p className="flex items-start">
                                <Icons.ShieldCheck className="text-terracotta-500 mr-4 mt-1 w-5 h-5 flex-shrink-0" />
                                <span>Only industrial-grade raw materials sourced from top vendors.</span>
                            </p>
                            <p className="flex items-start">
                                <Icons.Clock className="text-terracotta-500 mr-4 mt-1 w-5 h-5 flex-shrink-0" />
                                <span>Rigorous quality control checks at every stage of production.</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 reveal">
                        {stats.map((stat, i) => (
                            <div key={i} className="glass-card p-6 text-center border-none bg-slate-50 shadow-sm">
                                <h4 className="text-4xl font-serif font-bold text-slate-900 mb-2">{stat.val}</h4>
                                <p className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
