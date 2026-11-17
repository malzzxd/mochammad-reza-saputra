export type CompetencyCategory = 'Semua' | 'Instalasi & Panel' | 'Alat Ukur & K3' | 'Gambar Teknik';

export type ProjectCategory = 'Semua' | 'Praktikum Bengkel' | 'Pengukuran & Uji' | 'Gambar Teknik';

export interface CompetencyItem {
  id: string;
  indexLabel: string;
  title: string;
  category: Exclude<CompetencyCategory, 'Semua'>;
  standardRef: string;
  description: string;
  outcomes: string[];
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Semua'>;
  period: string;
  standard: string;
  summary: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  toolsAndMaterials: string[];
  specifications: ProjectSpecification[];
  verificationNote: string;
}

export interface EducationEntry {
  period: string;
  institution: string;
  program: string;
  location: string;
  description: string;
}

export const studentProfile = {
  fullName: 'Mochammad Reza Saputra',
  shortName: 'M. Reza Saputra',
  classRoom: 'Kelas X TITL 2',
  majorFull: 'Teknik Instalasi Tenaga Listrik',
  majorAbbr: 'TITL',
  school: 'SMKN 1 Sidayu Gresik',
  regency: 'Kabupaten Gresik, Jawa Timur',
  academicYear: '2025 / 2026',
  email: 'm.reza.saputra.titl@smkn1sidayu.sch.id',
  headlineLead:
    'Pelajar Program Keahlian Teknik Instalasi Tenaga Listrik di SMKN 1 Sidayu, Kabupaten Gresik. Berfokus pada penguasaan dasar-dasar kelistrikan, penerapan Keselamatan dan Kesehatan Kerja (K3LH), pembacaan gambar teknik, serta perakitan instalasi penerangan satu fasa sesuai standar PUIL 2011.',
  careerObjective:
    'Membangun fondasi teknis yang disiplin, teliti, dan berstandar industri sebagai calon teknisi instalasi tenaga listrik yang siap berkontribusi dalam lingkungan praktik bengkel sekolah maupun dunia usaha dan dunia industri (DUDI).',
  portraitUrl: '/src/assets/images/reza_student_portrait_1794897053629.jpg',
  portraitAlt:
    'Potret resmi Mochammad Reza Saputra mengenakan seragam praktik teknik ketenagalistrikan di laboratorium SMKN 1 Sidayu Gresik',
};

export const academicHighlights = [
  {
    label: 'Program Keahlian',
    value: 'Teknik Instalasi Tenaga Listrik',
  },
  {
    label: 'Sekolah',
    value: 'SMKN 1 Sidayu Gresik',
  },
  {
    label: 'Tingkat & Kelas',
    value: 'X TITL 2 · T.A. 2025/2026',
  },
  {
    label: 'Acuan Praktik',
    value: 'PUIL 2011 & Prosedur K3LH',
  },
];

export const competencyCategories: CompetencyCategory[] = [
  'Semua',
  'Instalasi & Panel',
  'Alat Ukur & K3',
  'Gambar Teknik',
];

