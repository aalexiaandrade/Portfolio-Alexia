import { Search } from 'lucide-react'
export default function SearchPanel({ applications, searchText, onSearchTextChange, onOpenApp, theme = 'light', language = 'pt' }) {
    const en = language === 'en'; const dark = theme === 'dark'
    const panel = dark ? 'border-white/15 bg-slate-950/95 text-slate-100' : 'border-white/40 bg-[#edf3fb]/95 text-slate-800'
    const field = dark ? 'border-white/15 bg-slate-900' : 'border-slate-300 bg-white'
    const hover = dark ? 'hover:bg-white/10' : 'hover:bg-white'
    const filteredApps = applications.filter((app) => app.title.toLowerCase().includes(searchText.toLowerCase()))
    return <section className={`absolute bottom-[76px] left-1/2 z-30 w-[min(460px,94vw)] -translate-x-1/2 rounded-2xl border p-5 shadow-2xl backdrop-blur-2xl ${panel}`}>
        <div className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${field}`}><Search size={18} className="opacity-60" /><input autoFocus value={searchText} onChange={(event) => onSearchTextChange(event.target.value)} placeholder={en ? 'Search for an app...' : 'Pesquise por um aplicativo...'} className="w-full bg-transparent text-sm outline-none" /></div>
        <div className="mt-3 max-h-56 overflow-y-auto">{filteredApps.map((app) => { const Icon = app.icon; return <button type="button" key={app.id} onClick={() => onOpenApp(app.id)} className={`flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm ${hover}`}><Icon size={20} className="text-blue-500" />{app.title}</button> })}{filteredApps.length === 0 && <p className="p-3 text-sm opacity-60">{en ? 'No apps found.' : 'Nenhum aplicativo encontrado.'}</p>}</div>
    </section>
}
