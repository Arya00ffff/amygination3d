// payhipService.js
let payhipLoaded = false;
let payhipPromise = null;

export function loadPayhip() {
  if (payhipLoaded && window.Payhip) return Promise.resolve();
  if (payhipPromise) return payhipPromise;

  payhipPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://payhip.com/payhip.js';
    script.async = true;
    script.onload = () => {
      payhipLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return payhipPromise;
}

/**
 * The direct way to open Payhip without needing hidden <a> tags.
 */
export async function openPayhipCheckout(productId) {
  if (!window.Payhip) {
    await loadPayhip();
  }

  // Use the official Payhip API directly
  if (window.Payhip && window.Payhip.Checkout) {
    window.Payhip.Checkout.open({
      product: productId,
      type: 'direct' // or 'product' 
    });
  } else {
    // Fallback if the library script didn't initialize the Checkout object
    console.warn('⚠️ Payhip API not ready, using fallback redirect');
    window.location.href = `https://amygination3d.com/b/${productId}`;
  }
}


