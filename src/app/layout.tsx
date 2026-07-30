import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Monoton } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const monoton = Monoton({ weight: '400', subsets: ["latin"], variable: '--font-monoton' });

export const metadata: Metadata = {
    // Domínio de produção. Sem isso, o Next não resolve as URLs relativas de
    // openGraph.images para absolutas, e o preview do link sai sem imagem.
    metadataBase: new URL("https://celere.netlify.app"),
    title: "Célere - Casa Inteligente | Automação Residencial Premium",
    description: "A infraestrutura invisível por trás do verdadeiro luxo. Projetos consultivos de automação corporativa, redes de câmeras, iluminação e som para imóveis de alto padrão.",
    openGraph: {
        title: "Célere - Casa Inteligente",
        description: "Infraestrutura invisível e Engenharia para residências de alto padrão.",
        url: "https://celere.netlify.app/",
        siteName: "Célere Casa Inteligente",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
        locale: "pt_BR",
        type: "website",
    }
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${montserrat.variable} ${playfair.variable} ${monoton.variable} font-sans antialiased selection:bg-celere-gold selection:text-celere-black`}>
                {children}
            </body>
        </html>
    );
}
