/* ========================================
   Global Natural — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ───────── Scroll-triggered animations ─────────
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  // ───────── Navbar: shadow on scroll + hide/show ─────────
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleNavScroll = () => {
    const currentY = window.scrollY;

    // Shadow logic
    if (currentY > 10) {
      navbar.classList.add('shadow-md');
      navbar.classList.remove('border-b', 'border-gray-100');
    } else {
      navbar.classList.remove('shadow-md');
      navbar.classList.add('border-b', 'border-gray-100');
    }

    // Hide/show navbar on scroll direction (only after 300px)
    if (currentY > 300) {
      if (currentY > lastScrollY + 5) {
        navbar.style.transform = 'translateY(-100%)';
      } else if (currentY < lastScrollY - 5) {
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = currentY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ───────── Search functionality ─────────
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const productGrid = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');
  const productCards = document.querySelectorAll('.product-card');

  let searchTimeout;

  const performSearch = (query) => {
    const term = query.trim().toLowerCase();
    let visibleCount = 0;

    productCards.forEach((card) => {
      const name = card.getAttribute('data-name').toLowerCase();

      if (!term || name.includes(term)) {
        card.classList.remove('hidden-by-search');
        visibleCount++;
      } else {
        card.classList.add('hidden-by-search');
      }
    });

    // Show / hide no-results message
    if (visibleCount === 0 && term) {
      noResults.classList.remove('hidden');
      productGrid.classList.add('hidden');
    } else {
      noResults.classList.add('hidden');
      productGrid.classList.remove('hidden');
    }

    // Toggle clear button
    if (term) {
      clearBtn.classList.remove('hidden');
      clearBtn.classList.add('flex');
    } else {
      clearBtn.classList.add('hidden');
      clearBtn.classList.remove('flex');
    }
  };

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 200);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    performSearch('');
    searchInput.focus();
  });

  // Escape to clear search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performSearch('');
      searchInput.blur();
    }
  });

  // ───────── Smooth scroll for anchor links ─────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ───────── Parallax-like subtle movement on hero badges ─────────
  const heroBadges = document.querySelectorAll('.animate-float');

  if (window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      heroBadges.forEach((badge, i) => {
        const factor = (i + 1) * 4;
        badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    }, { passive: true });
  }

});
