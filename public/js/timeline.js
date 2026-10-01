(() => {
  const avatar = document.querySelector('.avatar');
  const sprite = document.querySelector('.avatar-sprite');
  const preview = document.querySelector('.project-preview');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let surprised = false;
  let resetTimer;
  let bounce;

  function pose(column, row = 0) {
    sprite.style.backgroundPosition = `${-72 * column}px ${-108 * row}px`;
  }

  // Six personal portraits share one local sprite sheet.
  document.addEventListener('pointermove', event => {
    if (reducedMotion.matches || surprised || event.pointerType === 'touch') return;
    const bounds = avatar.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    if (Math.abs(y) > Math.abs(x) * 1.5) pose(y > 0 ? 0 : 1, 1);
    else pose(x < -40 ? 0 : x > 40 ? 2 : 1);
  }, { passive: true });

  function resetAvatar() {
    clearTimeout(resetTimer);
    surprised = false;
    bounce?.cancel();
    pose(1);
  }

  avatar.addEventListener('click', () => {
    clearTimeout(resetTimer);
    surprised = true;
    pose(2, 1);
    bounce?.cancel();
    if (!reducedMotion.matches) {
      bounce = sprite.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-7px) scale(1.04)' },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 360, easing: 'ease-out' });
    }
    resetTimer = setTimeout(resetAvatar, 1400);
  });
  document.documentElement.addEventListener('pointerleave', () => {
    if (!surprised) pose(1);
  });
  reducedMotion.addEventListener('change', resetAvatar);

  const projects = {
    regulation: {
      caption: 'independent project', title: 'regulation check', logo: 'regulation-check.svg',
      detail: 'EU AI Act readiness · FastAPI · PostgreSQL',
      story: 'Building a practical application for EU AI Act readiness, from backend services to automated delivery.'
    },
    engineering: {
      caption: 'selected work', title: 'data, end to end.', logo: 'engineering.svg',
      detail: 'Python · SQL · CDC · orchestration · observability',
      story: 'Seven years across backend systems and data engineering: building pipelines, shipping services, and keeping production observable.'
    },
    gropyus: {
      caption: 'aug 2022 — present · berlin', title: 'GROPYUS', logo: 'gropyus.svg', city: 'berlin',
      detail: 'Senior Data Engineer · manufacturing data platforms',
      story: 'Building data infrastructure for manufacturing in Berlin. Python, SQL, Dagster, dbt, DLT, and production observability.'
    },
    berlin: {
      caption: 'germany · chapter three', title: 'hello, berlin.', city: 'berlin',
      detail: 'A new city. A new chapter. Manufacturing meets data.',
      story: 'Moved to Berlin in 2022 to join GROPYUS. From backend engineering in Pune to data pipelines in Bengaluru, then manufacturing data infrastructure in Berlin.',
      route: ['Pune', 'Bengaluru', 'Berlin']
    },
    sigmoid: {
      caption: 'jun 2021 — jul 2022 · bengaluru', title: 'sigmoid', logo: 'sigmoid.png', city: 'bengaluru',
      detail: 'Software Development Engineer · sales-data pipelines',
      story: 'Built sales-data pipelines with Python, PySpark, Pandas, and Airflow, working with Google Cloud and Terraform.'
    },
    bengaluru: {
      caption: 'india · chapter two', title: 'bengaluru days.', city: 'bengaluru',
      detail: 'From backend services to data pipelines.',
      story: 'Joined Sigmoid in Bengaluru in June 2021, working on sales-data pipelines through July 2022.'
    },
    amdocs: {
      caption: 'jun 2019 — jun 2021 · pune', title: 'amdocs', logo: 'amdocs.svg', city: 'pune',
      detail: 'Associate Software Engineer → Software Engineer',
      story: 'Started as an Associate Software Engineer in June 2019, then became a Software Engineer in January 2021. Built CRM backend systems with Java, Spring, REST, SOAP, and Oracle.'
    },
    pune: {
      caption: 'india · chapter one', title: 'first stop, pune.', city: 'pune',
      detail: 'First full-time role. Backend foundations.',
      story: 'Joined Amdocs in Pune after graduating in 2019. Two years of software engineering, from backend implementation to production.'
    },
    education: {
      caption: '2015 — 2019 · computer science', title: 'BIT Mesra', logo: 'bit-mesra.png',
      detail: 'Bachelor of Engineering · first class with distinction',
      story: 'Studied Computer Science at Birla Institute of Technology, Mesra, graduating in 2019. Also served as an ACM student coordinator and vice president, and as IEEE Tech Head.'
    },
    finnov: {
      caption: 'feb — apr 2019 · gurgaon', title: 'finnov', logo: 'finnov.png', city: 'gurgaon',
      detail: 'Software Development Intern',
      story: 'A three-month software development internship at Finnov Softwares Services Private Limited in Gurgaon, before joining Amdocs.'
    },
    scholarship: {
      caption: 'nov 2018 · facebook × udacity', title: 'learning with PyTorch.', logo: 'pytorch.svg',
      detail: 'Facebook PyTorch Challenge Scholarship',
      story: 'Selected for the Facebook and Udacity PyTorch Challenge Scholarship in 2018, exploring deep learning with PyTorch.'
    },
    hasura: {
      caption: 'dec 2017 — feb 2018', title: 'hasura', logo: 'hasura.svg',
      detail: 'Product Development Intern · Node.js · PostgreSQL',
      story: 'Built an Alexa skill that answered IPL queries from datasets, using Node.js, Express, PostgreSQL, and REST APIs, and deployed it on Hasura Hub.'
    },
    kwoc: {
      caption: 'dec 2017 — jan 2018 · open source', title: 'winter of code.', logo: 'iit-kharagpur.png',
      detail: 'Kharagpur Winter of Code · IIT Kharagpur',
      story: 'Contributed to cli-cube-timer and relative-date-reverse during the online Kharagpur Winter of Code program, mentored by Siddharth Kannan.'
    },
    acm: {
      caption: 'oct 2017 — sep 2018 · BIT Mesra', title: 'ACM', logo: 'acm.svg',
      detail: 'Vice President · student chapter',
      story: 'Served as Vice President of the ACM student chapter at BIT Mesra, setting problems and maintaining university coding contests. Previously served as Student Coordinator from September 2016 to September 2017.'
    },
    ieee: {
      caption: 'sep 2017 — sep 2018 · BIT Mesra', title: 'IEEE', logo: 'ieee.png',
      detail: 'Tech Head · student chapter',
      story: 'Led the student chapter’s technical needs at BIT Mesra and designed and developed the club website.'
    },
    schooglink: {
      caption: 'dec 2016 — jan 2017 · patna', title: 'schooglink', logo: 'schooglink.png', city: 'patna',
      detail: 'Web Development Intern · Ember.js · Node.js',
      story: 'Built the Education 360 section, improved school and parent search, and deployed features to users. Worked with Ember.js, Node.js, Express, and REST APIs.'
    }
  };

  function paragraph(className, content) {
    const element = document.createElement('p');
    element.className = className;
    element.textContent = content;
    return element;
  }

  function createCover(key) {
    const project = projects[key];
    const cover = document.createElement('div');
    cover.className = `preview-cover preview-${key}${project.city ? ' has-city' : ''}${!project.logo ? ' city-postcard' : ''}`;
    cover.append(paragraph('preview-caption', project.caption));
    const scene = document.createElement('div');
    scene.className = 'preview-scene';
    if (project.city) {
      const art = document.createElement('img');
      art.className = 'city-art';
      art.src = `./public/images/places/${project.city}.svg`;
      art.alt = '';
      art.width = 640;
      art.height = 240;
      scene.append(art);
    }
    if (project.logo) {
      const plaque = document.createElement('div');
      plaque.className = 'logo-plaque';
      const logo = document.createElement('img');
      logo.className = 'preview-logo';
      logo.src = `./public/images/logos/${project.logo}`;
      logo.alt = `${key === 'kwoc' ? 'IIT Kharagpur' : key === 'scholarship' ? 'PyTorch' : project.title} logo`;
      plaque.append(logo);
      scene.append(plaque);
    }
    cover.append(scene);
    const copy = document.createElement('div');
    copy.className = 'preview-copy';
    copy.append(paragraph('preview-title', project.title), paragraph('preview-detail', project.detail));
    cover.append(copy);
    return cover;
  }
  let activeLink = null;

  function positionPreview(link) {
    const rect = link.getBoundingClientRect();
    const width = preview.offsetWidth;
    const height = width * 936 / 1243;
    const edge = 16;
    const gap = 20;
    let left = rect.right + gap;
    let top = rect.top + rect.height / 2 - height / 2;
    if (left + width > innerWidth - edge) {
      left = rect.left - width - gap;
      if (left < edge) {
        left = Math.max(edge, Math.min(rect.left, innerWidth - width - edge));
        top = rect.bottom + gap;
        if (top + height > innerHeight - edge) top = rect.top - height - gap;
      }
    }
    preview.style.left = `${left}px`;
    preview.style.top = `${Math.max(edge, Math.min(top, innerHeight - height - edge))}px`;
  }

  function showPreview(link) {
    const key = link.dataset.preview;
    const project = projects[key];
    if (!project) return;
    if (link.getAttribute('aria-expanded') === 'true') return;
    activeLink = link;
    preview.replaceChildren(createCover(key));
    positionPreview(link);
    preview.classList.add('is-visible');
  }

  function hidePreview() {
    activeLink = null;
    preview.classList.remove('is-visible');
  }

  let expanded = null;

  function closeDetails(restoreFocus = false) {
    if (!expanded) return;
    const { button, panel } = expanded;
    button.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    expanded = null;
    if (restoreFocus) button.focus();
  }

  document.querySelectorAll('[data-preview]').forEach((link, index) => {
    const key = link.dataset.preview;
    const project = projects[key];
    if (!project) return;
    const button = link;
    if (button.tagName === 'BUTTON') {
      button.setAttribute('aria-label', `Show ${link.textContent} details`);
    }
    const panel = document.createElement('section');
    panel.className = 'expanded-details';
    panel.id = `details-${index}`;
    panel.hidden = true;
    panel.setAttribute('aria-label', `${project.title} details`);
    link.closest('li').append(panel);
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      hidePreview();
      const wasOpen = expanded?.button === button;
      closeDetails();
      if (wasOpen) return;
      if (!panel.childElementCount) {
        panel.append(createCover(key), paragraph('details-story', project.story));
        if (project.route) {
          const route = document.createElement('ol');
          route.className = 'city-route';
          route.setAttribute('aria-label', 'Work journey');
          project.route.forEach((city, i) => {
            const stop = document.createElement('li');
            stop.append(paragraph('route-year', ['2019', '2021', '2022'][i]), paragraph('route-city', city));
            route.append(stop);
          });
          panel.append(route);
        }
        if (link.tagName === 'A') {
          const website = document.createElement('a');
          website.className = 'details-website';
          website.href = link.href;
          website.target = '_blank';
          website.rel = 'noopener noreferrer';
          website.textContent = 'visit website';
          panel.append(website);
        }
      }
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      expanded = { button, panel };
    });
    link.addEventListener('pointerenter', event => {
      if (expanded?.panel === panel) return;
      if (event.pointerType !== 'touch' && matchMedia('(any-hover: hover)').matches) showPreview(link);
    });
    link.addEventListener('pointerleave', () => {
      if (activeLink === link && !link.matches(':focus-visible')) hidePreview();
    });
    link.addEventListener('focus', () => {
      if (expanded?.panel !== panel && link.matches(':focus-visible')) showPreview(link);
    });
    link.addEventListener('blur', () => {
      if (activeLink === link) hidePreview();
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeDetails(true);
      hidePreview();
    }
  });
  window.addEventListener('scroll', hidePreview, { passive: true });
  window.addEventListener('blur', () => { hidePreview(); resetAvatar(); });
  window.addEventListener('resize', () => {
    if (activeLink) positionPreview(activeLink);
  }, { passive: true });
})();
