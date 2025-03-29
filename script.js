// Store videos in localStorage
let videos = JSON.parse(localStorage.getItem('videos')) || [];

// DOM Elements
const addVideoForm = document.getElementById('add-video-form');
const videoList = document.getElementById('video-list');
const searchInput = document.getElementById('search-input');
const thumbnailType = document.getElementById('thumbnail-type');
const thumbnailUrl = document.getElementById('video-thumbnail');
const thumbnailFile = document.getElementById('thumbnail-file');

// Handle thumbnail type change
thumbnailType.addEventListener('change', () => {
    if (thumbnailType.value === 'url') {
        thumbnailUrl.style.display = 'block';
        thumbnailFile.style.display = 'none';
        thumbnailUrl.required = true;
        thumbnailFile.required = false;
    } else {
        thumbnailUrl.style.display = 'none';
        thumbnailFile.style.display = 'block';
        thumbnailUrl.required = false;
        thumbnailFile.required = true;
    }
});

// Create video card
function createVideoCard(video, index) {
    const viewCount = formatViews(video.views);
    
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="video-info">
            <h3>${video.title}</h3>
            <p>${video.channel} • ${viewCount} views</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
    `;

    // Add click handler for video display
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) {
            showVideoModal(video.file);
        }
    });

    // Add delete functionality
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        URL.revokeObjectURL(video.file);
        videos.splice(index, 1); // Remove video from array
        localStorage.setItem('videos', JSON.stringify(videos)); // Update localStorage
        renderVideos(); // Re-render the video list
    });

    return card;
}

// Show video in modal
function showVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <video src="${videoUrl}" controls autoplay></video>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Format view numbers
function formatViews(views) {
    if (views >= 1000000) return `${(views/1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views/1000).toFixed(1)}K`;
    return views.toString();
}

// Handle form submission
addVideoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const videoFile = document.getElementById('video-file').files[0];
    const videoURL = URL.createObjectURL(videoFile);
    
    // Handle thumbnail based on selected type
    let thumbnailURL;
    if (thumbnailType.value === 'url') {
        thumbnailURL = thumbnailUrl.value;
    } else {
        const thumbnailFileObj = thumbnailFile.files[0];
        if (thumbnailFileObj) {
            thumbnailURL = URL.createObjectURL(thumbnailFileObj);
        }
    }
    
    const video = {
        file: videoURL,
        thumbnail: thumbnailURL,
        title: document.getElementById('video-title').value,
        channel: document.getElementById('video-channel').value,
        views: parseInt(document.getElementById('video-views').value),
    };

    videos.push(video);
    localStorage.setItem('videos', JSON.stringify(videos));
    renderVideos();
    addVideoForm.reset();
});

// Handle search
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    videoList.innerHTML = '';
    
    videos.forEach((video, index) => {
        if (video.title.toLowerCase().includes(query) || 
            video.channel.toLowerCase().includes(query)) {
            videoList.appendChild(createVideoCard(video, index));
        }
    });
});

// Add a function to render all videos
function renderVideos() {
    videoList.innerHTML = ''; // Clear the current list
    videos.forEach((video, index) => {
        videoList.appendChild(createVideoCard(video, index));
    });
}

// Initial render
renderVideos();