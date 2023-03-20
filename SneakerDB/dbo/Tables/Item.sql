CREATE TABLE [dbo].[Item]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [name] NVARCHAR(50) NOT NULL, 
    [brand] NVARCHAR(50) NOT NULL, 
    [price] INT NOT NULL, 
    [quantity] INT NOT NULL
)
