'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background hero-gradient text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl flex flex-col items-center space-y-4"
      >
        <div className="h-16 w-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-2 animate-bounce">
          <FileQuestion className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">404 - Page Not Found</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The clinic directory page you requested could not be located. If you are experiencing an emergency, please use the SOS alarm on the main dashboard.
        </p>

        <Link 
          href="/" 
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary/95"
        >
          <span>Return to Home</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
