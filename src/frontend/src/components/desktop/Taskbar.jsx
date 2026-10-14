import {
  Menu,
  Search,
  FolderKanban,
  UserRound,
  Sun,
  Moon,
  Languages,
} from 'lucide-react'

import WeatherClock from '../ui/WeatherClock.jsx'

export default function Taskbar({
  startOpen,
  searchOpen,
  activeApp,
  time,
  date,
  onStartClick,
  onSearchClick,
  onProjectsClick,
  onAboutClick,
  theme,
  language,
  onToggleTheme,
  onToggleLanguage,
}) {
  const en = language === 'en'
  const dark = theme === 'dark'

  const barClass = dark
    ? 'border-white/10 bg-slate-950/85 text-slate-100'
    : 'border-white/25 bg-[#f0eaff]/85 text-slate-800'

  const hoverClass = dark
    ? 'hover:bg-white/10'
    : 'hover:bg-violet-100/80'

  const selectedClass = dark
    ? 'bg-white/15'
    : 'bg-white/80'

  const buttonClass = `flex shrink-0 items-center justify-center rounded-lg p-2 transition sm:p-3 ${hoverClass}`

  return (
    <footer
      className={`absolute inset-x-0 bottom-0 z-40 flex h-[60px] items-center justify-between gap-1 border-t px-2 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:h-[64px] sm:gap-2 sm:px-4 ${barClass}`}
    >
      {/* Identificação do portfólio: somente no desktop */}
      <div className="hidden min-w-0 flex-1 items-center sm:flex">
        <span className="truncate text-xs opacity-70">
          {en ? 'Portfolio' : 'Portfólio Aléxia'}
        </span>
      </div>

      {/* Menu e pesquisa no celular; centralizados no desktop */}
      <div className="flex shrink-0 items-center gap-0.5 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:gap-1">
        <button
          type="button"
          onClick={onStartClick}
          aria-label={en ? 'Open Start menu' : 'Abrir menu Iniciar'}
          title={en ? 'Start' : 'Iniciar'}
          className={`${buttonClass} ${startOpen ? selectedClass : ''}`}
        >
          <Menu size={21} className="text-violet-500" />
        </button>

        <button
          type="button"
          onClick={onSearchClick}
          aria-label={en ? 'Search' : 'Pesquisar'}
          title={en ? 'Search' : 'Pesquisar'}
          className={`${buttonClass} ${searchOpen ? selectedClass : ''}`}
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          onClick={onProjectsClick}
          aria-label={en ? 'Open projects' : 'Abrir projetos'}
          title={en ? 'Projects' : 'Projetos'}
          className={`hidden rounded-lg p-3 transition sm:block ${hoverClass} ${activeApp?.id === 'projects' ? selectedClass : ''}`}
        >
          <FolderKanban size={21} className="text-violet-500" />
        </button>

        <button
          type="button"
          onClick={onAboutClick}
          aria-label={en ? 'Open about me' : 'Abrir sobre mim'}
          title={en ? 'About me' : 'Sobre mim'}
          className={`hidden rounded-lg p-3 transition sm:block ${hoverClass} ${activeApp?.id === 'about' ? selectedClass : ''}`}
        >
          <UserRound size={21} />
        </button>
      </div>

      {/* Tema, idioma e informações de tempo */}
      <div className="ml-auto flex min-w-0 shrink items-center justify-end gap-0.5 sm:gap-1">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            en
              ? dark
                ? 'Switch to light theme'
                : 'Switch to dark theme'
              : dark
                ? 'Mudar para tema claro'
                : 'Mudar para tema escuro'
          }
          title={
            en
              ? dark
                ? 'Light theme'
                : 'Dark theme'
              : dark
                ? 'Tema claro'
                : 'Tema escuro'
          }
          className={buttonClass}
        >
          {dark ? (
            <Sun size={19} className="text-amber-400" />
          ) : (
            <Moon size={19} className="text-violet-600" />
          )}
        </button>

        <button
          type="button"
          onClick={onToggleLanguage}
          aria-label={en ? 'Switch to Portuguese' : 'Mudar para inglês'}
          title={en ? 'Português' : 'English'}
          className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-2.5 text-xs font-semibold transition sm:px-3 ${hoverClass}`}
        >
          <Languages size={18} />
          <span>{en ? 'EN' : 'PT'}</span>
        </button>

        {/* O clima fica oculto em celulares para evitar sobreposição */}
        <div className="hidden min-w-0 sm:block">
          <WeatherClock
            time={time}
            date={date}
            theme={theme}
            language={language}
          />
        </div>
      </div>
    </footer>
  )
}
