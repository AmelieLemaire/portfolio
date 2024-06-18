document.addEventListener('DOMContentLoaded', () => {
    const showMiniProjetsBtn = document.getElementById('showMiniProjetsBtn');
    const miniProjetsContainer = document.getElementById('miniProjetsContainer');
    const closeMiniProjetsBtn = document.getElementById('closeMiniProjetsBtn');
    const filePreviewContainer = document.getElementById('filePreviewContainer');
    const closeFilePreviewBtn = document.getElementById('closeFilePreviewBtn');
    const filePreviewDiv = document.querySelector('.file-preview');

    showMiniProjetsBtn.addEventListener('click', () => {
        fetchMiniProjets();
        miniProjetsContainer.style.display = 'flex';
    });

    closeMiniProjetsBtn.addEventListener('click', () => {
        miniProjetsContainer.style.display = 'none';
    });

    closeFilePreviewBtn.addEventListener('click', () => {
        filePreviewContainer.style.display = 'none';
    });

    function fetchMiniProjets() {
        const miniProjets = [
            '../work/les_mini_projets/cinema',
            '../work/les_mini_projets/calendar',
            '../work/les_mini_projets/battleship'
        ];

        const miniProjetsDiv = miniProjetsContainer.querySelector('.mini-projets');
        miniProjetsDiv.innerHTML = '';

        miniProjets.forEach(file => {
            const fileName = file.split('/').pop();
            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file');
            fileDiv.textContent = fileName;
            fileDiv.addEventListener('click', () => {
                previewFile(file);
            });
            miniProjetsDiv.appendChild(fileDiv);
        });
    }

    function previewFile(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                filePreviewDiv.innerHTML = `<pre>${text}</pre>`;
                filePreviewContainer.style.display = 'flex';
            })
            .catch(error => {
                filePreviewDiv.innerHTML = `<p>Erreur lors du chargement du fichier: ${error.message}</p>`;
                filePreviewContainer.style.display = 'flex';
            });
    }
});