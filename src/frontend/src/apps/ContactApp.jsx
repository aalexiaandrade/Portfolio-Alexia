import { Mail, UserRound, Code2, ExternalLink } from 'lucide-react'

export default function ContactApp({ language = 'pt', theme = 'light' }) {
  const en = language === 'en'
  const muted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
  const card = theme === 'dark' ? 'border-white/10 bg-slate-800/70 hover:bg-slate-800' : 'border-slate-200 bg-white hover:border-blue-300'
  const contacts = [
    { label: 'E-mail', detail: en ? 'Send me an email' : 'Envie uma mensagem', icon: Mail, href: 'mailto:alexiaandrade2709@gmail.com' },
    { label: 'LinkedIn', detail: en ? 'Professional profile' : 'Perfil profissional', icon: UserRound, href: 'https://www.linkedin.com/in/aalexiaandrade' },
    { label: 'GitHub', detail: en ? 'Code and repositories' : 'Código e repositórios', icon: Code2, href: 'https://github.com/aalexiaandrade' },
  ]
  return <div>
    <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-blue-950 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>{en ? 'CONTACT' : 'CONTATO'}</span>
    <h1 className="mb-3 text-3xl font-semibold">{en ? "Let's connect" : 'Vamos nos conectar'}</h1>
    <p className={`mb-6 ${muted}`}>{en ? 'Would you like to talk about software, technology, or opportunities? Reach out through one of these channels.' : 'Quer conversar sobre desenvolvimento, tecnologia ou oportunidades? Entre em contato por um dos canais abaixo.'}</p>
    <div className="grid gap-3 sm:grid-cols-3">{contacts.map(({ label, detail, icon: Icon, href }) => <a key={label} href={href} target={label === 'E-mail' ? undefined : '_blank'} rel="noreferrer" className={`rounded-xl border p-4 transition ${card}`}><Icon size={24} className="mb-3 text-blue-500"/><h2 className="font-semibold">{label}</h2><p className={`mt-1 text-xs ${muted}`}>{detail}</p><span className="mt-4 inline-flex items-center gap-1 text-xs text-blue-500"><ExternalLink size={12}/>{en ? 'Open link' : 'Abrir link'}</span></a>)}</div>
    <p className={`mt-5 text-xs ${muted}`}>{en ? 'Based in Belo Horizonte, Minas Gerais, Brazil.' : 'Belo Horizonte, Minas Gerais.'}</p>
  </div>
}
