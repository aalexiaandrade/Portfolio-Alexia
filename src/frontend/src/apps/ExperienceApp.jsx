import { BriefcaseBusiness, GraduationCap } from 'lucide-react'

const experiences = [
  {
    organization: 'PUC Minas', role: 'Estagiária em Desenvolvimento de Sistemas', roleEn: 'Software Development Intern', period: 'Abr. 2026 – atual', periodEn: 'Apr 2026 – present',
    description: ['Desenvolvimento e manutenção de aplicações web com Python, Django e Django Ninja.', 'Implementação e consumo de APIs e integração com bancos de dados relacionais.', 'Versionamento e colaboração no código com Git.'],
    descriptionEn: ['Develop and maintain web applications using Python, Django, and Django Ninja.', 'Implement and consume APIs and integrate applications with relational databases.', 'Use Git for version control and code collaboration.'],
  },
  {
    organization: 'MRV Engenharia e Participações S.A.', role: 'Assistente de Dados', roleEn: 'Data Assistant', period: 'Set. 2022 – abr. 2026', periodEn: 'Sep 2022 – Apr 2026',
    description: ['Gestão de contratos, mapeamento de processos e atendimento a chamados e clientes internos.', 'Criação e manutenção de automações com Python, SQL e RPA para reduzir tarefas manuais.', 'Construção de dashboards e indicadores em Power BI, com dados de bancos relacionais e Cloud SQL (GCP).'],
    descriptionEn: ['Managed contracts, mapped processes, and supported internal requests and clients.', 'Created and maintained Python, SQL, and RPA automations to reduce manual tasks.', 'Built Power BI dashboards and indicators using relational databases and Cloud SQL (GCP).'],
  },
  {
    organization: 'MRV Engenharia e Participações S.A.', role: 'Aprendiz — Assistente Administrativo', roleEn: 'Administrative Assistant Apprentice', period: 'Abr. 2021 – ago. 2022', periodEn: 'Apr 2021 – Aug 2022',
    description: ['Suporte administrativo, organização de documentos e atendimento interno.', 'Apoio às demandas operacionais e aos processos da equipe.'],
    descriptionEn: ['Provided administrative support, organized documents, and assisted internal teams.', 'Supported operational requests and team processes.'],
  },
]

export default function ExperienceApp({ language = 'pt', theme = 'light' }) {
  const en = language === 'en'
  const muted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
  const card = theme === 'dark' ? 'border-white/10 bg-slate-800/70' : 'border-slate-200 bg-white'
  return <div>
    <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-blue-950 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>{en ? 'EXPERIENCE' : 'EXPERIÊNCIA'}</span>
    <h1 className="mb-2 text-3xl font-semibold">{en ? 'My professional journey' : 'Minha trajetória profissional'}</h1>
    <p className={`mb-6 ${muted}`}>{en ? 'Experience in software development, automation, processes, and data.' : 'Experiência em desenvolvimento de sistemas, automação, processos e dados.'}</p>
    <div className="space-y-4">{experiences.map((item, index) => <article key={`${item.organization}-${item.role}`} className={`rounded-xl border p-5 ${card}`}>
      <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex gap-3"><div className={`mt-1 rounded-lg p-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-blue-50'}`}><BriefcaseBusiness size={21} className="text-blue-500"/></div><div><h2 className="font-semibold">{item.organization}</h2><p className="mt-1 text-sm font-medium text-blue-500">{en ? item.roleEn : item.role}</p></div></div><span className={`rounded-full px-3 py-1 text-xs ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>{en ? item.periodEn : item.period}</span></div>
      <ul className={`mt-4 list-disc space-y-2 pl-5 text-sm leading-6 ${muted}`}>{(en ? item.descriptionEn : item.description).map((line) => <li key={line}>{line}</li>)}</ul>
    </article>)}</div>
    <section className={`mt-4 rounded-xl border p-5 ${card}`}><div className="flex items-center gap-3"><GraduationCap className="text-blue-500" size={23}/><div><h2 className="font-semibold">{en ? 'Education' : 'Formação acadêmica'}</h2><p className={`mt-1 text-sm ${muted}`}>PUC Minas — {en ? 'Software Engineering' : 'Engenharia de Software'}</p><p className={`text-xs ${muted}`}>{en ? 'Aug 2025 – Expected 2029' : 'Ago. 2025 – previsão de conclusão em 2029'}</p></div></div></section>
  </div>
}
