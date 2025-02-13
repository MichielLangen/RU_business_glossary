## Database setup script

Hier onder staat een script om een database te creëren volgens het ERD. Dit script is gegenereerd door Azure Data Studio.

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSPECTIVE](
[Perspective_ID] [int] NOT NULL,
[Perspective_name] [varchar](255) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PERSPECTIVE] ADD PRIMARY KEY CLUSTERED
(
[Perspective_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TERM](
[Term_ID] [int] IDENTITY(1,1) NOT NULL,
[Term_name] [varchar](255) NULL,
[Term_levelStart] [int] NULL,
[Term_levelEnd] [int] NULL,
[Term_Perspective] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TERM] ADD PRIMARY KEY CLUSTERED
(
[Term_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TERM] WITH CHECK ADD FOREIGN KEY([Term_Perspective])
REFERENCES [dbo].[PERSPECTIVE] ([Perspective_ID])
GO

CREATE TABLE [dbo].[RELATIONSHIPTYPE](
[RelationshipType_ID] [int] NOT NULL,
[RelationshipType_name] [varchar](255) NULL,
[RelationshipType_fromPerspective] [int] NULL,
[RelationshipType_toPerspective] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[RELATIONSHIPTYPE] ADD PRIMARY KEY CLUSTERED
(
[RelationshipType_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[RELATIONSHIPTYPE] WITH CHECK ADD FOREIGN KEY([RelationshipType_fromPerspective])
REFERENCES [dbo].[PERSPECTIVE] ([Perspective_ID])
GO
ALTER TABLE [dbo].[RELATIONSHIPTYPE] WITH CHECK ADD FOREIGN KEY([RelationshipType_toPerspective])
REFERENCES [dbo].[PERSPECTIVE] ([Perspective_ID])
GO

CREATE TABLE [dbo].[DEFINITIONTERM](
[DefinitionTerm_ID] [int] IDENTITY(1,1) NOT NULL,
[MainTerm_ID] [int] NULL,
[subTerm_ID] [int] NULL,
[Relationshiptype_ID] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DEFINITIONTERM] ADD PRIMARY KEY CLUSTERED
(
[DefinitionTerm_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DEFINITIONTERM] WITH CHECK ADD FOREIGN KEY([MainTerm_ID])
REFERENCES [dbo].[TERM] ([Term_ID])
GO
ALTER TABLE [dbo].[DEFINITIONTERM] WITH CHECK ADD CONSTRAINT [FK_DEFINITIONTERM_RELATIONSHIPTYPE] FOREIGN KEY([Relationshiptype_ID])
REFERENCES [dbo].[DEFINITIONTERM] ([DefinitionTerm_ID])
GO
ALTER TABLE [dbo].[DEFINITIONTERM] CHECK CONSTRAINT [FK_DEFINITIONTERM_RELATIONSHIPTYPE]
GO
ALTER TABLE [dbo].[DEFINITIONTERM] WITH CHECK ADD CONSTRAINT [FK_DEFINITIONTERM_SUBTERM] FOREIGN KEY([subTerm_ID])
REFERENCES [dbo].[TERM] ([Term_ID])
GO
ALTER TABLE [dbo].[DEFINITIONTERM] CHECK CONSTRAINT [FK_DEFINITIONTERM_SUBTERM]
GO

## Insert script voor data

insert [#tempPERSPECTIVE] ([Perspective_ID],[Perspective_name])
select 1,'Onderwijsontwerp' UNION ALL
select 2,'Samenstellingonderbouwing' UNION ALL
select 3,'Doelstelling' UNION ALL
select 4,'Onderwijsontwerpvolgorde' UNION ALL
select 5,'Benodigdheid' UNION ALL
select 6,'Aanbod' UNION ALL
select 7,'Startperiode' UNION ALL
select 8,'Toelatingseis' UNION ALL
select 9,'Uitvoering' UNION ALL
select 10,'Uitvoerder' UNION ALL
select 11,'Beoordelaar' UNION ALL
select 12,'Beoordeling' UNION ALL
select 13,'Beoordelingscontrole' UNION ALL
select 14,'Resultaat' UNION ALL
select 15,'Erkenning' UNION ALL
select 16,'Resultaatonderbouwing' UNION ALL
select 17,'Kwaliteitszorgproces' UNION ALL
select 18,'Kwaliteitskader' UNION ALL
select 19,'Erkenner' UNION ALL
select 20,'Kwaliteitszorgbewijs' UNION ALL
select 21,'Actor' UNION ALL
select 22,'Samensteller' UNION ALL
select 23,'Samenstellingskader';

set identity_insert [#tempTERM] on;
insert [#tempTERM] ([Term_ID],[Term_name],[Term_levelStart],[Term_levelEnd],[Term_Perspective])
select 1,'Curriculum',7,7,1 UNION ALL
select 2,'Leerlijn',4,7,2 UNION ALL
select 3,'Themalijn',4,7,2 UNION ALL
select 4,'Eindkwalificatie',7,7,3 UNION ALL
select 5,'Curriculumcursusprogramma',7,7,4 UNION ALL
select 6,'Opleiding',7,7,6 UNION ALL
select 7,'Collegejaar',7,7,7 UNION ALL
select 8,'Opleidingstoelatingseisen',7,7,8 UNION ALL
select 9,'Examencommisie',7,7,11 UNION ALL
select 10,'Examen',7,7,12 UNION ALL
select 11,'Judicium',7,7,14 UNION ALL
select 12,'ISAT/RIO (CROHO) opleiding',7,7,18 UNION ALL
select 13,'Opleidingssamenstellingskader',7,7,23 UNION ALL
select 14,'Cursusontwerp',4,4,1 UNION ALL
select 15,'Onderwijsvertegenwoordiger',7,7,22 UNION ALL
select 16,'Minorontwerp',6,6,1 UNION ALL
select 17,'Minor',6,6,6 UNION ALL
select 18,'Minorcursusprogramma',6,6,4 UNION ALL
select 19,'Minordoelen',6,6,3 UNION ALL
select 20,'Minortoelatingseisen',6,6,8 UNION ALL
select 21,'Cursus',4,4,6 UNION ALL
select 22,'Toetsactiviteitontwerp',2,2,1 UNION ALL
select 23,'Leeractiviteitontwerp',2,2,1 UNION ALL
select 24,'Cursusplanning',4,4,4 UNION ALL
select 25,'Cursusdoelen',4,4,3 UNION ALL
select 26,'Cursustoelatingseisen',4,4,8 UNION ALL
select 27,'Toetsmatrijs',2,4,2 UNION ALL
select 28,'Toetsvraag',1,1,1 UNION ALL
select 35,'Eenheid van Leeruitkomsten',4,4,1 UNION ALL
select 36,'New Term',1,1,1 UNION ALL
select 37,'New Term',1,1,1;
set identity_insert [#tempTERM] off;

insert [#tempRELATIONSHIPTYPE] ([RelationshipType_ID],[RelationshipType_name],[RelationshipType_fromPerspective],[RelationshipType_toPerspective])
select 1,', is een samenstelling van één of meerdere',1,1 UNION ALL
select 2,', heeft beperkte vrijheidsgraden beschreven in',1,23 UNION ALL
select 3,', heeft een kwaliteitsstandaard die wordt gevormd door',1,18 UNION ALL
select 4,', is een ontwerp van een',1,6 UNION ALL
select 5,', wordt samengesteld door een',1,22 UNION ALL
select 6,', waarvan de subOnderwijsontwerpen staan in een',1,4 UNION ALL
select 7,', gericht op de realisatie van één of meerdere',1,3 UNION ALL
select 8,', met één of meerdere',1,8 UNION ALL
select 9,'waarvan de samenstelling is onderbouwd door een',1,2;

set identity_insert [#tempDEFINITIONTERM] on;

insert [#tempDEFINITIONTERM] ([DefinitionTerm_ID],[MainTerm_ID],[subTerm_ID],[Relationshiptype_ID])
select 1,1,2,9 UNION ALL
select 2,1,15,5 UNION ALL
select 3,1,6,4 UNION ALL
select 4,1,14,1 UNION ALL
select 5,1,13,2 UNION ALL
select 6,1,12,3 UNION ALL
select 7,1,5,6 UNION ALL
select 8,1,4,7 UNION ALL
select 9,1,8,8 UNION ALL
select 10,16,15,5 UNION ALL
select 11,16,17,4 UNION ALL
select 12,16,14,1 UNION ALL
select 13,16,18,6 UNION ALL
select 14,16,19,7 UNION ALL
select 15,16,20,8 UNION ALL
select 16,14,15,5 UNION ALL
select 17,14,21,4 UNION ALL
select 18,14,22,1 UNION ALL
select 19,14,23,1 UNION ALL
select 20,14,24,6 UNION ALL
select 21,14,25,7 UNION ALL
select 22,14,26,8 UNION ALL
select 23,14,27,9 UNION ALL
select 24,1,3,9 UNION ALL
select 25,35,22,1 UNION ALL
select 26,35,23,1 UNION ALL
select 27,36,3,9 UNION ALL
select 28,36,2,9 UNION ALL
select 29,36,3,9 UNION ALL
select 30,36,2,9;

set identity_insert [#tempDEFINITIONTERM] off;
