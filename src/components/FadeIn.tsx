"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        const currentRef = domRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        timer = setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                        // Anima apenas uma vez: para de observar assim que entra na tela
                        if (currentRef) {
                            observer.unobserve(currentRef);
                        }
                    }
                });
            },
            { threshold: 0.01, rootMargin: "0px 0px 80px 0px" } // Dispara 80px antes do elemento entrar no viewport
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [delay]);

    let transformClass = "";
    if (!isVisible) {
        switch (direction) {
            case "up":
                transformClass = "translate-y-8"; // Reduzido de 12 para 8 para ficar mais ágil
                break;
            case "down":
                transformClass = "-translate-y-8";
                break;
            case "left":
                transformClass = "translate-x-8";
                break;
            case "right":
                transformClass = "-translate-x-8";
                break;
            case "none":
                transformClass = "";
                break;
        }
    } else {
        transformClass = "translate-y-0 translate-x-0";
    }

    return (
        <div
            ref={domRef}
            className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100" : "opacity-0"
            } ${transformClass} ${className}`}
        >
            {children}
        </div>
    );
}
