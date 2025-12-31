'use client'

import { Input } from "./ui/input";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { UploadFile } from "actions/storageActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DragDropZone() {
    const fileRef = useRef(null);
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const uploadFileMutation = useMutation(
        {
            mutationFn: UploadFile,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['images']
                })
                toast.success("파일이 성공적으로 업로드되었습니다!");
            },
            onError: (error) => {
                toast.error("파일 업로드 중 오류가 발생했습니다: " + error.message);
            },
            onSettled: () => {
                setIsLoading(false);                
            }
        }
    )
    return (
        <form
            ref={formRef}
            className="w-full"
            onSubmit={(e) => {                
                e.preventDefault();
                const file = fileRef.current.files?.[0];
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    uploadFileMutation.mutate(formData);
                }                
            }}
        >
        <label
            htmlFor="file-upload"
            className="flex flex-col gap-3 w-full min-h-32 border-2 border-dashed border-indigo-300 rounded-lg items-center justify-center cursor-pointer transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 p-6"
        >
            {isLoading ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" /> : <Upload className="w-8 h-8 text-indigo-400" />}
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
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple            
            onChange={() => {      
                setIsLoading(true);          
                formRef.current?.requestSubmit();
            }}
        />
        </form>
    );
}