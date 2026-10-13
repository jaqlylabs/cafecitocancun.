/* ===== Datos editables ===== */
var WHATSAPP = "";            // Número con lada, solo dígitos. Ej.: 529981234567
var SHOW_DEMO_NOTE = true;    // Quita el aviso cuando tengas el menú real
var HOURS = [null, [390, 1200], [390, 1200], [390, 1200], [390, 1200], [390, 1200], [540, 1020]]; // 0 = domingo; minutos desde medianoche
var DAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

var ICONS = {
  frias: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 14h24l-3 28H15z"/><path d="M26 14l6-8"/><path d="M15 24h18"/></svg>',
  calientes: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 20h26v8a11 11 0 0 1-11 11h-4A11 11 0 0 1 9 28z"/><path d="M35 23h2a5 5 0 0 1 0 10h-3"/><path d="M17 14c-2-3 2-4 0-8M25 14c-2-3 2-4 0-8"/></svg>',
  pan: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 30c0-9 8-16 18-16s18 7 18 16c0 3-3 4-6 3-3 2-6 2-12 2s-9 0-12-2c-3 1-6 0-6-3z"/><path d="M17 20l3 10M27 18l1 11M35 22l-3 8"/></svg>',
  sand: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 26c0-8 8-12 18-12s18 4 18 12z"/><path d="M6 32h36"/><path d="M8 38c0 3 3 4 6 4h20c3 0 6-1 6-4v-3H8z"/></svg>'
};

var MENU = [
  {
    id: "frias",
    name: "Bebidas frías",
    items: [
      { n: "Matcha frío", d: "Matcha ceremonial con leche sobre hielo.", p: 85, tag: "Favorito" },
      { n: "Frappé de caramelo", d: "Café, caramelo y crema batida.", p: 89 },
      { n: "Frappé de moka", d: "Café, chocolate y hielo molido.", p: 89 },
      { n: "Cold brew", d: "Café infusionado en frío por 18 horas.", p: 70 },
      { n: "Latte frío", d: "Espresso doble con leche fría.", p: 75 }
    ]
  },
  {
    id: "calientes",
    name: "Bebidas calientes",
    items: [
      { n: "Pumpkin Spice Latte", d: "Espresso, leche vaporizada y especias de calabaza.", p: 85, tag: "De temporada" },
      { n: "Matcha latte", d: "Matcha batido con leche cremosa.", p: 85 },
      { n: "Capuchino", d: "Espresso, leche y espuma gruesa.", p: 65 },
      { n: "Americano", d: "Espresso largo con agua caliente.", p: 50 },
      { n: "Chocolate caliente", d: "Chocolate oscuro con leche.", p: 70 }
    ]
  },
  {
    id: "pan",
    name: "Panadería",
    items: [
      { n: "Croissant de mantequilla", d: "Horneado cada mañana.", p: 55 },
      { n: "Croissant de almendra", d: "Relleno de crema de almendra.", p: 70 },
      { n: "Muffin de arándano", d: "Suave, con fruta en cada mordida.", p: 50 },
      { n: "Hojaldre de queso", d: "Hojaldre dorado con queso fundido.", p: 55 }
    ]
  },
  {
    id: "sand",
    name: "Sándwiches y desayunos",
    items: [
      { n: "Ciabatta de pollo y pesto", d: "Pollo, pesto de albahaca y jitomate. Con papas.", p: 135 },
      { n: "Ciabatta caprese", d: "Mozzarella, jitomate y albahaca. Con papas.", p: 125 },
      { n: "Sándwich de jamón y queso", d: "Pan artesanal tostado. Con papas.", p: 115 }
    ]
  }
];

