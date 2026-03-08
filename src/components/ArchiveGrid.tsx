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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {items.map((item, index) => {
                const match = item.title.match(/^(\d{4}[\.\d]*\d+)\s+(.+)$/);
                const date = match ? match[1] : null;
                const name = match ? match[2] : item.title;

                // 千鳥格子風に奇数列は少し下にずらす
                const isOddCol = index % 2 === 1;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className={isOddCol ? "mt-6 sm:mt-8" : ""}
                    >
                        <Link
                            href={`/viewer/${item.id}`}
                            className="group block relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:-translate-y-1"
                        >
                            {/* Thumbnail */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={item.thumbnail}
                                    alt={name}
                                    fill
                                    className="object-cover opacity-55 group-hover:opacity-90 transition-opacity duration-500"
                                />
                            </div>

                            {/* Gradient overlay + text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent p-3 flex flex-col justify-end">
                                {date && (
                                    <p className="text-white/45 text-[8px] sm:text-[10px] font-light tracking-wider mb-1">
                                        {date}
                                    </p>
                                )}
                                <h3 className="text-white text-[11px] sm:text-xs font-medium leading-snug drop-shadow-md">
                                    {name}
                                </h3>
                            </div>

                            {/* Hover light effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_70%)]" />
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ArchiveGrid;
