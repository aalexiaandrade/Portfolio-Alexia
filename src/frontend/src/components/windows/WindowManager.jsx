import Window from './Window.jsx'
export default function WindowManager({ activeApp, onClose, onMinimize, theme, language }) {
  if (!activeApp) return null
  return <Window key={activeApp.id} app={activeApp} onClose={onClose} onMinimize={onMinimize} theme={theme} language={language} />
}
