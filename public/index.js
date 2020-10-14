$("#go").click(function() {
    //definim cele maxim 10 culori posibile
    let colors = [
        "red", "green", "blue", "Gold", "black", "pink", "orange", "BlueViolet", "DarkOliveGreen", "DarkSalmon"
    ];
    //definim un hashMap in care voi stoca numarul bilelor din fiecare culoare
    let colorMap = new Map();
    //citim n
    let n = $('#input').val();
    n = parseInt(n);
    $('#go').attr("disabled", "true");
    $('#input').attr("disabled", "true");

    for (let i = 0; i < n * n; i++) {
        //afisez distributia random a bilelor 
        let ball = document.createElement('div');
        document.getElementById('content').appendChild(ball);
        let randomColor = Math.floor(Math.random() * n);
        $(ball).attr("class", "ball");
        $(ball).css("background-color", colors[randomColor]);
        //memorez numarul bilelor din fiecare culoare
        if (colorMap.has(colors[randomColor])) {
            colorMap.set(colors[randomColor], colorMap.get(colors[randomColor]) + 1);
        } else {
            colorMap.set(colors[randomColor], 1);
        }
    }

    //apelam functia care calculeaza gruparea bilelor
    let result = groupBalls(n, colorMap);
    console.log(result);
    //afisam daca este posibila sau nu gruparea bilelor
    //in caz pozitiv, afisam butonul de grupare
    if (result != -1) {
        $("#possible").html("It is possible!");
        $("#possible").attr("class", "alert alert-success");
        let button = document.createElement('button');
        document.getElementById('buttonContainer').appendChild(button);
        $(button).html('Group balls');
        $(button).attr('id', 'group');
        $(button).attr('class', 'btn btn-success');
    } else {
        $("#possible").html("Not possible...");
        $("#possible").attr("class", "alert alert-danger");
    }
    //Daca este posibil, putem afisa gruparea apeland functia de mai jos
    $("#group").click(() => displayGroups(result, n));
});


//functia care calculeaza gruparea bilelor
//functia primeste ca si parametri n - numarul culorilor si map - distributia bilelor pe culori
groupBalls = function(n, colorMap) {
    //copiem hashMap-ul intr-un array pentru o parcurgere mai usoara
    let colorArray = new Array();
    for (let [key, value] of colorMap) {
        colorArray.push({
            'color': key,
            'freq': value
        });
    }
    //completam array-ul in cazul in care lipseste o culoare
    for (let i = colorMap.size + 1; i <= n; i++) {
        colorArray.push({
            'color': "none",
            'freq': 0
        });
    }
    //sortam array-ul crescator in functie de aparitii
    colorArray.sort((a, b) => (a.freq > b.freq) ? 1 : -1);
    let ballGroups = new Array();
    //parcurge distributia pe culori si creeaza un array 2D
    //ce memoreaza id-ul grupului si componenta sa: perechi de tipul [culoare, frecventa]
    //completeaza numarul de bile din culoarea curenta cu bile din culoarea imediat urmatoare
    //ce poate umple deficitul 
    for (let i = 0; i < colorArray.length; i++) {
        let numberOfBalls = colorArray[i].freq;
        if (colorArray[i].freq <= n) {
            ballGroups.push(new Array());
            ballGroups[ballGroups.length - 1].push({
                'color': colorArray[i].color,
                'freq': colorArray[i].freq
            });
            let remainingToN = n - colorArray[i].freq;
            if (remainingToN > 0) {
                for (let j = i + 1; j < colorArray.length; j++) {
                    if (colorArray[j].freq >= remainingToN) {
                        ballGroups[ballGroups.length - 1].push({
                            'color': colorArray[j].color,
                            'freq': remainingToN
                        });
                        numberOfBalls += remainingToN;
                        colorArray[j].freq -= remainingToN;
                        colorArray[i].freq = n;
                        break;
                    }
                }
            }
        }
        if ((ballGroups.length > n) || (numberOfBalls != n)) {
            return -1;
        }
    }
    return ballGroups;
}


//functia care afiseaza gruparea bilelor
displayGroups = function(ballGroups, n) {

    $("#content").empty();
    //parcurge fiecare grup in parte 
    //afiseaza n bile in maxim 2 culori
    for (let i = 0; i < n; i++) {
        let group = document.createElement('div');
        $(group).css('clear', 'both');
        let title = document.createElement('h3');
        document.getElementById('content').appendChild(group);
        $(title).html('Group ' + (i + 1));
        $(group).attr('id', 'Group' + (i + 1));
        document.getElementById('Group' + (i + 1)).appendChild(title);
        for (element of ballGroups[i]) {
            for (let j = 0; j < element['freq']; j++) {
                let ball = document.createElement('div');
                $(ball).attr('class', 'ball');
                $(ball).css('background-color', element['color']);
                document.getElementById('Group' + (i + 1)).appendChild(ball);
            }
        }
    }
}