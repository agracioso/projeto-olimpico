/* ============================================================
   BRAND EDUCATION — COMITÊ OLÍMPICO INTERNACIONAL
   Arquivo: script.js
   Descrição: comportamento interativo da capa de navegação
   ============================================================ */


/* ── ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA ─────────────────── *
 *
 * Problema a resolver:
 * Os cards ficam fora da tela quando a página carrega.
 * Se eles animarem imediatamente (junto com o hero),
 * o usuário nunca vê a animação — já passou por eles.
 *
 * Solução — Intersection Observer:
 * Observamos o grid de cards. Quando ele entra na área
 * visível da tela (threshold: 15%), disparamos as animações
 * de entrada com delays escalonados, um card por vez.
 *
 * ─────────────────────────────────────────────────────────── */

const grid  = document.getElementById('moduleGrid');
const cards = grid.querySelectorAll('.module-card');

/* Começa invisível — a classe CSS 'not-visible' desliga a animação */
grid.classList.add('not-visible');

const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {

      if (entry.isIntersecting) {

        /* Grid entrou na tela: remove o bloqueio e dispara as animações */
        grid.classList.remove('not-visible');

        cards.forEach(function(card, index) {
          /* Delay escalonado: cada card espera 70ms a mais que o anterior */
          card.style.animationDelay = (0.05 + index * 0.07) + 's';

          /* Truque para reiniciar a animação CSS:
             1. Remove o nome da animação
             2. Força o navegador a recalcular (offsetHeight)
             3. Recoloca o nome — a animação recomeça do zero */
          card.style.animationName = 'none';
          card.offsetHeight; /* força reflow */
          card.style.animationName = '';
        });

        /* Para de observar — a animação só precisa acontecer uma vez */
        observer.disconnect();
      }

    });
  },
  { threshold: 0.15 } /* dispara quando 15% do grid está visível */
);

observer.observe(grid);
