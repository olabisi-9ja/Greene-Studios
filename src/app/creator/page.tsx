"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CreatorPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] pt-32 pb-24 px-6">
 <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-full min-h-[600px]">
 
 {/* 1. Character - Left large panel */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="flex-1 border-2 border-[#D94C47] rounded-3xl overflow-hidden flex flex-col bg-[var(--brand-surface)]"
 >
 <div className="bg-[#D94C47] text-white px-6 py-4 flex items-center gap-4 text-lg font-medium">
 <span className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-sm">1</span>
 Character
 </div>
 <div className="flex-1 relative bg-[var(--brand-surface-secondary)] min-h-[400px]">
 {/* Using a placeholder since we don't have the local image of Abel Adigun */}
 <Image 
 src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
 alt="Abel Adigun"
 fill
 className="absolute inset-0 object-cover"
 />
 </div>
 </motion.div>

 {/* Right side panels */}
 <div className="w-full md:w-[400px] flex flex-col gap-6">
 
 {/* 2. Feedback */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="border-2 border-[#4E9BB6] rounded-3xl overflow-hidden flex flex-col bg-[var(--brand-surface)] h-full"
 >
 <div className="bg-[#4E9BB6] text-white px-6 py-4 flex items-center gap-4 text-lg font-medium">
 <span className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-sm">2</span>
 Feedback
 </div>
 <div className="p-4 flex flex-col gap-3">
 <div className="bg-[#E5F3F8] text-[#1E5F78] p-4 rounded-xl text-sm">
 <div className="font-semibold mb-1">Wardrobe ✓</div>
 The plain cotton garment is too pedestrian for such architectural hair.
 </div>
 <div className="bg-[#E5F3F8] text-[#1E5F78] p-4 rounded-xl text-sm">
 <div className="font-semibold mb-1">Style ✓</div>
 The wet-look spit curls lack the necessary sharp edge definition.
 </div>
 <div className="bg-[#E5F3F8] text-[#1E5F78] p-4 rounded-xl text-sm">
 <div className="font-semibold mb-1">Color ✓</div>
 The monochromatic red and coral palette flattens the character&apos;s facial structure.
 </div>
 <div className="bg-[#E5F3F8] text-[#1E5F78] p-4 rounded-xl text-sm">
 <div className="font-semibold mb-1">Lore</div>
 The vacant gaze suggests a laboratory subject or artificial being.
 </div>
 </div>
 </motion.div>

 {/* 3. Prompt */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, delay: 0.4 }}
 className="border-2 border-[#209267] rounded-3xl overflow-hidden flex flex-col bg-[var(--brand-surface)]"
 >
 <div className="bg-[#209267] text-white px-6 py-4 flex items-center gap-4 text-lg font-medium">
 <span className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-sm">3</span>
 Prompt
 </div>
 <div className="p-6 text-sm text-[#0C4C34] leading-relaxed">
 Change the cotton garment to stiff high-collar neoprene, apply high-gloss highlights to the spit curls for sharp edge definition, and use paler skin tones.
 </div>
 </motion.div>

 </div>
 </div>
 </div>
 );
}
