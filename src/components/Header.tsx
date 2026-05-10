import { useState, useEffect } from 'react';
import { Icons } from './Icons';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Home', 'Portfolio', 'Services', 'Why Us', 'Contact'];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-gray-100' : 'py-8 bg-transparent'}`}>
            <div className="container mx-auto px-6 rounded-full transition-all duration-500 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white border border-terracotta-400 flex items-center justify-center text-terracotta-500 font-serif font-bold text-xl relative overflow-hidden shadow-sm">
                        <span className="relative z-10">R</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif font-bold tracking-widest text-slate-900">RM <span className="text-terracotta-500">BATT</span></span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 -mt-1">Signage & Co.</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-xs font-medium uppercase tracking-widest text-slate-600 hover:text-terracotta-500 transition-colors relative group">
                            {link}
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-terracotta-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-terracotta-500 transition-all duration-300 shadow-lg">
                        Get Quote
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col space-y-4 rounded-b-2xl mx-4">
                    {navLinks.map((link) => (
                        <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium block text-center py-2 text-slate-800 border-b border-gray-50">
                            {link}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
