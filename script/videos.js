document.addEventListener('DOMContentLoaded', () => {
    const showVideosBtn = document.getElementById('showVideosBtn');
    const videosContainer = document.getElementById('videosContainer');
    const closeVideosBtn = videosContainer.querySelector('.close_btn');
    const videoGrid = videosContainer.querySelector('.video-grid');
    let activeDescriptionDiv = null;

    const videos = [
        { thumbnail: 'assets/css_generator.png', title: 'css generator', file: 'assets/vidéos/css_generator.webm' },
    ];

    if (!showVideosBtn || !videosContainer || !closeVideosBtn || !videoGrid) {
        console.error('Un ou plusieurs éléments DOM requis sont manquants.');
        return;
    }

    videoGrid.style.display = 'none';

    showVideosBtn.addEventListener('click', () => {
        try {
            fetchVideos();
            videosContainer.style.display = 'flex';
            videoGrid.style.display = 'grid'; 
        } catch (error) {
            console.error('Erreur lors de la tentative d\'affichage des vidéos :', error);
        }
    });

    closeVideosBtn.addEventListener('click', () => {
        videosContainer.style.display = 'none';
        videoGrid.style.display = 'none';
        if (activeDescriptionDiv) {
            activeDescriptionDiv.remove();
            activeDescriptionDiv = null;
        }
    });

    function fetchVideos() {
        videoGrid.innerHTML = '';

        videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('video');
            videoDiv.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <p>${video.title}</p>
            `;
            videoDiv.addEventListener('click', () => {
                try {
                    previewVideo(video.file, video.descriptionFile);
                } catch (error) {
                    console.error(`Erreur lors de la tentative de prévisualisation de la vidéo ${video.file} :`, error);
                }
            });
            videoGrid.appendChild(videoDiv);
        });
    }

    function previewVideo(file, descriptionFile) {
        if (activeDescriptionDiv) {
            activeDescriptionDiv.remove();
            activeDescriptionDiv = null;
        }

        fetch(descriptionFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur réseau: ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                const videoDiv = document.createElement('div');
                videoDiv.classList.add('description');
                videoDiv.innerHTML = `<video controls>
                                        <source src="${file}" type="video/webm">
                                        Votre navigateur ne supporte pas la vidéo.
                                      </video>
                                      <p>${text.trim()}</p>`;
                videosContainer.appendChild(videoDiv);
                videoDiv.style.display = 'block';
                activeDescriptionDiv = videoDiv;
            })
            .catch(error => {
                console.error(`Erreur lors du chargement du fichier : ${error.message}`);
                const videoDiv = document.createElement('div');
                videoDiv.classList.add('description');
                videoDiv.innerHTML = `<video controls>
                                        <source src="${file}" type="video/webm">
                                        Votre navigateur ne supporte pas la vidéo.
                                      </video>
                                      <p>Erreur lors du chargement de la description: ${error.message}</p>`;
                videosContainer.appendChild(videoDiv);
                videoDiv.style.display = 'block';

                activeDescriptionDiv = videoDiv;
            });
    }
});