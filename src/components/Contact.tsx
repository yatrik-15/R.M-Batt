import { Icons } from './Icons';

const Contact = () => {
    return (
        <section id="contact" className="py-32 relative bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="glass-panel max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white border border-slate-200 reveal">
                    {/* Left Side: Visuals */}
                    <div className="lg:w-1/3 bg-slate-900 relative p-12 flex flex-col justify-between overflow-hidden text-white">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-terracotta-500 rounded-full blur-[80px] opacity-40"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-serif font-bold mb-6">Let's Talk <br /><span className="text-terracotta-400">Business.</span></h3>
                            <p className="text-slate-300 text-sm mb-8">Ready to illuminate your brand? Fill out form or drop by our workshop.</p>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center">
                                <Icons.MapPin className="text-terracotta-400 mr-4 w-5 h-5" />
                                <span className="text-sm">Industrial Area, Batco India</span>
                            </div>
                            <div className="flex items-center">
                                <Icons.Phone className="text-terracotta-400 mr-4 w-5 h-5" />
                                <span className="text-sm">+91 123 456 7890</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-2/3 p-12 bg-white">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-terracotta-500 transition-colors">Name</label>
                                    <input type="text" className="w-full bg-slate-50 border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-terracotta-500 transition-colors placeholder-slate-300" placeholder="John Doe" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-terracotta-500 transition-colors">Email</label>
                                    <input type="email" className="w-full bg-slate-50 border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-terracotta-500 transition-colors placeholder-slate-300" placeholder="john@company.com" />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 group-focus-within:text-terracotta-500 transition-colors">Message</label>
                                <textarea rows={4} className="w-full bg-slate-50 border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-terracotta-500 transition-colors placeholder-slate-300" placeholder="Tell us about your project..."></textarea>
                            </div>
                            <button className="btn-terracotta px-8 py-4 w-full md:w-auto rounded-full font-bold tracking-wide text-sm uppercase mt-4">
                                Send Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
