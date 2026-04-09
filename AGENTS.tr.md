# Easy Dataset Agent Rehberi

## Proje Genel Bakışı

Easy Dataset, Büyük Dil Modeli (LLM) ince ayar veri seti oluşturmak için özel olarak tasarlanmış bir uygulamadır. Belge işlemeden veri seti dışa aktarımına kadar eksiksiz bir iş akışı sunar ve birden fazla dosya formatı ile AI modelini destekler.

## Teknoloji Yığını

- **Ön Uç**: Next.js 14 (App Router), React 18, Material-UI v5
- **Arka Uç**: Node.js, Prisma ORM, SQLite
- **AI Entegrasyonu**: OpenAI API, Ollama, Zhipu AI, OpenRouter
- **Masaüstü Uygulaması**: Electron
- **Uluslararasılaştırma**: i18next
- **Derleme Araçları**: npm/pnpm, Electron Builder

## Temel Mimari

### 1. Veri Akış Mimarisi

```
Belge Yükleme → Metin Bölme → Soru Üretimi → Cevap Üretimi → Veri Seti Dışa Aktarımı
      ↓              ↓             ↓              ↓              ↓
Dosya İşleme   Akıllı Parçalama  LLM Üretimi   LLM Üretimi   Format Dönüşümü
```

### 2. Modül Yapısı

```
lib/
├── api/          # API arayüz katmanı
├── db/           # Veri erişim katmanı
├── file/         # Dosya işleme modülü
├── llm/          # AI model entegrasyonu
├── services/     # İş mantığı katmanı
└── util/         # Yardımcı fonksiyonlar
```

## Geliştirme Rehberi

### Ortam Kurulumu

```bash
# Bağımlılıkları yükle
npm install

# Veritabanı başlatma
npm run db:push

# Geliştirme modu
npm run dev

# Derleme
npm run build
```

### Kodlama Standartları

- ES6+ sözdizimi kullanımı
- Modüler geliştirme
- Asenkron işlemler için async/await kullanımı
- Hata yönetimi için try/catch kullanımı
- JSDoc formatında açıklamalar

### Önemli Dosya Yolları

- **Ana Giriş**: `app/page.js`
- **Proje Yönlendirmesi**: `app/projects/[projectId]/`
- **API Yönlendirmesi**: `app/api/`
- **LLM Çekirdeği**: `lib/llm/core/index.js`
- **Görev İşleme**: `lib/services/tasks/`

## Fonksiyon Modüllerinin Ayrıntıları

### 1. Belge İşleme Modülü (`lib/file/`)

- **Desteklenen Formatlar**: PDF, Markdown, DOCX, EPUB, TXT
- **Temel İşlevler**:
  - Akıllı metin bölme
  - İçindekiler yapısı çıkarma
  - Özel ayırıcılarla parçalama
  - Çoklu dil desteği

### 2. AI Model Entegrasyonu (`lib/llm/`)

- **Desteklenen Sağlayıcılar**:
  - OpenAI (GPT serisi)
  - Ollama (Yerel modeller)
  - Zhipu AI (GLM serisi)
  - OpenRouter (Çoklu model birleştirme)
- **Özellikler**:
  - Birleşik API arayüzü
  - Akış (stream) çıktı desteği
  - Çoklu dil istem desteği
  - Hata yeniden deneme mekanizması

### 3. Görev Sistemi (`lib/services/tasks/`)

- **Görev Türleri**:
  - Dosya işleme görevi
  - Soru üretim görevi
  - Cevap üretim görevi
  - Veri temizleme görevi
- **Durum Yönetimi**: Beklemede, İşleniyor, Tamamlandı, Başarısız

### 4. Veri Yönetimi (`lib/db/`)

- **Veri Modelleri**:
  - Project (Proje)
  - Text/Chunk (Metin Parçası)
  - Question (Soru)
  - Dataset (Veri Seti)
  - Tag (Etiket)

## Yaygın Geliştirme Görevleri

### Yeni AI Model Sağlayıcı Ekleme

1. `lib/llm/core/providers/` içinde yeni bir provider dosyası oluşturun
2. Temel arayüzleri uygulayın (generate, streamGenerate)
3. `lib/llm/core/index.js` içinde provider'ı kaydedin
4. Yapılandırma dosyalarını ve UI arayüzünü güncelleyin

