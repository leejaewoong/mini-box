'use client'

import { Upload, Loader2 } from "lucide-react";
import { UploadFile } from "actions/storageActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

export default function DragDropZone() {
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
            }
        }
    )

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const formData = new FormData();

            acceptedFiles.forEach(file =>
                formData.append(file.name, file)
            );

            uploadFileMutation.mutate(formData);
        }
    }    

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, 
        multiple: true,       
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        }
    })

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`flex flex-col gap-3 w-full min-h-32 border-2 border-dashed rounded-lg items-center justify-center cursor-pointer transition-colors p-6 ${
                    isDragActive
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50/50'
                }`}
            >
                {uploadFileMutation.isPending ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" /> : <Upload className="w-8 h-8 text-indigo-400" />}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium text-gray-700">
                        {isDragActive ? '여기에 파일을 놓으세요' : '파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요'}
                    </p>
                    <p className="text-xs text-gray-500">
                        이미지 파일 (PNG, JPG, WEBP)
                    </p>
                </div>
                <input 
                    {...getInputProps()}
                     />
            </div>
        </div>
    );
}