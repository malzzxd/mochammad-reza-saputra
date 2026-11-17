import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import {
  competencies,
  educationHistory,
  projects,
  studentBiodata,
  studentProfile,
} from '../data/portfolioData';

interface CvPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvPrintModal({ isOpen, onClose }: CvPrintModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-xs print-only-sheet"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-xl print-only-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="no-print sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h3 id="cv-modal-title" className="font-display text-base font-semibold text-slate-900">
              Pratinjau Daftar Riwayat Hidup Akademik
            </h3>
            <p className="text-xs text-slate-500">
              Format dokumen resmi siap cetak atau simpan sebagai PDF (A4)
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau CV"
              className="w-10 h-10 inline-flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable formal A4-style resume sheet */}
        <article className="p-6 sm:p-10 space-y-7 text-slate-900">
          <header className="pb-6 border-b border-slate-300 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-blue-700">
                Portofolio Akademik Siswa · {studentProfile.school}
              </p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {studentProfile.fullName}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {studentProfile.classRoom} · Program Keahlian {studentProfile.majorFull}
              </p>
            </div>
            <div className="text-xs text-slate-600 sm:text-right space-y-0.5 font-mono tabular-nums">
              <p>{studentProfile.regency}</p>
              <p>{studentProfile.email}</p>
              <p>Tahun Ajaran {studentProfile.academicYear}</p>
            </div>
          </header>

          <section className="space-y-2">
            <h2 className="text-xs font-semibold tracking-wide text-slate-500">
              RINGKASAN PROFIL
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {studentProfile.headlineLead} {studentProfile.careerObjective}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-500">
              IDENTITAS AKADEMIK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 border-t border-b border-slate-200 py-3">
              {studentBiodata.map((row) => (
                <div key={row.label} className="flex justify-between gap-3 text-xs py-1">
                  <span className="text-slate-500">{row.label}</span>
                  <span className="font-medium text-slate-900 text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-500">
              KOMPETENSI KEAHLIAN DASAR (TITL)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {competencies.map((comp) => (
                <div key={comp.id} className="border-t border-slate-200 pt-2.5">
                  <p className="text-sm font-semibold text-slate-900">
                    {comp.indexLabel}. {comp.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{comp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-500">
              RINGKASAN PRAKTIKUM & PROYEK
            </h2>
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {projects.map((proj) => (
                <div key={proj.id} className="py-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{proj.title}</h3>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      {proj.period}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{proj.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-500">
              RIWAYAT PENDIDIKAN
            </h2>
            <div className="space-y-3">
              {educationHistory.map((edu) => (
                <div key={edu.institution} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{edu.institution}</p>
                    <p className="text-xs text-slate-600">{edu.program}</p>
                  </div>
                  <p className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
