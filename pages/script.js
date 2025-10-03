const compareBtn = document.getElementById('compareBtn');
const result = document.getElementById('result');
const note = document.getElementById('dataNote');
const player1Div = document.getElementById('player1');
const player2Div = document.getElementById('player2');
const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

async function fetchStats(username) {
  const res = await fetch(`/api/getStats?username=${username}`);
  return res.json();
}

compareBtn.addEventListener('click', async () => {
  const u1 = document.getElementById('user1').value.trim();
  const u2 = document.getElementById('user2').value.trim();
  if(!u1 || !u2) return alert("Enter both usernames");

  const s1 = await fetchStats(u1);
  const s2 = await fetchStats(u2);

  // Update names & images
  name1.textContent = s1.username; img1.src = s1.profile_image;
  name2.textContent = s2.username; img2.src = s2.profile_image;

  // Update stats
  player1Div.querySelector('.stats p:nth-child(1) span').textContent = s1.yap;
  player1Div.querySelector('.stats p:nth-child(2) span').textContent = s1.posts;
  player1Div.querySelector('.stats p:nth-child(3) span').textContent = s1.reach;

  player2Div.querySelector('.stats p:nth-child(1) span').textContent = s2.yap;
  player2Div.querySelector('.stats p:nth-child(2) span').textContent = s2.posts;
  player2Div.querySelector('.stats p:nth-child(3) span').textContent = s2.reach;

  // Remove previous winner highlights
  player1Div.classList.remove('winner');
  player2Div.classList.remove('winner');

  // Calculate scores
  const score1 = s1.yap*3 + s1.posts*2 + s1.reach/1000;
  const score2 = s2.yap*3 + s2.posts*2 + s2.reach/1000;

  let winner;
  if(score1>score2){ winner = s1.username; player1Div.classList.add('winner'); confetti({ particleCount:100, spread:70 }); }
  else if(score2>score1){ winner = s2.username; player2Div.classList.add('winner'); confetti({ particleCount:100, spread:70 }); }
  else winner = "Tie!";

  result.textContent = `${winner} Wins!`;
  note.textContent = "";
});
