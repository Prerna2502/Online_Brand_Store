USE [master]
GO
/****** Object:  Database [JeanStation_UserService]    Script Date: 3/8/2021 1:16:21 AM ******/
CREATE DATABASE [JeanStation_UserService]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'JeanStation_UserService', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\JeanStation_UserService.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'JeanStation_UserService_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\JeanStation_UserService_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [JeanStation_UserService] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [JeanStation_UserService].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [JeanStation_UserService] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET ARITHABORT OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [JeanStation_UserService] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [JeanStation_UserService] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET  ENABLE_BROKER 
GO
ALTER DATABASE [JeanStation_UserService] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [JeanStation_UserService] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [JeanStation_UserService] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET RECOVERY FULL 
GO
ALTER DATABASE [JeanStation_UserService] SET  MULTI_USER 
GO
ALTER DATABASE [JeanStation_UserService] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [JeanStation_UserService] SET DB_CHAINING OFF 
GO
ALTER DATABASE [JeanStation_UserService] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [JeanStation_UserService] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [JeanStation_UserService] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [JeanStation_UserService] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'JeanStation_UserService', N'ON'
GO
ALTER DATABASE [JeanStation_UserService] SET QUERY_STORE = OFF
GO
USE [JeanStation_UserService]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 3/8/2021 1:16:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[CustomerId] [varchar](25) NOT NULL,
	[ProductId] [varchar](25) NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Cart] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC,
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 3/8/2021 1:16:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [varchar](25) NOT NULL,
	[FirstName] [varchar](25) NOT NULL,
	[LastName] [varchar](25) NULL,
	[Email] [varchar](25) NOT NULL,
	[PastOrderCount] [int] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 3/8/2021 1:16:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [varchar](25) NOT NULL,
	[ProductId] [varchar](25) NOT NULL,
	[CustomerId] [varchar](25) NOT NULL,
	[StoreId] [varchar](25) NOT NULL,
	[Address] [nvarchar](max) NULL,
	[Contact] [varchar](12) NULL,
	[Quantity] [int] NOT NULL,
	[OrderStatus] [varchar](25) NOT NULL,
	[OrderDateTime] [datetime] NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Cart] ([CustomerId], [ProductId], [Quantity]) VALUES (N'C0001', N'P0001', 1)
INSERT [dbo].[Cart] ([CustomerId], [ProductId], [Quantity]) VALUES (N'C0001', N'P0005', 1)
INSERT [dbo].[Cart] ([CustomerId], [ProductId], [Quantity]) VALUES (N'C0002', N'P0004', 2)
INSERT [dbo].[Cart] ([CustomerId], [ProductId], [Quantity]) VALUES (N'C0002', N'P0007', 4)
GO
INSERT [dbo].[Customer] ([CustomerID], [FirstName], [LastName], [Email], [PastOrderCount]) VALUES (N'C0001', N'Sini', N'Robin', N'sini@xyz.com', 0)
INSERT [dbo].[Customer] ([CustomerID], [FirstName], [LastName], [Email], [PastOrderCount]) VALUES (N'C0002', N'Prerna', N'Agarwal', N'prerna@xyz', 0)
INSERT [dbo].[Customer] ([CustomerID], [FirstName], [LastName], [Email], [PastOrderCount]) VALUES (N'C0003', N'Harsh', N'Pandey', N'harsh@xyz', 0)
GO
INSERT [dbo].[Orders] ([OrderId], [ProductId], [CustomerId], [StoreId], [Address], [Contact], [Quantity], [OrderStatus], [OrderDateTime]) VALUES (N'P0006C00021', N'P0006', N'C0002', N'S0001', N'badaun,243720', N'9997578881', 1, N'Ordered', CAST(N'2021-03-08T01:14:07.897' AS DateTime))
INSERT [dbo].[Orders] ([OrderId], [ProductId], [CustomerId], [StoreId], [Address], [Contact], [Quantity], [OrderStatus], [OrderDateTime]) VALUES (N'P0008C00011', N'P0008', N'C0001', N'S0001', N'Bisauli', N'9997778880', 1, N'Ordered', CAST(N'2021-03-08T00:57:11.543' AS DateTime))
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Customer__A9D10534170F55F0]    Script Date: 3/8/2021 1:16:21 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ__Customer__A9D10534170F55F0] ON [dbo].[Customer]
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Customer] ADD  DEFAULT ((0)) FOR [PastOrderCount]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [OrderDateTime]
GO
USE [master]
GO
ALTER DATABASE [JeanStation_UserService] SET  READ_WRITE 
GO
