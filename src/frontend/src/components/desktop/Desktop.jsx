import { applications, systemApplications, localizeApplications } from '../../data/applications.js'
import DesktopIcon from './DesktopIcon.jsx'

export default function Desktop({ onOpen, language = 'pt', theme = 'light' }) {
    const apps = localizeApplications(applications, language)
    const systemApps = localizeApplications(systemApplications, language)
    return <>
        <div className={`desktop-wallpaper absolute inset-0 ${theme === 'dark' ? 'desktop-wallpaper-dark' : 'desktop-wallpaper-light'}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        <div className="absolute inset-x-3 top-3 bottom-20 z-10 flex flex-col flex-wrap content-start gap-2">
            {apps.map((app) => <DesktopIcon key={app.id} app={app} onOpen={onOpen} />)}
            {systemApps.filter((app) => app.id !== 'weather').map((app) => <DesktopIcon key={app.id} app={app} onOpen={onOpen} />)}
        </div>
    </>
}
