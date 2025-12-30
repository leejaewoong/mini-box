"use client"

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DragDropZone from "@/components/dragDropZone";
import CardList from "@/components/cardList";
  
export default function Ui() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <main
      className='flex flex-col w-full p-2 gap-4'>
      {/* Logo */}
      <Logo />

      {/* Search Component */}
      <div className="relative w-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2"          
        >
          <Search className="h-4 w-4 text-gray-600" />
        </Button>        
        <Input
          placeholder="Search Images"
          className="pl-3 py-5"                      
          value={searchInput}        
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {             
              console.log("Searching for:", searchInput);
            }          
          }}
        />
      </div>

      {/* File Drag & Drop Zone */}
      <DragDropZone />

      {/* Image List */}
      <CardList />
    </main>      
  );
}
