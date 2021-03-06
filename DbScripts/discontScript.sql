USE [master]
GO
/****** Object:  Database [OrderDiscountDb]    Script Date: 3/7/2021 11:03:59 PM ******/
CREATE DATABASE [OrderDiscountDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'OrderDiscountDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\OrderDiscountDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'OrderDiscountDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\OrderDiscountDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [OrderDiscountDb] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [OrderDiscountDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [OrderDiscountDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [OrderDiscountDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [OrderDiscountDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [OrderDiscountDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [OrderDiscountDb] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [OrderDiscountDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET RECOVERY FULL 
GO
ALTER DATABASE [OrderDiscountDb] SET  MULTI_USER 
GO
ALTER DATABASE [OrderDiscountDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [OrderDiscountDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [OrderDiscountDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [OrderDiscountDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [OrderDiscountDb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [OrderDiscountDb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'OrderDiscountDb', N'ON'
GO
ALTER DATABASE [OrderDiscountDb] SET QUERY_STORE = OFF
GO
USE [OrderDiscountDb]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 3/7/2021 11:03:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discount](
	[MinimumOrderAmount] [decimal](12, 2) NOT NULL,
	[MinimumPastOrder] [int] NULL,
	[DiscountPercent] [decimal](6, 2) NOT NULL,
 CONSTRAINT [PK__Discount__F4E54C0C028EBF40] PRIMARY KEY CLUSTERED 
(
	[MinimumOrderAmount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Discount] ([MinimumOrderAmount], [MinimumPastOrder], [DiscountPercent]) VALUES (CAST(2000.00 AS Decimal(12, 2)), 0, CAST(5.00 AS Decimal(6, 2)))
INSERT [dbo].[Discount] ([MinimumOrderAmount], [MinimumPastOrder], [DiscountPercent]) VALUES (CAST(5000.00 AS Decimal(12, 2)), 0, CAST(10.00 AS Decimal(6, 2)))
INSERT [dbo].[Discount] ([MinimumOrderAmount], [MinimumPastOrder], [DiscountPercent]) VALUES (CAST(10000.00 AS Decimal(12, 2)), 0, CAST(20.00 AS Decimal(6, 2)))
INSERT [dbo].[Discount] ([MinimumOrderAmount], [MinimumPastOrder], [DiscountPercent]) VALUES (CAST(15000.00 AS Decimal(12, 2)), 0, CAST(30.00 AS Decimal(6, 2)))
INSERT [dbo].[Discount] ([MinimumOrderAmount], [MinimumPastOrder], [DiscountPercent]) VALUES (CAST(20000.00 AS Decimal(12, 2)), 0, CAST(50.00 AS Decimal(6, 2)))
GO
ALTER TABLE [dbo].[Discount] ADD  DEFAULT ((0)) FOR [MinimumPastOrder]
GO
USE [master]
GO
ALTER DATABASE [OrderDiscountDb] SET  READ_WRITE 
GO
