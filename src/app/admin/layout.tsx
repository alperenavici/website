"use client";

import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import './admin.css'; // Admin CSS dosyası

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`admin-layout ${geistSans.variable} ${geistMono.variable}`}>
      {children}
    </div>
  );
} 