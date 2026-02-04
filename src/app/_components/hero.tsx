import Image from "next/image";

export function Hero() {
    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Fotos profissionais <br />
                    para o linkedin
                </h1>
                <p className="max-w-[480px] text-lg text-muted-foreground">
                    Transforme qualquer foto sua em um retrato profissional de alta
                    qualidade usando inteligência artificial. Perfeito para seu perfil do
                    LinkedIn.
                </p>
            </div>

            <div className="flex items-center gap-4">
                {[
                    "/foto1.png",
                    "/foto2.png",
                    "/foto3.png",
                ].map((src, i) => (
                    <div
                        key={i}
                        className="relative h-24 w-24 overflow-hidden rounded-2xl border bg-muted/50 sm:h-32 sm:w-32"
                    >
                        <Image
                            src={src}
                            alt={`Exemplo de retrato profissional ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
