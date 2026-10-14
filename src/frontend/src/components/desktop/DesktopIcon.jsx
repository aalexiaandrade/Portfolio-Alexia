
export default function DesktopIcon({ app, onOpen }) {
  const Icon = app.icon

  return (
    <button
      type="button"
      onClick={() => onOpen(app.id)}
      className="group flex w-[88px] flex-col items-center gap-2 rounded-lg p-2 text-center text-white transition hover:bg-white/15 focus-visible:bg-white/15"
      title={`Abrir ${app.title}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-md transition group-hover:bg-white/25">
        <Icon size={27} strokeWidth={1.7} />
      </span>

      <span className="text-xs leading-tight drop-shadow-md">
        {app.title}
      </span>
    </button>
  )
}
