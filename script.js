const items = [
    { name: 'Sunaookami Shiroko', rarity: 'Cihuy', color: '#ffd700', image: 'Shiroko.jpg' },
    { name: 'Kuromi Serika', rarity: 'B aj', color: '#c0c0c0', image: 'Serika.jpg' },
    { name: 'Toyomi Kotori', rarity: 'Bruh', color: '#cd7f32', image: 'Toyomi.jpg' },
    { name: 'Shiroko terror', rarity: 'Cihuuuuuyyyyy', color: '#ff1493', image: 'Shiroko terror.jpg' },
    { name: 'Yahaha ampas', rarity: '🫵🗿', color: '#808080', image: 'Ampas.jpg' }
];

const inventory = [];
const gachaSound = new Audio('gacha_sound.mp3'); // Tambahkan file suara gacha

function putar() {
    const animationContainer = document.getElementById('animation-container');
    const animationElement = document.getElementById('animation');
    const resultElement = document.getElementById('result');
    
    resetAnimation(animationElement);
    
    animationContainer.classList.remove('hidden');
    resultElement.style.display = 'none';
    
    document.getElementById('gachaButton').disabled = true;
    
    if (gachaSound) {
        gachaSound.play(); // Mainkan suara gacha jika ada
    }
    
    let animationHTML = '';
    for (let i = 0; i < 50; i++) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        animationHTML += `
            <div class="item-container">
                <img src="${randomItem.image}" alt="${randomItem.name}">
            </div>
        `;
    }
    
    animationElement.innerHTML = animationHTML;
    
    // Mulai animasi
    requestAnimationFrame(() => {
        animationElement.style.transition = 'none';
        animationElement.style.left = '0px';
        requestAnimationFrame(() => {
            animationElement.style.transition = 'left 3s cubic-bezier(0.1, 0.7, 1.0, 0.1)';
            animationElement.style.left = `-${animationElement.scrollWidth - animationContainer.offsetWidth}px`;
        });
    });
    
    setTimeout(showFinalResult, 3000);
}

function resetAnimation(element) {
    element.style.transition = 'none';
    element.style.left = '0px';
    // Trigger a reflow
    element.offsetHeight;
}

function showFinalResult() {
    const animationContainer = document.getElementById('animation-container');
    const animationElement = document.getElementById('animation');
    const resultElement = document.getElementById('result');
    
    resetAnimation(animationElement);
    animationContainer.classList.add('hidden');
    
    const result = items[Math.floor(Math.random() * items.length)];
    resultElement.innerHTML = `
        <div style="text-align: center;">
            <img src="${result.image}" alt="${result.name}" class="result-image">
            <p style="margin-top: 10px; font-weight: bold;">${result.name}</p>
            <p style="color: ${result.color};">${result.rarity}</p>
        </div>
    `;
    resultElement.style.display = 'flex';
    
    // Tambahkan efek muncul untuk gambar hasil
    const resultImage = resultElement.querySelector('.result-image');
    resultImage.style.opacity = '0';
    resultImage.style.transform = 'scale(0.8)';
    setTimeout(() => {
        resultImage.style.transition = 'all 0.5s ease';
        resultImage.style.opacity = '1';
        resultImage.style.transform = 'scale(1)';
    }, 50);
    
    inventory.push(result);
    updateInventory();
    
    document.getElementById('gachaButton').disabled = false;
}

function updateInventory() {
    const inventoryElement = document.getElementById('inventory');
    inventoryElement.innerHTML = '';
    
    const itemCounts = {};
    inventory.forEach(item => {
        if (itemCounts[item.name]) {
            itemCounts[item.name]++;
        } else {
            itemCounts[item.name] = 1;
        }
    });
    
    for (const [itemName, count] of Object.entries(itemCounts)) {
        const item = items.find(i => i.name === itemName);
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <span>x${count}</span>
        `;
        inventoryElement.appendChild(itemElement);
    }
}
