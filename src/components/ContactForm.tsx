"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, CheckCircle2, X } from "lucide-react";
import { FadeIn } from "./FadeIn";

export function ContactForm() {
    const [formData, setFormData] = useState({
        nome: "", uf: "", cidade: "", situacao: "Ainda em projeto (Planta)",
        whatsapp: "", observacoes: ""
    });
    
    // UI States
    const [prioridades, setPrioridades] = useState<string[]>([]);
    const [ufs, setUfs] = useState<{ id: number, sigla: string, nome: string }[]>([]);
    const [cidades, setCidades] = useState<{ id: number, nome: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Custom Dropdown States
    const [citySearch, setCitySearch] = useState("");
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, ""); // Retira tudo que não é dígito
        
        if (v.length <= 11) {
            v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses
            v = v.replace(/(\d)(\d{4})$/, '$1-$2');    // Coloca hífen
        } else {
            v = v.substring(0, 15); // Limita tamanho total
        }
        
        setFormData({ ...formData, whatsapp: v });
    };

    const handleInvalid = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        (e.target as HTMLInputElement).setCustomValidity('Por favor, preencha este campo obrigatório.');
    };
    const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        (e.target as HTMLInputElement).setCustomValidity('');
    };

    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            .then(res => res.json())
            .then(data => setUfs(data))
            .catch(() => console.error("Erro ao buscar UFs"));

        // Click outside listener for dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowCityDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const uf = e.target.value;
        setFormData({ ...formData, uf, cidade: "" });
        setCitySearch("");
        
        if (uf) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
                .then(res => res.json())
                .then(data => setCidades(data))
                .catch(() => console.error("Erro ao buscar cidades"));
        } else {
            setCidades([]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const listaPrioridades = prioridades.length > 0 ? prioridades.join(", ") : "Não especificado diretamente";
        
        // Requisição "Fire and Forget" no background (não trava o site esperando as APIs e o Google Sheets responderem)
        fetch('/api/submit-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...formData, 
                prioridades: listaPrioridades,
                data_solicitacao: new Date().toLocaleString("pt-BR")
            })
        }).catch(error => console.error("Erro no envio do lead", error));

        // Feedback de Loading com 800ms de duração só para transmitir peso premium de processamento, e Pop-up imediato
        setTimeout(() => {
            setIsSubmitting(false);
            setShowModal(true); // Exibe o pop-up instantaneamente!
            
            // Background Clear (Limpa os dados por trás do Modal)
            setFormData({
                nome: "", uf: "", cidade: "", situacao: "Ainda em projeto (Planta)",
                whatsapp: "", observacoes: ""
            });
            setPrioridades([]);
            setCitySearch("");
        }, 800);
    };

    const handleWhatsAppRedirect = () => {
        const listaPrioridades = prioridades.length > 0 ? prioridades.join(", ") : "Não especificado";
        const msg = `Olá Célere! Gostaria de um orçamento para automação.%0A%0A*Nome:* ${formData.nome}%0A*Local:* ${formData.cidade} - ${formData.uf}%0A*Fase do Imóvel:* ${formData.situacao}%0A*Interesses:* ${listaPrioridades}%0A*Telefone:* ${formData.whatsapp}%0A%0A*Observações:* ${formData.observacoes}`;
        window.open(`https://wa.me/5514997302774?text=${msg}`, "_blank");
        setShowModal(false);
    };

    const cidadesFiltradas = cidades.filter(c => c.nome.toLowerCase().includes(citySearch.toLowerCase()));

    const faqs = [
        { q: "A automação funciona caso a internet caia?", a: "Sistemas comuns e roteadores básicos do mercado param totalmente sem conexão externa. Porém, na Célere podemos oferecer soluções avançadas e descentralizadas focadas no processamento estritamente local que resolvem e evitam esse problema." },
        { q: "Qual a diferença entre a Célere e comprar dispositivos smart comuns?", a: "Equipamentos de varejo (Wi-Fi) sobrecarregam o roteador e dependem de nuvens isoladas. A Célere utiliza protocolos de rede mesh como Zigbee, independentes de Wi-Fi, integrando tudo nativamente em painéis velozes." },
        { q: "É possível instalar a automação em um imóvel já pronto?", a: "Perfeitamente. Diferente da antiga automação centralizada que exigia longos conduítes para quadros elétricos gigantes, nossa arquitetura (wireless e mesh) permite retrofits limpos e sem quebra excessiva de alvenaria." },
        { q: "O sistema ficará obsoleto? Pode ser expandido futuramente?", a: "Nossos projetos são construídos sobre plataformas modulares modernas (como base conceitual Home Assistant). É possível adicionar novos dispositivos e marcas no futuro sem perder o investimento inicial." },
        { q: "Como funciona a manutenção a longo prazo?", a: "Além das garantias, prestamos amplo suporte para corrigir lógicas, diagnosticar dispositivos ou adicionar integrações de forma pontual, mantendo sua casa sempre atualizada e estável." },
    ];

    return (
        <>
            {/* Modal de Sucesso */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-md bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-celere-gold/30 rounded-3xl p-8 shadow-[0_20px_60px_rgba(212,175,55,0.15)] overflow-hidden transform animate-[fadeInUp_0.4s_ease-out]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-celere-gold opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
                        
                        <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="w-16 h-16 bg-celere-gold/10 rounded-full flex items-center justify-center mb-6 border border-celere-gold/20">
                                <CheckCircle2 className="w-8 h-8 text-celere-gold" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-3">Orçamento Enviado!</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Seus dados foram registrados com sucesso e nossa equipe já foi notificada. Você deseja abrir o WhatsApp agora para agilizar o atendimento?
                            </p>
                            
                            <div className="w-full flex justify-center w-full gap-3 flex-col sm:flex-row">
                                <button 
                                    onClick={handleWhatsAppRedirect}
                                    className="w-full px-6 py-3.5 bg-celere-gold text-[#121212] font-bold rounded-xl hover:brightness-110 transition-all shadow-[0_4px_14px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
                                >
                                    Abrir WhatsApp
                                </button>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="w-full px-6 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="py-16 md:py-32 px-6 container mx-auto border-t border-[rgba(18,18,18,.05)] bg-[#FAFAFA]">
                <FadeIn>
                    <span className="text-celere-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block text-center">Tire suas dúvidas</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-12 md:mb-20 text-[#121212]">Perguntas Frequentes</h2>
                </FadeIn>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={`faq-${i}`} className="w-full">
                            <FadeIn delay={i * 100} direction="up" className="w-full block">
                                <details className="group bg-[#FDFBF7] border border-[rgba(18,18,18,.04)] rounded-2xl p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-celere-gold/20 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-lg text-[#121212]">
                                        {faq.q}
                                        <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-celere-gold/10 group-open:bg-celere-gold/10 group-open:border-transparent transition-colors">
                                            <ChevronDown className="transition-transform group-open:rotate-180 text-celere-gold w-5 h-5" />
                                        </div>
                                    </summary>
                                    <p className="mt-6 text-[#121212]/70 leading-relaxed text-base border-t border-[rgba(18,18,18,.04)] pt-6">{faq.a}</p>
                                </details>
                            </FadeIn>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contato" className="py-16 md:py-32 px-6 bg-gradient-to-b from-[#FDFBF7] to-[#F6F2EA] border-t border-[rgba(18,18,18,.05)] relative pb-24 md:pb-40">
                <div className="container mx-auto px-6 max-w-5xl text-center mb-12 md:mb-20">
                    <FadeIn>
                        <span className="text-celere-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Engenharia Sob Medida</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-[#121212]">Inicie seu projeto consultivo</h2>
                        <p className="text-[#121212]/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            Agende uma imersão técnica. Entendemos que cada imóvel possui um DNA único que exige um projeto de infraestrutura tecnológica rigoroso e exclusivo.
                        </p>
                    </FadeIn>
                </div>

                <div className="container mx-auto max-w-6xl grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-5 relative lg:sticky lg:top-32">
                        <FadeIn direction="right">
                            <h2 className="text-4xl font-serif font-bold mb-6 text-celere-black">Dê o primeiro passo.</h2>
                            <p className="text-celere-gray mb-10 text-lg leading-relaxed">
                                Preencha o formulário para entendermos o seu momento. Nossa equipe entrará em contato para agendar uma consultoria detalhada sem compromisso.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-5 text-celere-gray">
                                    <div className="w-12 h-12 rounded-full bg-celere-dark flex items-center justify-center border border-celere-gold/20 shadow-sm text-xl text-celere-black shrink-0">📐</div>
                                    <p className="text-sm font-medium leading-relaxed">Análise estrutural minuciosa da sua planta e alinhamento prático de escopo.</p>
                                </div>
                                <div className="flex items-center gap-5 text-celere-gray">
                                    <div className="w-12 h-12 rounded-full bg-celere-dark flex items-center justify-center border border-celere-gold/20 shadow-sm text-xl text-celere-black shrink-0">🤝</div>
                                    <p className="text-sm font-medium leading-relaxed">Reuniões agendadas conforme sua disponibilidade de agenda e prioridades.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="lg:col-span-7 relative">
                        <FadeIn direction="left" delay={200} className="w-full">
                            <div className="bg-[#FDFBF7] p-5 sm:p-8 md:p-12 border border-[rgba(18,18,18,.04)] rounded-3xl md:rounded-[2.5rem] relative shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-celere-gold opacity-10 blur-[80px] rounded-full pointer-events-none"></div>
                                <form onSubmit={handleFormSubmit} className="space-y-7 relative z-10">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-sm font-bold text-[#121212]">Nome completo</label>
                                            <input
                                                type="text"
                                                className="w-full bg-[#FAFAFA] border border-[rgba(18,18,18,.08)] rounded-xl px-5 py-4 focus:outline-none focus:border-celere-gold/50 focus:bg-[#FDFBF7] focus:ring-4 focus:ring-celere-gold/5 transition-all text-[#121212]"
                                                placeholder="Seu nome completo"
                                                required
                                                onInvalid={handleInvalid}
                                                onInput={handleInput}
                                                value={formData.nome}
                                                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-bold text-[#121212]">Telefone / WhatsApp</label>
                                            <input
                                                type="tel"
                                                className="w-full bg-[#FAFAFA] border border-[rgba(18,18,18,.08)] rounded-xl px-5 py-4 focus:outline-none focus:border-celere-gold/50 focus:bg-[#FDFBF7] focus:ring-4 focus:ring-celere-gold/5 transition-all text-[#121212]"
                                                placeholder="(00) 00000-0000"
                                                required
                                                maxLength={15}
                                                onInvalid={handleInvalid}
                                                onInput={handleInput}
                                                value={formData.whatsapp}
                                                onChange={handlePhoneChange}
                                            />
                                        </div>

                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-bold text-[#121212]">Estado</label>
                                            <select
                                                className="w-full bg-[#FAFAFA] border border-[rgba(18,18,18,.08)] rounded-xl px-5 py-4 focus:outline-none focus:border-celere-gold/50 focus:bg-[#FDFBF7] focus:ring-4 focus:ring-celere-gold/5 transition-all text-[#121212]/80"
                                                required
                                                value={formData.uf}
                                                onChange={handleUfChange}
                                            >
                                                <option value="">Selecione o Estado</option>
                                                {ufs.map(uf => (
                                                    <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div className="space-y-2 col-span-2 md:col-span-1 relative" ref={dropdownRef}>
                                            <label className="text-sm font-bold text-[#121212]">Pesquisar Cidade</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full bg-[#FAFAFA] border border-[rgba(18,18,18,.08)] rounded-xl px-5 py-4 focus:outline-none focus:border-celere-gold/50 focus:bg-[#FDFBF7] focus:ring-4 focus:ring-celere-gold/5 transition-all text-[#121212]/80 disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    placeholder={formData.uf ? "Ex: Bauru..." : "Selecione o Estado primeiro"}
                                                    required
                                                    disabled={!formData.uf || cidades.length === 0}
                                                    value={citySearch}
                                                    onFocus={() => setShowCityDropdown(true)}
                                                    onChange={e => {
                                                        setCitySearch(e.target.value);
                                                        setShowCityDropdown(true);
                                                        setFormData({ ...formData, cidade: e.target.value }); // mantém no form
                                                    }}
                                                />
                                                {formData.uf && <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
                                            </div>
                                            
                                            {showCityDropdown && formData.uf && cidadesFiltradas.length > 0 && (
                                                <div className="absolute z-[60] mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden p-2 animate-[fadeInUp_0.2s_ease-out]">
                                                    {cidadesFiltradas.map(cidade => (
                                                        <div 
                                                            key={cidade.id} 
                                                            className="px-4 py-3 text-sm hover:bg-celere-gold/5 cursor-pointer rounded-lg text-gray-700 hover:text-[#121212] transition-colors"
                                                            onClick={() => {
                                                                setFormData({ ...formData, cidade: cidade.nome });
                                                                setCitySearch(cidade.nome);
                                                                setShowCityDropdown(false);
                                                            }}
                                                        >
                                                            {cidade.nome}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-2 col-span-2 md:col-span-1">
                                            <label className="text-sm font-bold text-[#121212]">Situação do Imóvel</label>
                                            <select
                                                className="w-full bg-[#FAFAFA] border border-[rgba(18,18,18,.08)] rounded-xl px-5 py-4 focus:outline-none focus:border-celere-gold/50 focus:bg-[#FDFBF7] focus:ring-4 focus:ring-celere-gold/5 transition-all text-[#121212]/80"
                                                required
                                                onChange={e => setFormData({ ...formData, situacao: e.target.value })}
                                                value={formData.situacao}
                                            >
                                                <option value="Ainda em projeto (Planta)">Ainda em projeto (Planta)</option>
                                                <option value="Em construção civil">Em construção civil</option>
                                                <option value="Entrando em reforma">Entrando em reforma</option>
                                                <option value="Imóvel pronto pra morar">Imóvel pronto pra morar</option>
                                            </select>
                                        </div>
                                        
                                        <div className="space-y-3 col-span-2 pt-2 border-t border-[rgba(18,18,18,0.04)] mt-2">
                                            <label className="text-sm font-bold text-[#121212] block my-4 pt-1">Quais soluções despertam seu interesse? <span className="text-xs font-normal text-gray-500 block md:inline mt-1 md:mt-0 md:ml-2">(Múltipla escolha)</span></label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {["Iluminação Inteligente", "Climatização", "Áudio e Vídeo", "Segurança (Câmeras/Alarmes)", "Persianas e Cortinas", "Wi-Fi / Rede Mesh"].map((item) => (
                                                    <label key={item} className="flex items-center gap-3 p-4 border border-[rgba(18,18,18,.06)] rounded-xl cursor-pointer hover:bg-celere-gold/5 transition-colors group bg-white shadow-sm">
                                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shadow-inner ${prioridades.includes(item) ? 'bg-[#121212] border-[#121212]' : 'bg-white border-gray-300 group-hover:border-celere-gold'}`}>
                                                            {prioridades.includes(item) && <svg className="w-3 h-3 text-celere-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        <input 
                                                            type="checkbox" 
                                                            className="hidden"
                                                            checked={prioridades.includes(item)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) setPrioridades([...prioridades, item]);
                                                                else setPrioridades(prioridades.filter(p => p !== item));
                                                            }}
                                                        />
                                                        <span className={`text-sm font-semibold transition-colors ${prioridades.includes(item) ? 'text-[#121212]' : 'text-[#121212]/70'}`}>{item}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4">
                                        <label className="text-sm font-bold text-[#121212]">Detalhes adicionais (Opcional)</label>
                                        <textarea
                                            className="w-full bg-[#FAFAFA] border border-[rgba(18,18,18,.08)] rounded-xl px-5 py-4 h-28 resize-none focus:outline-none focus:border-celere-gold/50 focus:bg-[#FDFBF7] focus:ring-4 focus:ring-celere-gold/5 transition-all text-[#121212]/80 leading-relaxed"
                                            placeholder="Descreva particularidades do projeto, ambientes principais ou dúvidas extras..."
                                            maxLength={1000}
                                            value={formData.observacoes}
                                            onChange={e => setFormData({ ...formData, observacoes: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-[#121212] py-5 rounded-xl text-white font-bold tracking-[0.05em] uppercase hover:bg-celere-gold transition-all duration-500 shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1 mt-8 text-sm flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:bg-[#121212] disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Processando Solicitação...
                                            </>
                                        ) : (
                                            "Avançar e Solicitar Orçamento"
                                        )}
                                    </button>
                                    <p className="text-xs text-center text-[#121212]/40 mt-6 tracking-wide font-medium">Seus dados e as diretrizes do seu projeto estão seguros sob sigilo.</p>
                                </form>
                            </div>
                        </FadeIn>
                    </div>
                </div >
            </section >

            <footer className="relative z-20 mt-8 md:-mt-16 bg-gradient-to-t from-[#F6F2EA]/90 to-[#FDFBF7]/70 backdrop-blur-2xl pt-10 pb-6 shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden text-center text-sm text-celere-gray rounded-t-3xl md:rounded-t-[3rem] border-t border-[#FDFBF7]/60">
                <div className="absolute inset-0 bg-[#FDFBF7]/30 z-0 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute inset-x-0 top-0 h-[10px] bg-gradient-to-b from-[#FDFBF7] to-transparent opacity-80 z-0 pointer-events-none"></div>

                <div className="container mx-auto px-6 flex flex-col items-center justify-center relative z-10 w-full pt-4">
                    <div className="bg-white px-3 py-1.5 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] mb-3 inline-block">
                        <img src="/logo.png" alt="Célere Casa Inteligente" className="h-[4.5rem] w-auto object-contain opacity-95 drop-shadow-sm filter contrast-[1.05]" />
                    </div>
                    <p className="text-xs tracking-wider text-[#121212]/60 font-medium">© {new Date().getFullYear()} Célere - Casa Inteligente. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}
