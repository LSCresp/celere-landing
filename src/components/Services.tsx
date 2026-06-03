import { Shield, Wifi, Speaker, Lightbulb, Settings, Zap } from "lucide-react";
import { FadeIn } from "./FadeIn";

export function Services() {
    const solutions = [
        { icon: Wifi, title: "Infraestrutura de Rede", desc: "A espinha dorsal do projeto. Wi-Fi de grau corporativo, zero pontos cegos e estabilidade absoluta para sustentar todos os subsistemas." },
        { icon: Lightbulb, title: "Iluminação Arquitetônica", desc: "Controle lumínico inteligente focado no bem-estar, dimerização precisa e valorização do seu projeto de interiores." },
        { icon: Speaker, title: "Áudio & Vídeo Oculto", desc: "Performance acústica de alta fidelidade e telas perfeitamente integradas ou invisíveis na sua decoração." },
        { icon: Settings, title: "Clima & Motorização", desc: "Gestão térmica inteligente integrada à entrada natural de luz via cortinas, garantindo conforto climático constante e invisível." },
        { icon: Shield, title: "Segurança Perimetral", desc: "Monitoramento analítico de alta resolução, acessos biométricos e blindagem da rotina para tranquilidade total da família." },
        { icon: Zap, title: "Convergência Total", desc: "A verdadeira inteligência. Sua casa orquestrando todos os sistemas de forma autônoma ou via aplicativo minimalista único." },
    ];

    return (
        <section id="solucoes" className="py-16 md:py-32 px-6 bg-[#FAFAFA] relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F6F2EA] to-transparent z-0"></div>
            <div className="container mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-12 md:mb-20">
                        <span className="text-celere-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Fundação Tecnológica</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#121212]">O Alicerce da sua Interação</h2>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((item, i) => (
                        <FadeIn key={i} delay={i * 100}>
                            <div className="bg-[#FDFBF7] p-6 sm:p-8 md:p-10 border border-[rgba(18,18,18,.04)] hover:border-celere-gold/30 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.08)] transition-all duration-500 group relative overflow-hidden rounded-2xl h-full flex flex-col justify-between">
                                <div className="absolute -top-4 -right-4 text-7xl sm:text-8xl md:text-9xl font-serif font-bold text-[#F8F6F0]/60 group-hover:text-celere-gold/5 transition-colors duration-500 select-none z-0">
                                    0{i + 1}
                                </div>

                                <div className="relative z-10">
                                    <item.icon className="w-10 h-10 text-celere-gold mb-6 md:mb-8 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
                                    <h3 className="text-xl md:text-2xl font-serif font-bold mb-4 text-[#121212]">{item.title}</h3>
                                    <p className="text-[#121212]/70 leading-relaxed text-sm md:text-base">{item.desc}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
