// src/services/payhipService.js

/**
 * Dynamically loads the official Payhip script.
 * @returns {Promise<any>} A promise that resolves when Payhip is loaded.
 */
export const loadPayhip = () => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (window.Payhip) {
      resolve(window.Payhip);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://payhip.com/payhip.js';
    script.async = true;
    script.onload = () => resolve(window.Payhip);
    script.onerror = () => reject(new Error('Payhip script failed to load'));
    document.head.appendChild(script);
  });
};

/**
 * Opens the Payhip Cart Modal/Overlay.
 */
export const openCart = () => {
  // Try several safe ways to open the Payhip cart/overlay without letting the browser navigate away.
  // 1) Click on a Payhip-created cart button if present
  const cartBtn = document.querySelector('.payhip-cart-button');
  if (cartBtn) {
    cartBtn.click();
    return;
  }

  // 2) If Payhip exposes a JS API that can open overlays, call common method names defensively
  try {
    if (window.Payhip) {
      if (typeof window.Payhip.open === 'function') {
        window.Payhip.open();
        return;
      }
      if (typeof window.Payhip.launch === 'function') {
        window.Payhip.launch();
        return;
      }
    }
  } catch (err) {
    console.warn('Error calling Payhip API:', err);
  }

  // 3) As a fallback, try clicking any hidden/local "payhip-buy-button" element (Payhip script often binds to these links)
  const buyLink = document.querySelector('.payhip-buy-button');
  if (buyLink) {
    // Programmatic click may trigger Payhip's overlay handlers (and we prevent default navigation elsewhere)
    buyLink.click();
    return;
  }

  console.warn('Payhip cart/open mechanism not found. Ensure payhip.js initialized and buy links exist.');
};

/**
 * Initialize interception to prevent navigation to Payhip hosts/paths and open the overlay instead.
 * Returns a cleanup function to remove the interception listener.
 */
export const initPayhipPreventRedirects = async () => {
  await loadPayhip().catch(() => {
    // continue: even if load failed, we still attach interception to prevent redirects
  });

  const handler = (e) => {
    try {
      const el = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!el) return;
      const href = (el.getAttribute('href') || '').toLowerCase();

      // If the link points to a Payhip product path or has the payhip-buy-button class,
      // prevent the browser navigation and open the overlay instead.
      if (el.classList.contains('payhip-buy-button') || /payhip\.com|\/b\//.test(href)) {
        e.preventDefault();
        e.stopPropagation();
        openCart();
      }
    } catch (err) {
      // swallow errors to avoid breaking UI
      console.error('Error in payhip interception handler', err);
    }
  };

  // Capture phase ensures we can intercept before default navigation handlers run
  document.addEventListener('click', handler, true);

  return () => document.removeEventListener('click', handler, true);
};