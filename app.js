
fetch('games.json')
  .then(res => res.json())
  .then(games => {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';
    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${game.image_url}" alt="${game.title}" />
        <h3>${game.title}</h3>
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p><strong>Sold for:</strong> ${game.price}</p>
        <p><strong>Sold on:</strong> ${game.date_sold}</p>
      `;
      grid.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('gameGrid').innerHTML = 'Failed to load data.';
    console.error(err);
  });
