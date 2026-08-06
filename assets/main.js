// ==========================================================================
// C&G EPI Lab — site scripts
// ==========================================================================

// ---- Mobile navigation toggle -------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  drawManhattan();
});

// ---- Hero Manhattan plot -------------------------------------------------
// Dots are drawn in real pixels so their size never changes with the
// viewport (fixes the "dots stretch / inconsistent on mobile" problem).
// Only their positions fill the available width.

var MPLOT_DOT_R = 2.5;          // 지름 5px 고정
var MPLOT_GAP   = 27;           // 점 사이 가로 간격(px)

function drawManhattan() {
  var svg = document.querySelector('.mplot');
  if (!svg) return;

  var w = Math.round(svg.clientWidth);
  var h = Math.round(svg.clientHeight);
  if (w < 2 || h < 2) return;

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var NS = 'http://www.w3.org/2000/svg';
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  var thrY = Math.round(h * 0.38);          // 유의역치선 높이
  var baseY = h * 0.80;                      // 점들이 깔리는 기준선
  var amp = h * 0.24;                         // 기본 산포 폭

  // 재현 가능한 난수 (매번 같은 모양)
  var seed = 20260609;
  function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }

  var n = Math.ceil(w / MPLOT_GAP) + 1;

  // 역치선을 넘는 봉우리 위치(화면 폭에 비례해 3~5개)
  var nPeaks = Math.max(2, Math.round(w / 620));
  var peaks = [];
  for (var pk = 0; pk < nPeaks; pk++) {
    peaks.push(Math.round(n * (pk + 0.65) / nPeaks));
  }

  var delay = 0;
  var hits = [];

  for (var i = 0; i < n; i++) {
    var x = Math.round(MPLOT_GAP * (i + 0.5));
    if (x > w) break;

    // 봉우리에 가까울수록 위로 솟음
    var rise = 0, nearPeak = false;
    for (var q = 0; q < peaks.length; q++) {
      var dist = Math.abs(i - peaks[q]);
      if (dist <= 4) {
        var f = (4 - dist) / 4;             // 0~1
        rise = Math.max(rise, f * f);
        if (dist === 0) nearPeak = true;
      }
    }

    var y = baseY - amp * rnd() - (baseY - thrY + amp * 0.2) * rise;
    y = Math.max(thrY - h * 0.14, Math.min(h - 4, y));

    var crosses = y < thrY;
    var muted = (!crosses) && (rnd() < 0.28);

    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x);
    c.setAttribute('cy', Math.round(y));

    if (nearPeak && crosses) {
      // 빛나는 대표 히트
      c.setAttribute('r', MPLOT_DOT_R + 1.3);
      c.setAttribute('fill', 'var(--mint)');
      c.setAttribute('class', reduce ? 'hit show' : 'hit');
      c.style.animationDelay = (3.0 + hits.length * 0.25) + 's';
      hits.push([x, Math.round(y)]);
    } else {
      c.setAttribute('r', MPLOT_DOT_R);
      c.setAttribute('fill', crosses ? 'var(--mint)' : (muted ? '#7d8bb0' : 'var(--mint)'));
      c.setAttribute('class', reduce ? 'd show' : 'd');
      c.style.animationDelay = (delay += 0.045).toFixed(2) + 's';
    }
    svg.appendChild(c);
  }

  // 유의역치선 (점 위에 겹치지 않게 마지막에 추가)
  var line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', 0); line.setAttribute('y1', thrY);
  line.setAttribute('x2', w); line.setAttribute('y2', thrY);
  line.setAttribute('class', reduce ? 'thr show' : 'thr');
  svg.appendChild(line);

  // 히트 주변 빛나는 원
  if (!reduce) {
    hits.forEach(function (p, k) {
      var halo = document.createElementNS(NS, 'circle');
      halo.setAttribute('cx', p[0]); halo.setAttribute('cy', p[1]);
      halo.setAttribute('r', MPLOT_DOT_R + 1);
      halo.setAttribute('class', 'halo');
      halo.style.animationDelay = (3.5 + k * 0.25) + 's';
      svg.appendChild(halo);
    });
  }
}

// 창 크기가 바뀌면 다시 그림 (점 크기는 그대로, 위치만 재배치)
var mplotTimer;
window.addEventListener('resize', function () {
  clearTimeout(mplotTimer);
  mplotTimer = setTimeout(drawManhattan, 180);
});
