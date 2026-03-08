"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker path for pdfjs (must match installed pdfjs-dist version)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PDFViewerProps {
    url: string;
    title: string;
    onClose?: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, onClose }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageWidth, setPageWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            // 画面幅の90%を上限850pxでPDFの表示幅に設定
            const vw = window.innerWidth;
            setPageWidth(Math.min(vw * 0.9, 850));
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const nextPage = () => {
        if (numPages && pageNumber < numPages) {
            setPageNumber(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextPage();
            if (e.key === "ArrowLeft") prevPage();
            if (e.key === "Escape" && onClose) onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pageNumber, numPages, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[60]">
                <h2 className="text-white/80 text-lg font-light tracking-widest uppercase">
                    {title}
                </h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors p-2"
                    >
                        <X size={32} />
                    </button>
                )}
            </div>

            {/* Main Viewer Area */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-10 z-[55] pointer-events-none">
                    <button
                        onClick={prevPage}
                        disabled={pageNumber <= 1}
                        className={`pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none ${pageNumber <= 1 ? "cursor-default" : "cursor-pointer"
                            }`}
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={nextPage}
                        disabled={numPages ? pageNumber >= numPages : true}
                        className={`pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none ${numPages && pageNumber >= numPages ? "cursor-default" : "cursor-pointer"
                            }`}
                    >
                        <ChevronRight size={48} />
                    </button>
                </div>

                {/* PDF Document */}
                <div className="relative z-50 flex items-center justify-center max-w-[90vw] max-h-[85vh] overflow-auto">
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="animate-spin text-white/20" size={48} />
                                <p className="text-white/20 tracking-tighter uppercase text-xs">Loading Archive...</p>
                            </div>
                        }
                        error={
                            <div className="text-white/40 text-center">
                                <p>Failed to load PDF.</p>
                                <p className="text-xs mt-2">{url}</p>
                            </div>
                        }
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pageNumber}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden"
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    width={pageWidth || undefined}
                                    renderAnnotationLayer={true}
                                    renderTextLayer={true}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </Document>
                </div>
            </div>

            {/* Footer / Page Info */}
            <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-2 z-[60]">
                <div className="text-white/30 text-[10px] tracking-[0.3em] uppercase">
                    Page {pageNumber} of {numPages || "..."}
                </div>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
        </div>
    );
};

export default PDFViewer;