export const competencies: CompetencyItem[] = [
  {
    id: 'k3lh',
    indexLabel: '01',
    title: 'Keselamatan dan Kesehatan Kerja (K3LH)',
    category: 'Alat Ukur & K3',
    standardRef: 'SOP Bengkel Listrik',
    description:
      'Penerapan prosedur kerja aman sebelum, selama, dan sesudah praktik bengkel listrik guna mencegah risiko korsleting maupun sengatan listrik.',
    outcomes: [
      'Penggunaan APD standar (sepatu isolasi, sarung tangan kerja, dan pakaian praktik)',
      'Pemeriksaan kondisi isolasi perkakas tangan sebelum pengoperasian',
      'Prosedur penguncian sumber daya (LOTO dasar) saat perakitan papan praktik',
    ],
  },
  {
    id: 'alat-ukur',
    indexLabel: '02',
    title: 'Pengoperasian Alat Ukur Listrik',
    category: 'Alat Ukur & K3',
    standardRef: 'AC/DC Multimeter',
    description:
      'Pengukuran besaran listrik meliputi tegangan, kuat arus, dan tahanan menggunakan multimeter analog maupun digital secara tepat batas ukur.',
    outcomes: [
      'Pembacaan skala tegangan AC 220V dan tegangan DC rangkaian dasar',
      'Uji kontinuitas penghantar dan pemeriksaan hubungan singkat (short circuit)',
      'Pencatatan data pengukuran pada lembar kerja praktikum secara sistematis',
    ],
  },
  {
    id: 'gambar-teknik',
    indexLabel: '03',
    title: 'Dasar Gambar Teknik Kelistrikan',
    category: 'Gambar Teknik',
    standardRef: 'Simbol PUIL & IEC',
    description:
      'Pemahaman dan penggambaran diagram kelistrikan dasar sebagai acuan kerja sebelum melakukan instalasi fisik pada papan praktik.',
    outcomes: [
      'Menggambar diagram garis tunggal (single line diagram) instalasi penerangan',
      'Menyusun diagram pengawatan (wiring diagram) sakelar tunggal, seri, dan tukar',
      'Mengidentifikasi simbol komponen pengaman, sakelar, dan titik lampu standar',
    ],
  },
  {
    id: 'instalasi-penerangan',
    indexLabel: '04',
    title: 'Instalasi Penerangan Satu Fasa',
    category: 'Instalasi & Panel',
    standardRef: 'PUIL 2011 · 220V',
    description:
      'Perakitan sistem pencahayaan bangunan sederhana dan kotak kontak menggunakan tata warna kabel standar (fasa, netral, pembumian).',
    outcomes: [
      'Pemasangan sakelar tunggal, sakelar seri, dan sakelar tukar (hotel)',
      'Penempatan kotak kontak berarde dengan pengikatan terminal yang kuat',
      'Penerapan kode warna penghantar cokelat/hitam (fasa), biru (netral), dan kuning-hijau (PE)',
    ],
  },
  {
    id: 'panel-pengaman',
    indexLabel: '05',
    title: 'Perakitan Panel Hubung Bagi (PHB) Sederhana',
    category: 'Instalasi & Panel',
    standardRef: 'MCB 1 Fasa',
    description:
      'Penataan Miniature Circuit Breaker (MCB), rel terminal netral, serta terminal pembumian dalam boks panel distribusi satu fasa.',
    outcomes: [
      'Penentuan kapasitas arus pengaman MCB sesuai perhitungan beban penerangan',
      'Penataan jalur kabel rapi pada duct kabel dan terminal blok',
      'Pelabelan grup rangkaian penerangan dan daya secara jelas',
    ],
  },
  {
    id: 'pekerjaan-dasar-elektro',
    indexLabel: '06',
    title: 'Pekerjaan Mekanik & Terminasi Penghantar',
    category: 'Instalasi & Panel',
    standardRef: 'NYA 1,5 & 2,5 mm²',
    description:
      'Keterampilan dasar pemotongan, pengupasan, penyambungan kabel tembaga, dan pemasangan pelindung pipa konduit PVC.',
    outcomes: [
      'Teknik sambungan ekor babi (pigtail) dan sambungan puntir yang rapat',
      'Pembengkokan dan pemasangan pipa konduit PVC lengkap dengan T-doos dan klem',
      'Pemasangan isolator lasdop serta kerapian penempatan sambungan di kotak sambung',
    ],
  },
];

export const projectCategories: ProjectCategory[] = [
  'Semua',
  'Praktikum Bengkel',
  'Pengukuran & Uji',
  'Gambar Teknik',
];

