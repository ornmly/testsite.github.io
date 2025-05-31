
let allGames = [];

function renderGames(games) {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';
  if (games.length === 0) {
    grid.innerHTML = '<p>No games found.</p>';
    return;
  }

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${game.image_url}" alt="${game.title}" />
      <h3>${game.title}</h3>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Brand:</strong> ${game.brand}</p>
      <p><strong>Region:</strong> ${game.region}</p>
      <p><strong>Sold for:</strong> ${game.price}</p>
      <p><strong>Sold on:</strong> ${game.date_sold}</p>
    `;
    grid.appendChild(card);
  });
}

function filterGames() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const sortOption = document.getElementById('sortSelect').value;
  const consoleFilter = document.getElementById('consoleSelect').value;
  const brandFilter = document.getElementById('brandSelect').value;
  const regionFilter = document.getElementById('regionSelect').value;

  let filtered = allGames.filter(game =>
    (game.title.toLowerCase().includes(searchInput)) &&
    (!consoleFilter || game.platform === consoleFilter) &&
    (!brandFilter || game.brand === brandFilter) &&
    (!regionFilter || game.region === regionFilter)
  );

  if (sortOption === 'price') {
    filtered.sort((a, b) => parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, '')));
  } else if (sortOption === 'date') {
    filtered.sort((a, b) => new Date(b.date_sold) - new Date(a.date_sold));
  }

  renderGames(filtered);
}

fetch('games.json')
  .then(res => res.json())
  .then(games => {
    allGames = games;
    renderGames(allGames);

    const brandSet = new Set();
    const consoleSet = new Set();
    const regionSet = new Set();

    games.forEach(g => {
      brandSet.add(g.brand);
      consoleSet.add(g.platform);
      regionSet.add(g.region);
    });

    const brandSelect = document.getElementById('brandSelect');
    brandSet.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      brandSelect.appendChild(opt);
    });

    const consoleSelect = document.getElementById('consoleSelect');
    consoleSet.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      consoleSelect.appendChild(opt);
    });

    const regionSelect = document.getElementById('regionSelect');
    regionSet.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r;
      opt.textContent = r;
      regionSelect.appendChild(opt);
    });
  })
  .catch(err => {
    document.getElementById('gameGrid').innerHTML = 'Failed to load data.';
    console.error(err);
  });

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('input', filterGames);
  document.getElementById('sortSelect').addEventListener('change', filterGames);
  document.getElementById('consoleSelect').addEventListener('change', filterGames);
  document.getElementById('brandSelect').addEventListener('change', filterGames);
  document.getElementById('regionSelect').addEventListener('change', filterGames);
});
