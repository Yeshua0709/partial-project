﻿/*
Deployment script for SneakerDB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "SneakerDB"
:setvar DefaultFilePrefix "SneakerDB"
:setvar DefaultDataPath "C:\Users\PC\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"
:setvar DefaultLogPath "C:\Users\PC\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Starting rebuilding table [dbo].[Item]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_Item] (
    [Id]       INT           IDENTITY (1, 1) NOT NULL,
    [name]     NVARCHAR (50) NULL,
    [brand]    NVARCHAR (50) NULL,
    [price]    NVARCHAR (50) NULL,
    [quantity] NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[Item])
    BEGIN
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Item] ON;
        INSERT INTO [dbo].[tmp_ms_xx_Item] ([Id], [name], [brand], [price], [quantity])
        SELECT   [Id],
                 [name],
                 [brand],
                 [price],
                 [quantity]
        FROM     [dbo].[Item]
        ORDER BY [Id] ASC;
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Item] OFF;
    END

DROP TABLE [dbo].[Item];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_Item]', N'Item';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Update complete.';


GO
