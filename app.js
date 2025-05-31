
document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  if (url.includes('games')) renderGames();
  else if (url.includes('toys')) renderToys();
  else if (url.includes('boardgames')) renderBoardGames();
});

async function renderGames() {
  const gameList = document.getElementById('gameList');
  const res = await fetch('games.json');
  const games = await res.json();

  const brandSelect = document.getElementById('brandSelect');
  const consoleSelect = document.getElementById('consoleSelect');
  const genreSelect = document.getElementById('genreSelect');
  const searchInput = document.getElementById('searchInput');

  function updateList() {
    const brand = brandSelect?.value || '';
    const console = consoleSelect?.value || '';
    const genre = genreSelect?.value || '';
    const search = searchInput?.value?.toLowerCase() || '';

    const filtered = games.filter(g =>
      (!brand || g.brand === brand) &&
      (!console || g.console_name === console) &&
      (!genre || g.genre === genre) &&
      (!search || g.title.toLowerCase().includes(search))
    );

    gameList.innerHTML = filtered.map(g => `
      <div class="bg-white p-4 rounded shadow flex flex-col gap-2">
        <img src="${g.image_url}" class="w-full h-auto rounded" alt="Box art">
        <h2 class="font-bold">${g.title}</h2>
        <p>${g.console_name} (${g.region})</p>
        <p><strong>${g.price}</strong> • Sold in last 90 days: ${g.sold_90_days}</p>
        <div class="flex gap-2">
          <a href="${g.buy_links.ebay}" target="_blank" class="text-blue-600 underline">eBay</a>
          <a href="${g.buy_links.cex}" target="_blank" class="text-blue-600 underline">CEX</a>
        </div>
      </div>`).join('');
  }

  if (brandSelect && consoleSelect && genreSelect && searchInput) {
    [brandSelect, consoleSelect, genreSelect, searchInput].forEach(input =>
      input.addEventListener('change', updateList)
    );
  }

  updateList();
}

async function renderToys() {
  const toyList = document.getElementById('toyList');
  const res = await fetch('toys.json');
  const toys = await res.json();

  toyList.innerHTML = toys.map(t => `
    <div class="bg-white p-4 rounded shadow flex flex-col gap-2">
      <img src="${t.image_url}" class="w-full h-auto rounded" alt="Toy">
      <h2 class="font-bold">${t.title}</h2>
      <p>${t.brand} - ${t.figure_line}</p>
      <p><strong>${t.price}</strong> • Condition: ${t.condition}</p>
      <div class="flex gap-2">
        <a href="${t.buy_links.ebay}" target="_blank" class="text-blue-600 underline">eBay</a>
        <a href="${t.buy_links.cex}" target="_blank" class="text-blue-600 underline">CEX</a>
      </div>
    </div>`).join('');
}

async function renderBoardGames() {
  const boardGameList = document.getElementById('boardGameList');
  const res = await fetch('boardgames.json');
  const games = await res.json();

  boardGameList.innerHTML = games.map(g => `
    <div class="bg-white p-4 rounded shadow flex flex-col gap-2">
      <img src="${g.image_url}" class="w-full h-auto rounded" alt="Board Game">
      <h2 class="font-bold">${g.title}</h2>
      <p>${g.publisher} - ${g.completeness}</p>
      <p><strong>${g.price}</strong> • Condition: ${g.condition}</p>
      <div class="flex gap-2">
        <a href="${g.buy_links.ebay}" target="_blank" class="text-blue-600 underline">eBay</a>
        <a href="${g.buy_links.cex}" target="_blank" class="text-blue-600 underline">CEX</a>
      </div>
    </div>`).join('');
}
