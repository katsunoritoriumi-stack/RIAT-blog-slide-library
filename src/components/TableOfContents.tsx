"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X } from "lucide-react";

interface ArchiveItem {
    id: string;
    title: string;
}

interface TableOfContentsProps {
    items: ArchiveItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-white/8 border border-white/20 text-white/70 hover:text-white hover:bg-white/15 hover:border-white/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
                aria-label="目次を開く"
            >
                <BookOpen size={16} />
                <span className="text-xs tracking-widest">目次</span>
            </button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 260 }}
                        className="fixed top-0 right-0 h-full w-[min(380px,90vw)] z-50 flex flex-col bg-black/80 border-l border-white/10 backdrop-blur-xl shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <BookOpen size={18} className="text-white/60" />
                                <h2 className="text-white/80 text-sm tracking-[0.3em] uppercase font-light">
                                    目次
                                </h2>
                                <span className="text-white/25 text-[10px] tracking-wider">
                                    {items.length} archives
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/30 hover:text-white transition-colors p-1"
                                aria-label="閉じる"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Archive list */}
                        <div className="flex-1 overflow-y-auto py-2">
                            {items.map((item, index) => {
                                const match = item.title.match(/^(\d{4}[\.\d]*\d+)\s+(.+)$/);
                                const date = match ? match[1] : null;
                                const name = match ? match[2] : item.title;

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/viewer/${item.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-start gap-4 px-6 py-3.5 border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        {/* Index number */}
                                        <span className="text-white/20 text-[10px] font-mono mt-0.5 w-5 shrink-0 text-right">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            {date && (
                                                <p className="text-white/35 text-[9px] tracking-wider mb-0.5">
                                                    {date}
                                                </p>
                                            )}
                                            <p className="text-white/70 group-hover:text-white text-xs leading-snug transition-colors duration-200 truncate">
                                                {name}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <span className="text-white/15 group-hover:text-white/40 text-xs transition-colors duration-200 mt-0.5 shrink-0">
                                            →
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Drawer footer */}
                        <div className="px-6 py-4 border-t border-white/8 shrink-0">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-3" />
                            <p className="text-white/20 text-[9px] tracking-[0.3em] text-center uppercase">
                                RIAT Blog スライドライブラリー
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TableOfContents;
