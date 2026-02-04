"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface UploadPhotoProps {
  onPhotoSelected: (photo: string) => void;
  onContinue: (url: string) => void;
  selectedPhoto: string | null;
}

export function UploadPhoto({ onContinue, onPhotoSelected, selectedPhoto }: UploadPhotoProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileType, setFileType] = useState<string>("");

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);

      const reader = new FileReader();
      reader.onload = (event) => {
        //Receber em o BASE64
        console.log(event.target?.result as string)
        onPhotoSelected(event.target?.result as string)
      }
      reader.readAsDataURL(file);
    }

  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleGeneratePhoto = () => {
    if (selectedPhoto) {
      onContinue(selectedPhoto);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFileSize(0);
    setFileType("");
    onPhotoSelected("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);

      const reader = new FileReader();
      reader.onload = (event) => {
        onPhotoSelected(event.target?.result as string)
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-2 text-center">
        <h2 className="text-3x1 font bold text-gray-900">Envie sua Foto</h2>
        <p className="text-sm text-gray-600">
          Escolha sua foto para transformar em retrato profissional
          <br />
          Funciona melhor com fotos onde seu rosto está bem visível.
        </p>
      </div>
      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className={`
            "relative border-2 border-dashed rounded-2x1 p-12 transition-all duration-200 cursor-pointer"
            ${selectedPhoto
            ? "border-gray-300 bg-gray-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }
        `}
      >
        {!selectedPhoto ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                Arraste sua foto aqui ou clique para selecionar
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG ou WEBP</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Preview */}
            <div className="relative w-48 h-48 rounded-x1 overflow-hidden">
              {selectedPhoto && (
                <Image
                  src={selectedPhoto}
                  alt="Preview da Foto"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/*Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"

            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />

      </div>

      {/* Generate Button */}
      {selectedPhoto && (
        <Button
          onClick={handleGeneratePhoto}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        />
      )}
    </div>
  )
}