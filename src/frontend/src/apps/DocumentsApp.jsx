import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  Download,
  ExternalLink,
  File,
  FileText,
  Folder,
  FolderOpen,
  GraduationCap,
  House,
} from 'lucide-react'
import { documentFolders } from '../data/documents.js'

const folderIcons = {
  certificates: Award,
  curriculum: FileText,
  education: GraduationCap,
  other: BriefcaseBusiness,
}

function joinClasses(...values) {
  return values.filter(Boolean).join(' ')
}

export default function DocumentsApp({ language = 'pt', theme = 'light' }) {
  const [folderId, setFolderId] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const en = language === 'en'
  const dark = theme === 'dark'

  const colors = useMemo(() => ({
    text: dark ? 'text-slate-100' : 'text-slate-800',
    muted: dark ? 'text-slate-300' : 'text-slate-500',
    card: dark
      ? 'border-white/10 bg-slate-800/70 hover:bg-slate-800'
      : 'border-violet-100 bg-white hover:border-violet-300 hover:bg-violet-50/60',
    soft: dark ? 'bg-slate-800 text-slate-200' : 'bg-violet-50 text-violet-700',
    button: dark ? 'hover:bg-white/10' : 'hover:bg-violet-100',
    border: dark ? 'border-white/10' : 'border-violet-100',
  }), [dark])

  const currentFolder = documentFolders.find((folder) => folder.id === folderId)

  const goBack = () => {
    if (selectedDocument) setSelectedDocument(null)
    else setFolderId(null)
  }

  const openDocument = (document) => {
    if (document.file) setSelectedDocument(document)
  }

  const title = en ? 'My documents' : 'Meus documentos'

  if (selectedDocument) {
    const fileUrl = `/${selectedDocument.file.replace(/^\//, '')}`
    return (
      <section className={joinClasses('flex min-h-[58vh] flex-col', colors.text)}>
        <div className={joinClasses('mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4', colors.border)}>
          <div className="flex min-w-0 items-center gap-2">
            <button type="button" onClick={goBack} title={en ? 'Back to folder' : 'Voltar para a pasta'} className={joinClasses('rounded-lg p-2', colors.button)}>
              <ArrowLeft size={18} />
            </button>
            <FileText className="shrink-0 text-violet-500" size={22} />
            <div className="min-w-0">
              <h2 className="truncate font-semibold">{en ? selectedDocument.nameEn || selectedDocument.name : selectedDocument.name}</h2>
              <p className={joinClasses('text-xs', colors.muted)}>{en ? 'PDF preview' : 'Visualização do PDF'}</p>
            </div>
          </div>
          <a href={fileUrl} download className={joinClasses('inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium', colors.soft)}>
            <Download size={16} /> {en ? 'Download' : 'Baixar'}
          </a>
        </div>
        <div className={joinClasses('min-h-[52vh] flex-1 overflow-hidden rounded-xl border', colors.border)}>
          <iframe title={en ? selectedDocument.nameEn || selectedDocument.name : selectedDocument.name} src={fileUrl} className="h-[58vh] min-h-[420px] w-full bg-white" />
        </div>
        <p className={joinClasses('mt-3 text-xs', colors.muted)}>
          {en ? 'If the preview does not load, use Download to open the PDF locally.' : 'Se a pré-visualização não carregar, use Baixar para abrir o PDF.'}
        </p>
      </section>
    )
  }

  return (
    <section className={joinClasses('space-y-5', colors.text)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className={joinClasses('mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold', colors.soft)}>
            <House size={14} /> {en ? 'FILE EXPLORER' : 'EXPLORADOR DE ARQUIVOS'}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{selectedDocument ? (en ? selectedDocument.nameEn || selectedDocument.name : selectedDocument.name) : (currentFolder ? (en ? currentFolder.nameEn : currentFolder.name) : title)}</h1>
          <p className={joinClasses('mt-2 max-w-2xl text-sm leading-6', colors.muted)}>
            {currentFolder
              ? (en ? currentFolder.descriptionEn : currentFolder.description)
              : (en ? 'Browse certificates, résumé and other professional documents.' : 'Explore certificados, currículo e outros documentos profissionais.')}
          </p>
        </div>
        {currentFolder && (
          <button type="button" onClick={goBack} className={joinClasses('inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium', colors.button)}>
            <ArrowLeft size={16} /> {en ? 'All folders' : 'Todas as pastas'}
          </button>
        )}
      </div>

      {!currentFolder ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {documentFolders.map((folder) => {
              const Icon = folderIcons[folder.id] || Folder
              return (
                <button key={folder.id} type="button" onClick={() => setFolderId(folder.id)} className={joinClasses('group flex min-h-28 items-start gap-4 rounded-xl border p-4 text-left transition', colors.card)}>
                  <div className={joinClasses('flex size-12 shrink-0 items-center justify-center rounded-xl', colors.soft)}>
                    <Icon size={25} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <FolderOpen size={16} className="shrink-0 text-violet-500" />
                      <h2 className="font-semibold">{en ? folder.nameEn : folder.name}</h2>
                    </div>
                    <p className={joinClasses('mt-2 text-sm leading-5', colors.muted)}>{en ? folder.descriptionEn : folder.description}</p>
                    <p className="mt-3 text-xs font-medium text-violet-500">{folder.documents.length} {en ? (folder.documents.length === 1 ? 'file' : 'files') : (folder.documents.length === 1 ? 'arquivo' : 'arquivos')}</p>
                  </div>
                </button>
              )
            })}
          </div>
        
        </>
      ) : (
        <div className="space-y-3">
          {currentFolder.documents.length > 0 ? currentFolder.documents.map((document) => (
            <div key={document.id} className={joinClasses('flex flex-wrap items-center gap-3 rounded-xl border p-4', colors.card)}>
              <div className={joinClasses('flex size-11 shrink-0 items-center justify-center rounded-lg', colors.soft)}><FileText size={22} /></div>
              <div className="min-w-0 flex-1">
                <h2 className="font-medium">{en ? document.nameEn || document.name : document.name}</h2>
                <p className={joinClasses('mt-1 text-xs', colors.muted)}>{document.description ? (en ? document.descriptionEn || document.description : document.description) : 'PDF'}</p>
              </div>
              {document.file ? (
                <button type="button" onClick={() => openDocument(document)} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700">
                  <File size={16} /> {en ? 'Open' : 'Abrir'}
                </button>
              ) : (
                <span className={joinClasses('rounded-lg px-3 py-2 text-xs', colors.soft)}>{en ? 'Add PDF in documents.js' : 'Adicione o PDF em documents.js'}</span>
              )}
            </div>
          )) : (
            <div className={joinClasses('rounded-xl border border-dashed p-8 text-center', colors.border)}>
              <FolderOpen size={34} className="mx-auto mb-3 text-violet-500" />
              <h2 className="font-semibold">{en ? 'This folder is empty for now' : 'Esta pasta ainda está vazia'}</h2>
              
            </div>
          )}
      
        </div>
      )}
    </section>
  )
}
