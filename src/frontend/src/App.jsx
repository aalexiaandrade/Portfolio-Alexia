import { useEffect, useMemo, useState } from 'react'
import { applications, systemApplications, localizeApplications } from './data/applications.js'
import Desktop from './components/desktop/Desktop.jsx'
import Taskbar from './components/desktop/Taskbar.jsx'
import WindowManager from './components/windows/WindowManager.jsx'
import StartMenu from './components/ui/StartMenu.jsx'
import SearchPanel from './components/ui/SearchPanel.jsx'
import './index.css'
import './theme.css'

export default function App() {
  const [activeAppId, setActiveAppId] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [now, setNow] = useState(new Date())
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'pt')

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
  }, [language])

  const localizedApps = useMemo(() => localizeApplications(applications, language), [language])
  const localizedSystemApps = useMemo(() => localizeApplications(systemApplications, language), [language])
  const allApplications = [...localizedApps, ...localizedSystemApps]
  const activeApp = allApplications.find((app) => app.id === activeAppId) || null
  const isEnglish = language === 'en'

  const openApp = (id) => {
    if (!allApplications.some((item) => item.id === id)) return
    setActiveAppId(id)
    setStartOpen(false)
    setSearchOpen(false)
    setSearchText('')
  }

  const toggleStart = () => { setStartOpen((previous) => !previous); setSearchOpen(false); setSearchText('') }
  const toggleSearch = () => { setSearchOpen((previous) => !previous); setStartOpen(false); setSearchText('') }
  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')
  const toggleLanguage = () => setLanguage((current) => current === 'pt' ? 'en' : 'pt')
  const formattedTime = now.toLocaleTimeString(isEnglish ? 'en-US' : 'pt-BR', { hour: '2-digit', minute: '2-digit' })
  const formattedDate = now.toLocaleDateString(isEnglish ? 'en-US' : 'pt-BR')

  return (
    <main className={`relative h-dvh min-h-[480px] w-full overflow-hidden text-white ${theme === 'dark' ? 'portfolio-dark' : 'portfolio-light'}`}>
      <Desktop onOpen={openApp} language={language} theme={theme} />
      <WindowManager activeApp={activeApp} onClose={() => setActiveAppId(null)} onMinimize={() => setActiveAppId(null)} theme={theme} language={language} />
      {startOpen && <StartMenu applications={localizedApps} searchText={searchText} onSearchTextChange={setSearchText} onOpenApp={openApp} theme={theme} language={language} />}
      {searchOpen && <SearchPanel applications={allApplications} searchText={searchText} onSearchTextChange={setSearchText} onOpenApp={openApp} theme={theme} language={language} />}
      <Taskbar
        startOpen={startOpen} searchOpen={searchOpen} activeApp={activeApp} time={formattedTime} date={formattedDate}
        onStartClick={toggleStart} onSearchClick={toggleSearch} onProjectsClick={() => openApp('projects')}
        onAboutClick={() => openApp('about')} onWeatherClick={() => openApp('weather')}
        theme={theme} language={language} onToggleTheme={toggleTheme} onToggleLanguage={toggleLanguage}
      />
    </main>
  )
}
