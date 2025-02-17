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

SET NOCOUNT ON; -- Vermijd overbodige uitvoer

BEGIN TRY
-- Controleer of de tabel al data bevat om dubbele invoer te vermijden
IF NOT EXISTS (SELECT 1 FROM [PERSPECTIVE])
BEGIN
INSERT INTO [PERSPECTIVE] ([Perspective_ID], [Perspective_name])
VALUES
(1, 'Onderwijsontwerp'),
(2, 'Samenstellingonderbouwing'),
(3, 'Doelstelling'),
(4, 'Onderwijsontwerpvolgorde'),
(5, 'Benodigdheid'),
(6, 'Aanbod'),
(7, 'Startperiode'),
(8, 'Toelatingseis'),
(9, 'Uitvoering'),
(10, 'Uitvoerder'),
(11, 'Beoordelaar'),
(12, 'Beoordeling'),
(13, 'Beoordelingscontrole'),
(14, 'Resultaat'),
(15, 'Erkenning'),
(16, 'Resultaatonderbouwing'),
(17, 'Kwaliteitszorgproces'),
(18, 'Kwaliteitskader'),
(19, 'Erkenner'),
(20, 'Kwaliteitszorgbewijs'),
(21, 'Actor'),
(22, 'Samensteller'),
(23, 'Samenstellingskader');
END
ELSE
BEGIN
PRINT 'Data already exists in [PERSPECTIVE], skipping insert.';
END
END TRY
BEGIN CATCH
PRINT 'Error occurred during insert operation.';
IF @@TRANCOUNT > 0 ROLLBACK;
END CATCH;

SET NOCOUNT ON; -- Vermijd overbodige uitvoer

BEGIN TRY
-- Controleer of de tabel al data bevat om dubbele invoer te vermijden
IF NOT EXISTS (SELECT 1 FROM [TERM])
BEGIN
SET IDENTITY_INSERT [TERM] ON;

        INSERT INTO [TERM] ([Term_ID], [Term_name], [Term_levelStart], [Term_levelEnd], [Term_Perspective])
        VALUES
            (1, 'Curriculum', 7, 7, 1),
            (2, 'Leerlijn', 4, 7, 2),
            (3, 'Themalijn', 4, 7, 2),
            (4, 'Eindkwalificatie', 7, 7, 3),
            (5, 'Curriculumcursusprogramma', 7, 7, 4),
            (6, 'Opleiding', 7, 7, 6),
            (7, 'Collegejaar', 7, 7, 7),
            (8, 'Opleidingstoelatingseisen', 7, 7, 8),
            (9, 'Examencommisie', 7, 7, 11),
            (10, 'Examen', 7, 7, 12),
            (11, 'Judicium', 7, 7, 14),
            (12, 'ISAT/RIO (CROHO) opleiding', 7, 7, 18),
            (13, 'Opleidingssamenstellingskader', 7, 7, 23),
            (14, 'Cursusontwerp', 4, 4, 1),
            (15, 'Onderwijsvertegenwoordiger', 7, 7, 22),
            (16, 'Minorontwerp', 6, 6, 1),
            (17, 'Minor', 6, 6, 6),
            (18, 'Minorcursusprogramma', 6, 6, 4),
            (19, 'Minordoelen', 6, 6, 3),
            (20, 'Minortoelatingseisen', 6, 6, 8),
            (21, 'Cursus', 4, 4, 6),
            (22, 'Toetsactiviteitontwerp', 2, 2, 1),
            (23, 'Leeractiviteitontwerp', 2, 2, 1),
            (24, 'Cursusplanning', 4, 4, 4),
            (25, 'Cursusdoelen', 4, 4, 3),
            (26, 'Cursustoelatingseisen', 4, 4, 8),
            (27, 'Toetsmatrijs', 2, 4, 2),
            (28, 'Toetsvraag', 1, 1, 1),
            (35, 'Eenheid van Leeruitkomsten', 4, 4, 1),
            (36, 'New Term', 1, 1, 1),
            (37, 'New Term', 1, 1, 1);

        SET IDENTITY_INSERT [TERM] OFF;
    END
    ELSE
    BEGIN
        PRINT 'Data already exists in [TERM], skipping insert.';
    END

