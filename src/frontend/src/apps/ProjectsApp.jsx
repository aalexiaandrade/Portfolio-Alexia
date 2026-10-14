import { Code2, ExternalLink, ImagePlus } from 'lucide-react'

// Para adicionar imagens ou vídeos, substitua o bloco .project-media pelo seu <img> ou <video>.
const projects = [
  {
    name: 'CtrlFleet',
    description: 'Sistema web para gestão de frotas públicas, com gerenciamento de veículos, reservas, manutenções e relatórios. Desenvolvido com arquitetura em camadas e APIs REST.',
    descriptionEn: 'A web system for public fleet management, including vehicles, reservations, maintenance, and reports. Built with layered architecture and REST APIs.',
    tech: ['Java 21', 'Spring Boot', 'React', 'Vite', 'Docker', 'JWT'],
    url: 'https://github.com/aalexiaandrade/CtrlFleet--TrabalhoInterdisciplinar-2-Semestre--PUCMinas',
  },
  {
    name: 'ReservasJá',
    description: 'Sistema web para gerenciamento de reservas e hospedagens na Península de Maraú, utilizando arquitetura cliente-servidor e APIs REST para apoiar o processo de locação.',
    descriptionEn: 'A web system for managing accommodation reservations in the Maraú Peninsula, using client-server architecture and REST APIs to support the booking process.',
    tech: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/aalexiaandrade/ReservaJa--TrabalhoPratico-2-Semestre--PUCMinas',
  },
]

export default function ProjectsApp({ language = 'pt', theme = 'light' }) {
  const en = language === 'en'
  const muted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
  const card = theme === 'dark' ? 'border-white/10 bg-slate-800/70' : 'border-slate-200 bg-white'
  return <div>
    <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme === 'dark' ? 'bg-blue-950 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>{en ? 'PROJECTS' : 'PROJETOS'}</span>
    <h1 className="mb-2 text-3xl font-semibold">{en ? 'Projects I have worked on' : 'Projetos que desenvolvi'}</h1>
    <p className={`mb-6 ${muted}`}>{en ? 'Academic projects where I applied software engineering concepts and technologies.' : 'Projetos acadêmicos nos quais apliquei conceitos e tecnologias de Engenharia de Software.'}</p>
    <div className="grid gap-4 lg:grid-cols-2">{projects.map((project) => <article key={project.name} className={`overflow-hidden rounded-xl border ${card}`}>
      <div className={`project-media flex min-h-40 flex-col items-center justify-center gap-2 border-b border-dashed p-5 text-center ${theme === 'dark' ? 'border-white/10 bg-slate-900/60 text-slate-400' : 'border-slate-300 bg-slate-50 text-slate-500'}`}>
        <ImagePlus size={30} className="text-blue-500"/><span className="text-sm">{en ? project.mediaLabelEn : project.mediaLabel}</span>
      </div>
      <div className="p-5"><Code2 size={22} className="mb-3 text-blue-500"/><h2 className="text-lg font-semibold">{project.name}</h2><p className={`mt-2 text-sm leading-6 ${muted}`}>{en ? project.descriptionEn : project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className={`rounded-md px-2 py-1 text-xs ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>{tech}</span>)}</div>
        <a className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline" href={project.url} target="_blank" rel="noreferrer"><ExternalLink size={15}/>{en ? 'View repository' : 'Ver repositório'}</a>
      </div>
    </article>)}</div>
  </div>
}
