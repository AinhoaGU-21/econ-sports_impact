import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export const InteractiveBudget: React.FC = () => {
  const [cutAthletics, setCutAthletics] = useState(false);
  
  const totalTuition = 69000;
  const athleticsCostPerStudent = 1300;
  const savings = cutAthletics ? athleticsCostPerStudent : 0;
  const finalTuition = totalTuition - savings;

  return (
    <div className="my-24 bg-on-surface text-surface p-12 md:p-20 border-y border-primary/20">
      <div className="max-w-2xl mx-auto">
        <h3 className="font-headline text-5xl mb-8 text-center italic">The "What If" Calculator</h3>
        <p className="font-body text-2xl text-surface/80 mb-16 leading-relaxed text-center">
          Toggle the switch below to see how a complete liquidation of the athletics department would impact your annual tuition bill.
        </p>

        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-center gap-8 py-8 border-y border-surface/10">
            <span className={`font-label text-xs uppercase tracking-[0.3em] transition-opacity duration-300 ${cutAthletics ? 'opacity-30' : 'opacity-100 font-bold text-primary'}`}>
              Fully Funded
            </span>
            <button 
              onClick={() => setCutAthletics(!cutAthletics)}
              className="relative w-20 h-10 rounded-full bg-surface/10 border border-surface/20 transition-colors duration-500 overflow-hidden group"
            >
              <motion.div 
                animate={{ x: cutAthletics ? 44 : 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute top-1 w-7 h-7 rounded-full transition-colors duration-500 ${cutAthletics ? 'bg-primary shadow-[0_0_20px_rgba(158,32,22,0.5)]' : 'bg-surface'}`}
              />
            </button>
            <span className={`font-label text-xs uppercase tracking-[0.3em] transition-opacity duration-300 ${cutAthletics ? 'opacity-100 font-bold text-primary' : 'opacity-30'}`}>
              Liquidated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-surface/40 mb-4">Current Tuition</p>
              <p className="font-headline text-5xl">${totalTuition.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-surface/40 mb-4">New Tuition</p>
              <p className={`font-headline text-5xl transition-colors duration-500 ${cutAthletics ? 'text-primary' : 'text-surface'}`}>
                ${finalTuition.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-surface/5 text-center">
            <p className="font-body italic text-surface/40 text-lg">
              *A reduction of {((savings / totalTuition) * 100).toFixed(2)}% in total costs.
            </p>
            <p className="font-body italic text-surface/40 text-sm mt-2">
            Assumes all savings are passed directly to students — actual tuition impact would likely be lower.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};