### Yeni Dosya Formatı Desteği Ekleme

1. `lib/file/file-process/` içinde format işleyici oluşturun
2. İçerik çıkarma ve metin dönüştürme mantığını uygulayın
3. Dosya türü algılama ve doğrulamayı güncelleyin
4. İlgili UI bileşenlerini ekleyin

### Özel İstem Şablonları

1. `lib/llm/prompts/` içinde yeni istem dosyası oluşturun
2. Çoklu dil desteği için i18n kullanın
3. Ayarlar arayüzüne yapılandırma seçenekleri ekleyin
4. Farklı modellerde etkilerini test edin

### Yeni Dışa Aktarma Formatı Ekleme

1. `components/export/` içinde yeni dışa aktarma bileşeni oluşturun
2. Veri formatı dönüştürme mantığını uygulayın
3. Dışa aktarma diyalog arayüzünü güncelleyin
4. Format doğrulama ve hata yönetimi ekleyin

## Hata Ayıklama İpuçları

### 1. Veritabanı Hata Ayıklama

```bash
# Prisma Studio'yu açın
npm run db:studio

# Veritabanı dosyasını görüntüleyin
sqlite3 prisma/db.sqlite
```

### 2. LLM API Hata Ayıklama

```javascript
// lib/llm/core/index.js içinde günlük ekleyin
console.log('LLM Request:', { provider, model, prompt });
console.log('LLM Response:', response);
```

### 3. Dosya İşleme Hata Ayıklama

```javascript
// lib/file/ içinde hata ayıklama bilgisi ekleyin
console.log('File processing:', fileName, fileType);
console.log('Text chunks:', chunks.length, chunks[0]);
```

## Performans Optimizasyon Önerileri

### 1. Dosya İşleme Optimizasyonu

- Büyük dosyaları parçalara ayırma
- Asenkron eşzamanlı işleme
- Bellek kullanımı izleme
- İlerleme çubuğu gösterimi

### 2. LLM Çağrı Optimizasyonu

- İstek önbellekleme mekanizması
- Toplu istek işleme
- Yeniden deneme stratejisi optimizasyonu
- Eşzamanlılık sayısı kontrolü

### 3. Ön Uç Performans Optimizasyonu

- Bileşen tembel yükleme
- Sanal kaydırma listesi
- Görsel tembel yükleme
- Kod bölme

## Yaygın Sorun Çözümleri

### 1. Veritabanı İlgili Sorunlar

- **Sorun**: Veritabanı bağlantı hatası
- **Çözüm**: Prisma yapılandırmasını kontrol edin, veritabanı dosyasının var olduğundan emin olun

### 2. LLM API İlgili Sorunlar

- **Sorun**: API çağrısı zaman aşımı
- **Çözüm**: Zaman aşımı süresini ayarlayın, ağ bağlantısını kontrol edin, yeniden deneme mekanizması ekleyin

### 3. Dosya İşleme Sorunları

- **Sorun**: Büyük dosya işlemede bellek taşması
- **Çözüm**: Akış işleme kullanın, parçalı okuma yapın, bellek sınırını artırın

### 4. Electron Paketleme Sorunları

- **Sorun**: Paketleme sonrasında uygulama başlatılamıyor
- **Çözüm**: Bağımlılık yapılandırmasını kontrol edin, yerel modüllerin doğru paketlendiğinden emin olun

## Dağıtım Rehberi

### Docker Dağıtımı

```bash
# İmaj oluşturma
docker build -t easy-dataset .

# Konteyner çalıştırma
docker run -d -p 1717:1717 -v ./local-db:/app/local-db easy-dataset
```

### Masaüstü Uygulama Derleme

```bash
# Her platform için kurulum paketi derleme
npm run electron-build-mac    # macOS
npm run electron-build-win    # Windows
npm run electron-build-linux  # Linux
```

## Katkı Rehberi

### Commit Kuralları

- Conventional commits formatı kullanımı
- Commit öncesi lint kontrolü çalıştırma
- İlgili belgeleri güncelleme
- Test senaryoları ekleme

### Dal Stratejisi

- `main`: Ana dal, kararlı sürüm
- `dev`: Geliştirme dalı, yeni özelliklerin entegrasyonu
- `feature/*`: Özellik dalları
- `fix/*`: Düzeltme dalları

---
