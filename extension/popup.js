document.getElementById('addBlock').onclick = async () => {
  const site = document.getElementById('blockInput').value;
  await fetch('http://localhost:5000/api/preferences/block', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site })
  });
  document.getElementById('blockInput').value = '';
  loadBlockList();
};

async function loadBlockList() {
  const res = await fetch('http://localhost:5000/api/preferences');
  const data = await res.json();
  const list = document.getElementById('blockList');
  list.innerHTML = '';
  data.blockList.forEach(site => {
    const li = document.createElement('li');
    li.textContent = site;
    list.appendChild(li);
  });
}

window.onload = loadBlockList;