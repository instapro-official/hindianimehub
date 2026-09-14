// Sample 50+ Anime Default Data taaki page khulte hi dher saare anime scroll karne ko milein
let defaultAnimeList = [];
for (let i = 1; i <= 55; i++) {
    defaultAnimeList.push({
        title: `Anime Series ${i}`,
        category: "Hindi Dub | Sub",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Test video
    });
}

// LocalStorage se saved anime load karna
let savedAnime = JSON.parse(localStorage.getItem('animeHindiGharList')) || defaultAnimeList;

const animeGrid = document.getElementById('animeGrid');
const searchInput = document.getElementById('searchInput');
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const closeModal = document.getElementById('closeModal');
const animeForm = document.getElementById('animeForm');

const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const animeVideoPlayer = document.getElementById('animeVideoPlayer');
const modalAnimeTitle = document.getElementById('modalAnimeTitle');

// Render Anime Function
function renderAnime(list) {
    animeGrid.innerHTML = "";
    list.forEach((anime, index) => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <div class="card-img">
                <img src="${anime.image}" alt="${anime.title}">
            </div>
            <div class="card-info">
                <h4>${anime.title}</h4>
                <p>${anime.category}</p>
            </div>
        `;
        // Click karne par video play hoga
        card.addEventListener('click', () => {
            modalAnimeTitle.innerText = anime.title;
            animeVideoPlayer.src = anime.videoUrl;
            videoModal.style.display = 'flex';
            animeVideoPlayer.play();
        });
        animeGrid.appendChild(card);
    });
}

// Initial load
renderAnime(savedAnime);

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = savedAnime.filter(a => a.title.toLowerCase().includes(term) || a.category.toLowerCase().includes(term));
    renderAnime(filtered);
});

// Admin Modal Open/Close
adminBtn.addEventListener('click', () => {
    adminModal.style.display = 'flex';
});
closeModal.addEventListener('click', () => {
    adminModal.style.display = 'none';
});

// Video Modal Close
closeVideoModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    animeVideoPlayer.pause();
    animeVideoPlayer.src = "";
});

// Handle Admin Form Submit & Gallery Permanent Image (Base64) Conversion
animeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('animeTitleInput').value;
    const category = document.getElementById('animeCategoryInput').value;
    const videoUrl = document.getElementById('animeVideoInput').value;
    const imageFile = document.getElementById('animeImageInput').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            const base64Image = uploadEvent.target.result; // Ye kabhi expire nahi hoga
            
            const newAnime = {
                title: title,
                category: category,
                image: base64Image,
                videoUrl: videoUrl
            };

            savedAnime.unshift(newAnime); // Naya anime sabse upar add hoga
            localStorage.setItem('animeHindiGharList', JSON.stringify(savedAnime));
            
            renderAnime(savedAnime);
            adminModal.style.display = 'none';
            animeForm.reset();
            alert("Anime successfully upload ho gaya!");
        };
        reader.readAsDataURL(imageFile);
    }
});
