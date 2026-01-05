'use server'

import { createServerSupabaseClient } from "@/utils/supabase/server"

function handleError(error: any) {
    if (error) {
        console.error(error);
        throw error;
    }
}

export async function UploadFile(formData: FormData) {
    const supabase = await createServerSupabaseClient();
    
    const files = Array.from(formData.entries()).map(
        ([name, file]) => file as File
    )    

    const results = await Promise.all(
        files.map(async (file) => {
            // 원본 파일명과 확장자 추출
            const originalName = file.name;
            const fileExt = file.name.split('.').pop();

            // 안전한 파일명 생성 (영문/숫자만 사용)
            const safeFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!)
                .upload(safeFileName, file, {
                    upsert: true,
                    metadata: { originalName }
                });

            handleError(error);
            return data;
        })
    );

    return results;
}

export async function SearchFiles(search: string = "") {
    const supabase = await createServerSupabaseClient();
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

    // 전체 파일 목록 가져오기
    const { data, error } = await supabase.storage
        .from(bucket)
        .list();

    handleError(error);

    // 플레이스홀더 파일 제외
    const files = (data || []).filter(file => file.name !== '.emptyFolderPlaceholder');

    // 각 파일의 메타데이터 가져오기
    const filesWithMetadata = await Promise.all(
        files.map(async (file) => {
            const { data: fileInfo } = await supabase.storage
                .from(bucket)
                .info(file.name);

            return {
                ...file,
                metadata: fileInfo?.metadata || {}
            };
        })
    );

    // 원본 파일명(originalName)으로 검색 필터링
    if (search) {
        return filesWithMetadata.filter(file =>
            file.metadata?.originalName?.toLowerCase().includes(search.toLowerCase())
        );
    }
    return filesWithMetadata;
}

export async function DeleteFile(fileName: string) {
    const supabase = await createServerSupabaseClient();
    
    const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!)
    .remove([fileName])

    handleError(error);

    return data;
}