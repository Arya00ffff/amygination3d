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
    // Find the Payhip Cart Button element and programmatically click it to open the cart
    const cartBtn = document.querySelector('.payhip-cart-button');
    if (cartBtn) {
        cartBtn.click();
    } else {
        console.warn("Payhip cart button not found. Ensure payhip.js is loaded.");
    }
};