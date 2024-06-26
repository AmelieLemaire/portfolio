document.addEventListener('DOMContentLoaded', () => {
    const showMiniProjetsBtn = document.getElementById('showMiniProjetsBtn');
    const miniProjetsContainer = document.getElementById('miniProjetsContainer');
    const closeMiniProjetsBtn = document.getElementById('closeMiniProjetsBtn');
    const filePreviewContainer = document.getElementById('filePreviewContainer');
    const closeFilePreviewBtn = document.getElementById('closeFilePreviewBtn');
    const filePreviewDiv = document.querySelector('.file-preview');
    const fileInfoDiv = document.querySelector('.file-info');

    if (!showMiniProjetsBtn || !miniProjetsContainer || !closeMiniProjetsBtn || !filePreviewContainer || !closeFilePreviewBtn || !filePreviewDiv || !fileInfoDiv) {
        console.error('Un ou plusieurs éléments DOM requis sont manquants.');
        return;
    }

    showMiniProjetsBtn.addEventListener('click', () => {
        try {
            fetchMiniProjets();
            miniProjetsContainer.style.display = 'flex';
        } catch (error) {
            console.error('Erreur lors de la tentative d\'affichage des mini projets :', error);
        }
    });

    closeMiniProjetsBtn.addEventListener('click', () => {
        miniProjetsContainer.style.display = 'none';
    });

    closeFilePreviewBtn.addEventListener('click', () => {
        filePreviewContainer.style.display = 'none';
    });

    function fetchMiniProjets() {
        const miniProjets = [
            'work/les_mini_projets/cinema.txt',
            'work/les_mini_projets/calendar.txt',
            'work/les_mini_projets/battleship.txt',
            'work/les_mini_projets/pelican.txt'
        ];

        const miniProjetsDiv = miniProjetsContainer.querySelector('.mini-projets');
        if (!miniProjetsDiv) {
            console.error('L\'élément .mini-projets est manquant.');
            return;
        }
        miniProjetsDiv.innerHTML = '';

        miniProjets.forEach(file => {
            const fileName = file.split('/').pop();
            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file');
            fileDiv.textContent = fileName;
            fileDiv.addEventListener('click', () => {
                try {
                    previewFile(file);
                } catch (error) {
                    console.error(`Erreur lors de la tentative de prévisualisation du fichier ${fileName} :`, error);
                }
            });
            miniProjetsDiv.appendChild(fileDiv);
        });
    }

    function previewFile(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur réseau: ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                const [infoText, fileText] = text.split('@_@');
                fileInfoDiv.innerHTML = `<p>${infoText.trim()}</p>`;
                filePreviewDiv.innerHTML = `<pre>${fileText.trim()}</pre>`;
                filePreviewContainer.style.display = 'flex';
            })
            .catch(error => {
                console.error(`Erreur lors du chargement du fichier : ${error.message}`);
                fileInfoDiv.innerHTML = `<p>Erreur lors du chargement du fichier: ${error.message}</p>`;
                filePreviewDiv.innerHTML = '';
                filePreviewContainer.style.display = 'flex';
            });
    }
});