import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Legal",
 description: "Privacy policy and terms of service for Greene Studios.",
};

export default function LegalPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32 pb-24">
 <div className="max-w-3xl mx-auto px-6 lg:px-12 prose prose-neutral prose-lg">
 <h1 className="text-4xl md:text-5xl font-black text-[var(--brand-text)] tracking-tight mb-12">
 Legal & Privacy
 </h1>
 
 <h2>Privacy Policy</h2>
 <p>
 At Greene Studios, we take your privacy seriously. This privacy policy describes 
 how we collect, use, and handle your personal information when you use our website 
 and services.
 </p>
 
 <h3>Information Collection</h3>
 <p>
 We only collect information that you voluntarily provide to us via contact forms, 
 email subscriptions, or direct communication. This typically includes your name, 
 email address, and project details.
 </p>

 <h3>Use of Information</h3>
 <p>
 The information we collect is used strictly to provide you with our services, 
 respond to inquiries, and occasionally send updates if you have opted in. We do 
 not sell or share your personal data with third-party marketing companies.
 </p>

 <hr className="my-12" />

 <h2>Terms of Service</h2>
 <p>
 By accessing and using the Greene Studios website and our services, you agree 
 to comply with our terms. All content, designs, and code produced by Greene Studios 
 remain our intellectual property until formally transferred per a signed contract.
 </p>

 <h3>Project Terms</h3>
 <p>
 Specific terms regarding deliverables, timelines, and payment structures are 
 outlined in individual client contracts and statements of work prior to the 
 start of any project.
 </p>
 
 <p className="text-sm text-[var(--brand-text-secondary)] mt-12">
 Last updated: July 2026
 </p>
 </div>
 </div>
 );
}
