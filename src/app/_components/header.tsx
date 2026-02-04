import { Stars } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui button exists, if not will use standard button or div

export function Header() {
    return (
        <header className="h-16 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    {/* Logo Icon */}
                    <div className="flex items-center justify-center rounded-lg bg-primary/10 p-1.5">
                        <Stars className="h-5 w-5 text-primary" />
                    </div>
                    {/* Logo Text */}
                    <span className="text-lg font-bold tracking-tight text-foreground">
                        Linkfotos AI
                    </span>
                </div>

                <nav className="flex items-center gap-6">
                    <Link
                        href="#como-funciona"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Como funciona
                    </Link>
                    <Link
                        href="#exemplos"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Exemplos
                    </Link>
                </nav>
            </div>
        </header>
    );
}
