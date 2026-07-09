'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, MessageSquareHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { chatMessages, sendChatMessage } = useApp();
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, isOpen]);

  const handleSend = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim()) return; sendChatMessage(input); setInput(''); };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:100}} transition={{type:'spring',damping:25,stiffness:200}}
          className="relative w-full max-w-md h-full bg-card border-l border-border flex flex-col shadow-2xl z-10">
          <div className="px-4 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-md"><MessageSquareHeart className="h-4 w-4" /></div>
              <div><h3 className="text-xs font-bold text-foreground flex items-center gap-1"><span>AI Health Assistant</span><Sparkles className="h-3 w-3 text-teal-500 animate-pulse" /></h3><p className="text-[9px] text-muted-foreground">Always active</p></div>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender==='user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${msg.sender==='user' ? 'bg-primary text-white rounded-tr-none shadow-md' : 'bg-muted/80 text-foreground rounded-tl-none border border-border'}`}>
                  <p>{msg.text}</p><span className={`text-[8px] mt-1 block text-right ${msg.sender==='user' ? 'text-white/60' : 'text-muted-foreground/60'}`}>{msg.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="px-4 py-2 border-t border-border bg-muted/20 flex gap-1.5 overflow-x-auto whitespace-nowrap">
            {['Check my BP trends', 'Blood sugar safe?', 'Missed a dose?', 'My adherence score'].map(s => (
              <button key={s} onClick={() => setInput(s)} className="rounded-full border border-border bg-card hover:bg-muted px-3 py-1 text-[10px] font-medium text-foreground">{s}</button>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-border bg-card flex gap-2">
            <input type="text" placeholder="Ask about your health..." value={input} onChange={e => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-primary text-foreground" />
            <button type="submit" className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md active:scale-95 flex-shrink-0"><Send className="h-4 w-4" /></button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default AIChatbot;
