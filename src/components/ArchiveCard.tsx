"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ArchiveCardProps {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    x: number;
    y: number;
    delay?: number;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({ id, title, url, thumbnail, x, y, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { duration: 1, delay },
                scale: { duration: 1, delay },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 2,
                },
            }}
            style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
            }}
            className="group"
        >
            <Link
                href={`/viewer/${id}`}
                className="block relative w-32 h-44 sm:w-40 sm:h-56 overflow-hidden rounded-lg shadow-2xl border border-white/10 backdrop-blur-md bg-white/5 transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                    {(() => {
                        // 「2017.8.28」や「2017828」のような日付を検出して分割
                        const match = title.match(/^(\d{4}[\.\d]*\d+)\s+(.+)$/);
                        if (match) {
                            return (
                                <>
                                    <p className="text-white/50 text-[9px] sm:text-[10px] font-light tracking-wider drop-shadow-md mb-0.5">
                                        {match[1]}
                                    </p>
                                    <h3 className="text-white text-xs sm:text-sm font-medium leading-tight drop-shadow-md">
                                        {match[2]}
                                    </h3>
                                </>
                            );
                        }
                        return (
                            <h3 className="text-white text-xs sm:text-sm font-medium leading-tight drop-shadow-md">
                                {title}
                            </h3>
                        );
                    })()}
                </div>

                {/* Decorative light effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_70%)]" />
            </Link>
        </motion.div>
    );
};

export default ArchiveCard;
