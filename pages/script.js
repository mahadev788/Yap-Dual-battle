const compareBtn = document.getElementById('compareBtn');
const result = document.getElementById('result');
const note = document.getElementById('dataNote');
const player1Div = document.getElementById('player1');
const player2Div = document.getElementById('player2');

async function fetchStats(username, manual = {}) {
  const qs = new URLSearchParams({ username, ...manual }).toString();
  const res = await fetch(`/api/getStats?${qs}`);
  return res.json();
}

compareBtn.addEventListener('click', async () => {
  const user1 = document.getElementById('user1').value.trim();
  const user2 = document.getElementById('user2').value.trim();
  if(!user1 || !user2) return alert('Enter both usernames');

  const stats1 = await fetchStats(user1, {
    manualYap: document.getElementById('user1_yap').value,
    manualPosts: document.getElementById('user1_posts').value,
    manualReach: document.getElementById('user1_reach').value
  });
  const stats2 = await fetchStats(user2, {
    manualYap: document.getElementById('user2_yap').value,
    manualPosts: document.getElementById('user2_posts').value,
    manualReach: document.getElementById('user2_reach').value
  });

  player1Div.querySelector('.score span').textContent = stats1.yap;
  player2Div.querySelector('.score span').textContent = stats2.yap;

  player1Div.classList.remove('winner');
  player2Div.classList.remove('winner');

  const score1 = (stats1.yap || 0)*3 + (stats1.posts || 0)*2 + (stats1.reach || 0)/1000;
  const score2 = (stats2.yap || 0)*3 + (stats2.posts || 0)*2 + (stats2.reach || 0)/1000;

  let winner;
  if(score1 > score2) { winner = user1; player1Div.classList.add('winner'); }
  else if(score2 > score1) { winner = user2; player2Div.classList.add('winner'); }
  else winner = 'Tie!';

  result.textContent = `${winner} Wins!`;

  if(stats1.mockSource || stats2.mockSource) {
    note.textContent = 'Showing demo/mock stats (no API token).';
  } else {
    note.textContent = '';
  }
});
