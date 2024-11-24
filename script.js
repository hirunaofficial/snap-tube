document.getElementById('downloadBtn').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        displayThumbnail(thumbnailUrl);
    } else {
        alert('Invalid YouTube URL');
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
}

function displayThumbnail(url) {
    const thumbnailDisplay = document.getElementById('thumbnailDisplay');
    thumbnailDisplay.innerHTML = `<img src="${url}" alt="YouTube Thumbnail">`;
}
