let age = 16;
let rating = 50;
let position = "";
let nationalTeam = "";
let trainCount = 0;
let academicsCount = 0;
let totalGoals = 0;
let totalAssists = 0;
let totalCleanSheets = 0;
let totalAppearances = 0;
let totalTrophies = 0;
const maxCount = 5;
const maxAppearances = 70;
const maxTrophiesPerYear = 3;

function startGame() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
}

function choice1() {
    if (!position) {
        alert("Please choose a position first.");
        return;
    }

    if (nationalTeam === "") {
        alert("Please select your national team first.");
        return;
    }

    const clubs = ["Manchester United", "Manchester City", "Liverpool", "Eibar FC", "AL Nassr", "Benfica", "Ajax", "Chelsea", "Arsenal"];
    const clubChoice = clubs[Math.floor(Math.random() * clubs.length)];
    document.getElementById("club-info").textContent = `You joined ${clubChoice}`;
    rating += Math.floor(Math.random() * 16) - 5;
    rating = Math.max(40, Math.min(99, rating));
    document.getElementById("story-text").textContent = `Your current rating is ${rating}. What do you do next?`;
    updateAge();
    trainCount = 0;
    academicsCount = 0;

    // Simulate performance based on position
    let goals, assists, cleanSheets;
    switch (position) {
        case "Striker":
            goals = Math.floor(Math.random() * 61);
            assists = Math.floor(Math.random() * 21);
            cleanSheets = "NA";
            break;
        case "Midfielder":
            goals = Math.floor(Math.random() * 21);
            assists = Math.floor(Math.random() * 31);
            cleanSheets = "NA";
            break;
        case "Defender":
            goals = Math.floor(Math.random() * 11);
            assists = Math.floor(Math.random() * 16);
            cleanSheets = Math.floor(Math.random() * 26);
            break;
        case "Goalkeeper":
            goals = Math.floor(Math.random() * 3);
            assists = Math.floor(Math.random() * 4);
            cleanSheets = Math.floor(Math.random() * 31);
            break;
        default:
            break;
    }

    totalGoals += goals;
    totalAssists += assists;
    if (Number.isInteger(cleanSheets)) {
        totalCleanSheets += cleanSheets;
    }

    const appearances = Math.min(Math.floor(Math.random() * (maxAppearances + 1)), maxAppearances);
    totalAppearances += appearances;

    const trophyCount = Math.floor(Math.random() * (maxTrophiesPerYear + 1));
    totalTrophies += trophyCount;

    // Update stats table
    const statsTable = document.getElementById("stats-table").getElementsByTagName('tbody')[0];
    const newRow = statsTable.insertRow();
    newRow.innerHTML = `<td>${goals}</td><td>${assists}</td><td>${cleanSheets}</td><td>${appearances}</td><td>${trophyCount}</td><td>${Math.floor(Math.random() * 11)}</td><td>${Math.floor(Math.random() * 6)}</td><td>${Math.floor(Math.random() * 8)}</td><td>${Math.floor(Math.random() * 5) + 11}</td>`;

    if (age >= 36) {
        endCareer();
    }
    if (Math.random() < 0.1) {
        rating -= 7;
        rating = Math.max(40, rating);
        alert("You got injured while training! Your rating decreased by 7.");
    }
    checkHallOfFame();  // Check Hall of Fame after each choice
    updateRank();
    updateValue();
    updateSponsor();
    displayPlayerInfo();
    checkHallOfFame();
}

function choice2() {
    if (!position) {
        alert("Please choose a position first.");
        return;
    }

    if (trainCount < maxCount) {
        document.getElementById("club-info").textContent = "";
        rating += Math.floor(Math.random() * 8) - 5;
        rating = Math.max(40, Math.min(99, rating));
        document.getElementById("story-text").textContent = `You train alone to improve skills. Your current rating is ${rating}. What do you do next?`;
        trainCount++;
    } else {
        alert("You've reached the maximum number of trainings before joining a club.");
    }

    if (Math.random() < 0.1) {
        rating -= 7;
        rating = Math.max(40, rating);
        alert("You got injured while training! Your rating decreased by 7.");
    }

    checkHallOfFame();  // Check Hall of Fame after each choice
    updateRank();
    updateValue();
    updateSponsor();
    displayPlayerInfo();
    checkHallOfFame();
}

function choice3() {
    if (!position) {
        alert("Please choose a position first.");
        return;
    }

    if (age < 30) {
        if (academicsCount < maxCount) {
            document.getElementById("club-info").textContent = "";
            rating += Math.floor(Math.random() * 6) - 5;
            rating = Math.max(40, Math.min(99, rating));
            document.getElementById("story-text").textContent = `You focus on personal life for now. Your current rating is ${rating}. What do you do next?`;
            academicsCount++;
        } else {
            alert("You've reached the maximum number of personal relations before joining a club.");
        }
    } else {
        document.getElementById("story-text").textContent = "You are too old to focus on personal relations. What do you do next?";
    }

    checkHallOfFame();  // Check Hall of Fame after each choice
    updateRank();
    updateValue();
    updateSponsor();
    displayPlayerInfo();
    checkHallOfFame();
}

