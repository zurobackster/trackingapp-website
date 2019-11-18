//Load authority points from session storage
let storedAuthorityPoints = sessionStorage.getItem("authorityPoints");

const MAX_POINTS = 50; //This holds the max number of authority points.

let authorityPoints; //Contains the current number of authority points of the player.

//If authority points stored then assign. If not, assign MAX Points
if (storedAuthorityPoints == null) {
    //No points stored, assign the default max points
    authorityPoints = MAX_POINTS;

} else {
    //points found in storage. assign those foind in the object.
    authorityPoints = JSON.parse(storedAuthorityPoints).points;
}

//on load, print the current authority points with the right styling
displayAuthorityPoints();
let accumulatedPoints = 0;

function accumulateAuthPoint(isAddition, num) {
    //1. show the div.
    document.getElementById("div-button-update").style.display = "inline-block";

    //2. Accumulate.
    if (isAddition) {
        accumulatedPoints += num;

    } else {
        accumulatedPoints -= num;
    }

    //3. Change style according to action (taking damage or gaining health) + print message.
    if (accumulatedPoints < 0) {
        //taking damage.
        document.getElementById("div-button-update").style.backgroundColor = "#e84949";
        document.getElementById("div-button-update").style.color = "#860303";
        document.getElementById("div-button-update").innerHTML = accumulatedPoints;
    } else {
        //gaining authority points.
        document.getElementById("div-button-update").style.backgroundColor = "#61e311";
        document.getElementById("div-button-update").style.color = "#016a01";
        document.getElementById("div-button-update").innerHTML = "+" + accumulatedPoints;
    }
}


/*
This function is triggered by the div button update in order to apply the changes to the authority points.
*/
function applyAuthPointsToScore() {

    //update authority points.
    authorityPoints += accumulatedPoints;

    //Store new points in session storage
    sessionStorage.setItem("authorityPoints", JSON.stringify({
        "points": authorityPoints
    }));

    //2. reset accumulated points.
    accumulatedPoints = 0;

    //3. hide update div.
    document.getElementById("div-button-update").style.display = "none";

    //on command, print the current authority points with the right styling.
    displayAuthorityPoints();

}

/* This function prints the current number of authority points in the div. */
function displayAuthorityPoints() {
    //update styles and print score.
    if (authorityPoints > 25) {
        //Green, Safe Zone
        document.getElementById("main-div-body").style.backgroundColor = "#016a01";
        document.getElementById("authorityPoints").style.color = "#61e311";
    } else if (authorityPoints > 11) {
        //Orange, Warning Zone
        document.getElementById("main-div-body").style.backgroundColor = "#dd9208";
        document.getElementById("authorityPoints").style.color = "#f7e259";
    } else {
        //Red, Danger Zone
        document.getElementById("main-div-body").style.backgroundColor = "#860303";
        document.getElementById("authorityPoints").style.color = "#e84949";
    }
    document.getElementById("authorityPoints").innerHTML = authorityPoints;
}

/*
This function is called when a new game is required.
*/
function newGame() {
    var result = confirm("Your Authority Points will be reset");
    if (result) {
        resetGame();
    }    
}

/*

*/
function resetGame() {
    //Clear session storage (to remove the stored authority points)
    sessionStorage.clear();

    //reload the page.
    location.reload();
}
