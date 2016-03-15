var count = 1;
var array = new Array(10);
var winner = false;
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.effectAllowed = 'copyMove';
}
function drop(ev) {

    var data = ev.dataTransfer.getData("Text");
    var clone = ev.target.appendChild(document.getElementById(data).cloneNode(true));

    //change the id of copied image to know which image was dropped
    if (data == "drag1")
        clone.id = "T" + count;
    else
        clone.id = "R" + count;

    //count the number of drop action.
    count++;

    //changing background color depending on which image is dragged
    if (data == "drag1") {
        ev.target.style.backgroundColor = "rgba(100,160,210,0.7)";
        document.getElementById(data).setAttribute('draggable', false);
        drag1.style.opacity = 0.4;
        document.getElementById("drag2").setAttribute('draggable', true);
        drag2.style.opacity = 1;
    }
    else {
        ev.target.style.backgroundColor = "rgba(240,60,50,0.7)";
        document.getElementById(data).setAttribute('draggable', false);
        drag2.style.opacity = 0.4;
        document.getElementById("drag1").setAttribute('draggable', true);
        drag1.style.opacity = 1;
    }
    //impossible to drop another element again
    document.getElementById(ev.target.id).removeAttribute('ondrop');
    document.getElementById(ev.target.id).removeAttribute('ondragover');

    //impossible to move after drop
    document.getElementById(clone.id).setAttribute('draggable', false);
    ev.preventDefault();

    //put the value to array to identify what image each div has
    array[parseInt(ev.target.id.charAt(3))] = clone.id.charAt(0);

    //check if a player wins or not.
    if (count <= 10) {
        //horizon line check
        if (array[1] == array[2] && array[2] == array[3] && array[1] != undefined)
            win(1);
        else if (array[4] == array[5] && array[5] == array[6] && array[4] != undefined)
            win(4);
        else if (array[7] == array[8] && array[8] == array[9] && array[7] != undefined)
            win(7);
        //vertical line check
        else if (array[1] == array[4] && array[4] == array[7] && array[1] != undefined)
            win(1);
        else if (array[2] == array[5] && array[5] == array[8] && array[2] != undefined)
            win(2);
        else if (array[3] == array[6] && array[6] == array[9] && array[3] != undefined)
            win(3);
        //diagnal line check
        else if (array[1] == array[5] && array[5] == array[9] && array[1] != undefined)
            win(1);
        else if (array[3] == array[5] && array[5] == array[7] && array[3] != undefined)
            win(3);
    }//if all sections are full but no winner
    if (!winner && count == 10) {
        window.alert("Draw");
        document.getElementById("drag1").setAttribute('draggable', false);
        document.getElementById("drag2").setAttribute('draggable', false);
    }

}

function win(no) {
    var lose;
    if (array[no] == "T"){
        for (i = 1; i < 10;i++ ){
            if(array[i]=="R"){
                lose = "div" + i;
                document.getElementById(lose).setAttribute('style',"opacity : 0.5; background-color: rgba(240,60,50,0.3)");
            }
        }
        drag1.style.opacity = 1;
        drag2.style.opacity = 0.1;
        window.alert("Tiger Win!!!!!");
        winner = true;
        document.getElementById("drag1").setAttribute('draggable', false);
        document.getElementById("drag2").setAttribute('draggable', false);
    }        
    else if (array[no] == "R"){
        for (i = 1; i < 10;i++ ){
            if(array[i]=="T"){
                lose = "div" + i;
                document.getElementById(lose).setAttribute('style',"opacity : 0.5; background-color:rgba(100,160,210,0.3)");
            }
        }
        drag1.style.opacity = 0.1;
        drag2.style.opacity = 1;
        window.alert("Rabbit Win!!!!!");
        winner = true;
        document.getElementById("drag1").setAttribute('draggable', false);
        document.getElementById("drag2").setAttribute('draggable', false);
    }
        
}

function restart(){
	// refreshes the page to start a new game
	location.reload();
}
