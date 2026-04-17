import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Target, Rocket, Mail, MapPin, Phone } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// --- GOVERNANCE PILLAR COMPONENT ---
export const GovernancePillar: React.FC<{ title: string, description: string, icon: React.ReactNode, delay: string }> = ({ title, description, icon, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: parseFloat(delay) }}
      viewport={{ once: true }}
      className="p-10 bg-white rounded-3xl border border-accent-green/10 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-primary-green mb-8 group-hover:bg-primary-green group-hover:text-white transition-all transform group-hover:-rotate-3">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-primary-green mb-4">{title}</h3>
      <p className="text-text-main/60 leading-relaxed italic">{description}</p>
    </motion.div>
  );
};

// --- REPRESENTATION CHART ---
export const RepresentationChart: React.FC = () => {
    const data = [
      { name: 'Youth Leaders', value: 45, color: '#1B4332' },
      { name: 'Women Delegates', value: 30, color: '#40916C' },
      { name: 'Policy Experts', value: 25, color: '#52B788' },
    ];

    return (
        <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-[450px] flex flex-col">
            <h4 className="font-serif text-xl mb-8 text-center text-cream">Demographic Empowerment Index</h4>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1B4332', border: 'none', borderRadius: '12px', color: '#FDFBF7' }}
                            itemStyle={{ color: '#FDFBF7' }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-cream/40 font-bold">Projected Impact Distribution 2024-2025</p>
        </div>
    );
};

// --- CONTACT SECTION ---
export const ContactSection: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 bg-primary-green p-12 lg:p-20 text-cream flex flex-col justify-between">
                <div>
                   <h3 className="font-serif text-4xl mb-6">Let's coordinate for a stronger Nepal.</h3>
                   <p className="text-cream/60 mb-12">Whether you're a youth leader, a donor, or a fellow advocate, we'd love to hear from you.</p>
                   
                   <div className="space-y-8">
                       <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent-green"><Mail size={20}/></div>
                           <div>
                               <p className="text-[10px] uppercase tracking-widest text-cream/30 font-bold">Email</p>
                               <p className="font-medium">contact@samanwaya.org.np</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent-green"><MapPin size={20}/></div>
                           <div>
                               <p className="text-[10px] uppercase tracking-widest text-cream/30 font-bold">Location</p>
                               <p className="font-medium">Kathmandu, Nepal</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent-green"><Phone size={20}/></div>
                           <div>
                               <p className="text-[10px] uppercase tracking-widest text-cream/30 font-bold">Phone</p>
                               <p className="font-medium">+977 (1) 000-0000</p>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
            
            <div className="lg:col-span-7 p-12 lg:p-20">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-text-main/40">Full Name</label>
                            <input type="text" className="w-full bg-cream/50 border-b border-stone-200 py-3 focus:outline-none focus:border-accent-green transition-colors text-text-main font-serif text-lg" placeholder="Siddhartha Gautama" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-text-main/40">Email Address</label>
                            <input type="email" className="w-full bg-cream/50 border-b border-stone-200 py-3 focus:outline-none focus:border-accent-green transition-colors text-text-main font-serif text-lg" placeholder="siddhartha@nepal.org" />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <label className="text-[10px] uppercase tracking-widest font-bold text-text-main/40">Message</label>
                         <textarea rows={4} className="w-full bg-cream/50 border-b border-stone-200 py-3 focus:outline-none focus:border-accent-green transition-colors text-text-main font-serif text-lg resize-none" placeholder="Tell us how we can collaborate..." />
                    </div>
                    <button className="px-12 py-5 bg-primary-green text-white font-bold rounded-full hover:bg-accent-green transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-4">
                        Send Message <Rocket size={20} />
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}
