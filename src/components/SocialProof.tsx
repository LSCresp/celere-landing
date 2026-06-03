"use client";

import { Star } from "lucide-react";
import { FadeIn } from "./FadeIn";

export function SocialProof() {
    return (
        <section className="py-16 md:py-32 px-6 bg-[#FAFAFA] border-t border-[rgba(18,18,18,.05)]">
            <div className="container mx-auto text-center">
                <FadeIn>
                    <span className="text-celere-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Impacto Real</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12 md:mb-20 text-[#121212]">Engenharia que transforma o viver</h2>
                </FadeIn>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { 
                            title: "Limpeza Arquitetônica", 
                            metric: "De 14 interruptores para 1 Painel Inteligente", 
                            desc: "Eliminamos a poluição visual das paredes. O controle integral do living, dimerização e cortinas foi unificado em interfaces descentralizadas e elegantes, valorizando o design de interiores."
                        },
                        { 
                            title: "Gestão Autônoma", 
                            metric: "Ecossistema 100% Simbiótico", 
                            desc: "O imóvel entende a rotina climática: cortinas fecham no poente, o ar condicionado prepara a suíte e a iluminação se ajusta ao ciclo circadiano sem nenhum toque."
                        },
                        { 
                            title: "Infraestrutura Inabalável", 
                            metric: "Roaming Corporativo Absoluto", 
                            desc: "Projeto executivo blindado garante transição de Wi-Fi sem quedas ao caminhar pela residência, suportando streaming em 8k e automação sem gargalos de rede."
                        }
                    ].map((item, i) => (
                        <div key={`proof-${i}`} className="h-full">
                            <FadeIn delay={i * 150} direction="up" className="h-full">
                                <div className="bg-[#FDFBF7] p-6 sm:p-8 md:p-10 border border-[rgba(18,18,18,.04)] text-left rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] h-full flex flex-col hover:-translate-y-2 transition-transform duration-500">
                                    <h3 className="text-xl font-bold text-[#121212] mb-2">{item.title}</h3>
                                    <div className="text-celere-gold font-serif font-medium mb-6 text-sm tracking-wide">{item.metric}</div>
                                    <p className="text-[#121212]/70 leading-relaxed text-[15px]">{item.desc}</p>
                                </div>
                            </FadeIn>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
