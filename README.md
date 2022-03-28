# mat-alg-handin2

To see the generator in action:
https://truthtable.danielgron.dk/

Implemented using Angular / TypeScript

The relevant parts of the code with comments are found in ng-truthtable-generator/src/app/truthtable/truthtable.component.ts


Can be run with:
docker /docker-compose (Requires Docker and docker-compose)
docker-compose up -d
Go to localhost:80

Angular CLI
Requires node, Angular CLI
from /ng-truthtable-generator:
ng serve
Go to localhost:4200

Or just go to:
https://truthtable.danielgron.dk/


_______

# Using the laws of equivalence provide 10 examples of simplifying statements using the laws.



(P∧Q)∨(P∧¬Q) = P∧(Q~Q) = P

(P∧R) ∧ (~ P∧R) = R∧ (P ∧ ~P)

(P ∧ R) ∧ (P ∧ R) = P ∧ R

(P ∧ R) ∨ (P ∧ R) = P ∨ R

((P∧Q) ∧ R) ∧ P = (P∧Q) ∧ R)

T ∧ (P ∧ R) ∨ ~(P ∧ R) = P ∧ R

P ∧ (R ∧ ~R) = P

~(P ∧ Q) ∨ P = ~P ∨ ~Q ∨ P = ~Q

~ (~P ∧ ~Q) = ~(~(P ∨ Q)) = P ∨ Q

~(~P ∨ P) ∧ R = R