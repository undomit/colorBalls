//functia primeste ca si parametri n - numarul culorilor si map - distributia bilelor pe culori
groupBalls = function(n, map) {
    //copiem hashMap-ul intr-un array pentru o parcurgere mai usoara
    let a = new Array();
    for (let [key, value] of map) {
        a.push({
            'color': key,
            'freq': value
        })
    }
    //indica posibiitatea gruparii bilelor dupa cerinta
    let possibleToGroup = true;

    //sortam array-ul crescator in functie de aparitii
    a.sort((a, b) => (a.freq > b.freq) ? 1 : -1);
    let ballGroups = new Array();
    //parcurge distributia pe culori si creeaza un array 2D
    //ce memoreaza id-ul grupului si componenta sa: perechi de tipul [culoare, frecventa]
    //completeaza numarul de bile din culoarea curenta cu bile din culoarea imediat urmatoare
    //ce poate umple deficitul 
    for (let i = 0; i < a.length; i++) {
        if (a[i].freq <= n) {
            ballGroups.push(new Array());
            ballGroups[ballGroups.length - 1].push({
                'color': a[i].color,
                'freq': a[i].freq
            });
            if (a[i].freq < n) {
                let remainingToN = n - a[i].freq;
                for (let j = i + 1; j < a.length; j++) {
                    if (a[j].freq >= remainingToN) {
                        ballGroups[ballGroups.length - 1].push({
                            'color': a[j].color,
                            'freq': remainingToN
                        });
                        a[j].freq -= remainingToN;
                        a[i].freq = n;
                        break;
                    }
                }
            }
        } else {
            //daca exista mai multe bile decat "n" de o anumita culoare
            //nu e posibila gruparea dupa cerinte
            return -1;
        }
    }
    return ballGroups;
}

displayGroups = function(ballGroups) {

    $("#content").empty();
    //parcurge fiecare grup in parte 
    //afiseaza n bile in maxim 2 culori
    for (let i = 0; i < ballGroups.length; i++) {
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


$("#go").click(function() {
    //definesc cele maxim 10 culori posibile
    let colors = [
        "red", "green", "blue", "Gold", "black", "pink", "orange", "BlueViolet", "DarkOliveGreen", "DarkSalmon"
    ];
    //definesc un hashMap in care voi stoca numarul bilelor din fiecare culoare
    let colorMap = new Map();

    let n = $('#input').val();
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
    let result = groupBalls(n, colorMap);
    console.log(result);

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

    $("#group").click(() => displayGroups(result));
});