import { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.period}</span>
              <span aria-hidden="true">·</span>
              <span>{project.standard}</span>
            </div>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-xl font-semibold text-slate-900 leading-snug"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="w-10 h-10 shrink-0 inline-flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <ResilientImage
              src={project.imageUrl}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Ringkasan Pelaksanaan</h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Spesifikasi & Hasil Uji</h4>
              <dl className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {project.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-2.5 flex items-baseline justify-between gap-4 text-sm"
                  >
                    <dt className="text-slate-500">{spec.label}</dt>
                    <dd className="font-mono text-xs sm:text-sm font-medium text-slate-900 text-right tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Alat & Komponen Utama</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {project.toolsAndMaterials.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-900">Catatan Verifikasi Praktikum</p>
              <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">
                {project.verificationNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
