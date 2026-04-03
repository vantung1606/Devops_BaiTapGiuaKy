import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, GraduationCap, Github, Globe, ShieldCheck, Mail, MapPin, Sparkles, ClipboardList } from 'lucide-react';

const About = () => {
    const [info, setInfo] = useState({
        name: 'Nguyễn Văn Tùng',
        student_id: '2251220254',
        student_class: '22CT5'
    });

    useEffect(() => {
        axios.get('/api/about')
            .then(res => setInfo(res.data))
            .catch(() => console.log('Backend not sync yet'));
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-in">
            <div className="relative group">
                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative glass-card rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                        
                        {/* Profile Sidebar */}
                        <div className="md:col-span-4 bg-slate-800/50 p-8 flex flex-col items-center border-r border-slate-700/50">
                            <div className="relative mb-6">
                                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full animate-spin-slow opacity-30"></div>
                                <div className="relative bg-slate-900 w-32 h-32 rounded-full flex items-center justify-center border-2 border-slate-700 shadow-2xl">
                                    <User size={56} className="text-blue-400" />
                                </div>
                                <div className="absolute bottom-1 right-1 bg-emerald-500 p-1.5 rounded-full border-4 border-slate-800 shadow-lg">
                                    <ShieldCheck size={16} className="text-white" />
                                </div>
                            </div>
                            
                            <h2 className="text-xl font-bold text-center text-white">{info.name}</h2>
                            <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest font-medium">Full-stack Dev</p>
                            
                            <div className="flex gap-3 mt-4">
                                <button className="p-2 bg-slate-900 rounded-lg border border-slate-700 hover:border-blue-400 transition-all text-slate-400 hover:text-blue-400">
                                    <Github size={18} />
                                </button>
                                <button className="p-2 bg-slate-900 rounded-lg border border-slate-700 hover:border-emerald-400 transition-all text-slate-400 hover:text-emerald-400">
                                    <Mail size={18} />
                                </button>
                                <button className="p-2 bg-slate-900 rounded-lg border border-slate-700 hover:border-indigo-400 transition-all text-slate-400 hover:text-indigo-400">
                                    <Globe size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-8 p-10">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">Student Profile</h3>
                                    <p className="text-slate-400 text-xs">Verified DevOps Practitioner</p>
                                </div>
                                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1">
                                    <Sparkles size={12} /> ACTIVE
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-700 shadow-inner group hover:bg-slate-900/60 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                            <GraduationCap size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student ID</span>
                                    </div>
                                    <p className="text-2xl font-bold font-mono text-white tracking-tighter">{info.student_id}</p>
                                </div>

                                <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-700 shadow-inner group hover:bg-slate-900/60 transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                            <ClipboardList size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Class</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white tracking-tight">{info.student_class}</p>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-2xl border border-slate-700/50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 mt-1">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Biography</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Đam mê công nghệ và tự động hóa. Đang theo đuổi lộ trình trở thành kỹ sư DevOps chuyên nghiệp với kỹ năng quản trị hệ thống và triển khai ứng dụng hiện đại.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
