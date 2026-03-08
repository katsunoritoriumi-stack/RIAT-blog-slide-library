"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import PDFViewer from "@/components/PDFViewer";
import archiveData from "@/data/archive.json";

export default function ViewerPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const item = archiveData.find((a) => a.id === id);

    if (!item) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white/40 uppercase tracking-widest text-xs">
                Archive not found
            </div>
        );
    }

    return (
        <PDFViewer
            url={item.url}
            title={item.title}
            onClose={() => router.push("/")}
        />
    );
}