var GALLERY = [
  { t: "La barra", i: "calientes" },
  { t: "Matcha", i: "frias" },
  { t: "Croissants", i: "pan" },
  { t: "Frappés", i: "frias" },
  { t: "Ciabattas", i: "sand" },
  { t: "Nuestro local", i: "calientes" }
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function money(n) {
  return "$" + n + " MXN";
}

/* ===== Menú interactivo ===== */
var tabsEl = document.getElementById("tabs");
var itemsEl = document.getElementById("items");

function showCat(id, focus) {
  var cat = MENU.filter(function(c) { return c.id === id; })[0];
  Array.prototype.forEach.call(tabsEl.children, function(b) {
    var on = b.dataset.id === id;
    b.setAttribute("aria-selected", on ? "true" : "false");
    b.tabIndex = on ? 0 : -1;
    if (on && focus) b.focus();
  });

  itemsEl.setAttribute("aria-labelledby", "tab-" + id);
  itemsEl.innerHTML = cat.items.map(function(it) {
    var pic = it.src ? '<img src="' + esc(it.src) + '" alt="' + esc(it.n) + '" loading="lazy">' : ICONS[cat.id];
    return '<article class="item"><div class="ph">' + pic + '</div><div><h3>' + esc(it.n) + (it.tag ? '<span class="tag">' + esc(it.tag) + '</span>' : '') + '</h3><p>' + esc(it.d) + '</p><span class="price">' + money(it.p) + '</span></div></article>';
  }).join("");
}

MENU.forEach(function(c) {
  var b = document.createElement("button");
  b.type = "button";
  b.className = "tab";
  b.id = "tab-" + c.id;
  b.dataset.id = c.id;
  b.textContent = c.name;
  b.setAttribute("role", "tab");

  b.addEventListener("click", function() { showCat(c.id); });
  b.addEventListener("keydown", function(e) {
    var i = MENU.findIndex(function(m) { return m.id === c.id; });
    var n = null;
    if (e.key === "ArrowRight") n = (i + 1) % MENU.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + MENU.length) % MENU.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = MENU.length - 1;

    if (n !== null) {
      e.preventDefault();
      showCat(MENU[n].id, true);
    }
  });

  tabsEl.appendChild(b);
});

showCat(MENU[0].id);

if (SHOW_DEMO_NOTE) {
  document.getElementById("menuNote").textContent = "Platillos y precios de ejemplo. Pregunta en barra por la carta del día.";
}

/* ===== Galería ===== */
document.getElementById("gallery").innerHTML = GALLERY.map(function(g) {
  var inner = g.src ? '<img src="' + esc(g.src) + '" alt="' + esc(g.t) + '" loading="lazy">' : ICONS[g.i];
  return '<figure class="g">' + inner + '<figcaption>' + esc(g.t) + '</figcaption></figure>';
}).join("");

/* ===== Horario dinámico (Cancún UTC-5) ===== */
function cancunNow() {
  var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Cancun", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  var o = {};
  p.forEach(function(x) { o[x.type] = x.value; });
  return { wd: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday], min: (+o.hour % 24) * 60 + (+o.minute) };
}

function fmt(m) {
  var h = Math.floor(m / 60), mm = m % 60;
  return (h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm;
}

function paint() {
  var n = cancunNow();
  var h = HOURS[n.wd];
  var s = document.getElementById("status");
  var t = document.getElementById("statusText");

  if (h && n.min >= h[0] && n.min < h[1]) {
    s.className = "status open";
    t.textContent = "Abierto ahora · cierra a las " + fmt(h[1]);
  } else {
    var d = n.wd, add = 0, when = 0;
    for (var k = 0; k < 8; k++) {
      var dd = (n.wd + k) % 7;
      var hh = HOURS[dd];
      if (hh && (k > 0 || n.min < hh[0])) {
        d = dd;
        add = k;
        when = hh[0];
        break;
      }
    }
    s.className = "status closed";
    t.textContent = "Cerrado ahora · abre " + (add === 0 ? "hoy" : add === 1 ? "mañana" : "el " + DAYS[d]) + " a las " + fmt(when);
  }

  document.querySelector("#hours tbody").innerHTML = [["Lunes a viernes", 1, 5], ["Sábados", 6, 6], ["Domingos", 0, 0]].map(function(r) {
    var hh = HOURS[r[1]];
    var isToday = n.wd >= r[1] && n.wd <= r[2];
    return '<tr class="' + (isToday ? "today" : "") + '"><th scope="row">' + r[0] + '</th><td>' + (hh ? fmt(hh[0]) + " – " + fmt(hh[1]) + " h" : "Cerrado") + '</td></tr>';
  }).join("");
}

paint();
setInterval(paint, 60000);

/* ===== Botones de Contacto ===== */
["waBtn", "waDock"].forEach(function(id) {
  var a = document.getElementById(id);
  if (WHATSAPP) {
    a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hola Cafecito, tengo una duda.");
    a.textContent = "WhatsApp";
  } else {
    a.href = "https://ig.me/m/cafecito.cun";
    a.textContent = "Escríbenos";
  }
});

document.getElementById("copyAddr").addEventListener("click", function() {
  var el = document.getElementById("addr");
  var t = document.getElementById("toast");
  
  function ok() { t.textContent = "Dirección copiada."; }
  function fail() {
    var r = document.createRange();
    r.selectNodeContents(el);
    var s = getSelection();
    s.removeAllRanges();
    s.addRange(r);
    t.textContent = "Selecciona y copia la dirección.";
  }
  
  try {
    navigator.clipboard.writeText(el.textContent).then(ok, fail);
  } catch (e) {
    fail();
  }
});