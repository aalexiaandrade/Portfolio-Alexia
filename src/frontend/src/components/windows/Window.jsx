import { useState } from 'react'
import { Minus, Square, Copy, X, ExternalLink } from 'lucide-react'
import AboutApp from '../../apps/AboutApp.jsx'
import ProjectsApp from '../../apps/ProjectsApp.jsx'
import ExperienceApp from '../../apps/ExperienceApp.jsx'
import ContactApp from '../../apps/ContactApp.jsx'
import DocumentsApp from '../../apps/DocumentsApp.jsx'

export default function Window({ app, onClose, onMinimize, theme = 'light', language = 'pt' }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const Icon = app.icon
  const en = language === 'en'
  const dark = theme === 'dark'

  const panel = dark
    ? 'border-white/15 bg-slate-900 text-slate-100'
    : 'border-white/60 bg-[#fbfaff] text-slate-800'
  const header = dark
    ? 'border-white/10 bg-slate-950/95'
    : 'border-violet-100 bg-white/95'
  const footer = dark
    ? 'border-white/10 bg-slate-950 text-slate-400'
    : 'border-violet-100 bg-white text-slate-500'

  let Content = null
  if (app.id === 'about') Content = <AboutApp language={language} theme={theme} />
  else if (app.id === 'projects') Content = <ProjectsApp language={language} theme={theme} />
  else if (app.id === 'experience') Content = <ExperienceApp language={language} theme={theme} />
  else if (app.id === 'contact') Content = <ContactApp language={language} theme={theme} />
  else if (app.id === 'documents') Content = <DocumentsApp language={language} theme={theme} />

  const windowSize = isMaximized
    ? 'inset-x-2 top-2 bottom-[76px] h-auto w-auto translate-x-0 translate-y-0 rounded-xl'
    : 'left-1/2 top-[45%] h-[min(680px,82vh)] w-[min(940px,94vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl'

  return (
    <section
      className={`absolute z-20 flex flex-col overflow-hidden border shadow-2xl transition-[top,left,right,bottom,width,height,border-radius] duration-200 ${windowSize} ${panel}`}
      aria-label={app.title}
    >
      <header className={`flex h-12 shrink-0 items-center justify-between border-b px-3 sm:px-4 ${header}`}>
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
          {Icon && <Icon size={18} className="shrink-0 text-violet-500" />}
          <span className="truncate">{app.title}</span>
        </div>

        <div className="ml-3 flex h-full shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onMinimize}
            aria-label={en ? 'Minimize window' : 'Minimizar janela'}
            title={en ? 'Minimize' : 'Minimizar'}
            className={`rounded-lg p-2 transition ${dark ? 'hover:bg-white/10' : 'hover:bg-violet-100'}`}
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized((current) => !current)}
            aria-label={isMaximized ? (en ? 'Restore window' : 'Restaurar janela') : (en ? 'Maximize window' : 'Maximizar janela')}
            title={isMaximized ? (en ? 'Restore' : 'Restaurar') : (en ? 'Maximize' : 'Maximizar')}
            className={`rounded-lg p-2 transition ${dark ? 'hover:bg-white/10' : 'hover:bg-violet-100'}`}
          >
            {isMaximized ? <Copy size={14} /> : <Square size={14} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={en ? 'Close window' : 'Fechar janela'}
            title={en ? 'Close' : 'Fechar'}
            className="rounded-lg p-2 transition hover:bg-red-500 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
        {Content ? Content : (
          <>
            <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${dark ? 'bg-violet-950 text-violet-200' : 'bg-violet-100 text-violet-700'}`}>
              {en ? 'PORTFOLIO • ALEXIA' : 'PORTFÓLIO • ALEXIA'}
            </span>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {en ? app.subtitleEn || app.subtitle : app.subtitle}
            </h1>
            <p className={`max-w-3xl text-base leading-7 sm:text-lg sm:leading-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              {en ? app.descriptionEn || app.description : app.description}
            </p>
            <p className={`mt-4 max-w-3xl leading-7 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              {en ? app.detailsEn || app.details : app.details}
            </p>
            {(app.id === 'github' || app.id === 'linkedin') && (
              <p className="mt-6 flex items-center gap-2 text-sm opacity-70">
                <ExternalLink size={16} />
                {en ? 'Add your profile URL to make this shortcut active.' : 'Adicione a URL do seu perfil para ativar este atalho.'}
              </p>
            )}
          </>
        )}
      </div>

      <footer className={`shrink-0 border-t px-4 py-2 text-xs ${footer}`}>
        Alexia • {en ? 'Personal portfolio' : 'Portfólio pessoal'}
      </footer>
    </section>
  )
}
