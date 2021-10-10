(() => {
    let c = document.getElementById("game");
    let canonPosX = 293;
    let canonPosY = 460;
    let canonImg = document.getElementById("canon");
    let pontPosX = 0;
    let pontPosY = 420;
    let pontImg = document.getElementById("pont");
    let seaPosX = 0;
    let seaPosY = 0;
    let seaImg = document.getElementById("sea");
    let boulet = [{ "id": 0, "posX": -20, "posY": -20, "active": 0 }];
    let bouletImg = document.getElementById("boulet");
    let boat = [{ "id": 0, "posX": 20, "posY": 0, "img": "boat1Img", "vitesse": 1, "active": 0 }];
    let boat1Img = document.getElementById("boat1");
    let boat2Img = document.getElementById("boat2");
    let iboat = 1;
    let live = 5;

    let fire1Img = document.getElementById("fire1");

    let gameoverImg = document.getElementById("gameover");
    let loadGameOver = 0;
    let begin = "startscreen";
    let statutCount = 0;
    let start1Img = document.getElementById("start1Img");
    let startscreen = start1Img;
    let score = 0;
    let name = "";
    let highscoreImg = document.getElementById("highscore");


    function collide(bouletPosX, bouletPosY, bouletWidth, bouletLength, boatPosX, boatPosY, boatWidth, boatLength) {
        if (boatPosX > bouletPosX + bouletWidth ||
            boatPosX < bouletPosX - boatWidth ||
            boatPosY > bouletPosY + bouletLength ||
            boatPosY < bouletPosY - boatLength) {
            return false
        } else {
            return true
        }
    }


    function refreshScreen() {
        let ctx = c.getContext("2d");
        if (begin === "ingame") {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(seaImg, seaPosX, seaPosY);
            ctx.drawImage(pontImg, pontPosX, pontPosY);
            ctx.drawImage(canonImg, canonPosX, canonPosY);
            for (let i = 0; i < boat.length; i++) {
                if (boat[i]["active"] < 16) ctx.drawImage(eval(boat[i]["img"]), boat[i]["posX"], boat[i]["posY"]);
            }
            for (let i = 0; i < boulet.length; i++) {
                if (boulet[i]["active"] === 0) ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
            }

            if (live < 1) loadGameOver++;
            ctx.font = '40px serif';
            ctx.fillStyle = "white";
            ctx.fillText(score, 10, 40);
            if (loadGameOver > 15 && loadGameOver < 80) {
                ctx.drawImage(gameoverImg, 0, 0);
                document.getElementById("replay").style.display = "inline";

            }

        }
        if (begin === "startscreen") {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(eval(startscreen), 0, 0);
            statutCount++;
            if (statutCount > 100) {
                statutCount = 0;
                begin = "highscore";
            }
        }

    }


    setInterval(function() {
        if (begin === "ingame") {
            for (let i = 0; i < boulet.length; i++) {
                if (boulet[i]["active"] === 0) {
                    let posY = boulet[i]["posY"];
                    posY = posY - 10;
                    boulet[i]["posY"] = posY;
                }
            }
            for (let i = 0; i < boulet.length; i++) {
                let posY = boulet[i]["posY"];
                let posX = boulet[i]["posX"];
                if (boulet[i]["active"] === 0) {
                    for (let j = 0; j < boat.length; j++) {
                        if (boat[j]["active"] === 0) {
                            let boatPosY = boat[j]["posY"];
                            let boatPosX = boat[j]["posX"];
                            if (collide(posX, posY, 20, 20, boatPosX, boatPosY, 80, 73) === true) {
                                boat[j]["active"] = 3;
                                boulet[i]["active"] = 1;
                                score = score + boat[j]["vitesse"];
                            }
                        }
                    }
                }
            }
            refreshScreen();
        }
    }, 100);


    setInterval(function() {
        if (begin === "ingame") {
            for (let i = 0; i < boat.length; i++) {
                let posY = boat[i]["posY"];
                if (posY <= 347 && boat[i]["active"] === 0) {
                    posY = posY + boat[i]["vitesse"];
                    boat[i]["posY"] = posY;
                    boat[i]["img"] === "boat1Img" ? boat[i]["img"] = "boat2Img" : boat[i]["img"] = "boat1Img";
                }
                if (posY > 347 || boat[i]["active"] > 0) {
                    if (boat[i]["active"] < 3) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 2 && boat[i]["active"] <= 4) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 4 && boat[i]["active"] <= 6) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 6 && boat[i]["active"] <= 8) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 8 && boat[i]["active"] <= 10) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 10 && boat[i]["active"] <= 12) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 12 && boat[i]["active"] <= 14) boat[i]["img"] = "fire1Img";
                    if (boat[i]["active"] > 14 && boat[i]["active"] <= 16) boat[i]["img"] = "fire1Img";
                    boat[i]["active"]++;
                    if (boat[i]["active"] === 1) live--;
                }
            }
        }
        if (begin === "startscreen") {
            statutCount++;
            if (statutCount % 3 === 0) {
                startscreen === "start1Img";
            }
        }
        refreshScreen();

    }, 100);


    setInterval(function() {
        if (begin === "ingame") {
            let posX = rand(560);
            let vitesse = rand(10);
            if (score > 100 && score <= 200) vitesse = rand(11);
            if (score > 200 && score <= 300) vitesse = rand(12);
            if (score > 300 && score <= 400) vitesse = rand(13, 2);
            if (score > 400 && score <= 500) vitesse = rand(14, 2);
            if (score > 500 && score <= 600) vitesse = rand(13, 3);
            if (score > 600 && score <= 700) vitesse = rand(13, 4);
            if (score > 700 && score <= 800) vitesse = rand(12, 5);
            if (score > 800 && score <= 900) vitesse = rand(12, 6);
            if (score > 900 && score <= 1000) vitesse = rand(11, 7);
            if (score > 1000 && score <= 1200) vitesse = rand(11, 8);
            if (score > 1200) vitesse = rand(11, 9);
            boat.push({ "id": iboat, "posX": posX, "posY": 0, "img": "boat1Img", "vitesse": vitesse, "active": 0 });
            iboat++;
            if (score > 800) {
                let posX = rand(560);
                let vitesse = rand(20);
                boat.push({ "id": iboat, "posX": posX, "posY": 0, "img": "boat1Img", "vitesse": vitesse, "active": 0 });
                iboat++;
            }
            if (score > 2500) {
                let posX = rand(560);
                let vitesse = rand(20, 5);
                boat.push({ "id": iboat, "posX": posX, "posY": 0, "img": "boat1Img", "vitesse": vitesse, "active": 0 });
                iboat++;
            }
            refreshScreen();
        }
    }, 1500);


    function fire() {
        if (begin === "ingame") {
            let idBoulet = boulet.length + 1;
            let posX = canonPosX + 22;
            let posY = canonPosY - 20;
            boulet.push({ "id": idBoulet, "posX": posX, "posY": posY, "active": 0 });
            refreshScreen();
        }
    }


    function draw(left, right, up, down) {
        let ctx = c.getContext("2d");

        if ((left === undefined || left === 0) && (right === undefined || right === 0) && (up === undefined || up === 0) && (down === undefined || down === 0)) {
            refreshScreen();
        }
        if (left === 10 && canonPosX > 10) {
            canonPosX -= 10;
            refreshScreen()
        }
        if (right === 10 && canonPosX < 576) {
            canonPosX += 10;
            refreshScreen();
        }
        if (up === 10 && canonPosY > 420) {
            canonPosY -= 10;
            refreshScreen();
        }
        if (down === 10 && canonPosY < 460) {
            canonPosY += 10;
            refreshScreen();
        }
    }


    function writeLetter(letter) {
        if (name.length < 12) {
            name = name + letter.toUpperCase();
        } else alerte("maximum 12 letters");
    }

    function deleteLetter() {
        name = name.substring(0, name.length - 1);
    }

    function validateName() {
        if (name.length === 0) alerte("Please tape some letter to validate your name");
        else {
            loadGameOver = 0;
            begin = "highscore";
            let position = 1;
            let i = 0;
            for (i = 0; i < arrayScore.length; i++) {
                if (arrayScore[i]["score"] > score) position++;
            }
            for (let j = 0; j < arrayScore.length; j++) {
                if (position < arrayScore[j]["position"]) arrayScore[j]["position"] = arrayScore[j]["position"] + 1;
            }
            position++;
            arrayScore.push({ "id": i + 1, "name": name, "score": score, "position": position });
            console.log(arrayScore);
        }
    }



    window.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft" || event.key === "Left") {
            draw(10);
        }
        if (event.key === "ArrowRight" || event.key === "Right") {
            draw(0, 10);
        }
        if (event.key === "ArrowUp" || event.key === "Up") {
            draw(0, 0, 10);
        }
        if (event.key === "ArrowDown" || event.key === "Down") {
            draw(0, 0, 0, 10);
        }
        if (event.key === " ") {
            fire();
        }

    });


    document.getElementById("play").addEventListener("click", (event) => {
        event.preventDefault();
        begin = "ingame";
        draw();
        document.getElementById("play").style.display = "none"
    })

    document.getElementById("replay").addEventListener("click", (event) => {
        event.preventDefault();
        begin = "ingame";
        document.getElementById("replay").style.display = "none";
        boulet = [{ "id": 0, "posX": -20, "posY": -20, "active": 0 }];
        boat = [{ "id": 0, "posX": 20, "posY": 0, "img": "boat1Img", "vitesse": 1, "active": 0 }];
        score = 0;
        loadGameOver = 0;
        live = 5;
        draw();
    })


    setTimeout(function() { refreshScreen(); }, 700);

})();