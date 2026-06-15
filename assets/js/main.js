const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const langToggle = document.querySelector("#lang-toggle");
const root = document.documentElement;
const body = document.body;

const applyLanguage = (lang) => {
  const isEnglish = lang === "en";
  body.classList.toggle("lang-en", isEnglish);
  body.classList.toggle("lang-ja", !isEnglish);
  root.setAttribute("lang", isEnglish ? "en" : "ja");
  if (langToggle) {
    langToggle.setAttribute(
      "aria-label",
      isEnglish ? "Switch to Japanese" : "Switch to English"
    );
  }
};

if (langToggle) {
  const storedLang = localStorage.getItem("lang");
  const initialLang = storedLang || root.getAttribute("lang") || "ja";
  applyLanguage(initialLang.startsWith("en") ? "en" : "ja");
  langToggle.addEventListener("click", () => {
    const nextLang = body.classList.contains("lang-en") ? "ja" : "en";
    applyLanguage(nextLang);
    localStorage.setItem("lang", nextLang);
  });
}

const updatePlaceholders = (lang) => {
  document.querySelectorAll("[data-placeholder-ja]").forEach((input) => {
    const ja = input.getAttribute("data-placeholder-ja") || "";
    const en = input.getAttribute("data-placeholder-en") || "";
    input.setAttribute("placeholder", lang === "ja" ? ja : en);
  });
  document.querySelectorAll("[data-text-ja]").forEach((el) => {
    const ja = el.getAttribute("data-text-ja") || "";
    const en = el.getAttribute("data-text-en") || "";
    el.textContent = lang === "ja" ? ja : en;
  });
};

updatePlaceholders(body.classList.contains("lang-en") ? "en" : "ja");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    updatePlaceholders(body.classList.contains("lang-en") ? "en" : "ja");
  });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false"
    );
  });
}

const slides = Array.from(document.querySelectorAll(".hero-slide"));
let slideIndex = 0;

const setActiveSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
};

if (slides.length > 0) {
  setActiveSlide(slideIndex);
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    setActiveSlide(slideIndex);
  }, 4800);
}

