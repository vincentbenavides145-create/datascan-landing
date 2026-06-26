function initDataScanLanding() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
  }

  const animatedItems = document.querySelectorAll(
    '.hero-copy, .hero-card, .section-head, .step-card, .split > div, .compare-card, .price-card, .trust-grid > div, .beta-copy, .beta-form, details, .footer-grid > div'
  );

  animatedItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.classList.add(`reveal-delay-${(index % 3) + 1}`);
  });

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' })
    : null;

  animatedItems.forEach((item) => {
    if (revealObserver) {
      revealObserver.observe(item);
    } else {
      item.classList.add('is-visible');
    }
  });

  const betaForm = document.querySelector('#betaForm');
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const betaSection = document.querySelector('#registro-beta');
  if (whatsappFloat && betaSection && 'IntersectionObserver' in window) {
    const whatsappObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        whatsappFloat.classList.toggle('is-hidden', entry.isIntersecting);
      });
    }, { threshold: 0.18 });
    whatsappObserver.observe(betaSection);
  }

  if (betaForm) {
    const button = betaForm.querySelector('button[type="submit"]');
    const successMessage = document.querySelector('#formSuccess');

    betaForm.addEventListener('input', () => {
      if (button && button.textContent !== 'Registrarme a la beta') {
        button.textContent = 'Registrarme a la beta';
      }
      if (successMessage) {
        successMessage.hidden = true;
      }
    });

    betaForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = new FormData(betaForm);
      const nombre = (data.get('entry.1266117491') || '').toString().trim();
      const registerEndpoint = betaForm.dataset.registerEndpoint;
      const payload = {
        full_name: nombre,
        email: (data.get('entry.1376913946') || '').toString().trim(),
        monthly_documents: (data.get('entry.291060050') || '').toString().trim(),
        profile: (data.get('entry.518934240') || '').toString().trim(),
        documents: (data.get('entry.1919705668') || '').toString().trim()
      };

      if (button) {
        button.disabled = true;
        button.textContent = 'Enviando solicitud...';
      }

      if (successMessage) {
        successMessage.hidden = true;
      }

      try {
        const response = await fetch(registerEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.ok) {
          console.warn('Register beta failed:', result);
          throw new Error('No pudimos enviar tu solicitud. Intentalo nuevamente en unos minutos.');
        }

        betaForm.reset();
        if (successMessage) {
          const title = successMessage.querySelector('strong');
          const message = successMessage.querySelector('p');
          if (title) {
            title.textContent = nombre
              ? `${nombre}, tu registro quedó guardado`
              : 'Tu registro quedó guardado';
          }
          if (message) {
            message.textContent = 'Ya estás registrado en la beta privada de DataScan AI.';
          }
          successMessage.hidden = false;
        }
        if (button) {
          button.textContent = 'Solicitud enviada';
        }
      } catch (error) {
        if (successMessage) {
          const title = successMessage.querySelector('strong');
          const message = successMessage.querySelector('p');
          if (title) {
            title.textContent = 'No pudimos enviar tu solicitud';
          }
          if (message) {
            message.textContent = error.message || 'Intentalo nuevamente en unos minutos.';
          }
          successMessage.hidden = false;
        }
        if (button) {
          button.textContent = 'Intentar nuevamente';
        }
      } finally {
        if (button) {
          button.disabled = false;
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDataScanLanding);
} else {
  initDataScanLanding();
}
