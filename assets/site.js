// Mati Advisory — small site behaviours (no dependencies)
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Footer year
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form
  var form = document.getElementById('contact-form');
  if (!form) return;

  // Preselect topic from ?topic= in the link
  var topic = new URLSearchParams(location.search).get('topic');
  var select = form.querySelector('#topic');
  if (topic && select && select.querySelector('option[value="' + topic + '"]')) select.value = topic;

  var status = form.querySelector('.form-status');
  var submit = form.querySelector('button[type="submit"]');

  function say(msg, kind) {
    status.textContent = msg;
    status.className = 'form-status ' + (kind || '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();
    if (!name || !email || !message) { say('Add your name, email and a message so we can reply.', 'err'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('That email address looks incomplete. Check it and try again.', 'err'); return; }

    // Until a Formspree form ID is set, open the visitor's email app instead.
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      var topicText = select ? select.options[select.selectedIndex].text : '';
      var body = 'Name: ' + name + '\nEmail: ' + email +
        (form.company.value ? '\nCompany: ' + form.company.value : '') +
        (form.phone.value ? '\nPhone: ' + form.phone.value : '') +
        '\nTopic: ' + topicText + '\n\n' + message;
      location.href = 'mailto:contact@matiadvisory.com?subject=' +
        encodeURIComponent('Enquiry: ' + topicText) + '&body=' + encodeURIComponent(body);
      return;
    }

    submit.disabled = true;
    say('Sending…');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        say('Message sent. We\u2019ll get back to you soon.', 'ok');
      })
      .catch(function () {
        say('Your message didn’t send. Email us at contact@matiadvisory.com or try again.', 'err');
      })
      .finally(function () { submit.disabled = false; });
  });
})();
