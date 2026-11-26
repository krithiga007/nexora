/**
 * ==============================================================================
 * NEXORA – SaaS Pricing Website Functional JavaScript
 * Features:
 *   1. Monthly / Yearly Billing Toggle with immediate DOM updates & ARIA states
 *   2. Mobile Hamburger Navigation Drawer with accessible open/close states
 *   3. Interactive Smooth FAQ Accordion
 *   4. Plan Selection Confirmation Modal with focus management & keyboard support
 *   5. Toast Notification System
 *   6. Dynamic Active Nav Scroll Spy
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // State Management
  const state = {
    currentBilling: 'monthly', // 'monthly' | 'yearly'
    selectedPlan: null,
  };

  /* ==========================================================================
     1. Billing Toggle Implementation
     ========================================================================== */
  const toggleMonthlyBtn = document.getElementById('toggleMonthly');
  const toggleYearlyBtn = document.getElementById('toggleYearly');
  const yearlyDiscountTag = document.getElementById('yearlyDiscountTag');
  
  // Price elements (configured with data-monthly and data-yearly attributes)
  const priceElements = [
    {
      amountEl: document.getElementById('price-starter'),
      periodEl: document.getElementById('period-starter'),
      subtextEl: document.getElementById('subtext-starter'),
      name: 'Starter'
    },
    {
      amountEl: document.getElementById('price-professional'),
      periodEl: document.getElementById('period-professional'),
      subtextEl: document.getElementById('subtext-professional'),
      name: 'Professional'
    },
    {
      amountEl: document.getElementById('price-enterprise'),
      periodEl: document.getElementById('period-enterprise'),
      subtextEl: document.getElementById('subtext-enterprise'),
      name: 'Enterprise'
    }
  ];

  /**
   * Updates pricing values, period labels, and ARIA attributes
   * @param {string} cycle - 'monthly' or 'yearly'
   */
  function updateBillingCycle(cycle) {
    if (state.currentBilling === cycle && arguments.length > 1) return;
    state.currentBilling = cycle;

    const isYearly = cycle === 'yearly';

    // 1. Update Button States & ARIA Pressed Attributes
    if (toggleMonthlyBtn && toggleYearlyBtn) {
      toggleMonthlyBtn.classList.toggle('active', !isYearly);
      toggleMonthlyBtn.setAttribute('aria-pressed', (!isYearly).toString());

      toggleYearlyBtn.classList.toggle('active', isYearly);
      toggleYearlyBtn.setAttribute('aria-pressed', isYearly.toString());
    }

    // 2. Highlight yearly discount badge
    if (yearlyDiscountTag) {
      yearlyDiscountTag.classList.toggle('highlight', isYearly);
    }

    // 3. Update all price amounts from their data-* attributes
    priceElements.forEach(item => {
      if (!item.amountEl) return;

      const newPrice = isYearly 
        ? item.amountEl.getAttribute('data-yearly') 
        : item.amountEl.getAttribute('data-monthly');

      // Subtle opacity animation on price change
      item.amountEl.style.opacity = '0';
      item.amountEl.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        item.amountEl.textContent = newPrice;
        if (item.periodEl) {
          item.periodEl.textContent = isYearly ? 'per year' : 'per month';
        }
        if (item.subtextEl) {
          item.subtextEl.textContent = isYearly ? 'Billed annually (Save 20%)' : 'Billed monthly';
        }
        item.amountEl.style.opacity = '1';
        item.amountEl.style.transform = 'translateY(0)';
      }, 150);
    });
  }

  // Event Listeners for Billing Toggle
  if (toggleMonthlyBtn) {
    toggleMonthlyBtn.addEventListener('click', () => updateBillingCycle('monthly'));
  }
  if (toggleYearlyBtn) {
    toggleYearlyBtn.addEventListener('click', () => updateBillingCycle('yearly'));
  }


  /* ==========================================================================
     2. Mobile Navigation Drawer
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-start-btn');

  function openMobileMenu() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawer.classList.add('open');
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawer.classList.remove('open');
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when any nav link inside it is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when window resized beyond mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }


  /* ==========================================================================
     3. FAQ Interactive Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Optional: Close other open accordion items for clean single-view accordion
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });


  /* ==========================================================================
     4. Interactive Plan Confirmation Modal
     ========================================================================== */
  const planModal = document.getElementById('planModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const cancelPlanBtn = document.getElementById('cancelPlanBtn');
  const confirmPlanBtn = document.getElementById('confirmPlanBtn');
  
  const modalPlanBadge = document.getElementById('modalPlanBadge');
  const modalCycleBadge = document.getElementById('modalCycleBadge');
  const summaryTierName = document.getElementById('summaryTierName');
  const summaryBillingCycle = document.getElementById('summaryBillingCycle');
  const summaryPriceDisplay = document.getElementById('summaryPriceDisplay');
  const summarySavingsNotice = document.getElementById('summarySavingsNotice');

  let lastActiveElement = null;

  /**
   * Opens the confirmation modal with plan details
   * @param {string} planName - Plan name ('Starter', 'Professional', 'Enterprise')
   */
  function openPlanModal(planName) {
    lastActiveElement = document.activeElement;
    state.selectedPlan = planName;

    const isYearly = state.currentBilling === 'yearly';

    // Pricing lookup
    const prices = {
      Starter: { monthly: '₹499', yearly: '₹4,790' },
      Professional: { monthly: '₹999', yearly: '₹9,590' },
      Enterprise: { monthly: '₹1,999', yearly: '₹19,190' }
    };

    const currentPlanPrices = prices[planName] || prices.Professional;
    const priceFormatted = isYearly 
      ? `${currentPlanPrices.yearly} / year` 
      : `${currentPlanPrices.monthly} / month`;

    // Populate Modal Content
    if (modalPlanBadge) modalPlanBadge.textContent = `${planName} Plan`;
    if (modalCycleBadge) modalCycleBadge.textContent = isYearly ? 'Annual Billing' : 'Monthly Billing';
    if (summaryTierName) summaryTierName.textContent = planName;
    if (summaryBillingCycle) summaryBillingCycle.textContent = isYearly ? 'Yearly (Save 20%)' : 'Monthly';
    if (summaryPriceDisplay) summaryPriceDisplay.textContent = priceFormatted;
    
    if (summarySavingsNotice) {
      summarySavingsNotice.style.display = isYearly ? 'block' : 'none';
    }

    // Show modal
    if (planModal) {
      planModal.classList.add('open');
      planModal.setAttribute('aria-hidden', 'false');
      // Trap focus
      setTimeout(() => {
        if (confirmPlanBtn) confirmPlanBtn.focus();
      }, 50);
    }
  }

  function closePlanModal() {
    if (!planModal) return;
    planModal.classList.remove('open');
    planModal.setAttribute('aria-hidden', 'true');
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Attach event listeners to all Plan CTA buttons
  const planButtons = document.querySelectorAll('.plan-cta-btn');
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planTarget = btn.getAttribute('data-plan-target') || 'Professional';
      openPlanModal(planTarget);
    });
  });

  // Modal Close Events
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePlanModal);
  if (cancelPlanBtn) cancelPlanBtn.addEventListener('click', closePlanModal);

  // Close when clicking modal backdrop
  if (planModal) {
    planModal.addEventListener('click', (e) => {
      if (e.target === planModal) {
        closePlanModal();
      }
    });
  }

  // Keyboard accessibility: ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && planModal && planModal.classList.contains('open')) {
      closePlanModal();
    }
  });

  // Confirm Button Action
  if (confirmPlanBtn) {
    confirmPlanBtn.addEventListener('click', () => {
      const planName = state.selectedPlan || 'Professional';
      const cycle = state.currentBilling === 'yearly' ? 'Yearly' : 'Monthly';
      closePlanModal();
      showToast(`Success! You have selected the ${planName} Plan (${cycle}). Welcome aboard!`);
    });
  }


  /* ==========================================================================
     5. Toast Notification System
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="#10B981"/>
        <path d="M6.5 10L9 12.5L14 7.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }


  /* ==========================================================================
     6. Dynamic Active Nav Scroll Spy
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  function handleScrollSpy() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // Check for URL query parameter (e.g., ?billing=yearly)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCycle = urlParams.get('billing') === 'yearly' ? 'yearly' : 'monthly';

  // Initial setup call
  updateBillingCycle(initialCycle);
});