END TRY
BEGIN CATCH
PRINT 'Error occurred during insert operation.';
IF @@TRANCOUNT > 0 ROLLBACK;
END CATCH;

SET NOCOUNT ON; -- Vermijd overbodige uitvoer

BEGIN TRY
-- Controleer of de tabel al data bevat om dubbele invoer te vermijden
IF NOT EXISTS (SELECT 1 FROM [RELATIONSHIPTYPE])
BEGIN
INSERT INTO [RELATIONSHIPTYPE]
([RelationshipType_ID], [RelationshipType_name], [RelationshipType_fromPerspective], [RelationshipType_toPerspective])
VALUES
(1, ', is een samenstelling van één of meerdere', 1, 1),
(2, ', heeft beperkte vrijheidsgraden beschreven in', 1, 23),
(3, ', heeft een kwaliteitsstandaard die wordt gevormd door', 1, 18),
(4, ', is een ontwerp van een', 1, 6),
(5, ', wordt samengesteld door een', 1, 22),
(6, ', waarvan de subOnderwijsontwerpen staan in een', 1, 4),
(7, ', gericht op de realisatie van één of meerdere', 1, 3),
(8, ', met één of meerdere', 1, 8),
(9, 'waarvan de samenstelling is onderbouwd door een', 1, 2);
END
ELSE
BEGIN
PRINT 'Data already exists in [RELATIONSHIPTYPE], skipping insert.';
END
END TRY
BEGIN CATCH
PRINT 'Error occurred during insert operation.';
IF @@TRANCOUNT > 0 ROLLBACK;
END CATCH;

SET NOCOUNT ON; -- Voorkomt onnodige meldingen over het aantal ingevoegde rijen

BEGIN TRY
-- Controleer of er al data in de tabel zit, zodat we dubbele invoer voorkomen
IF NOT EXISTS (SELECT 1 FROM [DEFINITIONTERM])
BEGIN
SET IDENTITY_INSERT [DEFINITIONTERM] ON;

        INSERT INTO [DEFINITIONTERM]
            ([DefinitionTerm_ID], [MainTerm_ID], [subTerm_ID], [Relationshiptype_ID])
        VALUES
            (1, 1, 2, 9), (2, 1, 15, 5), (3, 1, 6, 4), (4, 1, 14, 1),
            (5, 1, 13, 2), (6, 1, 12, 3), (7, 1, 5, 6), (8, 1, 4, 7),
            (9, 1, 8, 8), (10, 16, 15, 5), (11, 16, 17, 4), (12, 16, 14, 1),
            (13, 16, 18, 6), (14, 16, 19, 7), (15, 16, 20, 8), (16, 14, 15, 5),
            (17, 14, 21, 4), (18, 14, 22, 1), (19, 14, 23, 1), (20, 14, 24, 6),
            (21, 14, 25, 7), (22, 14, 26, 8), (23, 14, 27, 9), (24, 1, 3, 9),
            (25, 35, 22, 1), (26, 35, 23, 1), (27, 36, 3, 9), (28, 36, 2, 9),
            (29, 36, 3, 9), (30, 36, 2, 9);

        SET IDENTITY_INSERT [DEFINITIONTERM] OFF;
    END
    ELSE
    BEGIN
        PRINT 'Data already exists in [DEFINITIONTERM], skipping insert.';
    END

END TRY
BEGIN CATCH
PRINT 'Error occurred during insert operation.';
IF @@TRANCOUNT > 0 ROLLBACK;
SET IDENTITY_INSERT [DEFINITIONTERM] OFF; -- Zorg dat het uit blijft na een fout
END CATCH;
