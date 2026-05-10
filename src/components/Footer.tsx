
const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-8">
                    <h2 className="text-2xl font-serif font-bold text-white">RM BATT</h2>
                    <p className="text-xs text-slate-500 tracking-widest uppercase mt-2">Signage & Design Solutions</p>
                </div>
                <div className="flex justify-center space-x-8 mb-8 text-sm text-slate-400">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Facebook</a>
                </div>
                <p className="text-xs text-slate-600">© 2023 RM Batt & Co. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
