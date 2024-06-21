document.addEventListener('DOMContentLoaded', () => {
    const showCompetencesBtn = document.getElementById('showCompetencesBtn');
    const competencesContainer = document.getElementById('competences');
    const closeCompetencesBtn = competencesContainer.querySelector('.close_btn');
    const competenceGrid = competencesContainer.querySelector('.competence-grid');
    let activeDescriptionDiv = null;

    const competences = [
        { icon: 'assets/html.png', description: 'HTML Description', file: 'work/description/html.txt' },
        { icon: 'assets/css.png', description: 'CSS Description', file: 'work/description/css.txt' },
        { icon: 'assets/js.png', description: 'JavaScript Description', file: 'work/description/js.txt' },
        { icon: 'assets/php.png', description: 'PHP Description', file: 'work/description/php.txt' },
        { icon: 'assets/sql.png', description: 'SQL Description', file: 'work/description/sql.txt' },
        { icon: 'assets/react.png', description: 'React Description', file: 'work/description/react.txt' },
        { icon: 'assets/mongodb.png', description: 'MongoDB Description', file: 'work/description/mongodb.txt' },
    ];

    if (!showCompetencesBtn || !competencesContainer || !closeCompetencesBtn || !competenceGrid) {
        console.error('Un ou plusieurs éléments DOM requis sont manquants.');
        return;
    }

    showCompetencesBtn.addEventListener('click', () => {
        try {
            fetchCompetences();
            competencesContainer.style.display = 'flex';
        } catch (error) {
            console.error('Erreur lors de la tentative d\'affichage des compétences :', error);
        }
    });

    closeCompetencesBtn.addEventListener('click', () => {
        competencesContainer.style.display = 'none';
        if (activeDescriptionDiv) {
            activeDescriptionDiv.remove();
            activeDescriptionDiv = null;
        }
    });

    function fetchCompetences() {
        competenceGrid.innerHTML = '';

        competences.forEach(competence => {
            const competenceDiv = document.createElement('div');
            competenceDiv.classList.add('competence');
            competenceDiv.innerHTML = `
                <img src="${competence.icon}" alt="${competence.description}">
            `;
            competenceDiv.addEventListener('click', () => {
                try {
                    previewFile(competence.file);
                } catch (error) {
                    console.error(`Erreur lors de la tentative de prévisualisation du fichier ${competence.file} :`, error);
                }
            });
            competenceGrid.appendChild(competenceDiv);
        });
    }

    function previewFile(file) {
        if (activeDescriptionDiv) {
            activeDescriptionDiv.remove();
            activeDescriptionDiv = null;
        }

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur réseau: ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.classList.add('description');
                descriptionDiv.innerHTML = `<p>${text.trim()}</p>`;
                competencesContainer.appendChild(descriptionDiv);
                descriptionDiv.style.display = 'block';
                activeDescriptionDiv = descriptionDiv;
            })
            .catch(error => {
                console.error(`Erreur lors du chargement du fichier : ${error.message}`);
                const descriptionDiv = document.createElement('div');
                descriptionDiv.classList.add('description');
                descriptionDiv.innerHTML = `<p>Erreur lors du chargement du fichier: ${error.message}</p>`;
                competencesContainer.appendChild(descriptionDiv);
                descriptionDiv.style.display = 'block';

                activeDescriptionDiv = descriptionDiv;
            });
    }
});