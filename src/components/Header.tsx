"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const closeMenu = () => {
            if (isMenuOpen) setIsMenuOpen(false);
        };
        window.addEventListener('scroll', closeMenu);
        return () => window.removeEventListener('scroll', closeMenu);
    }, [isMenuOpen]);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-celere-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${scrolled
            ? "bg-[#050505]/95 backdrop-blur-xl py-2"
            : "py-5"
            }`}>

            {/* Background da Imagem (Aparece apenas quando não scrollado) */}
            <div
                className={`absolute inset-0 w-full h-full z-[-2] bg-contain bg-center bg-repeat-x transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundImage: "url('/bg-header.png')" }}
            ></div>
            {/* Overlay Escuro com Degradê Leve sobre a imagem p/ garantir contraste sem apagar a imagem */}
            <div className={`absolute inset-0 w-full h-full z-[-1] transition-all duration-500 ${scrolled ? 'opacity-0' : 'bg-black/50'}`}></div>

            <div className="container mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-500">
                <a href="#" className="flex items-center gap-4 outline-none transition-transform hover:scale-105 duration-500">
                    <img
                        src="/logo.png"
                        alt="Célere Engenharia de Automação"
                        className={`w-auto object-contain rounded-2xl transition-all duration-500 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] ${scrolled ? 'h-[2.2rem] md:h-[4.5rem]' : 'h-[3.2rem] md:h-[6.5rem]'}`}
                    />
                </a>

                <nav className="hidden md:flex items-center gap-6 text-[14px] font-semibold tracking-wide text-white/90">
                    <a href="#solucoes" className="relative group px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(253,251,247,0.4)]">
                        Soluções
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </a>
                    <a href="#diferenciais" className="relative group px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(253,251,247,0.4)]">
                        Diferenciais
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </a>
                    <a href="#pacotes" className="relative group px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(253,251,247,0.4)]">
                        Perfis
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </a>
                    <a href="#contato" className="ml-2 bg-gold-gradient text-[#121212] px-8 py-3 rounded-full hover:brightness-110 transition-all duration-500 shadow-[0_4px_14px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.35)] font-bold tracking-wider text-sm relative overflow-hidden group flex items-center gap-2">
                        <span className="relative z-10 transition-transform group-hover:-translate-x-1">Solicitar Orçamento</span>
                        <span className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 font-black">&rarr;</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-30deg] animate-[shine_3s_ease-in-out_infinite] transition-colors"></div>
                    </a>
                </nav>

                <button aria-label="Abrir Menu" className="md:hidden text-white p-2 transition-transform hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu Backdrop */}
            <div 
                className={`md:hidden fixed inset-x-0 bottom-0 top-[100%] bg-black/60 backdrop-blur-sm z-40 transition-all duration-500 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-[100%] left-0 w-full bg-[#121212]/95 backdrop-blur-3xl border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden z-50 ${isMenuOpen ? "max-h-[400px] opacity-100 shadow-2xl" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <nav className="flex flex-col p-8 gap-6 text-white/90 text-[15px] font-medium tracking-wide">
                    <a href="#solucoes" onClick={() => setIsMenuOpen(false)} className="hover:text-celere-gold transition-colors py-2 border-b border-white/5">Soluções</a>
                    <a href="#diferenciais" onClick={() => setIsMenuOpen(false)} className="hover:text-celere-gold transition-colors py-2 border-b border-white/5">Diferenciais</a>
                    <a href="#pacotes" onClick={() => setIsMenuOpen(false)} className="hover:text-celere-gold transition-colors py-2 border-b border-white/5">Perfis de Projeto</a>
                    <a href="#contato" onClick={() => setIsMenuOpen(false)} className="mt-4 bg-gold-gradient text-[#121212] px-8 py-3.5 rounded-full hover:brightness-110 transition-all duration-500 shadow-[0_4px_14px_rgba(212,175,55,0.2)] font-bold tracking-wider text-sm text-center flex items-center justify-center gap-2">
                        Solicitar Orçamento &rarr;
                    </a>
                </nav>
            </div>
        </header>
    );
}
