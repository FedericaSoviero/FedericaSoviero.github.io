const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.progress span');
const glow = document.querySelector('.cursor-glow');
document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const updateScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  if (!reduceMotion) document.querySelector('.hero-halo').style.transform = `translate3d(0, ${scrollY * .12}px, 0)`;
};
addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  addEventListener('pointermove', (event) => {
    glow.animate({ transform: `translate(${event.clientX - 190}px, ${event.clientY - 190}px)` }, { duration: 700, fill: 'forwards' });
  });
}

document.querySelectorAll('.system-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.system-tabs button').forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-selected', item === button ? 'true' : 'false');
    });
    document.querySelectorAll('.device-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.content === button.dataset.panel));
  });
});

const projects = {
  skillschool: {
    number: '01', type: 'CRM · FULL STACK', title: 'SkillSchool',
    description: 'Una piattaforma per gestire le attività di un ente di formazione. Il backend espone servizi REST e il frontend React offre aree dedicate ad amministrazione, segreteria, docenti e corsisti.',
    features: ['Catalogo corsi, edizioni e moduli', 'Corsisti, docenti, dipendenti e aule', 'Iscrizioni, presenze e lezioni', 'Ordini, rate, pagamenti e contabilità', 'Appuntamenti e notifiche in tempo reale'],
    tech: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'Spring Security', 'REST API', 'JWT', 'React', 'React Router', 'PostgreSQL', 'Hibernate', 'Maven']
  },
  formazione: {
    number: '02', type: 'GESTIONALE · MONOLITE', title: 'GestFormazione',
    description: 'Un gestionale monolitico per organizzare corsi e attività amministrative di un ente di formazione, con rendering server-side delle pagine.',
    features: ['Corsi a catalogo e corsi programmati', 'Corsisti, docenti, dipendenti e contratti', 'Lezioni, presenze, moduli e aule', 'Ordini, rate e metodi di pagamento', 'Richieste corsi e attestati'],
    tech: ['Java 17', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'JSP', 'Hibernate', 'MySQL', 'Maven', 'Architettura monolitica']
  },
  immobiliare: {
    number: '03', type: 'GESTIONALE · MONOLITE', title: 'Agenzia Immobiliare',
    description: 'Un’applicazione web per seguire il lavoro di un’agenzia immobiliare, dall’anagrafica degli immobili fino agli appuntamenti e alla gestione delle offerte.',
    features: ['Immobili, indirizzi e pertinenze', 'Clienti e operatori', 'Appuntamenti e stati di avanzamento', 'Offerte e tipologie di contratto', 'Contratti, fatture e collaborazioni'],
    tech: ['Java 17', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'JSP', 'Hibernate', 'MySQL', 'Maven', 'Architettura monolitica']
  },
  salone: {
    number: '04', type: 'GESTIONALE · WEB APP', title: 'GestioneSalone',
    description: 'Un software gestionale per un salone di parrucchiera, pensato per clienti, operatori e amministrazione con funzioni dedicate per ciascun ruolo.',
    features: ['Prenotazioni, fasce orarie e disponibilità', 'Clienti, operatori e assenze', 'Servizi e trattamenti', 'Prodotti, fornitori e forniture', 'Magazzino, consumi e riepilogo economico'],
    tech: ['Java 17', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Thymeleaf', 'Bootstrap', 'Hibernate', 'MySQL', 'Validazione', 'Architettura a livelli']
  }
};

const modal = document.querySelector('.project-modal');
const fillModal = (project) => {
  modal.querySelector('.modal-number').textContent = project.number;
  modal.querySelector('.modal-type').textContent = project.type;
  modal.querySelector('#modal-title').textContent = project.title;
  modal.querySelector('.modal-description').textContent = project.description;
  modal.querySelector('.modal-features').innerHTML = project.features.map((item) => `<li>${item}</li>`).join('');
  modal.querySelector('.modal-tech').innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
};
document.querySelectorAll('.project-card').forEach((card) => card.addEventListener('click', () => {
  fillModal(projects[card.dataset.project]);
  modal.showModal();
}));
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
