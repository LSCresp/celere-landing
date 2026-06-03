export function Hero() {
  const WHATSAPP_NUMBER = "SEU_NUMERO_AQUI";

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-40 px-6 min-h-[90vh] flex items-center">
        {/* Vídeo em Fundo preenchendo toda a section (passa por trás do header fixo) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay claro premium (off-white) para garantir leitura sem “branco chapado” */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(246,242,234,.85)_0%,rgba(246,242,234,.65)_45%,rgba(246,242,234,.95)_100%)]" />

        {/* Glow dourado sutil para dar assinatura premium */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(212,175,55,.14)_0%,rgba(246,242,234,0)_60%)]" />

        {/* Fade para o off-white (não branco puro) para transição suave com a próxima seção */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 z-0 bg-gradient-to-b from-transparent to-[#F6F2EA]" />

        <div className="container mx-auto relative z-10 flex flex-col items-center text-center mt-8">
          <div className="flex flex-col items-center justify-center mb-6 mt-12 w-full max-w-2xl px-4 mx-auto group">
            {/* Imagem do Logo Célere Principal (Tamanho Ajustado) */}
            <img
              src="/celere-hero-logo.png"
              alt="CÉLERE"
              className="w-full max-w-[10rem] md:max-w-[15rem] lg:max-w-[20rem] h-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 max-w-4xl leading-[1.05] text-[#121212] px-2">
            Engenharia de Automação para{" "}
            <span className="bg-gold-gradient text-transparent bg-clip-text">
              Projetos Exclusivos
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#121212]/70 mb-10 max-w-2xl leading-relaxed px-2">
            A infraestrutura invisível do seu imóvel. Projetamos, integramos e executamos sistemas de conforto, estabilidade e segurança integrados à arquitetura para garantir uma rotina absolutamente fluida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <a href="#contato" className="bg-gold-gradient text-[#121212] px-8 py-4 rounded-full font-bold text-center transition-transform hover:scale-[1.02] shadow-lg hover:shadow-[0_12px_40px_rgba(212,175,55,.18)] flex justify-center items-center gap-2 w-full sm:w-auto">
               Fale Conosco
            </a>

            <a
              href="#diferenciais"
              className="border border-[rgba(18,18,18,.16)] text-[#121212] px-8 py-4 rounded-full font-bold text-center hover:border-celere-gold/60 hover:bg-[#FFFCF6] transition-colors"
            >
              Conhecer a Metodologia
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-[#F6F2EA]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-[#FFFCF6] border border-[rgba(18,18,18,.08)] px-5 py-10 md:px-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-8 text-[#121212] font-bold">
              Automação não é sobre os produtos.{" "}
              <br className="hidden md:block" />
              <span className="text-celere-gold">
                É sobre a fundação lógica do imóvel.
              </span>
            </h2>

            <p className="text-[#121212]/70 text-sm sm:text-base md:text-lg leading-relaxed">
              Dispositivos soltos não compõem uma casa inteligente, apenas fragmentam sua rotina. 
              Na Célere, consolidamos o ecossistema tecnológico do seu imóvel através de um projeto 
              de engenharia robusto: centralizando o controle, purificando a alvenaria de excesso de interruptores 
              e entregando interfaces confiáveis, elegantes e desenhadas exclusivamente para a sua família.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}