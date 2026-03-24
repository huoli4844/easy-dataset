<div align="center">

![](./public//imgs/bg2.png)

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ConardLi/easy-dataset">
<img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/ConardLi/easy-dataset/total">
<img alt="GitHub Release" src="https://img.shields.io/github/v/release/ConardLi/easy-dataset">
<img src="https://img.shields.io/badge/license-AGPL--3.0-green.svg" alt="AGPL 3.0 License"/>
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/ConardLi/easy-dataset">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/ConardLi/easy-dataset">
<a href="https://arxiv.org/abs/2507.04009v1" target="_blank">
  <img src="https://img.shields.io/badge/arXiv-2507.04009-b31b1b.svg" alt="arXiv:2507.04009">
</a>

<a href="https://trendshift.io/repositories/13944" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13944" alt="ConardLi%2Feasy-dataset | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

**Büyük Dil Modelleri için ince ayar veri setleri oluşturmaya yönelik güçlü bir araç**

[简体中文](./README.zh-CN.md) | [English](./README.md) | [Türkçe](./README.tr.md)

[Özellikler](#özellikler) • [Hızlı Başlangıç](#yerel-çalıştırma) • [Dokümantasyon](https://docs.easy-dataset.com/ed/en) • [Katkıda Bulunma](#katkıda-bulunma) • [Lisans](#lisans)

Bu projeyi beğendiyseniz, lütfen bir Yıldız⭐️ verin veya yazara bir kahve ısmarlayın => [Bağış](./public/imgs/aw.jpg) ❤️!

</div>

## Genel Bakış

Easy Dataset, Büyük Dil Modeli (LLM) veri setleri oluşturmak için özel olarak tasarlanmış bir uygulamadır. Sezgisel bir arayüzün yanı sıra güçlü yerleşik belge ayrıştırma araçları, akıllı segmentasyon algoritmaları, veri temizleme ve zenginleştirme yetenekleri sunar. Uygulama, çeşitli formatlardaki alana özgü belgeleri; model ince ayarı, geri çağırma destekli üretim (RAG) ve model performans değerlendirmesi gibi senaryolara uygun yüksek kaliteli yapılandırılmış veri setlerine dönüştürebilir.

![](./public/imgs/arc3.png)

## Haberler

🎉🎉 Easy Dataset Sürüm 1.7.0 yepyeni değerlendirme yetenekleriyle yayınlandı! Alana özgü belgeleri zahmetsizce değerlendirme veri setlerine (test setleri) dönüştürebilir ve çok boyutlu değerlendirme görevlerini otomatik olarak çalıştırabilirsiniz. Ayrıca insan kör test sistemi ile dikey alan model değerlendirmesi, ince ayar sonrası model performans ölçümü ve RAG geri çağırma oranı değerlendirmesi gibi ihtiyaçlarınızı kolayca karşılayabilirsiniz.

## Özellikler

### 📄 Belge İşleme ve Veri Üretimi

- **Akıllı Belge İşleme**: PDF, Markdown, DOCX, TXT, EPUB ve daha fazla formatın akıllı tanınması desteği
- **Akıllı Metin Bölme**: Çoklu bölme algoritmaları (Markdown yapısı, yinelemeli ayırıcılar, sabit uzunluk, kod-bilinçli parçalama) ve özelleştirilebilir görsel segmentasyon
- **Akıllı Soru Üretimi**: Metin bölümlerinden otomatik soru çıkarma, soru şablonları ve toplu üretim desteği
- **Alan Etiketi Ağacı**: Belge yapısına dayalı küresel alan etiketi ağaçlarını akıllıca oluşturma ve otomatik etiketleme
- **Cevap Üretimi**: Kapsamlı cevaplar ve Düşünce Zinciri (COT) oluşturmak için LLM API kullanımı, yapay zeka optimizasyonu ile
- **Veri Temizleme**: Gürültüyü kaldırmak ve veri kalitesini artırmak için akıllı metin temizleme

### 🔄 Çoklu Veri Seti Türleri

- **Tek Turlu Soru-Cevap Veri Setleri**: Temel ince ayar için standart soru-cevap çiftleri
- **Çok Turlu Diyalog Veri Setleri**: Konuşma formatı için özelleştirilebilir roller ve senaryolar
- **Görsel Soru-Cevap Veri Setleri**: Görsellerden soru-cevap verisi üretme, birden fazla içe aktarma yöntemi (dizin, PDF, ZIP)
- **Veri Damıtma**: Belge yüklemeden doğrudan alan konularından etiket ağaçları ve sorular üretme

### 📊 Model Değerlendirme Sistemi

- **Değerlendirme Veri Setleri**: Doğru/yanlış, tekli seçim, çoklu seçim, kısa cevap ve açık uçlu sorular üretme
- **Otomatik Model Değerlendirmesi**: Hakem Modeli ile model cevap kalitesini otomatik değerlendirme ve özelleştirilebilir puanlama kuralları
- **İnsan Kör Testi (Arena)**: İki modelin cevaplarının tarafsız değerlendirme için çift kör karşılaştırması
- **Yapay Zeka Kalite Değerlendirmesi**: Üretilen veri setlerinin otomatik kalite puanlaması ve filtrelenmesi

### 🛠️ Gelişmiş Özellikler

- **Özel İstemler**: Tüm istem şablonlarının proje düzeyinde özelleştirilmesi (soru üretimi, cevap üretimi, veri temizleme vb.)
- **GA Çifti Üretimi**: Veri çeşitliliğini artırmak için Tür-Hedef Kitle çifti üretimi
- **Görev Yönetim Merkezi**: İzleme ve kesintiye alma desteğiyle arka plan toplu görev işleme
- **Kaynak İzleme Paneli**: Token tüketim istatistikleri, API çağrı takibi, model performans analizi
- **Model Test Alanı**: Aynı anda 3 modeli karşılaştırma

### 📤 Dışa Aktarma ve Entegrasyon

- **Çoklu Dışa Aktarma Formatları**: JSON/JSONL dosya türleriyle Alpaca, ShareGPT, Çok Dilli Düşünme formatları
- **Dengeli Dışa Aktarma**: Veri seti dengeleme için etiket başına dışa aktarma sayısı yapılandırma
- **LLaMA Factory Entegrasyonu**: Tek tıkla LLaMA Factory yapılandırma dosyası oluşturma
- **Hugging Face Yükleme**: Veri setlerini doğrudan Hugging Face Hub'a yükleme

### 🤖 Model Desteği

- **Geniş Model Uyumluluğu**: OpenAI formatını takip eden tüm LLM API'leriyle uyumlu
- **Çoklu Sağlayıcı Desteği**: OpenAI, Ollama (yerel modeller), Zhipu AI, Alibaba Bailian, OpenRouter ve daha fazlası
- **Görüntü Modelleri**: PDF ayrıştırma ve görsel soru-cevap için Gemini, Claude vb. desteği

### 🌐 Kullanıcı Deneyimi

- **Kullanıcı Dostu Arayüz**: Hem teknik hem de teknik olmayan kullanıcılar için tasarlanmış modern, sezgisel arayüz
- **Çoklu Dil Desteği**: Eksiksiz Çince, İngilizce ve Türkçe dil desteği 🇹🇷
- **Veri Seti Meydanı**: Herkese açık veri seti kaynaklarını keşfetme
- **Masaüstü İstemcileri**: Windows, macOS ve Linux için kullanılabilir

## Hızlı Demo

https://github.com/user-attachments/assets/6ddb1225-3d1b-4695-90cd-aa4cb01376a8

## Yerel Çalıştırma

### İstemciyi İndirin

<table style="width: 100%">
  <tr>
    <td width="20%" align="center">
      <b>Windows</b>
    </td>
    <td width="30%" align="center" colspan="2">
      <b>MacOS</b>
    </td>
    <td width="20%" align="center">
      <b>Linux</b>
    </td>
  </tr>
  <tr style="text-align: center">
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/windows.png' style="height:24px; width: 24px" />
        <br />
        <b>Setup.exe</b>
      </a>
    </td>
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/mac.png' style="height:24px; width: 24px" />
        <br />
        <b>Intel</b>
      </a>
    </td>
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/mac.png' style="height:24px; width: 24px" />
        <br />
        <b>M</b>
      </a>
    </td>
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/linux.png' style="height:24px; width: 24px" />
        <br />
        <b>AppImage</b>
      </a>
    </td>
  </tr>
</table>

### NPM ile Kurulum

1. Depoyu klonlayın:

```bash
   git clone https://github.com/ConardLi/easy-dataset.git
   cd easy-dataset
```

2. Bağımlılıkları yükleyin:

```bash
   npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
   npm run build

   npm run start
```

4. Tarayıcınızı açın ve `http://localhost:1717` adresini ziyaret edin

### Resmi Docker İmajını Kullanma

1. Depoyu klonlayın:

```bash
git clone https://github.com/ConardLi/easy-dataset.git
cd easy-dataset
```

2. `docker-compose.yml` dosyasını düzenleyin:

```yml
services:
  easy-dataset:
    image: ghcr.io/conardli/easy-dataset
    container_name: easy-dataset
    ports:
      - '1717:1717'
    volumes:
      - ./local-db:/app/local-db
      - ./prisma:/app/prisma
    restart: unless-stopped
```

> **Not:** NPM ile başlatıldığındaki veritabanı yollarıyla tutarlılığı sağlamak için, mevcut kod deposu dizinindeki `local-db` ve `prisma` klasörlerini bağlama yolları olarak kullanmanız önerilir.

> **Not:** Veritabanı dosyası ilk başlatmada otomatik olarak başlatılacaktır, `npm run db:push` komutunu manuel olarak çalıştırmanıza gerek yoktur.

3. docker-compose ile başlatın:

```bash
docker-compose up -d
```

4. Tarayıcı açın ve `http://localhost:1717` adresini ziyaret edin

### Yerel Dockerfile ile Derleme

İmajı kendiniz derlemek istiyorsanız, proje kök dizinindeki Dockerfile'ı kullanın:

1. Depoyu klonlayın:

```bash
git clone https://github.com/ConardLi/easy-dataset.git
cd easy-dataset
```

2. Docker imajını derleyin:

```bash
docker build -t easy-dataset .
```

3. Konteyneri çalıştırın:

```bash
docker run -d \
  -p 1717:1717 \
  -v ./local-db:/app/local-db \
  -v ./prisma:/app/prisma \
  --name easy-dataset \
  easy-dataset
```

> **Not:** NPM ile başlatıldığındaki veritabanı yollarıyla tutarlılığı sağlamak için, mevcut kod deposu dizinindeki `local-db` ve `prisma` klasörlerini bağlama yolları olarak kullanmanız önerilir.

> **Not:** Veritabanı dosyası ilk başlatmada otomatik olarak başlatılacaktır, `npm run db:push` komutunu manuel olarak çalıştırmanıza gerek yoktur.

4. Tarayıcı açın ve `http://localhost:1717` adresini ziyaret edin

## Dokümantasyon

- Bu projenin demo videosunu izleyin: [Easy Dataset Demo Videosu](https://www.bilibili.com/video/BV1y8QpYGE57/)
- Tüm özellikler ve API'ler hakkında ayrıntılı dokümantasyon için [Dokümantasyon Sitesi](https://docs.easy-dataset.com/ed/en)'ni ziyaret edin
- Bu projenin makalesini görüntüleyin: [Easy Dataset: A Unified and Extensible Framework for Synthesizing LLM Fine-Tuning Data from Unstructured Documents](https://arxiv.org/abs/2507.04009v1)

## Topluluk Uygulamaları

- [Easy Dataset ile eksiksiz test seti oluşturma ve model değerlendirmesi](https://www.bilibili.com/video/BV1CRrVB7Eb4/)
- [Easy Dataset × LLaMA Factory: LLM'lerin Alan Bilgisini Verimli Öğrenmesini Sağlama](https://buaa-act.feishu.cn/wiki/GVzlwYcRFiR8OLkHbL6cQpYin7g)
- [Easy Dataset Pratik Rehberi: Yüksek Kaliteli Veri Setleri Nasıl Oluşturulur?](https://www.bilibili.com/video/BV1MRMnz1EGW)
- [Easy Dataset Temel Özellik Güncellemelerinin Yorumu](https://www.bilibili.com/video/BV1fyJhzHEb7/)
- [Temel Modeller İnce Ayar Veri Setleri: Temel Bilgi Yaygınlaştırma](https://docs.easy-dataset.com/zhi-shi-ke-pu)

## Katkıda Bulunma

Topluluktan katkıları memnuniyetle karşılıyoruz! Easy Dataset'e katkıda bulunmak isterseniz, lütfen şu adımları izleyin:

1. Depoyu fork edin
2. Yeni bir dal oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi yapın
4. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
5. Dalı push edin (`git push origin feature/amazing-feature`)
6. Bir Pull Request açın (DEV dalına gönderin)

Lütfen testlerin uygun şekilde güncellendiğinden ve mevcut kodlama stiline uyulduğundan emin olun.

## Tartışma Grubuna Katılın ve Yazarla İletişime Geçin

https://docs.easy-dataset.com/geng-duo/lian-xi-wo-men

## Lisans

Bu proje AGPL 3.0 Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Alıntı

Bu çalışma faydalı olduysa, lütfen şu şekilde alıntı yapın:

```bibtex
@misc{miao2025easydataset,
  title={Easy Dataset: A Unified and Extensible Framework for Synthesizing LLM Fine-Tuning Data from Unstructured Documents},
  author={Ziyang Miao and Qiyu Sun and Jingyuan Wang and Yuchen Gong and Yaowei Zheng and Shiqi Li and Richong Zhang},
  year={2025},
  eprint={2507.04009},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2507.04009}
}
```

## Yıldız Geçmişi

[![Star History Chart](https://api.star-history.com/svg?repos=ConardLi/easy-dataset&type=Date)](https://www.star-history.com/#ConardLi/easy-dataset&Date)

<div align="center">
  <sub>❤️ ile <a href="https://github.com/ConardLi">ConardLi</a> tarafından geliştirilmiştir</sub>
</div>