export const projects: ProjectItem[] = [
  {
    id: 'panel-phb-satu-fasa',
    title: 'Perakitan Panel Hubung Bagi (PHB) 1 Fasa & Instalasi Penerangan',
    category: 'Praktikum Bengkel',
    period: 'Semester Genap · 2026',
    standard: 'PUIL 2011 (220V / 50Hz)',
    featured: true,
    imageUrl: '/src/assets/images/project_panel_wiring_1794897054250.jpg',
    imageAlt: 'Papan praktik perakitan panel PHB satu fasa dengan MCB, kabel duct rapi, sakelar, dan lampu uji',
    summary:
      'Perakitan boks PHB dua grup (penerangan dan kotak kontak) lengkap dengan rel netral, terminal pembumian, sakelar, serta uji fungsi beban 220V.',
    fullDescription:
      'Proyek praktikum utama di bengkel TITL SMKN 1 Sidayu Gresik yang melatih ketelitian pemasangan panel distribusi satu fasa. Rangkaian dibagi menjadi dua grup pengaman MCB terpisah untuk jalur penerangan dan jalur kotak kontak tenaga, dengan penataan penghantar di dalam cable duct serta pengujian kontinuitas sebelum dialiri tegangan sumber.',
    toolsAndMaterials: [
      'Boks PHB 1 Fasa & MCB 6A / 10A',
      'Kabel NYA 1,5 mm² dan 2,5 mm² (Fasa, Netral, PE)',
      'Sakelar tunggal, kotak kontak berarde, dan fiting lampu E27',
      'Obeng isolasi 1000V, tang potong, tang pengupas kabel, dan multimeter',
    ],
    specifications: [
      { label: 'Tegangan Sistem', value: '220 V AC / 50 Hz' },
      { label: 'Proteksi Grup 1 (Lampu)', value: 'MCB 6 A · NYA 1,5 mm²' },
      { label: 'Proteksi Grup 2 (Daya)', value: 'MCB 10 A · NYA 2,5 mm²' },
      { label: 'Hasil Uji Kontinuitas', value: 'Lulus (0,2 Ω · Tanpa Hubung Singkat)' },
    ],
    verificationNote:
      'Seluruh sambungan dan polaritas fasa-netral telah diperiksa menggunakan multimeter sebelum penyalaan sumber dan dinyatakan berfungsi normal oleh guru pengampu bengkel.',
  },
  {
    id: 'pengukuran-rangkaian-dasar',
    title: 'Pengujian Karakteristik Rangkaian Seri-Paralel & Pembacaan Multimeter',
    category: 'Pengukuran & Uji',
    period: 'Semester Ganjil · 2025',
    standard: 'Hukum Ohm & Kirchoff',
    imageUrl: '/src/assets/images/project_multimeter_bench_1794897054803.jpg',
    imageAlt: 'Multimeter digital mengukur tegangan pada papan rangkaian percobaan listrik di meja kerja laboratorium',
    summary:
      'Praktikum pengukuran tegangan jatuh, arus cabang, dan nilai resistansi ekuivalen menggunakan multimeter digital pada modul uji laboratorium.',
    fullDescription:
      'Kegiatan laboratorium dasar kelistrikan untuk memverifikasi perbandingan antara hasil perhitungan teoretis Hukum Ohm dan Hukum Kirchoff dengan hasil pengukuran aktual di papan percobaan. Meliputi kalibrasi batas ukur, pembacaan kode warna resistor, serta analisis selisih toleransi komponen.',
    toolsAndMaterials: [
      'Multimeter Digital (True RMS)',
      'Catu Daya DC Variabel 0–24V',
      'Modul Papan Uji Resistor & Terminal Blok',
      'Kabel Probe & Lembar Kerja Pengukuran',
    ],
    specifications: [
      { label: 'Tegangan Uji DC', value: '12,0 V & 24,5 V DC' },
      { label: 'Parameter Diukur', value: 'Tegangan (V), Arus (mA), Tahanan (Ω)' },
      { label: 'Deviasi Pengukuran', value: '< 1,8% dari Nilai Teoretis' },
      { label: 'Status Laporan', value: 'Terverifikasi Lengkap' },
    ],
    verificationNote:
      'Data pengamatan disusun dalam tabel perbandingan matematis dan dikumpulkan sebagai laporan praktikum Dasar-Dasar Teknik Ketenagalistrikan.',
  },
  {
    id: 'gambar-kerja-rumah-sederhana',
    title: 'Penyusunan Diagram Garis Tunggal & Pengawatan Instalasi Rumah Tinggal',
    category: 'Gambar Teknik',
    period: 'Semester Genap · 2026',
    standard: 'Simbol Standar PUIL / IEC',
    imageUrl: '/src/assets/images/project_wiring_diagram_1794897054548.jpg',
    imageAlt: 'Gambar kerja skema instalasi listrik rumah tinggal lengkap dengan penggaris skala, pensil mekanik, dan obeng isolasi',
    summary:
      'Pembuatan gambar kerja instalasi penerangan dan kotak kontak bangunan hunian tipe 36 beserta tabel rekapitulasi kebutuhan material.',
    fullDescription:
      'Tugas perencanaan gambar teknik listrik yang mencakup penentuan tata letak titik lampu, sakelar tunggal, sakelar seri, dan kotak kontak pada denah ruang tamu, kamar tidur, serta dapur. Gambar disusun menggunakan simbol ketenagalistrikan resmi lengkap dengan identifikasi jumlah tarikan kabel dalam pipa konduit.',
    toolsAndMaterials: [
      'Kertas Gambar A3 & Etiket Resmi Sekolah',
      'Penggaris Skala Teknik & Pensil Mekanik 0,5 mm',
      'Mal Simbol Ketenagalistrikan',
      'Tabel Rekapitulasi Daya & Material',
    ],
    specifications: [
      { label: 'Format Lembar', value: 'Kertas Gambar A3 · Skala 1:50' },
      { label: 'Kapasitas Daya Acuan', value: '900 VA (MCB Utama 4 A)' },
      { label: 'Jumlah Titik Beban', value: '6 Titik Lampu · 4 Kotak Kontak' },
      { label: 'Jenis Diagram', value: 'Single Line & Wiring Diagram' },
    ],
    verificationNote:
      'Gambar kerja memenuhi kelengkapan etiket, kesesuaian simbol standar, dan kejelasan jalur pengawatan antar ruang.',
  },
];

