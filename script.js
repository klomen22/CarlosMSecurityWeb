// ACCORDION FAQ
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');
    
    // Cierra todos
    document.querySelectorAll('.accordion-item').forEach(el => {
      el.classList.remove('active');
    });

    // Abre este si no estaba activo
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// FORM SUBMISSION (con Formspree + redirección)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('audit-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const consentCheckbox = document.getElementById('consentimiento');
    if (consentCheckbox && !consentCheckbox.checked) {
      alert('> Debes aceptar recibir el diagnóstico por email.');
      return;
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = 'gracias.html';
      } else {
        return response.json().then(data => {
          throw new Error(data.error || 'Error al enviar. Intenta de nuevo.');
        });
      }
    })
    .catch(error => {
      alert('> Error: ' + error.message);
    });
  });
});

// SCROLL TO FORM
document.querySelectorAll('.neon-button').forEach(button => {
  if (button.id !== 'cta-hero') return;
  button.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// CONTADOR ANIMADO
function animateCounter() {
  const counterElement = document.getElementById('systems-counter');
  if (!counterElement) return;

  const target = 247;
  let count = 0;
  const duration = 2000;
  const stepTime = duration / target;

  const timer = setInterval(() => {
    count++;
    counterElement.textContent = count;
    if (count >= target) {
      clearInterval(timer);
      counterElement.textContent = target;
    }
  }, stepTime);
}

// Activar contador cuando entra en viewport
function handleScroll() {
  const counterSection = document.querySelector('.counter-section');
  if (!counterSection) return;

  const sectionTop = counterSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.75) {
    animateCounter();
    window.removeEventListener('scroll', handleScroll);
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// ANIMACIONES AOS SIMPLES (sin librerías)
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
});
