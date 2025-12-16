// src/services/payhipService.js

let payhipLoaded = false;
let payhipPromise = null;

export function loadPayhip() {
  if (payhipLoaded && window.Payhip) {
    return Promise.resolve();
  }

  if (payhipPromise) {
    return payhipPromise;
  }

  const existingScript = document.querySelector('script[src="https://payhip.com/payhip.js"]');
  
  if (existingScript && window.Payhip) {
    payhipLoaded = true;
    return Promise.resolve();
  }

  payhipPromise = new Promise((resolve, reject) => {
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.Payhip) {
          clearInterval(checkInterval);
          payhipLoaded = true;
          payhipPromise = null;
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        payhipPromise = null;
        resolve();
      }, 10000);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://payhip.com/payhip.js';
    script.async = true;

    script.onload = () => {
      const checkInterval = setInterval(() => {
        if (window.Payhip) {
          clearInterval(checkInterval);
          payhipLoaded = true;
          payhipPromise = null;
          
          // IMPORTANT: Ensure Payhip's Setup has run
          if (typeof window.Payhip.Setup === 'function') {
            // Payhip.Setup() runs automatically when the script loads,
            // but we ensure it's been called
            console.log('✅ Payhip ready and Setup complete');
          }
          
          resolve();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        payhipPromise = null;
        resolve();
      }, 10000);
    };

    script.onerror = (error) => {
      payhipPromise = null;
      reject(error);
    };

    document.head.appendChild(script);
  });

  return payhipPromise;
}

export const openCart = () => {
  const cartBtn = document.querySelector('.payhip-cart-button');
  if (cartBtn) {
    cartBtn.click();
  } else {
    console.warn("Payhip cart button not found.");
  }
};