'use client'

import ImageCard from "./imageCard"


export default function CardList() {
    return (
        <section className="w-full grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
        </section>
    );
}
