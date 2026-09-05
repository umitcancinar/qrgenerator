import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      meta: {
        title: 'QR Sistemi — Ücretsiz ve Süresiz QR Oluşturucu',
        description:
          'Bağlantı ve metinleri ücretsiz, süresiz QR koda dönüştür.',
      },
      brand: 'QR Sistemi',
      brandAria: 'QR Sistemi ana sayfa',
      badge: 'Ücretsiz ve süresiz',
      instant: 'STATİK QR OLUŞTURUCU',
      title: 'Her bağlantı için güvenilir QR kod.',
      subtitle:
        'Hesap yok, kota yok, yönlendirme servisi yok. Kodun doğrudan verdiğin adresi içerir.',
      contentTitle: 'QR içeriği',
      contentDescription: 'Bağlantıyı yapıştır; önizleme anında yenilenir.',
      contentLabel: 'Bağlantı veya metin',
      placeholder: 'https://ornek.com',
      characters: '{{count}} karakter',
      directLink: 'Doğrudan bağlantı',
      appearance: 'QR görünümü',
      styles: {
        classic: 'Klasik',
        soft: 'Yumuşak',
        dots: 'Noktalı',
        modern: 'Modern',
        bold: 'Akışkan',
      },
      outputSize: 'Çıktı boyutu',
      colors: 'Renkler',
      qrColor: 'QR rengi',
      qr: 'QR',
      backgroundColor: 'Arka plan rengi',
      background: 'Zemin',
      filename: 'Dosya adı',
      reset: 'Varsayılanlara dön',
      previewTitle: 'Hazır QR kodun',
      ready: 'Hazır',
      target: 'HEDEF',
      waiting: 'Bağlantı bekleniyor',
      enterContent: 'İçerik gir',
      qrAria: '{{target}} için QR kodu',
      downloadPng: 'PNG indir',
      downloadSvg: 'SVG indir',
      downloaded: 'İndirildi',
      errors: {
        engine: 'QR motoru başlatılamadı.',
        content: 'Bu içerik QR koduna dönüştürülemedi.',
      },
      featuresLabel: 'QR özellikleri',
      features: {
        timeless: ['Süresiz', 'QR kodun zaman aşımına uğramaz.'],
        direct: ['Doğrudan', 'Kod, verdiğin hedef adresi açar.'],
        free: ['Özgür', 'Üyelik ve üretim kotası yoktur.'],
      },
      how: 'NASIL ÇALIŞIR?',
      howTitle: 'QR kodun içinde bağlantının kendisi bulunur.',
      howText:
        'Kamera kodu okur ve hedef adresi doğrudan açar. Bu araç kapansa bile indirdiğin QR görseli çalışmaya devam eder. Yalnızca hedef domaini veya sayfayı kapatırsan bağlantı erişilemez olur.',
      developedBy: 'Geliştiren',
      developer: 'Ümitcan Çınar',
      language: 'Dil',
      theme: {
        dark: 'Koyu temaya geç',
        light: 'Açık temaya geç',
      },
    },
  },
  en: {
    translation: {
      meta: {
        title: 'QR System — Free, Permanent QR Generator',
        description: 'Turn links and text into free, permanent QR codes.',
      },
      brand: 'QR System',
      brandAria: 'QR System home',
      badge: 'Free and permanent',
      instant: 'STATIC QR GENERATOR',
      title: 'Reliable QR codes for every link.',
      subtitle:
        'No account, no quota, no redirect service. The code contains the exact address you provide.',
      contentTitle: 'QR content',
      contentDescription: 'Paste a link and the preview updates instantly.',
      contentLabel: 'Link or text',
      placeholder: 'https://example.com',
      characters: '{{count}} characters',
      directLink: 'Direct link',
      appearance: 'QR appearance',
      styles: {
        classic: 'Classic',
        soft: 'Soft',
        dots: 'Dotted',
        modern: 'Modern',
        bold: 'Flow',
      },
      outputSize: 'Output size',
      colors: 'Colors',
      qrColor: 'QR color',
      qr: 'QR',
      backgroundColor: 'Background color',
      background: 'Background',
      filename: 'File name',
      reset: 'Restore defaults',
      previewTitle: 'Your QR code',
      ready: 'Ready',
      target: 'TARGET',
      waiting: 'Waiting for a link',
      enterContent: 'Enter content',
      qrAria: 'QR code for {{target}}',
      downloadPng: 'Download PNG',
      downloadSvg: 'Download SVG',
      downloaded: 'Downloaded',
      errors: {
        engine: 'The QR engine could not be started.',
        content: 'This content could not be converted into a QR code.',
      },
      featuresLabel: 'QR features',
      features: {
        timeless: ['Permanent', 'Your QR code never expires.'],
        direct: ['Direct', 'The code opens the exact destination you provide.'],
        free: ['Open', 'No membership or generation quota.'],
      },
      how: 'HOW DOES IT WORK?',
      howTitle: 'The QR code contains the link itself.',
      howText:
        'The camera reads the code and opens the target address directly. A downloaded QR image keeps working even if this tool closes. It becomes unreachable only if the target domain or page is taken offline.',
      developedBy: 'Developed by',
      developer: 'Ümitcan Çınar',
      language: 'Language',
      theme: {
        dark: 'Switch to dark theme',
        light: 'Switch to light theme',
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
