// ACCORDION FAQ
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(el => {
      el.classList.remove('active');
    });

    // Open this one if wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// FORM SUBMISSION (con Netlify + feedback visual)
const form = document.getElementById('audit-form');
const responseDiv = document.getElementById('form-response');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Evita recarga de página

  // Obtener datos
  const formData = new FormData(form);
  const name = formData.get('nombre_empresa');
  const email = formData.get('email_contacto');

  // Enviar datos a Netlify (fetch POST)
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
  .then(() => {
    // Guardar en localStorage (opcional, para feedback local)
    const submission = {
      name,
      email,
      date: new Date().toISOString()
    };
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // Mostrar mensaje de éxito
    responseDiv.style.display = 'block';
    responseDiv.innerHTML = `> ✅ ¡AUDITORÍA AGENDADA! <br> Diagnóstico enviado a <strong>${email}</strong> en menos de 24h.`;

    // Reset form
    form.reset();

    // Scroll to response
    responseDiv.scrollIntoView({ behavior: 'smooth' });
  })
  .catch((error) => {
    responseDiv.style.display = 'block';
    responseDiv.textContent = "> ❌ Error al enviar. Intente de nuevo.";
    console.error(error);
  });
});

// SCROLL TO FORM
document.querySelectorAll('.neon-button').forEach(button => {
  if (button.id !== 'cta-hero') return;
  button.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// CONTADOR ANIMADO (igual que antes)
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
  const duration = 2000; // 2 segundos
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
    window.removeEventListener('scroll', handleScroll); // Solo se ejecuta una vez
  }
}

window.addEventListener('scroll', handleScroll);
// Chequear al cargar por si ya está visible
window.addEventListener('load', handleScroll);
// Animación al hacer scroll (simple, sin librerías)
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
document.getElementById('audit-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Validar checkbox
  if (!document.getElementById('consent').checked) {
    alert('> Debes aceptar recibir el diagnóstico por email.');
    return;
  }

  const formData = new FormData(e.target);
  const nombreEmpresa = formData.get('nombre_empresa');
  const emailContacto = formData.get('email_contacto');
  const urlSitio = formData.get('url_sitio');
  const motivoConsulta = formData.get('motivo_consulta');

  if (!nombreEmpresa || !emailContacto || !urlSitio) {
    alert('> Todos los campos son requeridos');
    return;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw6WUDjvKemJVBQ1YovERlqJ6PS7aM86WIgvO4y35kZ3EWuLHAjYF_JHuRgKPQ2Z1M2dQ/exec', { // ⚠️ REEMPLAZA CON TU URL
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
        nombre_empresa: nombreEmpresa,
        email_contacto: emailContacto,
        url_sitio: urlSitio,
        motivo_consulta: motivoConsulta
      })
    });

    // Mostrar mensaje de éxito
    const responseDiv = document.getElementById('form-response');
    responseDiv.classList.remove('hidden');
    e.target.reset();
    document.getElementById('consent').checked = false;

    setTimeout(() => {
      responseDiv.classList.add('hidden');
    }, 5000);

  } catch (error) {
    alert('> Error al enviar. Intenta de nuevo.');
    console.error(error);
  }
});
