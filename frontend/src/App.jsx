import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Home, User, LayoutDashboard, Database } from 'lucide-react';
import About from './components/About';
import Dashboard from './components/Dashboard';

function App() {
  const [health, setHealth] = useState('...');
  
  useEffect(() => {
    // Luôn gọi qua path /api chuẩn
    axios.get('/api/health')
      .then(r => setHealth(r.data.status))
      .catch(() => setHealth('offline'));
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <nav className="glass-card sticky top-0 z-50 px-6 py-4 border-b border-white/5 mb-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">DT</div>
                <span className="font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase">TUNG DevOps</span>
              </Link>
              
              <div className="hidden md:flex gap-1">
                <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-sm font-bold text-slate-400 hover:text-white">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link to="/about" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-sm font-bold text-slate-400 hover:text-white">
                  <User size={18} /> About
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-2xl border border-white/5 shadow-inner">
                <div className={`w-2 h-2 rounded-full ${health === 'ok' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-400 shadow-[0_0_8px_#fb7185] animate-pulse'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <Database size={10} /> {health === 'ok' ? 'Connected' : 'Syncing...'}
                </span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
