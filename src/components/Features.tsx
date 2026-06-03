import { FadeIn } from "./FadeIn";

export function Features() {
    return (
        <>
            <section id="diferenciais" className="py-16 md:py-32 px-6 bg-celere-black border-t border-celere-gold/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_100%)] z-0"></div>

                <div className="container mx-auto relative z-10">
                    <FadeIn>
                        <span className="text-celere-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block text-center">Nossa Fundamentação</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 md:mb-20 text-white">Os Pilares Célere</h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: "I", title: "Consultoria & Desenho", desc: "Entendimento minucioso do perfil logístico da família e da arquitetura do imóvel para um direcionamento sob medida." },
                            { num: "II", title: "Engenharia de Projeto", desc: "Plantas executivas de infraestrutura completas. Eliminação total de surpresas ou improvisos técnicos na obra." },
                            { num: "III", title: "Execução Cirúrgica", desc: "Corpo técnico próprio especializado. Instalação silenciosa e impecável, com absoluto rigor estético." },
                            { num: "IV", title: "Pós-Venda Ativo", desc: "Monitoramento proativo dos sistemas em rede e suporte técnico ágil para assegurar estabilidade perene." },
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 150} className="h-full">
                                <div className="group flex flex-col p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-celere-gold/20 h-full relative overflow-hidden">
                                    <div className="text-4xl font-serif text-celere-gold/40 group-hover:text-celere-gold transition-colors duration-500 mb-6">{item.num}.</div>
                                    <h3 className="text-xl font-bold mb-4 text-white tracking-wide">{item.title}</h3>
                                    <p className="text-[#F6F2EA]/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section id="como-funciona" className="py-16 md:py-32 px-6 container mx-auto">
                <FadeIn>
                    <div className="bg-[#FAFAFA] rounded-3xl border border-[rgba(18,18,18,.05)] px-5 py-10 md:p-20 relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-celere-gold to-transparent"></div>
                        <h2 className="text-3xl font-serif font-bold text-center mb-4 text-celere-black">O método Célere de entrega</h2>
                        <p className="text-center text-celere-gray max-w-2xl mx-auto mb-16 text-sm md:text-base">Previsibilidade, transparência técnica e acompanhamento passo a passo, desde o primeiro traço arquitetônico até o último teste em interface.</p>

                        <div className="grid md:grid-cols-4 gap-8 relative items-start">
                            {/* Linha horizontal para desktop */}
                            <div className="hidden md:block absolute top-[32px] left-[12%] right-[12%] h-[2px] bg-celere-gold/20 z-0"></div>
                            {/* Linha vertical para mobile */}
                            <div className="block md:hidden absolute left-[50%] top-8 bottom-[72px] w-[2px] bg-celere-gold/20 -translate-x-1/2 z-0"></div>
                            
                            {[
                                "Imersão & Visita Técnica",
                                "Apresentação do Projeto e Orçamento",
                                "Passagem de Infra / Execução Lógica",
                                "Start-Up, Programação e Entrega Guiada"
                            ].map((text, i) => (
                                <FadeIn key={i} delay={i * 200} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-full bg-white border-4 border-celere-gold flex items-center justify-center font-serif text-2xl font-bold text-celere-gold mb-6 relative shadow-md group-hover:scale-110 transition-transform bg-clip-padding">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-bold text-sm tracking-wide text-celere-black px-4">{text}</h3>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </section>
        </>
    );
}
