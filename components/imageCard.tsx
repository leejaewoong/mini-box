'use client'

import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button"
import { Trash, Loader2 } from "lucide-react";
import { getImageUrl } from "@/utils/supabase/storage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { DeleteFile } from "@/actions/storageActions";

export default function ImageCard({ image }) {
    const imageUrl = getImageUrl(image.name);
    // 메타데이터에서 원본 파일명 가져오기 (없으면 저장된 파일명 사용)
    const displayName = image.metadata?.originalName || image.name;
    const queryClient = useQueryClient();

    const deleteFileMutation = useMutation({
        mutationFn: DeleteFile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['images']
            })
        }
    });        

    return (
        <Card>
            <CardContent className="relative flex items-center justify-center aspect-square p-4 border-b">
                <Image
                    src={imageUrl}
                    alt={displayName}
                    width={300}
                    height={300}
                    className="h-full rounded-xl object-cover"
                />
                <Button 
                    variant="ghost" 
                    onClick={() => deleteFileMutation.mutate(image.name)}
                    className="group absolute top-2 right-2 w-10 h-10 hover:bg-red-500">
                    {deleteFileMutation.isPending ? (
                        <Loader2 className="animate-spin text-white" />)
                        : (<Trash className="text-red-500 group-hover:text-white"/>)
                    }  
                </Button>
            </CardContent>
            <CardFooter className="flex items-center px-4 py-2">
                <span>{displayName}</span>
            </CardFooter>
        </Card>
    );
}
