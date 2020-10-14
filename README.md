**Algoritmul de repartizare a bilelor in n grupe a cate n bile avand maxim 2 culori per grupa:**

*Primeste ca input:*

  **n**
  **colorMap** (un hashmap ce memoreaza distributia bilelor
                generate pe culori)

*Output:*

  **ballGroups** (un array 2D ce memoreaza componenta fiecarui grup
                  sub forma de obiecte tip
                  {'color': 'culoare',
                   'freq': nr de bile din acea culoare})

**Logica:**

  - transforma hashmap-ul in array
  - sorteaza array-ul crescator dupa numarul de bile (**colorArray**)
  - creeaza array-ul 2D **ballGroups**
  - parcurge colorArray si cand gaseste un nr de bile mai mic sau
    egal cu **n**, creeaza un nou grup (array) in **ballGroups**
  - adauga bilele existente din culoarea gasita sub forma unui obiect
    de tip *{'color': 'culoare', 'freq': numar de bile}*
  - cauta in **colorArray** primul element ce poate completa nr de
    bile pana la **n** in **ballGroups**
  - adauga la grupul curent un nou obiect cu culoarea si nr de bile
    respectiv
  - actualizeaza nr de bile in **colorArray**
  - memoreaza numarul total de bile din grup in variabila **numberOfBalls**
  - la fiecare iteratie daca lungimea array-ului **ballGroups**
    este mai mare decat n sau valoarea **numberOfBalls** este diferita de n, *functia returneaza -1 (nu se poate realiza o grupare dupa cerintele date)**
  - la final, functia *returneaza ballGroups*
