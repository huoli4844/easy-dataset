# Easy DataSet Proje Mimari Tasarımı

## Proje Genel Bakışı

Easy DataSet, büyük dil modeli ince ayar veri setleri oluşturmak için tasarlanmış bir uygulamadır. Kullanıcılar metin dosyaları yükleyebilir, sistem metni otomatik olarak böler ve sorular üretir, sonunda ince ayar için kullanılacak veri setleri oluşturur.

## Teknoloji Yığını

- **Ön Uç Çerçevesi**: Next.js 14 (App Router)
- **UI Çerçevesi**: Material-UI (MUI)
- **Veri Depolama**: Dosya sistemi simülasyonlu veritabanı
- **Geliştirme Dili**: JavaScript

## Dizin Yapısı

```
easy-dataset/
├── app/                      # Next.js uygulama dizini
│   ├── api/                 # API yönlendirmeleri
│   │   └── projects/       # Proje ile ilgili API'ler
│   ├── projects/           # Proje ile ilgili sayfalar
│   │   ├── [projectId]/    # Proje detay sayfası
│   └── page.js            # Ana sayfa
├── components/             # React bileşenleri
│   ├── home/              # Ana sayfa bileşenleri
│   │   ├── HeroSection.js
│   │   ├── ProjectList.js
│   │   └── StatsCard.js
│   ├── Navbar.js          # Navigasyon çubuğu bileşeni
│   └── CreateProjectDialog.js
├── lib/                    # Araç kütüphanesi
│   └── db/                # Veritabanı modülü
│       ├── base.js        # Temel yardımcı fonksiyonlar
│       ├── projects.js    # Proje yönetimi
│       ├── texts.js       # Metin işleme
│       ├── datasets.js    # Veri seti yönetimi
│       └── index.js       # Modül dışa aktarımı
├── styles/                # Stil dosyaları
│   └── home.js           # Ana sayfa stilleri
└── local-db/             # Yerel veritabanı dizini
```

## Temel Modül Tasarımı

### 1. Veritabanı Modülü (`lib/db/`)

#### base.js

- Temel dosya işlem fonksiyonları sağlar
- Veritabanı dizininin var olmasını sağlar
- JSON dosyası okuma/yazma yardımcı fonksiyonları

#### projects.js

- Proje CRUD işlemleri
- Proje yapılandırma yönetimi
- Proje dizin yapısı bakımı

#### texts.js

- Belge işleme fonksiyonları
- Metin parçası depolama ve geri alma
- Dosya yükleme işleme

#### datasets.js

- Veri seti oluşturma ve yönetim
- Soru listesi yönetimi
- Etiket ağacı yönetimi

### 2. Ön Uç Bileşenleri (`components/`)

#### Navbar.js

- Üst navigasyon çubuğu
- Proje değiştirme
- Model seçimi
- Tema değiştirme

#### home/ Dizin Bileşenleri

- HeroSection.js: Ana sayfa üst gösterim alanı
- ProjectList.js: Proje listesi gösterimi
- StatsCard.js: Veri istatistikleri gösterimi
- CreateProjectDialog.js: Proje oluşturma diyaloğu

### 3. Sayfa Yönlendirmesi (`app/`)

#### Ana Sayfa (`page.js`)

- Proje listesi gösterimi
- Proje oluşturma giriş noktası
- Veri istatistikleri gösterimi

#### Proje Detay Sayfası (`projects/[projectId]/`)

- text-split/: Belge işleme sayfası
- questions/: Soru listesi sayfası
- datasets/: Veri seti sayfası
- settings/: Proje ayarları sayfası

#### API Yönlendirmesi (`api/`)

- projects/: Proje yönetimi API'si
- texts/: Metin işleme API'si
- questions/: Soru üretimi API'si
- datasets/: Veri seti yönetimi API'si

## Veri Akış Tasarımı

### Proje Oluşturma Süreci

1. Kullanıcı ana sayfadan veya navigasyon çubuğundan yeni proje oluşturur
2. Proje temel bilgilerini doldurur (ad, açıklama)
3. Sistem proje dizinini ve başlangıç yapılandırma dosyasını oluşturur
4. Proje detay sayfasına yönlendirilir

### Belge İşleme Süreci

1. Kullanıcı Markdown dosyası yükler
2. Sistem orijinal dosyayı proje dizinine kaydeder
3. Metin bölme servisini çağırır, parçalar ve içindekiler yapısı oluşturur
4. Bölme sonuçlarını ve çıkarılan içindekiler tablosunu gösterir

### Soru Üretim Süreci

1. Kullanıcı soru üretilecek metin parçalarını seçer
2. Sistem büyük dil modeli API'sini çağırarak sorular üretir
3. Soruları soru listesi ve etiket ağacına kaydeder

### Veri Seti Oluşturma Süreci

1. Kullanıcı cevap üretilecek soruları seçer
2. Sistem büyük dil modeli API'sini çağırarak cevaplar üretir
3. Veri seti sonuçlarını kaydeder
4. Dışa aktarma fonksiyonu sunar

## Model Yapılandırması

Birden fazla büyük dil modeli sağlayıcı yapılandırması desteklenir:

- Ollama
- OpenAI
- SiliconFlow
- DeepSeek
- Zhipu AI

Her sağlayıcı için yapılandırılabilir:

- API adresi
- API anahtarı
- Model adı

## Gelecek Genişleme Yönleri

1. Daha fazla dosya formatı desteği (PDF, DOC vb.)
2. Veri seti kalite değerlendirme fonksiyonu ekleme
3. Veri seti sürüm yönetimi ekleme
4. Takım işbirliği fonksiyonu uygulama
5. Daha fazla veri seti dışa aktarma formatı ekleme

## Uluslararasılaştırma İşleme

### Teknoloji Seçimi

- **Uluslararasılaştırma Kütüphanesi**: i18next + react-i18next
- **Dil Algılama**: i18next-browser-languagedetector
- **Desteklenen Diller**: İngilizce (en), Basitleştirilmiş Çince (zh-CN), Türkçe (tr)

### Dizin Yapısı

```
easy-dataset/
├── locales/              # Uluslararasılaştırma kaynak dizini
│   ├── en/              # İngilizce çeviriler
│   │   └── translation.json
│   ├── zh-CN/           # Çince çeviriler
│   │   └── translation.json
│   └── tr/              # Türkçe çeviriler
│       └── translation.json
├── lib/
│   └── i18n.js          # i18next yapılandırması
```
