"use client";

import { Upload, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming standard utils exist

export function UploadPhoto() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;

        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    // Drag and Drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleGenerate = () => {
        // Placeholder for generation logic
        console.log("Generating photo from:", selectedFile);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Envie sua foto</h2>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Escolha uma foto sua para transformar em um retrato profissional.
                    Funciona melhor com fotos onde seu rosto está bem visível.
                </p>
            </div>

            <div className="w-full max-w-md">
                {!previewUrl ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-full min-h-[300px] rounded-xl border-2 border-dashed transition-colors cursor-pointer",
                            isDragging
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                        )}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted shadow-sm">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Arraste sua foto aqui ou clique para selecionar
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG ou WEBP
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full min-h-[300px] rounded-xl border bg-muted/10 overflow-hidden group">
                        <div className="relative w-full h-full min-h-[300px]">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remover foto</span>
                        </Button>
                    </div>
                )}
            </div>

            {previewUrl && (
                <Button
                    size="lg"
                    className="w-full max-w-md font-semibold"
                    onClick={handleGenerate}
                >
                    Gerar Foto Profissional
                </Button>
            )}
        </div>
    );
}
