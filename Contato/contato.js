document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburger');
  const panel = document.getElementById('nav-links');
  if (!btn || !panel) return;

  const toggle = () => {
    const open = panel.classList.toggle('open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  btn.addEventListener('click', toggle);
  panel.querySelectorAll('a, button').forEach(el =>
    el.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); //impede redirecionamento/reload da página

      // pega os dados do form
      const formData = new FormData(form);

      try {
        // exemplo usando Formspree (troque pela sua URL)
        const res = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          alert('✅ Mensagem enviada com sucesso!');
          form.reset(); // limpa os campos
        } else {
          alert('⚠️ Ocorreu um erro ao enviar. Tente novamente.');
        }
      } catch (err) {
        console.error(err);
        alert('❌ Falha de conexão. Verifique sua internet.');
      }
    });
  }
});
