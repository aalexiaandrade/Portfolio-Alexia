import { GraduationCap, Code2, Database, Workflow, Wrench } from 'lucide-react'

const skills = [
  { title: 'Linguagens', titleEn: 'Languages', icon: Code2, items: ['Python', 'Java', 'JavaScript', 'SQL', 'C', 'C++'] },
  { title: 'Frameworks', titleEn: 'Frameworks', icon: Workflow, items: ['Django', 'Django Ninja', 'Spring Boot', 'React'] },
  { title: 'Banco de dados', titleEn: 'Databases', icon: Database, items: ['SQL Server', 'MySQL', 'Cloud SQL (GCP)'] },
  { title: 'Ferramentas', titleEn: 'Tools', icon: Wrench, items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Power BI', 'Power Query', 'RPA', 'SAP', 'Excel avançado', 'GCP'] },
]

export default function AboutApp({ language = 'pt', theme = 'light' }) {
  const en = language === 'en'
  const muted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
  const card = theme === 'dark' ? 'border-white/10 bg-slate-800/70' : 'border-slate-200 bg-white'
  return <div>
    <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-blue-950 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>{en ? 'ABOUT ME' : 'SOBRE MIM'}</span>
    <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">{en ? "Hi, I'm Alexia Andrade." : 'Olá, eu sou a Aléxia Andrade.'}</h1>
    <p className="mb-5 text-sm font-medium text-blue-500">{en ? 'Software Engineering student • Software Development Intern' : 'Estudante de Engenharia de Software • Estagiária em Desenvolvimento de Sistemas'}</p>
    <p className={`max-w-3xl leading-7 ${muted}`}>{en ? 'I am a Software Engineering student at PUC Minas and currently work as a Software Development Intern. I develop and maintain web applications using Python, Django, and Django Ninja, focusing on APIs and relational database integration.' : 'Sou estudante de Engenharia de Software na PUC Minas e atualmente atuo como estagiária em Desenvolvimento de Sistemas. Trabalho no desenvolvimento e na manutenção de aplicações web com Python, Django e Django Ninja, com foco em APIs e integração com bancos de dados relacionais.'}</p>
    <p className={`mt-4 max-w-3xl leading-7 ${muted}`}>{en ? 'My professional journey began at MRV, where I gained experience in process automation, RPA, SQL, data analysis, and Power BI. I built solutions to streamline operational activities and improve efficiency.' : 'Minha trajetória profissional começou na MRV, onde desenvolvi experiência com automação de processos, RPA, SQL, análise de dados e Power BI. Criei soluções para otimizar atividades operacionais e aumentar a eficiência dos processos.'}</p>
    <p className={`mt-4 max-w-3xl leading-7 ${muted}`}>{en ? 'I am interested in new technologies, especially Artificial Intelligence, and want to keep learning, take on new challenges, and turn problems into efficient, innovative solutions.' : 'Tenho interesse em novas tecnologias, especialmente Inteligência Artificial, e busco continuar aprendendo, enfrentar novos desafios e transformar problemas em soluções eficientes e inovadoras.'}</p>
    <div className={`mt-6 flex items-center gap-3 rounded-xl border p-4 ${card}`}><GraduationCap className="shrink-0 text-blue-500" size={26}/><div><h2 className="font-semibold">{en ? 'Education' : 'Formação acadêmica'}</h2><p className={`mt-1 text-sm ${muted}`}>{en ? 'B.Sc. in Software Engineering — PUC Minas' : 'Engenharia de Software — PUC Minas'}</p><p className={`text-xs ${muted}`}>{en ? 'Aug 2025 – Expected 2029' : 'Ago. 2025 – Previsão de conclusão: 2029'}</p></div></div>
    <h2 className="mb-3 mt-7 font-semibold">{en ? 'Technical skills' : 'Conhecimentos técnicos'}</h2>
    <div className="grid gap-3 sm:grid-cols-2">{skills.map(({ title, titleEn, icon: Icon, items }) => <section key={title} className={`rounded-xl border p-4 ${card}`}><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Icon size={17} className="text-blue-500"/>{en ? titleEn : title}</h3><div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className={`rounded-md px-2 py-1 text-xs ${theme === 'dark' ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>{item}</span>)}</div></section>)}</div>
  </div>
}