function updateAge() {
    age++;
    document.getElementById("age").textContent = `Age: ${age}`;
    if (age % 5 === 0) {
        alert(`Congratulations! You are now ${age} years old.`);
    }
}

function setPosition(selectedPosition) {
    if (!position) {
        position = selectedPosition;
        alert(`You chose ${selectedPosition}.`);
        const positionButtons = document.getElementById("position-selection").getElementsByTagName("button");
        for (let i = 0; i < positionButtons.length; i++) {
            positionButtons[i].disabled = true;
            if (positionButtons[i].textContent === selectedPosition) {
                positionButtons[i].classList.add("selected");
            }
        }
    } else {
        alert("You've already chosen a position.");
    }
}

function selectCountry(selectedCountry) {
    if (!nationalTeam) {
        nationalTeam = selectedCountry;
        alert(`You selected to represent ${selectedCountry}.`);
        const countryButtons = document.getElementById("country-selection").getElementsByTagName("button");
        for (let i = 0; i < countryButtons.length; i++) {
            countryButtons[i].disabled = true;
            if (countryButtons[i].textContent === selectedCountry) {
                countryButtons[i].classList.add("selected");
            }
        }
    } else {
        alert("You've already selected a country.");
    }
}


function endCareer() {
    alert("Your soccer career has ended.");
    alert(`Career Summary:\nTotal Goals: ${totalGoals}\nTotal Assists: ${totalAssists}\nTotal Clean Sheets: ${totalCleanSheets}\nTotal Appearances: ${totalAppearances}\nTotal Trophies: ${totalTrophies}`);
    reset();
}

function checkHallOfFame() {
    if (!position || !nationalTeam) {
        return;
    }

    const hofButton = document.getElementsByClassName("hall-of-fame-btn")[0];
    if ((position === "Striker" || position === "Midfielder") && ((totalGoals >= 300 && totalAssists >= 100) || (totalGoals >= 100 && totalAssists >= 300))) {
        hofButton.style.backgroundColor = "green";
    } else if ((position === "Defender" || position === "Goalkeeper") && totalCleanSheets >= 200) {
        hofButton.style.backgroundColor = "green";
    } else {
        hofButton.style.backgroundColor = "red";
    }
}
function updateRank() {
    let rank;
    if (rating >= 90) {
        rank = "Legend";
    } else if (rating >= 80) {
        rank = "Star";
    } else if (rating >= 70) {
        rank = "Professional";
    } else if (rating >= 60) {
        rank = "Semi-Pro";
    } else {
        rank = "Amateur";
    }
    document.getElementById("rank").textContent = `Rank: ${rank}`;
}

function updateSponsor() {
    let sponsor;
    const rank = document.getElementById("rank").textContent.split(": ")[1];
    switch (rank) {
        case "Legend":
            sponsor = "Global Brand";
            break;
        case "Star":
            sponsor = "International Corporation";
            break;
        case "Professional":
            sponsor = "National Company";
            break;
        case "Semi-Pro":
            sponsor = "Local Business";
        break;
        default:
            sponsor = "No Sponsor";
            break;
    }
    document.getElementById("sponsor").textContent = `Sponsor: ${sponsor}`;
}
function updateValue() {
    const value = Math.round(rating * 1000000 * 1.1); // Calculate the value
    document.getElementById("value").textContent = `Value: $${value.toLocaleString()}`; // Update the HTML element
}


function reset() {
    age = 16;
    rating = 50;
    document.getElementById("club-info").textContent = "";
    document.getElementById("story-text").textContent = "Welcome to the Soccer Adventure Game! You are a 16-year-old aspiring soccer player. What do you do?";
    position = "";
    nationalTeam = "";
    const positionButtons = document.getElementById("position-selection").getElementsByTagName("button");
    for (let i = 0; i < positionButtons.length; i++) {
        positionButtons[i].disabled = false;
    }
    const countryButtons = document.getElementById("country-selection").getElementsByTagName("button");
    for (let i = 0; i < countryButtons.length; i++) {
        countryButtons[i].disabled = false;
    }
    trainCount = 0;
    academicsCount = 0;
    totalGoals = 0;
    totalAssists = 0;
    totalCleanSheets = 0;
    totalAppearances = 0;
    totalTrophies = 0;
    const statsTableBody = document.getElementById("stats-table").getElementsByTagName('tbody')[0];
    while (statsTableBody.firstChild) {
        statsTableBody.removeChild(statsTableBody.firstChild);
    }
    checkHallOfFame();  // Check Hall of Fame after resetting
}