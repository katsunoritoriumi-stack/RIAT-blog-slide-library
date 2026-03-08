"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ArchiveItem {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    x: number;
    y: number;
}

interface ArchiveGridProps {
    items: ArchiveItem[];
}

const ArchiveGrid: React.FC<ArchiveGridProps> = ({ items }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => {
                const match = item.title.match(/^(\d{4}[\.\d]*\d+)\s+(.+)$/);
                const date = match ? match[1] : null;
                const name = match ? match[2] : item.title;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link
                            href={`/viewer/${item.id}`}
                            className="block relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            {/* Thumbnail */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={item.thumbnail}
                                    alt={name}
                                    fill
                                    className="object-cover opacity-60"
                                />
                            </div>

                            {/* Gradient overlay + text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-end">
                                {date && (
                                    <p className="text-white/50 text-[9px] font-light tracking-wider mb-1">
                                        {date}
                                    </p>
                                )}
                                <h3 className="text-white text-xs font-medium leading-snug drop-shadow-md">
                                    {name}
                                </h3>
                            </div>

                            {/* Light effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ArchiveGrid;
