/**
 * 留学サポート ブランディング LP - メインJavaScript
 *
 * @description 10代の可能性を花開かせる留学サポートサービスのメインスクリプト
 * @author 留学サポートチーム
 * @version 1.0.0
 */

// =============================================================================
// 初期化
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('留学サポート LP - 初期化完了');

  // 基本機能の初期化
  initializeBasicFeatures();

  // ストーリーセクションの初期化
  initializeStorySection();

  // ビジョンセクションの初期化
  initializeVisionSection();

  // サービスセクションの初期化
  initializeServicesSection();

  // 体験価値セクションの初期化
  initializeExperienceSection();

  // 社会的インパクトセクションの初期化
  initializeImpactSection();

  // 対談動画セクションの初期化
  initializeInterviewSection();

  // バリューセクションの初期化
  initializeValuesSection();

  // サービス詳細セクションの初期化
  initializeServiceDetailsSection();

  // FAQセクションの初期化
  initializeFAQSection();

  // フッターCTAセクションの初期化
  initializeFooterCTASection();

  // フッターセクションの初期化
  initializeFooterSection();

  // 外部ライブラリの初期化（後で追加）
  // initializeGSAP();
  // initializeSliders();
  // initializePlyr();
});

// =============================================================================
// 基本機能
// =============================================================================

/**
 * 基本機能の初期化
 */
function initializeBasicFeatures() {
  // スムーススクロール
  initializeSmoothScroll();

  // アコーディオン
  initializeAccordion();

  // フォームバリデーション
  initializeFormValidation();

  // Google Analytics イベント
  initializeAnalytics();
}

/**
 * スムーススクロール
 */
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/**
 * アコーディオン機能
 */
function initializeAccordion() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // 他のアイテムを閉じる
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // クリックしたアイテムを開閉
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * フォームバリデーション
 */
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!validateForm(form)) {
        e.preventDefault();
      }
    });
  });
}

/**
 * フォームバリデーション関数
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      showError(input, 'この項目は必須です');
      isValid = false;
    } else {
      clearError(input);
    }

    // メールアドレスのバリデーション
    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        showError(input, '有効なメールアドレスを入力してください');
        isValid = false;
      }
    }
  });

  return isValid;
}

/**
 * ストーリーセクションの初期化
 */
function initializeStorySection() {
  // 段階的表示アニメーション
  initializeStoryItemsAnimation();

  // パララックス効果
  initializeParallaxEffect();
}

/**
 * ストーリーアイテムの段階的表示アニメーション
 */
function initializeStoryItemsAnimation() {
  const storyItems = document.querySelectorAll('.story__item');

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // reduced-motion が有効な場合は即座に表示
    storyItems.forEach(item => {
      item.classList.add('in-view');
    });
    return;
  }

  // Intersection Observer を使用した段階的表示
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  storyItems.forEach(item => {
    observer.observe(item);
  });
}

/**
 * パララックス効果の初期化
 */
function initializeParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || parallaxElements.length === 0) {
    return;
  }

  // スムーズなパララックス効果
  let ticking = false;

  function updateParallax() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;

      // 要素が画面内にある場合のみパララックス効果を適用
      if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
        const rate = (scrollTop - elementTop + windowHeight) / (windowHeight + elementHeight);
        const yPos = (rate * 40) - 20; // -20px ~ 20px の範囲で移動

        element.style.transform = `translateY(${yPos}px)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

/**
 * ビジョンセクションの初期化
 */
function initializeVisionSection() {
  // ワード毎フェードアニメーション
  initializeWordAnimation();

  // セクション表示アニメーション
  initializeVisionAnimation();
}

/**
 * ワード毎フェードアニメーション
 */
function initializeWordAnimation() {
  const elements = document.querySelectorAll('.vision__item-title, .vision__item-text');

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return;
  }

  elements.forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');

    // 単語をspanで囲む
    element.innerHTML = words.map(word =>
      `<span class="word">${word}</span>`,
    ).join(' ');
  });
}

/**
 * ビジョンセクション表示アニメーション
 */
function initializeVisionAnimation() {
  const visionTitle = document.querySelector('.vision__title');
  const visionItems = document.querySelectorAll('.vision__item');

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // reduced-motion が有効な場合は即座に表示
    if (visionTitle) {visionTitle.classList.add('in-view');}
    visionItems.forEach(item => item.classList.add('in-view'));
    return;
  }

  // Intersection Observer を使用した表示アニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // ワード毎のアニメーション
        if (entry.target.classList.contains('vision__item')) {
          setTimeout(() => {
            animateWords(entry.target);
          }, 500);
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  // タイトルとアイテムを監視
  if (visionTitle) {observer.observe(visionTitle);}
  visionItems.forEach(item => observer.observe(item));
}

/**
 * ワードアニメーション実行
 */
function animateWords(container) {
  const words = container.querySelectorAll('.word');

  words.forEach((word, index) => {
    setTimeout(() => {
      word.classList.add('animate');
    }, index * 100);
  });
}

/**
 * サービスセクションの初期化
 */
function initializeServicesSection() {
  // サービスタイトルアニメーション
  initializeServicesTitle();

  // サービスCTAアニメーション
  initializeServicesCTA();
}

/**
 * サービスタイトルアニメーション
 */
function initializeServicesTitle() {
  const servicesTitle = document.querySelector('.services__title');

  if (!servicesTitle) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    servicesTitle.classList.add('in-view');
    return;
  }

  // Intersection Observer でタイトルアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  observer.observe(servicesTitle);
}

/**
 * サービスCTAアニメーション
 */
function initializeServicesCTA() {
  const servicesCTA = document.querySelector('.services__cta');

  if (!servicesCTA) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    servicesCTA.classList.add('in-view');
    return;
  }

  // Intersection Observer でCTAアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  observer.observe(servicesCTA);
}

/**
 * 体験価値セクションの初期化
 */
function initializeExperienceSection() {
  // 体験価値タイトルアニメーション
  initializeExperienceTitle();

  // 体験価値スライダー
  initializeExperienceSlider();

  // 体験価値CTAアニメーション
  initializeExperienceCTA();
}

/**
 * 体験価値タイトルアニメーション
 */
function initializeExperienceTitle() {
  const experienceTitle = document.querySelector('.experience__title');

  if (!experienceTitle) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    experienceTitle.classList.add('in-view');
    return;
  }

  // Intersection Observer でタイトルアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  observer.observe(experienceTitle);
}

/**
 * 体験価値スライダー
 */
function initializeExperienceSlider() {
  const slider = document.querySelector('.experience__slider');
  const track = document.querySelector('.experience__track');
  const slides = document.querySelectorAll('.experience__slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.experience__indicator');

  if (!slider || !track || slides.length === 0) {return;}

  let currentSlide = 0;
  const totalSlides = slides.length;

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // スライド切り替え関数
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) {return;}

    // 現在のスライドを非アクティブにする
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // 新しいスライドをアクティブにする
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // トラック移動（reduced-motion対応）
    if (!prefersReducedMotion) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // ボタン状態更新
    updateButtonStates();
  }

  // ボタン状態更新
  function updateButtonStates() {
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }
  }

  // 前のスライドに移動
  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  // 次のスライドに移動
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }

  // イベントリスナー設定
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  // インジケータークリック
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // キーボードナビゲーション
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // 自動スライド（5秒間隔）
  let autoSlideInterval;

  function startAutoSlide() {
    if (prefersReducedMotion) {return;}

    autoSlideInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        nextSlide();
      } else {
        goToSlide(0);
      }
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // マウスホバーで自動スライド停止
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  // フォーカスで自動スライド停止
  slider.addEventListener('focusin', stopAutoSlide);
  slider.addEventListener('focusout', startAutoSlide);

  // タッチスワイプサポート
  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    const deltaX = startX - endX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    startX = 0;
    endX = 0;
  });

  // 初期化
  updateButtonStates();
  startAutoSlide();
}

/**
 * 体験価値CTAアニメーション
 */
function initializeExperienceCTA() {
  const experienceCTA = document.querySelector('.experience__cta');

  if (!experienceCTA) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    experienceCTA.classList.add('in-view');
    return;
  }

  // Intersection Observer でCTAアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  observer.observe(experienceCTA);
}

/**
 * エラー表示
 */
function showError(input, message) {
  clearError(input);

  const errorElement = document.createElement('div');
  errorElement.className = 'form-error';
  errorElement.textContent = message;

  input.parentNode.appendChild(errorElement);
  input.classList.add('error');
}

/**
 * エラークリア
 */
function clearError(input) {
  const errorElement = input.parentNode.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }
  input.classList.remove('error');
}

/**
 * Google Analytics イベント
 */
function initializeAnalytics() {
  // CTAクリック
  const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'cta',
          event_label: this.textContent.trim(),
        });
      }
    });
  });

  // スクロール深度
  let maxScrollDepth = 0;
  window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;

      // 25%、50%、75%、100%でイベント送信
      if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
        sendScrollEvent(25);
      } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
        sendScrollEvent(50);
      } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
        sendScrollEvent(75);
      } else if (maxScrollDepth >= 100) {
        sendScrollEvent(100);
      }
    }
  });
}

/**
 * スクロールイベント送信
 */
function sendScrollEvent(depth) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    });
  }
}

// =============================================================================
// ユーティリティ関数
// =============================================================================

/**
 * 要素が画面内に入ったかチェック
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * デバウンス関数
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * スロットル関数
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// =============================================================================
// 外部ライブラリ初期化（後で実装）
// =============================================================================

/**
 * GSAP初期化
 */
function initializeGSAP() {
  // GSAP関連の初期化コード
  console.log('GSAP初期化（後で実装）');
}

/**
 * スライダー初期化
 */
function initializeSliders() {
  // Glide.js関連の初期化コード
  console.log('スライダー初期化（後で実装）');
}

/**
 * 動画プレイヤー初期化
 */
function initializePlyr() {
  // Plyr関連の初期化コード
  console.log('動画プレイヤー初期化（後で実装）');
}

// =============================================================================
// 社会的インパクトセクション
// =============================================================================

/**
 * 社会的インパクトセクションの初期化
 */
function initializeImpactSection() {
  // 統計カードアニメーション
  initializeImpactStatsAnimation();

  // カウントアップアニメーション
  initializeCountUpAnimation();

  // チャートアニメーション
  initializeChartAnimation();

  // メッセージアニメーション
  initializeImpactMessageAnimation();
}

/**
 * 統計カードアニメーション
 */
function initializeImpactStatsAnimation() {
  const statCards = document.querySelectorAll('.impact__stat-card');

  if (statCards.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    statCards.forEach(card => {
      card.classList.add('animate-in');
    });
    return;
  }

  // Intersection Observer でカードアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 段階的にアニメーション
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 200);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  statCards.forEach(card => {
    observer.observe(card);
  });
}

/**
 * カウントアップアニメーション
 */
function initializeCountUpAnimation() {
  const countElements = document.querySelectorAll('.impact__stat-number[data-count]');

  if (countElements.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    countElements.forEach(element => {
      const targetValue = parseInt(element.dataset.count);
      element.textContent = targetValue;
    });
    return;
  }

  // Intersection Observer でカウントアップ開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCountUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  });

  countElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * カウントアップ実行
 */
function startCountUp(element) {
  const targetValue = parseInt(element.dataset.count);
  const duration = 2000; // 2秒でカウントアップ
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // イージング関数（easeOutExpo）
    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentValue = Math.floor(easeOutExpo * targetValue);

    element.textContent = currentValue;

    // パルスアニメーション
    if (progress < 1) {
      element.classList.add('counting');
      setTimeout(() => {
        element.classList.remove('counting');
      }, 100);
    }

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = targetValue;
      element.classList.remove('counting');
    }
  }

  requestAnimationFrame(updateCount);
}

/**
 * チャートアニメーション
 */
function initializeChartAnimation() {
  const chartContainer = document.querySelector('.impact__chart');
  const chartBars = document.querySelectorAll('.impact__chart-bar-fill');

  if (!chartContainer || chartBars.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    chartContainer.classList.add('animate-in');
    chartBars.forEach(bar => {
      const width = bar.dataset.width;
      bar.style.setProperty('--bar-width', `${width}%`);
      bar.classList.add('animate-bar');
    });
    return;
  }

  // Intersection Observer でチャートアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // コンテナをアニメーション
        entry.target.classList.add('animate-in');

        // バーを段階的にアニメーション
        setTimeout(() => {
          chartBars.forEach((bar, index) => {
            setTimeout(() => {
              const width = bar.dataset.width;
              bar.style.setProperty('--bar-width', `${width}%`);
              bar.classList.add('animate-bar');
            }, index * 300);
          });
        }, 500);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  observer.observe(chartContainer);
}

/**
 * メッセージアニメーション
 */
function initializeImpactMessageAnimation() {
  const messageContainer = document.querySelector('.impact__message');

  if (!messageContainer) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    messageContainer.classList.add('animate-in');
    return;
  }

  // Intersection Observer でメッセージアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  observer.observe(messageContainer);
}

// =============================================================================
// 対談動画セクション
// =============================================================================

/**
 * 対談動画セクションの初期化
 */
function initializeInterviewSection() {
  // セクションアニメーション
  initializeInterviewAnimations();

  // 証言カードアニメーション
  initializeTestimonialCards();
}

/**
 * インタビューセクションのアニメーション
 */
function initializeInterviewAnimations() {
  const sections = [
    '.interview__intro',
    '.interview__highlights',
    '.interview__testimonials',
    '.interview__cta',
  ];

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    sections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add('animate-in');
      }
    });
    return;
  }

  // Intersection Observer でアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  });

  sections.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      observer.observe(element);
    }
  });
}

/**
 * 証言カードのアニメーション
 */
function initializeTestimonialCards() {
  const cards = document.querySelectorAll('.interview__testimonial-card');

  if (cards.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    cards.forEach(card => {
      card.classList.add('animate-in');
    });
    return;
  }

  // Intersection Observer で段階的アニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 段階的にアニメーション
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 200);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  cards.forEach(card => {
    observer.observe(card);
  });
}

/**
 * バリューセクションの初期化
 */
function initializeValuesSection() {
  const valuesItems = document.querySelectorAll('.values__item');

  if (valuesItems.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    valuesItems.forEach(item => item.classList.add('animate-in'));
    return;
  }

  // Intersection Observer でアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  valuesItems.forEach(item => observer.observe(item));
}

/**
 * サービス詳細セクションの初期化
 */
function initializeServiceDetailsSection() {
  const serviceCards = document.querySelectorAll('.service-details__card');

  if (serviceCards.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    serviceCards.forEach(card => card.classList.add('animate-in'));
    return;
  }

  // Intersection Observer でアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  serviceCards.forEach(card => observer.observe(card));
}

/**
 * FAQセクションの初期化
 */
function initializeFAQSection() {
  // アコーディオン機能の初期化
  initializeFAQAccordion();

  // アニメーション機能の初期化
  initializeFAQAnimation();
}

/**
 * FAQアコーディオン機能
 */
function initializeFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!question || !answer) {return;}

    // クリックイベントの追加
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // すべてのアイテムを閉じる
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // 現在のアイテムをトグル
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });

    // キーボードアクセシビリティ
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });

    // フォーカス可能に設定
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');

    // 初期状態でaria-expanded を設定
    const observer = new MutationObserver(() => {
      const isActive = item.classList.contains('active');
      question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    observer.observe(item, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });
}

/**
 * FAQアニメーション
 */
function initializeFAQAnimation() {
  const faqItems = document.querySelectorAll('.faq__item');

  if (faqItems.length === 0) {return;}

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    faqItems.forEach(item => item.classList.add('animate-in'));
    return;
  }

  // Intersection Observer でアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  faqItems.forEach(item => observer.observe(item));
}

/**
 * フッターCTAセクションの初期化
 */
function initializeFooterCTASection() {
  const footerCTATitle = document.querySelector('.footer-cta__title');
  const footerCTAText = document.querySelector('.footer-cta__text');
  const footerCTAButtons = document.querySelector('.footer-cta__buttons');

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    if (footerCTATitle) {footerCTATitle.classList.add('animate-in');}
    if (footerCTAText) {footerCTAText.classList.add('animate-in');}
    if (footerCTAButtons) {footerCTAButtons.classList.add('animate-in');}
    return;
  }

  // Intersection Observer でアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  if (footerCTATitle) {observer.observe(footerCTATitle);}
  if (footerCTAText) {observer.observe(footerCTAText);}
  if (footerCTAButtons) {observer.observe(footerCTAButtons);}
}

/**
 * フッターセクションの初期化
 */
function initializeFooterSection() {
  const footerContent = document.querySelectorAll('.footer__content > *');
  const footerBottom = document.querySelectorAll('.footer__bottom > *');

  // reduced-motion の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    footerContent.forEach(item => item.classList.add('animate-in'));
    footerBottom.forEach(item => item.classList.add('animate-in'));
    return;
  }

  // Intersection Observer でアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  });

  footerContent.forEach(item => observer.observe(item));
  footerBottom.forEach(item => observer.observe(item));
}