const reveals = document.querySelectorAll(".scroll-reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => revealObserver.observe(el));

const mockModal = document.querySelector("#mock-modal");
const mockModalClose = mockModal?.querySelector(".modal-close");

if (mockModal && mockModalClose) {
  const closeModal = () => mockModal.classList.add("is-hidden");
  mockModalClose.addEventListener("click", closeModal);
}

const partnerModal = document.querySelector("#partner-modal");
const partnerModalClose = partnerModal?.querySelector(".partner-modal-close");
const partnerModalTitle = partnerModal?.querySelector("#partner-modal-title");
const partnerModalBio = partnerModal?.querySelector("#partner-modal-bio");

const openPartnerModal = (card) => {
  if (!partnerModal || !partnerModalTitle || !partnerModalBio) return;
  const name = card.dataset.name || "Partner";
  const bio = card.dataset.bio || "";
  partnerModalTitle.textContent = name;
  partnerModalBio.textContent = bio;
  partnerModal.classList.remove("is-hidden");
};

const closePartnerModal = () => {
  partnerModal?.classList.add("is-hidden");
};

document.querySelectorAll(".partner-card").forEach((card) => {
  card.addEventListener("click", () => openPartnerModal(card));
});

if (partnerModal && partnerModalClose) {
  partnerModalClose.addEventListener("click", closePartnerModal);
  partnerModal.addEventListener("click", (event) => {
    if (event.target === partnerModal) closePartnerModal();
  });
}

const biographies = {
  anis: {
    name: 'アニス・ウッザマン',
    name_en: 'Anis Uzzaman',
    role: '代表取締役社長',
    role_en: 'Representative Director, President & CEO',
    photo: 'assets/corporate_img/Anis_bio.avif',
    paragraphs: [
      'ペガサス・テック・ホールディングスの代表取締役社長であり、またCEO兼創業者として、ペガサス・テック・ベンチャーズを統括しています。米国のシリコンバレーに拠点を置くペガサス・テック・ベンチャーズはアーリーステージから最終ラウンドまでのスタートアップに投資を行います。数百万ドル規模のファンドを有し、IT、ヘルスケア、人工知能、IoT、ロボティクス、ビッグデータ、VR、AR、フィンテック、および次世代テクノロジーといった分野において投資を行っています。',
      'IBMのマネジメントチームのリーダーとして活躍していた際には、ソフトウェア開発やマイクロエレクトロニクス、Eコマース分野への戦略的投資を行なった経験を有します。小売業界とテクノロジー分野における起業家としての経験を活かして、スタートアップに資金調達、オペレーション、イグジット戦略等のアドバイスを行っています。',
      '当社はこれまでアメリカ、日本、東南アジアなどの230社以上のスタートアップへの投資実績があります。投資先には米国の名だたるスタートアップであるSpaceX、23andMe、SoFi、Airbnb、Coinbase、Color、Genius、DoorDashなどがあります。東京工業大学で工学の学士号、オクラホマ州立大学で工学の修士号、首都大学東京でコンピュータ工学の博士号を取得しています。',
      'さらに、最新の著書には「シリコンバレーは日本企業を求めている 世界が羨む最強のパートナーシップ」があり、他には「スタートアップバイブル - シリコンバレー流・ベンチャー企業のつくりかた」や「世界の投資家は、日本企業の何を見ているのか？」など起業やシリコンバレーにまつわるものがあり、日本をはじめとして、韓国、インドネシア、台湾でも販売されています。'
    ],
    paragraphs_en: [
      'As Representative Director, President and CEO of Pegasus Tech Holdings, and CEO and Founder of Pegasus Tech Ventures, Anis Uzzaman oversees all group operations. Based in Silicon Valley, Pegasus Tech Ventures invests in startups from early stage through final rounds, with funds worth hundreds of millions of dollars deployed across IT, healthcare, AI, IoT, robotics, big data, VR, AR, fintech, and next-generation technologies.',
      'As a management team leader at IBM, Anis led strategic investments in software development, microelectronics, and e-commerce. Drawing on his entrepreneurial experience in retail and technology, he advises startups on fundraising, operations, and exit strategies.',
      'The firm has invested in over 230 startups across the U.S., Japan, Southeast Asia, and beyond. Portfolio companies include renowned names such as SpaceX, 23andMe, SoFi, Airbnb, Coinbase, Color, Genius, and DoorDash. Anis holds a B.E. from Tokyo Institute of Technology, an M.S. in Engineering from Oklahoma State University, and a Ph.D. in Computer Engineering from Tokyo Metropolitan University.',
      'His latest book is "Silicon Valley Wants Japanese Companies: The World\'s Enviable Ultimate Partnership." Other titles include "The Startup Bible: How to Build a Startup the Silicon Valley Way" and "What Are Global Investors Looking for in Japanese Companies?" — all available in Japan, South Korea, Indonesia, and Taiwan.'
    ]
  },
  steve: {
    name: 'スティーブ・ペイン',
    name_en: 'Steve Payne',
    role: '取締役/パートナー',
    role_en: 'Director / Partner',
    photo: 'assets/corporate_img/Steve_bio.avif',
    paragraphs: [
      '世界的な技術投資と企業の合併と買収に重点を置いているペガサステックベンチャーズのパートナーです。',
      'これまでに数十のテクノロジー企業の共同創設者、取締役会メンバー、投資家、顧問を務めてきました。ブティックテクノロジーの合併と買収に焦点を置いたアーキテクトパートナーズの共同創設者でもあり、また、インターネット、モビリティ、デジタルメディア、AI /ブロックチェーン部門を主として、アドバイザリーも務め、シスコ、NTT、オペラネットワーク、リコー、ネットギア、フィコ、マーリンエクイティ、クアルコムを含めた様々な企業と取引を行ってきました。',
      '加えて、NTT、セガ－オブ－アメリカ、ブーズ、アレン＆ハミルトンなどの世界的なトップ企業で、技術、経営管理、顧問、コンサルティングの職務を経験しています。Ignite Venturesのマネージングパートナーかつ、シリコンバレーのKorea Innovation Center（KIC）のグローバルメンターでもあります。',
      'ハーバード大学ビジネススクールでMBAを取得し、セントルイスのワシントン大学で工学の学士号を取得しています。'
    ],
    paragraphs_en: [
      'Steve Payne is a Partner at Pegasus Tech Ventures, with a focus on global technology investment and corporate mergers and acquisitions.',
      'He has served as co-founder, board member, investor, and advisor to dozens of technology companies. He is also co-founder of Architect Partners, a boutique technology M&A advisory firm, and has completed transactions with companies including Cisco, NTT, Opera Networks, Ricoh, Netgear, FICO, Marlin Equity, and Qualcomm, primarily in internet, mobility, digital media, and AI/blockchain sectors.',
      'He has additionally held technology, management, advisory, and consulting roles at leading global companies including NTT, Sega of America, and Booz Allen & Hamilton. He is Managing Partner at Ignite Ventures and a Global Mentor at the Korea Innovation Center (KIC) Silicon Valley.',
      'He holds an MBA from Harvard Business School and a B.S. in Engineering from Washington University in St. Louis.'
    ]
  },
  harumi: {
    name: '秋元 春美',
    name_en: 'Harumi Akimoto',
    role: '取締役/COO',
    role_en: 'Director / COO',
    photo: 'assets/corporate_img/Harumi_bio.avif',
    paragraphs: [
      'ペガサス・テック・ホールディングスの取締役であり、ペガサス・テック・ベンチャーズにおいてオペレーションを統括しています。ニューヨーク州立大学を卒業後、10年以上にわたり、ヴァレンティーノ、ヒューゴボス、セリーヌといった名だたるラグジュアリーブランド業界の会社に勤め、世界をまたにかけて活躍し、商品化と小売を行っていました。',
      'その後、独自のeコマース企業を立ち上げ、世界中の日本人にプレミアムアパレルを提供していました。ペガサスの早い段階から成長に貢献しており、投資と資金調達活動を行ってきたのみならず、業務の合理化も図りました。こうした努力の甲斐あって、ぺガサスはここ数年で急速な成長を遂げました。'
    ],
    paragraphs_en: [
      'Harumi Akimoto serves as a Director of Pegasus Tech Holdings and oversees operations at Pegasus Tech Ventures. After graduating from the State University of New York, she spent over a decade at prestigious luxury brands including Valentino, Hugo Boss, and Céline, working globally in merchandising and retail.',
      'She subsequently launched her own e-commerce company, supplying premium apparel to Japanese consumers worldwide. As an early contributor to Pegasus\'s growth, she has driven both investment and fundraising activities while streamlining operations — efforts that have fueled the firm\'s rapid expansion in recent years.'
    ]
  },
  fujiyo: {
    name: '石黒 不二代',
    name_en: 'Fujiyo Ishiguro',
    role: '社外取締役',
    role_en: 'External Director',
    photo: 'assets/corporate_img/Ishiguro_bio.jpg',
    paragraphs: [
      '名古屋大学卒業後、ブラザー工業、スワロフスキージャパンなどでの勤務後、スタンフォード大学ビジネススクールにてMBA取得しました。シリコンバレーでテクノロジーコンサルティングの会社を創業し、その後デジタルマーケティング・コンテンツのネットイヤーグループ株式会社に参画し、長年代表取締役社長兼CEOを務めていました。現在はマネックスグループ、損保ジャパン日本興亜、セガサミーホールディングスなどの社外取締役を務めています。'
    ],
    paragraphs_en: [
      'After graduating from Nagoya University and working at Brother Industries and Swarovski Japan, Fujiyo Ishiguro earned an MBA from Stanford Graduate School of Business. She founded a technology consulting company in Silicon Valley and later joined Net Year Group, a digital marketing and content company, where she served as President and CEO for many years. She currently serves as an external director at Monex Group, Sompo Japan, Sega Sammy Holdings, and other companies.'
    ]
  },
  kawabe: {
    name: '河邉 昭浩',
    name_en: 'Akihiro Kawabe',
    role: '常勤監査役',
    role_en: 'Full-time Auditor',
    photo: 'assets/corporate_img/Kawabe_bio.png',
    paragraphs: [
      'ペガサス・テック・ホールディングスの社外監査役を務めています。',
      '住友商事株式会社で内部監査部長、中部ブロック統括部長などを経験、現在アステリア株式会社などの上場企業の監査役を務めています。'
    ],
    paragraphs_en: [
      'Mr. Kawabe serves as an outside auditor of Pegasus Tech Holdings.',
      'After serving as Head of Internal Audit and Head of the Chubu Regional Division at Sumitomo Corporation, he currently serves as an auditor at listed companies including Asteria Corporation.'
    ]
  },
};

const managementModal = document.querySelector("#management-modal");
const managementModalClose = managementModal?.querySelector(".management-modal-close");
const managementModalContent = managementModal?.querySelector("#management-modal-content");

const openManagementModal = (button) => {
  if (!managementModal) return;
  const key = button?.dataset.bioKey;
  if (!key) return;
  const bio = biographies[key];
  if (!bio) return;

  if (managementModalContent) {
    const isEn = body.classList.contains('lang-en');
    const name = (isEn && bio.name_en) ? bio.name_en : bio.name;
    const role = (isEn && bio.role_en) ? bio.role_en : bio.role;
    const paras = (isEn && bio.paragraphs_en) ? bio.paragraphs_en : bio.paragraphs;
    const paragraphsHTML = paras.map((p) => `<p>${p}</p>`).join('');
    const photoHTML = bio.photo
      ? `<div class="management-modal-bio-photo"><img src="${bio.photo}" alt="${name}" /></div>`
      : '';
    managementModalContent.innerHTML = `
      <div class="management-modal-bio-layout">
        <div class="management-modal-bio-info">
          <h2 class="management-modal-bio-name">${name}</h2>
          <p class="management-modal-bio-role">${role}</p>
          <div class="management-modal-bio-text">${paragraphsHTML}</div>
        </div>
        ${photoHTML}
      </div>
    `;
  }
  managementModal.classList.remove("is-hidden");
};

const closeManagementModal = () => {
  managementModal?.classList.add("is-hidden");
};

document.querySelectorAll(".management-bio").forEach((button) => {
  button.addEventListener("click", () => openManagementModal(button));
});

if (managementModal && managementModalClose) {
  managementModalClose.addEventListener("click", closeManagementModal);
  managementModal.addEventListener("click", (event) => {
    if (event.target === managementModal) closeManagementModal();
  });
}

document.querySelectorAll('.company-info-card').forEach((card) => {
  const open = () => {
    const modal = document.getElementById(card.dataset.target);
    if (modal) modal.classList.remove('is-hidden');
  };
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

document.querySelectorAll('.company-info-modal').forEach((modal) => {
  const closeBtn = modal.querySelector('.company-info-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('is-hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('is-hidden');
  });
});

const renderNewsFromJson = async () => {
  if (!document.body.classList.contains("page-news")) return;
  const list = document.querySelector("#news-list");
  if (!list) return;

  const source = list.getAttribute("data-news-source");
  if (!source) return;

  const formatNewsDate = (value) => {
    if (!value) return "";
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      const yyyy = parsed.getFullYear();
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    }
    const match = String(value).match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return "";
    const mm = String(match[2]).padStart(2, "0");
    const dd = String(match[3]).padStart(2, "0");
    return `${match[1]}.${mm}.${dd}`;
  };

  try {
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to fetch news: ${response.status}`);
    const payload = await response.json();
    const items = Array.isArray(payload) ? payload : payload.items;
    if (!Array.isArray(items) || items.length === 0) return;

    const normalized = items
      .map((item) => ({
        title:
          item?.title_ja ||
          item?.title_en ||
          item?.title ||
          "",
        url: item?.url || "",
        date: formatNewsDate(
          item?.date ||
            item?.release_date ||
            item?.release_comple_date ||
            item?.published_at ||
            item?.updated_at?.origin ||
            item?.updated_at
        ),
      }))
      .filter((item) => item.title && item.url);

    if (normalized.length === 0) return;

    list.textContent = "";
    normalized.forEach((item) => {
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = item.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";

      if (item.date) {
        const dateEl = document.createElement("span");
        dateEl.className = "news-item-date";
        dateEl.textContent = item.date;
        anchor.appendChild(dateEl);
      }

      const titleEl = document.createElement("span");
      titleEl.className = "news-item-title";
      titleEl.textContent = item.title;
      anchor.appendChild(titleEl);

      li.appendChild(anchor);
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
};

renderNewsFromJson();

document.querySelectorAll('[data-open-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.openModal);
    if (modal) modal.classList.remove('is-hidden');
  });
});

const contactFormTop = document.getElementById('contact-form-top');
if (contactFormTop) {
  contactFormTop.addEventListener('submit', (event) => {
    event.preventDefault();
    const topic = contactFormTop.querySelector('[name="topic"]').value;
    const company = contactFormTop.querySelector('[name="company"]').value.trim();
    const jobTitle = contactFormTop.querySelector('[name="title"]').value.trim();
    const name = contactFormTop.querySelector('[name="name"]').value.trim();
    const email = contactFormTop.querySelector('[name="email"]').value.trim();
    const phone = contactFormTop.querySelector('[name="phone"]').value.trim();
    const message = contactFormTop.querySelector('[name="message"]').value.trim();
    const subject = encodeURIComponent(`お問い合わせ: ${name || 'お名前未入力'}`);
    const body = encodeURIComponent(
      `会社名: ${company}\n役職: ${jobTitle}\n氏名: ${name}\nメール: ${email}\n電話番号: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:${topic}?subject=${subject}&body=${body}`;
  });
}
