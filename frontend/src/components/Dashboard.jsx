import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    PlusCircle, Wallet, Calendar, PieChart, Activity, 
    ArrowUpRight, ArrowDownLeft, Trash2, Filter, 
    TrendingUp, CreditCard, ChevronRight, Search
} from 'lucide-react';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ title: '', amount: '', date: '', category: 'Food' });
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/expenses');
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/expenses', form);
            setForm({ title: '', amount: '', date: '', category: 'Food' });
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    const totalAmount = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    return (
        <div className="space-y-10 animate-in">
            
            {/* Top Overview Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Main Analytics</h1>
                    <p className="text-slate-500 font-medium tracking-wide">Tracking your financial footprints in 2026</p>
                </div>
                <div className="flex gap-3">
                    <button className="glass-card px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-all text-slate-400 hover:text-white border border-slate-700/50">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                        <PlusCircle size={18} /> New Expense
                    </button>
                </div>
            </div>

            {/* Premium Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 bg-emerald-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
                            <Wallet size={20} />
                        </div>
                        <span className="flex items-center text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                            <TrendingUp size={10} className="mr-1" /> 12%
                        </span>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Spending</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">${totalAmount.toLocaleString()}</h3>
                </div>

                <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
                            <Activity size={20} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Count</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">{expenses.length} Ops</h3>
                </div>

                <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl">
                            <CreditCard size={20} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Wallet Type</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">Main Port</h3>
                </div>

                <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Days Logged</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">{new Set(expenses.map(e => e.date)).size} Days</h3>
                </div>
            </div>

            {/* Main Dashboard Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form card */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
                    <div className="glass-card p-8 rounded-3xl border-t-2 border-blue-500/40 shadow-blue-500/5">
                        <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                            <span className="p-1 px-3 bg-blue-500 rounded text-xs font-mono text-white">ADD</span>
                            New Record
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <input 
                                    className="w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600" 
                                    value={form.title} 
                                    onChange={e => setForm({...form, title: e.target.value})} 
                                    placeholder="Source of expense" 
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</div>
                                    <input 
                                        className="w-full bg-slate-900/50 border border-slate-700/50 p-4 pl-8 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all" 
                                        type="number" 
                                        value={form.amount} 
                                        onChange={e => setForm({...form, amount: e.target.value})} 
                                        placeholder="Amount" 
                                        required 
                                    />
                                </div>
                                <select 
                                    value={form.category} 
                                    onChange={e => setForm({...form, category: e.target.value})} 
                                    className="w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option>Food</option>
                                    <option>Transport</option>
                                    <option>Education</option>
                                    <option>Work</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <input 
                                className="w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all" 
                                type="date" 
                                value={form.date} 
                                onChange={e => setForm({...form, date: e.target.value})} 
                                required 
                            />
                            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex justify-center gap-2">
                                <PlusCircle size={20} /> Create Entry
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Container */}
                <div className="lg:col-span-8">
                    <div className="glass-card p-8 rounded-3xl min-h-[600px] flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black flex items-center gap-3">
                                <span className="p-1 px-3 bg-emerald-500 rounded text-xs font-mono text-white">LIST</span>
                                Transaction Ledger
                            </h2>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={16} />
                                <input className="bg-slate-900 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-xs outline-none focus:border-emerald-400 transition-all" placeholder="Quick search..." />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {expenses.length === 0 && !loading ? (
                                <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-700">
                                    <PieChart size={64} className="mx-auto mb-4 text-slate-700" />
                                    <p className="text-slate-500">The cloud is clear, no records found.</p>
                                </div>
                            ) : (
                                expenses.map(ex => (
                                    <div key={ex.id} className="flex items-center justify-between bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-all group">
                                        <div className="flex gap-5 items-center">
                                            <div className={`p-3 rounded-2xl ${ex.category === 'Food' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {ex.category === 'Food' ? <ArrowUpRight size={22} /> : <ArrowDownLeft size={22} />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg tracking-tight group-hover:text-blue-400 transition-colors">{ex.title}</h4>
                                                <div className="flex gap-3 text-[10px] uppercase font-heavy tracking-tighter text-slate-500 mt-1">
                                                    <span className="font-bold">{ex.category}</span>
                                                    <span>•</span>
                                                    <span>{new Date(ex.date).toDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-2xl font-black text-white underline decoration-blue-500/30 decoration-4 underline-offset-4">${parseFloat(ex.amount).toLocaleString()}</span>
                                            <button className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-auto pt-8 flex justify-center">
                            <button className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-all">
                                Load More History <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Dashboard;
