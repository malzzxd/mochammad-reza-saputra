import { FormEvent, useMemo, useState } from 'react';
import { ArrowUpRight, Check, Copy, FileText, Mail, MapPin, School } from 'lucide-react';
import {
  academicHighlights,
  competencies,
  competencyCategories,
  CompetencyCategory,
  educationHistory,
  projectCategories,
  ProjectCategory,
  ProjectItem,
  projects,
  studentBiodata,
  studentProfile,
} from './data/portfolioData';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { ProjectModal } from './components/ProjectModal';
import { CvPrintModal } from './components/CvPrintModal';

export default function App() {
  const [selectedCompetencyFilter, setSelectedCompetencyFilter] =
    useState<CompetencyCategory>('Semua');
  const [selectedProjectFilter, setSelectedProjectFilter] =
    useState<ProjectCategory>('Semua');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<{
    senderName: string;
    senderOrg: string;
    subject: string;
    timestamp: string;
  } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const filteredCompetencies = useMemo(() => {
    if (selectedCompetencyFilter === 'Semua') return competencies;
    return competencies.filter((item) => item.category === selectedCompetencyFilter);
  }, [selectedCompetencyFilter]);

  const filteredProjects = useMemo(() => {
    if (selectedProjectFilter === 'Semua') return projects;
    return projects.filter((item) => item.category === selectedProjectFilter);
  }, [selectedProjectFilter]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(studentProfile.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedSubject || !trimmedMessage) {
      setFormError('Mohon lengkapi nama pengirim, subjek, dan isi pesan sebelum mengirim.');
      return;
    }

    setFormError('');
    setSubmittedRecord({
      senderName: trimmedName,
      senderOrg: senderOrg.trim() || 'Umum / Akademik',
      subject: trimmedSubject,
      timestamp: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    setSenderName('');
    setSenderOrg('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header onOpenCv={() => setCvModalOpen(true)} />

      <main className="no-print flex-1">
        {/* Section 1: Formal Split-Screen Hero */}
        <section id="profil" className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Formal Typographic Identity */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <p className="text-sm font-medium text-slate-600">
                    <span>Siswa Aktif</span>
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-blue-700 font-semibold">{studentProfile.classRoom}</span>
                    <span className="mx-2 text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span>{studentProfile.school}</span>
                  </p>

                  <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] text-balance max-w-2xl">
                    {studentProfile.fullName}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    {studentProfile.headlineLead}
                  </p>
                </div>

                <div className="pt-2 space-y-6">
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                    {studentProfile.careerObjective}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#portofolio"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                    >
                      <span>Lihat Dokumentasi Praktik</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setCvModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                    >
                      <FileText className="w-4 h-4 text-slate-500" aria-hidden="true" />
                      <span>Cetak Dossier CV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Formal Portrait */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="flex-1 min-h-[320px] sm:min-h-[380px] lg:min-h-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={studentProfile.portraitUrl}
                    alt={studentProfile.portraitAlt}
                    fallbackTitle={studentProfile.fullName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500 flex items-center justify-between gap-4">
                  <span>Laboratorium Teknik Ketenagalistrikan</span>
                  <span className="font-mono tabular-nums">{studentProfile.academicYear}</span>
                </p>
              </div>
            </div>

            {/* Full-width 4-column Academic Highlight Strip below Hero Split */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {academicHighlights.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">{item.label}</p>
                  <p className="text-sm sm:text-base font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Kompetensi Dasar & Keahlian Teknis */}
        <section id="kompetensi" className="py-16 sm:py-20 border-b border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-blue-700">
                  Kurikulum Kejuruan Kelas X
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Kompetensi Dasar & Keahlian Teknis
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Penguasaan materi inti Program Keahlian Teknik Instalasi Tenaga Listrik melalui
                  pembelajaran teori kelas dan praktik bengkel terbimbing.
                </p>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="tablist"
                aria-label="Filter kategori kompetensi"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start md:self-auto"
              >
                {competencyCategories.map((category) => {
                  const isActive = selectedCompetencyFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCompetencyFilter(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompetencies.map((item) => (
                <article
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{item.category}</span>
                      <span className="font-mono tabular-nums">{item.standardRef}</span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                      {item.indexLabel}. {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>

                  <ul className="pt-4 border-t border-slate-200 space-y-2 text-xs sm:text-sm text-slate-600">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-700 shrink-0"
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Portofolio Proyek & Dokumentasi Praktikum */}
        <section id="portofolio" className="py-16 sm:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-blue-700">
                  Arsip Praktikum & Tugas Terstruktur
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Portofolio Proyek & Laporan Praktikum
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Dokumentasi hasil pengerjaan papan instalasi, pengujian alat ukur, dan gambar
                  kerja kelistrikan selama menempuh pendidikan di Kelas X TITL 2.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter kategori proyek"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg self-start md:self-auto"
              >
                {projectCategories.map((category) => {
                  const isActive = selectedProjectFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedProjectFilter(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const isWide = project.featured && selectedProjectFilter === 'Semua';
                return (
                  <article
                    key={project.id}
                    className={`group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col ${
                      isWide ? 'lg:col-span-2 lg:grid lg:grid-cols-12' : ''
                    }`}
                  >
                    <div
                      className={`overflow-hidden bg-slate-200 ${
                        isWide ? 'lg:col-span-7 aspect-video lg:aspect-auto lg:h-full' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div
                      className={`p-6 sm:p-7 flex flex-col justify-between space-y-6 ${
                        isWide ? 'lg:col-span-5' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{project.period}</span>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-slate-900 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">{project.summary}</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                          <span>Standar Acuan</span>
                          <span className="font-mono font-medium text-slate-800">
                            {project.standard}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-900 bg-white border border-slate-300 hover:border-blue-700 hover:text-blue-700 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                        >
                          <span>Lihat Detail Teknis & Uji</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Riwayat Pendidikan & Identitas Akademik */}
        <section id="pendidikan" className="py-16 sm:py-20 border-b border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Column: Education Timeline */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-blue-700">
                    Rekam Jejak Pendidikan
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Riwayat Pendidikan Formal
                  </h2>
                </div>

                <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                  {educationHistory.map((edu) => (
                    <div key={edu.institution} className="py-6 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-slate-900">
                          {edu.institution}
                        </h3>
                        <span className="font-mono text-xs font-medium text-slate-500 tabular-nums">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-blue-700">
                        {edu.program}
                        <span className="mx-2 text-slate-300" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-slate-500 font-normal">{edu.location}</span>
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Tabular Academic Identity */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-blue-700">
                    Data Pokok Siswa
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Identitas Akademik Resmi
                  </h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <dl className="divide-y divide-slate-200">
                    {studentBiodata.map((row) => (
                      <div
                        key={row.label}
                        className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
                      >
                        <dt className="text-xs sm:text-sm text-slate-500">{row.label}</dt>
                        <dd className="text-sm font-medium text-slate-900 sm:text-right">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Korespondensi Resmi */}
        <section id="kontak" className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold tracking-wide text-blue-700">
                    Komunikasi & Korespondensi
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                    Hubungi Siswa untuk Keperluan Akademik
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Terbuka untuk komunikasi terkait evaluasi tugas bengkel, bimbingan akademik,
                    maupun informasi awal program kemitraan sekolah dan industri.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <School className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-slate-900">{studentProfile.school}</p>
                      <p className="text-slate-600">
                        {studentProfile.classRoom} · {studentProfile.majorFull}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-slate-900">Wilayah Domisili</p>
                      <p className="text-slate-600">{studentProfile.regency}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1.5">
                      <p className="font-medium text-slate-900">Surel Korespondensi</p>
                      <p className="font-mono text-xs sm:text-sm text-slate-600 break-all">
                        {studentProfile.email}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded"
                      >
                        {emailCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Alamat surel disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Salin alamat surel</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                  {submittedRecord ? (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Pesan Korespondensi Tercatat</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-slate-900">
                        Terima kasih, {submittedRecord.senderName}.
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Pesan dari <span className="font-medium text-slate-900">{submittedRecord.senderOrg}</span> dengan
                        subjek <span className="font-medium text-slate-900">“{submittedRecord.subject}”</span> telah
                        dicatat pada pukul <span className="font-mono tabular-nums">{submittedRecord.timestamp}</span> WIB.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSubmittedRecord(null)}
                          className="px-4 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          Kirim Pesan Lainnya
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="sender-name"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                          >
                            Nama Lengkap Pengirim
                          </label>
                          <input
                            id="sender-name"
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="Contoh: Drs. Ahmad Fauzi"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="sender-org"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                          >
                            Instansi / Jabatan (Opsional)
                          </label>
                          <input
                            id="sender-org"
                            type="text"
                            value={senderOrg}
                            onChange={(e) => setSenderOrg(e.target.value)}
                            placeholder="Contoh: Guru Pengampu TITL"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message-subject"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          Subjek Pesan
                        </label>
                        <input
                          id="message-subject"
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Contoh: Evaluasi Laporan Praktikum Panel PHB"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message-body"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          Isi Pesan
                        </label>
                        <textarea
                          id="message-body"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tuliskan pesan resmi atau catatan evaluasi di sini..."
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                        />
                      </div>

                      {formError && (
                        <p role="alert" className="text-sm text-rose-700 font-medium">
                          {formError}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-4 pt-1">
                        <p className="text-xs text-slate-500">
                          Gunakan bahasa korespondensi formal.
                        </p>
                        <button
                          type="submit"
                          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                        >
                          Kirim Pesan Resmi
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="no-print bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © <span className="font-mono tabular-nums">2026</span> {studentProfile.fullName}
            <span className="mx-2 text-slate-300" aria-hidden="true">
              ·
            </span>
            {studentProfile.classRoom}
            <span className="mx-2 text-slate-300" aria-hidden="true">
              ·
            </span>
            {studentProfile.school}
          </p>
          <button
            type="button"
            onClick={() => setCvModalOpen(true)}
            className="text-slate-700 hover:text-blue-700 font-medium transition-colors cursor-pointer"
          >
            Buka Versi Cetak CV
          </button>
        </div>
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <CvPrintModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
