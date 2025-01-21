```mermaid
---
title: Term ERD
---
erDiagram
    TERM }o--o{ DEFINITION : lists
    TERM {
        int Term_ID PK
        string Term_name
        int Term_levelStart
        int Term_levelEnd
        enum Term_perspective
        int Term_Definition FK
    }
    DEFINITION ||--|| TERM : has
    DEFINITION{
        int Definition_ID PK
        int Definition_component FK
    }
```

Een curriculum is een ontwerp van een Opleiding, Samengesteld door een onderwijsvertegenwoordiger, Waarvan de subOnderwijsontwerpen staan in een Cursusontwerp-volgorde, Gericht op de realisatie van één of meerdere Eindkwalificatie, Met één of meerdere Opleidingstoelatingseisen, Waarvan de samenstelling is onderbouwd door één of meerdere Leerlijn of
