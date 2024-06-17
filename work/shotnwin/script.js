document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container');
    let btn = document.querySelector('.start_btn');
    let showGameBtn = document.querySelector('#showGameBtn');
    let closeGameBtn = document.querySelector('#closeGameBtn');
    let gameContainer = document.querySelector('#gameContainer');
    let scoreContainer = document.querySelector('.score');
    let timeContainer = document.querySelector('.time');
    let bestScoreContainer = document.querySelector('.best_score');
    let isGameRunning = false;
    let rows = 10;
    let cols = 10;
    let targetSize = 80;

    let backgroundAudio;
    let gameInterval;
    let targetInterval;

    showGameBtn.onclick = function() {
        gameContainer.style.display = 'flex';
    }

    closeGameBtn.onclick = function() {
        stopGame();
        gameContainer.style.display = 'none';
    }

    function updateBestScoreDisplay() {
        let bestScore = getCookie('bestScore');
        bestScoreContainer.innerHTML = 'Meilleur Score : ' + (bestScore ? bestScore : 0);
    }

    updateBestScoreDisplay();

    btn.onclick = function () {
        if (isGameRunning) {
            return;
        }

        isGameRunning = true;
        backgroundAudio = new Audio('https://universal-soundbank.com/sounds/5198.mp3');
        backgroundAudio.loop = true;
        backgroundAudio.play();
        let score = 0;
        let time = 30;
        let intervalTime = 1000;

        scoreContainer.innerHTML = 'Score : 0';

        container.innerHTML = '';
        container.style.position = 'relative';

        let cellWidth = container.clientWidth / cols;
        let cellHeight = container.clientHeight / rows;

        function showTarget() {
            let target = document.createElement('img');
            target.id = 'target';
            let randomNumber = Math.floor(Math.random() * 493) + 1;
            target.src = 'work/shotnwin/assets/' + randomNumber + '.png';

            let randomRow, randomCol;
            do {
                randomRow = Math.floor(Math.random() * (rows - 2)) + 1;
                randomCol = Math.floor(Math.random() * cols);
            } while (container.querySelector(`.row-${randomRow}.col-${randomCol}`));

            target.classList.add(`row-${randomRow}`, `col-${randomCol}`);
            target.style.width = targetSize + 'px';
            target.style.height = targetSize + 'px';
            target.style.position = 'absolute';
            target.style.top = randomRow * cellHeight + 'px';
            target.style.left = randomCol * cellWidth + 'px';

            container.appendChild(target);

            setTimeout(function () {
                target.remove();
            }, 2000);

            target.onclick = function () {
                score += 1;
                target.style.display = 'none';
                scoreContainer.innerHTML = 'Score : ' + score;

                let audio = new Audio('https://universal-soundbank.com/sounds/3570.mp3');
                audio.play();

                if (intervalTime > 200) {
                    intervalTime -= 50;
                }

                clearInterval(targetInterval);
                targetInterval = setInterval(showTarget, intervalTime);
            };
        }

        gameInterval = setInterval(function() {
            time -= 1;
            timeContainer.innerHTML = 'Temps : ' + time;

            if (time === 0) {
                endGame(score);
            }
        }, 1000);

        targetInterval = setInterval(showTarget, intervalTime);
    };

    function stopGame() {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        if (backgroundAudio) {
            backgroundAudio.pause();
            backgroundAudio.currentTime = 0;
        }
        container.innerHTML = '';
        isGameRunning = false;
    }

    function endGame(score) {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        container.innerHTML = 'Game over';
        container.style.color = 'white';
        container.style.textAlign = 'center';
        container.style.fontSize = '48px';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.height = '100%';

        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;

        let audio = new Audio('https://universal-soundbank.com/sounds/253.mp3');
        audio.play();

        let bestScore = getCookie('bestScore');
        if (!bestScore || score > bestScore) {
            setCookie('bestScore', score, 365);
            updateBestScoreDisplay();
        }

        isGameRunning = false;
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
