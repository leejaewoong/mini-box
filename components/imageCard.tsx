'use client'

import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button"
import { Trash } from "lucide-react";

export default function ImageCard() {
    return (        
        <Card>
            <CardContent className="relative flex items-center justify-center p-4 border-b">
                <Image src="/images/chu.PNG" alt="이미지" width={300} height={300} className="rounded-xl"/>
                <Button variant="ghost" className="group absolute top-2 right-2 w-10 h-10 hover:bg-red-500">
                    <Trash className="text-red-500 group-hover:text-white"/>
                </Button>
            </CardContent>
            <CardFooter className="flex items-center px-4 py-2">
                <span>chu.png</span>
            </CardFooter>
        </Card>                        
    );
}
