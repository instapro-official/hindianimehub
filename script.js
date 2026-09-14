// Default sample anime list
let defaultAnimeList = [
    {
        title: "Naruto Shippuden",
        episode: "Episode 1",
        category: "Hindi Dub | Sub",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        title: "One Piece",
        episode: "Episode 1",
        category: "Hindi Dub",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
];

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
const modalEpisodeInfo = document.getElementById('modalEpisodeInfo');

// Render Anime Function
function renderAnime(list) {
    animeGrid.innerHTML = "";
    list.forEach((anime, originalIndex) => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        
        card.innerHTML = `
            <button class="card-delete-btn" onclick="event.stopPropagation(); deleteAnime(${originalIndex})" title="Delete Anime" style="position: absolute; top: 5px; right: 5px; background: rgba(255,0,0,0.8); color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; z-index: 10; font-size: 11px;">
                <i class="fa-solid fa-trash"></i>
            </button>
            <div class="card-img">
                <img src="${anime.image}" alt="${anime.title}">
                <span class="episode-badge">${anime.episode}</span>
            </div>
            <div class="card-info">
                <h4>${anime.title}</h4>
                <p>${anime.category}</p>
            </div>
        `;
        
        // Click to play video
        card.addEventListener('click', () => {
            modalAnimeTitle.innerText = anime.title;
            modalEpisodeInfo.innerText = anime.episode + " • " + anime.category;
            animeVideoPlayer.src = anime.videoUrl;
            videoModal.style.display = 'flex';
            animeVideoPlayer.play();
        });
        
        animeGrid.appendChild(card);
    });
}

// Delete Anime Function
function deleteAnime(index) {
    if (confirm("Kya aap sach mein is anime ko delete karna chahte hain?")) {
        savedAnime.splice(index, 1);
        localStorage.setItem('animeHindiGharList', JSON.stringify(savedAnime));
        renderAnime(savedAnime);
    }
}

// Initial load
renderAnime(savedAnime);

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = savedAnime.filter(a => a.title.toLowerCase().includes(term) || a.category.toLowerCase().includes(term) || a.episode.toLowerCase().includes(term));
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

// Handle Admin Form Submit & Gallery Image Base64 Conversion
animeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('animeTitleInput').value;
    const episode = document.getElementById('animeEpisodeInput').value;
    const category = document.getElementById('animeCategoryInput').value;
    const videoUrl = document.getElementById('animeVideoInput').value;
    const imageFile = document.getElementById('animeImageInput').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            const base64Image = uploadEvent.target.result;
            
            const newAnime = {
                title: title,
                episode: episode,
                category: category,
                image: base64Image,
                videoUrl: videoUrl
            };

            savedAnime.unshift(newAnime);
            localStorage.setItem('animeHindiGharList', JSON.stringify(savedAnime));
            
            renderAnime(savedAnime);
            adminModal.style.display = 'none';
            animeForm.reset();
            alert("Anime & Episode successfully upload ho gaya!");
        };
        reader.readAsDataURL(imageFile);
    }
});
