# QR Sistemi / QR System

Ücretsiz, kotasız ve süresiz statik QR kod üreticisi. Bağlantılar doğrudan QR görselinin içine
yazılır; yönlendirme servisi, hesap, veritabanı veya takip katmanı kullanılmaz.

A free, unlimited generator for permanent static QR codes. Links are encoded directly in the QR
image—there is no redirect service, account, database, or tracking layer.

**Türkçe** · [English](#english)

## Özellikler

- Klasik, yumuşak, noktalı, modern ve akışkan QR stilleri
- QR ve arka plan rengi seçimi
- 512, 1024 ve 2048 piksel PNG çıktısı
- Baskıya uygun SVG çıktısı
- Türkçe ve İngilizce arayüz
- Sistem tercihini algılayan, seçimi hatırlayan gerçek siyah koyu tema
- Telefon, tablet ve masaüstü için responsive tasarım
- Statik, doğrudan ve süresiz QR kodları

## Yerelde çalıştırma

macOS'ta **QR Sistemini Başlat.command** dosyasına çift tıklayın. Açılan Terminal penceresi açık
kaldığı sürece uygulama çalışır.

Alternatif olarak:

```bash
npm install
npm run dev
```

Üretim derlemesi:

```bash
npm run build
```

Statik çıktı `dist/client` klasöründe oluşur.

## Güvenlik modeli

QR Sistemi **statik QR** üretir. Girilen hedef adres doğrudan QR modüllerine kodlanır. Okutma
sırasında QR Sistemi'ne veya başka bir yönlendirme sunucusuna istek yapılmaz. Bu nedenle üçüncü bir
taraf, oluşturulmuş QR görselinin hedefini uzaktan değiştiremez.

Güvenlik sınırı hedef adrestir: hedef domainin sahibi sayfayı değiştirirse, domain süresi dolarsa ya
da DNS/domain hesabı ele geçirilirse QR aynı adresi açmaya devam eder fakat o adresteki içerik
değişmiş olabilir. Domain hesabında iki aşamalı doğrulama kullanın ve otomatik yenilemeyi açın.

Vercel yapılandırması; içerik güvenliği, çerçeveleme engeli, MIME koruması, referrer gizliliği ve
gereksiz tarayıcı izinlerini kapatan güvenlik başlıkları içerir.

## Vercel ve özel domain

`vercel.json` hazırdır. GitHub deposunu Vercel'e içe aktarın; build komutu ve çıktı klasörü otomatik
olarak yapılandırılır. Yayın sonrası Vercel proje ayarlarında **Settings → Domains** bölümünden özel
domain eklenebilir.

> Vercel Hobby planı yalnızca kişisel ve ticari olmayan kullanım içindir. Ürünü gelir elde etmek,
> müşteri işi veya şirket hizmeti için kullanacaksanız Vercel Pro ya da ticari kullanıma izin veren
> başka bir statik hosting seçin.

## Lisanslar ve ticari kullanım

QR oluşturma motoru MIT lisanslı `qr-code-styling` paketini kullanır. Statik QR üretimi ticari bir
ürüne dönüştürülebilir. Dinamik QR, tarama analitiği, kullanıcı hesabı veya sonradan hedef değiştirme
özellikleri eklenirse yönlendirme sunucusu ve veritabanı gerekir; bu sürüm bilerek bunları kullanmaz.

---

## English

A free, unlimited generator for permanent static QR codes. Links are encoded directly into the QR
image, without a redirect service or tracking layer.

### Features

- Classic, soft, dotted, modern, and flowing QR styles
- Foreground and background color controls
- PNG exports at 512, 1024, and 2048 pixels
- Print-ready SVG export
- Fully translated Turkish and English interface
- True-black dark mode with system detection and saved preference
- Responsive phone, tablet, and desktop design
- Permanent static QR codes with direct destinations

### Run locally

On macOS, double-click **QR Sistemini Başlat.command** and keep the Terminal window open.

Or use a terminal:

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. Static files are generated in `dist/client`.

### Security model

QR System creates **static QR codes**. The destination is encoded directly into the QR modules.
Scanning does not contact QR System or any redirect server, so a third party cannot remotely change
the destination of an already generated QR image.

The destination remains the security boundary. If its owner changes the page, the domain expires,
or the domain/DNS account is compromised, the QR will still open the same address but its content
may have changed. Protect domain accounts with two-factor authentication and automatic renewal.

The Vercel configuration includes security headers for content security, anti-framing, MIME
sniffing protection, referrer privacy, and disabled unnecessary browser permissions.

### Deploy to Vercel

Import the GitHub repository into Vercel. The included `vercel.json` configures the build and static
output automatically. Add a custom domain from **Project Settings → Domains** after deployment.

> Vercel Hobby is restricted to personal, non-commercial use. Use Vercel Pro or another host that
> permits commercial use when operating this as a paid or business product.

### License and commercial use

The QR engine uses the MIT-licensed `qr-code-styling` package. The static generator can be offered
commercially. Dynamic destinations, scan analytics, user accounts, and editable QR targets require
a redirect service and database; this version intentionally includes none of those features.

---

Developed by [Ümitcan Çınar](https://umitcancinar.me)
