const compareBtn = document.getElementById('compareBtn');
const result = document.getElementById('result');

compareBtn.addEventListener('click', async () => {
    const user1 = document.getElementById('user1').value.trim();
    const user2 = document.getElementById('user2').value.trim();
    if(!user1 || !user2) return alert("Enter both usernames");

    const res1 = await fetch(`/api/getStats?username=${user1}`);
    const res2 = await fetch(`/api/getStats?username=${user2}`);
    const stats1 = await res1.json();
    const stats2 = await res2.json();

    document.querySelector('#player1 .score span').textContent = stats1.yap;
    document.querySelector('#player2 .score span').textContent = stats2.yap;

    // Determine winner
    let winner;
    if(stats1.yap > stats2.yap) { winner = user1; document.getElementById('player1').classList.add('winner'); }
    else if(stats2.yap > stats1.yap) { winner = user2; document.getElementById('player2').classList.add('winner'); }
    else winner = "Tie!";

    result.textContent = winner + " Wins!";
});
