document.addEventListener('DOMContentLoaded', () => {
    const showCompetencesPortfolioBtn = document.getElementById('showCompetencesPortfolioBtn');
    const competencesPortfolioContainer = document.getElementById('competences-portfolio');
    const closeCompetencesPortfolioBtn = competencesPortfolioContainer.querySelector('.close_btn');
    const competencePortfolioGrid = competencesPortfolioContainer.querySelector('.competence-grid');
    let activeDescriptionDiv = null;

    const competencesPortfolio = [
        { title: 'Rédiger un Cahier Des Charges', description: 'Rédiger un Cahier Des Charges (CDC) en partant d\'une expression de besoins, afin de cadrer fonctionnellement un projet de solution web dans le respect des réglementations en vigueur et notamment le RGPD.' },
        { title: 'Rédiger des spécifications techniques', description: 'Rédiger des spécifications techniques en analysant un CDC, afin de cadrer techniquement un projet de développement de solution web.' },
        { title: 'Déployer un environnement de travail', description: 'Déployer un environnement de travail en mettant en place les outils de versionnage, de partage et de collaboration/communication nécessaires, afin de cadrer opérationnellement un projet de développement de solution web.' },
        { title: 'Réaliser une maquette', description: 'Réaliser une maquette afin de permettre au client de valider la structure de la solution web en respectant les bonnes pratiques en termes d’ergonomie et d’accessibilité.' },
        { title: 'Identifier les fonctionnalités à développer', description: 'Identifier les fonctionnalités à développer, en modélisant les divers éléments et leurs interconnexions, afin de structurer l\'architecture de la solution web et de Base De Données (BDD).' },
        { title: 'Rédiger une présentation', description: 'Rédiger une présentation pour présenter les choix techniques, les maquettes, et le schéma de la solution web en argumentant les choix faits afin de permettre au client ou au décideur de valider la proposition de solution.' },
        { title: 'Développer le prototype', description: 'Développer le prototype de la solution web afin de présenter l’architecture technique au client.' },
        { title: 'Rédiger le code de la solution', description: 'Rédiger le code de la solution en transcrivant les fonctionnalités du CDC, en respectant les normes d’accessibilité, d’ergonomie, de référencement, et la réglementation en vigueur afin de développer la solution web.' },
        { title: 'Intégrer les différents éléments', description: 'Intégrer les différents éléments de la solution web en fonction des maquettes, en respectant les normes d’accessibilité et d’ergonomie.' }
    ];

    if (!showCompetencesPortfolioBtn || !competencesPortfolioContainer || !closeCompetencesPortfolioBtn || !competencePortfolioGrid) {
        console.error('Un ou plusieurs éléments DOM requis sont manquants.');
        return;
    }

    showCompetencesPortfolioBtn.addEventListener('click', () => {
        try {
            fetchCompetencesPortfolio();
            competencesPortfolioContainer.style.display = 'flex';
        } catch (error) {
            console.error('Erreur lors de la tentative d\'affichage des compétences du portfolio :', error);
        }
    });

    closeCompetencesPortfolioBtn.addEventListener('click', () => {
        competencesPortfolioContainer.style.display = 'none';
        if (activeDescriptionDiv) {
            activeDescriptionDiv.remove();
            activeDescriptionDiv = null;
        }
    });

    function fetchCompetencesPortfolio() {
        competencePortfolioGrid.innerHTML = '';

        competencesPortfolio.forEach(competence => {
            const competenceDiv = document.createElement('div');
            competenceDiv.classList.add('competence');
            competenceDiv.innerHTML = `<p>${competence.title}</p>`;
            competenceDiv.addEventListener('click', () => {
                try {
                    displayCompetenceDescription(competence.description);
                } catch (error) {
                    console.error(`Erreur lors de la tentative d'affichage de la description de la compétence ${competence.title} :`, error);
                }
            });
            competencePortfolioGrid.appendChild(competenceDiv);
        });
    }

    function displayCompetenceDescription(description) {
        if (activeDescriptionDiv) {
            activeDescriptionDiv.remove();
            activeDescriptionDiv = null;
        }

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');
        descriptionDiv.innerHTML = `<p>${description}</p>`;
        competencesPortfolioContainer.appendChild(descriptionDiv);
        descriptionDiv.style.display = 'block';
        activeDescriptionDiv = descriptionDiv;
    }
});