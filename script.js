document.getElementById('downloadBtn').addEventListener('click', function() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        displayThumbnail(thumbnailUrl, videoId);
    } else {
        alert('Invalid YouTube URL');
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
}

function displayThumbnail(url, videoId) {
    const thumbnailDisplay = document.getElementById('thumbnailDisplay');
    thumbnailDisplay.innerHTML = `<img src="${url}" alt="YouTube Thumbnail" id="thumbnailImage" style="cursor: pointer;">`;

    // Add click event listener to the image
    const imgElement = document.getElementById('thumbnailImage');
    imgElement.addEventListener('click', function() {
        downloadImage(url, videoId);
    });
}

function downloadImage(url, videoId) {
    // Use fetch API to download the image and trigger a download
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${videoId}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error downloading the image:', error);
        });
}