export const educationHistory: EducationEntry[] = [
  {
    period: '2025 — Sekarang',
    institution: 'SMKN 1 Sidayu Gresik',
    program: 'Teknik Instalasi Tenaga Listrik (Kelas X TITL 2)',
    location: 'Sidayu, Kabupaten Gresik',
    description:
      'Menempuh pendidikan kejuruan bidang ketenagalistrikan dengan fokus mata pelajaran Dasar-Dasar Teknik Ketenagalistrikan, Gambar Teknik Listrik, Alat Ukur Listrik, serta Pekerjaan Dasar Elektromekanik.',
  },
  {
    period: '2022 — 2025',
    institution: 'Pendidikan Menengah Pertama (SMP / Sederajat)',
    program: 'Lulusan Pendidikan Dasar Menengah',
    location: 'Kabupaten Gresik',
    description:
      'Menyelesaikan pendidikan menengah pertama dengan minat kuat pada mata pelajaran Ilmu Pengetahuan Alam (Fisika kelistrikan dasar) dan Matematika terapan.',
  },
];

export const studentBiodata = [
  { label: 'Nama Lengkap', value: 'Mochammad Reza Saputra' },
  { label: 'Sekolah', value: 'SMKN 1 Sidayu Gresik' },
  { label: 'Program Keahlian', value: 'Teknik Instalasi Tenaga Listrik' },
  { label: 'Kelas', value: 'X TITL 2' },
  { label: 'Tahun Ajaran', value: '2025 / 2026' },
  { label: 'Domisili', value: 'Kabupaten Gresik, Jawa Timur' },
  { label: 'Status Akademik', value: 'Siswa Aktif' },
  { label: 'Bahasa', value: 'Bahasa Indonesia (Aktif) · Istilah Teknik Inggris' },
];
