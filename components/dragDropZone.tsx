'use client'

import { Input } from "./ui/input";
import { Upload } from "lucide-react";

export default function DragDropZone() {
  return (
    <section className="w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col gap-3 w-full min-h-32 border-2 border-dashed border-indigo-300 rounded-lg items-center justify-center cursor-pointer transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 p-6"
      >
        <Upload className="w-8 h-8 text-indigo-400" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-gray-700">
            파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요
          </p>
          <p className="text-xs text-gray-500">
            이미지 파일 (PNG, JPG, WEBP)
          </p>
        </div>
      </label>
      <Input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        multiple
      />
    </section>
  );
}