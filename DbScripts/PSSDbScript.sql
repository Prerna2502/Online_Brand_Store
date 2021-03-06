USE [master]
GO
/****** Object:  Database [PSSDb]    Script Date: 3/8/2021 12:48:57 AM ******/
CREATE DATABASE [PSSDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PSSDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\PSSDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PSSDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\PSSDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [PSSDb] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PSSDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PSSDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PSSDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PSSDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PSSDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PSSDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [PSSDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PSSDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PSSDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PSSDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PSSDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PSSDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PSSDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PSSDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PSSDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PSSDb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PSSDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PSSDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PSSDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PSSDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PSSDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PSSDb] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [PSSDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PSSDb] SET RECOVERY FULL 
GO
ALTER DATABASE [PSSDb] SET  MULTI_USER 
GO
ALTER DATABASE [PSSDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PSSDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PSSDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PSSDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PSSDb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PSSDb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'PSSDb', N'ON'
GO
ALTER DATABASE [PSSDb] SET QUERY_STORE = OFF
GO
USE [PSSDb]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 3/8/2021 12:48:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [varchar](25) NOT NULL,
	[ProductName] [varchar](25) NOT NULL,
	[ProductPrice] [decimal](12, 2) NOT NULL,
	[ProductType] [varchar](25) NULL,
	[ProductImage] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
	[Gender] [varchar](1) NULL,
	[FilterTag] [varchar](max) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stocks]    Script Date: 3/8/2021 12:48:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stocks](
	[StoreId] [varchar](25) NOT NULL,
	[ProductId] [varchar](25) NOT NULL,
	[Quantity] [int] NULL,
 CONSTRAINT [PK__Stocks__F0C23D6D27C81DE9] PRIMARY KEY CLUSTERED 
(
	[StoreId] ASC,
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stores]    Script Date: 3/8/2021 12:48:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stores](
	[StoreId] [varchar](25) NOT NULL,
	[Location] [varchar](500) NOT NULL,
	[Manager] [varchar](200) NOT NULL,
	[Contact] [varchar](10) NOT NULL,
	[Address] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Stores] PRIMARY KEY CLUSTERED 
(
	[StoreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0001', N'HandBag1', CAST(10000.00 AS Decimal(12, 2)), N'handbag', N'https://ik.imagekit.io/bfrs/tr:w-1500,h-1500,pr-true,cm-pad_resize,bg-FFFFFF/image_damilano/data/LB-4459_CON_QUILTING-1.jpg', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'f', N'brown hand bag zipped handle')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0002', N'SideBag1', CAST(15000.00 AS Decimal(12, 2)), N'sidebag', N'https://ik.imagekit.io/bfrs/tr:w-1500,h-1500,pr-true,cm-pad_resize,bg-FFFFFF/image_damilano/data/LB-2277B_BERRY_QUILTING-1.jpg', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'f', N'maroon chained hand bag zipped handle')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0003', N'Clutch1', CAST(2000.00 AS Decimal(12, 2)), N'clutch', N'https://ik.imagekit.io/bfrs/tr:w-1500,h-1500,pr-true,cm-pad_resize,bg-FFFFFF/image_damilano/data/LW-60007_ROOT_BEER_DMD-1.jpg', N'Lorem ipsum dolorsit,ametconsecteturadipisicing elit. Soluta voluptates odit sunt quae, sit nulla quianondoloresvoluptatibus,sintveritatisreprehenderiteosmollitia!Aut nostrum explicabo fuga natus sunt!', N'f', N'brown clutch bag zipped hand covered ')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0004', N'Clutch2', CAST(5000.00 AS Decimal(12, 2)), N'clutch', N'https://ik.imagekit.io/bfrs/tr:w-1500,h-1500,pr-true,cm-pad_resize,bg-FFFFFF/image_damilano/data/LW-2008C_TOMATO_FISH-1.jpg', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'f', N'red maroon dotted blackdotted covered clutch')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0005', N'Slingbag1', CAST(2000.00 AS Decimal(12, 2)), N'sidebag', N'https://cdn.shopify.com/s/files/1/0416/3049/8971/products/carnaby-01-mens-blue-crossbody_1_720x.jpg?v=1606473922', N'Lorem ipsum dolorsit,ametconsecteturadipisicing elit. Soluta voluptates odit sunt quae, sit nulla quianondoloresvoluptatibus,sintveritatisreprehenderiteosmollitia!Aut nostrum explicabo fuga natus sunt!', N'm', N'blue side sidebag armrest blackhandle')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0006', N'Clutch3', CAST(10000.00 AS Decimal(12, 2)), N'clutch', N'https://cdn.shopify.com/s/files/1/0416/3049/8971/products/juliette-w2-womens-nude-zip-around-wallet_2.jpg?v=1598589496', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'f', N'lightbrown brown white grey sidelace lace')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0007', N'travelbag1', CAST(20000.00 AS Decimal(12, 2)), N'travelbag', N'https://cdn.shopify.com/s/files/1/0416/3049/8971/products/the-ridgeway-03-travel-brown-trolley-bag_2.jpg?v=1598527728', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'm', N'travel bag trolley wheels brown zipped handle')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0008', N'Wallet1', CAST(5000.00 AS Decimal(12, 2)), N'wallet', N'https://cdn.shopify.com/s/files/1/0416/3049/8971/products/2181634-mens-black-card-holder_2.jpg?v=1598437575', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'm', N'purse wallet blue darkblue cardholder card holder male ')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0009', N'BarrelBag1', CAST(20000.00 AS Decimal(12, 2)), N'barrelbag', N'https://cdn.shopify.com/s/files/1/0416/3049/8971/products/grunge-05-travel-black-duffle-bag_3.jpg?v=1598690969', N'Lorem ipsum dolorsit,ametconsecteturadipisicing elit. Soluta voluptates odit sunt quae, sit nulla quianondoloresvoluptatibus,sintveritatisreprehenderiteosmollitia!Aut nostrum explicabo fuga natus sunt!', N'm', N'unisex barrel bag black handle wheels zipped zip male female')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0010', N'GroceryBag1', CAST(2000.00 AS Decimal(12, 2)), N'grocerybag', N'https://library.kissclipart.com/20181218/apw/kissclipart-plastic-icon-transparent-background-clipart-comput-6f2e9bfb1e58fd04.png', N'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptates                 odit sunt quae, sit nulla quia non dolores voluptatibus, sint veritatis reprehenderit eos                 mollitia! Aut nostrum explicabo fuga natus sunt!', N'f', N'shopping grocerybag grocery handy handbag hand bag babypink pinkstrips female')
INSERT [dbo].[Products] ([ProductId], [ProductName], [ProductPrice], [ProductType], [ProductImage], [Description], [Gender], [FilterTag]) VALUES (N'P0011', N'HandBag2', CAST(5000.00 AS Decimal(12, 2)), N'handbag', N'https://i.guim.co.uk/img/media/32a9c0f57500d5bee468ae2053ce3655a62f20ec/0_194_4752_2851/master/4752.jpg?width=700&quality=85&auto=format&fit=max&s=3c9899395c77cda931b5b606307d0284', N'Lorem ipsum dolorsit,ametconsecteturadipisicing elit. Soluta voluptates odit sunt quae, sit nulla quianondoloresvoluptatibus,sintveritatisreprehenderiteosmollitia!Aut nostrum explicabo fuga natus sunt!', N'f', N'Party Handy HandBag Hand Bag Golden Strips Female lightbrown brown')
GO
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0001', 11)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0002', 34)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0003', 13)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0004', 43)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0005', 9)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0006', 32)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0007', 21)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0008', 64)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0009', 42)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0010', 19)
INSERT [dbo].[Stocks] ([StoreId], [ProductId], [Quantity]) VALUES (N'S0001', N'P0011', 55)
GO
INSERT [dbo].[Stores] ([StoreId], [Location], [Manager], [Contact], [Address]) VALUES (N'S0001', N'Chandausi', N'Prerna Agarwal', N'9998881112', N'Street xyz, colony t, home , chandause-222233')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Stocks_ProductId]    Script Date: 3/8/2021 12:48:57 AM ******/
CREATE NONCLUSTERED INDEX [IX_Stocks_ProductId] ON [dbo].[Stocks]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ('other') FOR [ProductType]
GO
ALTER TABLE [dbo].[Stocks] ADD  DEFAULT ((0)) FOR [ProductId]
GO
ALTER TABLE [dbo].[Stocks]  WITH CHECK ADD  CONSTRAINT [FK__Stocks__ProductI__4CA06362] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Stocks] CHECK CONSTRAINT [FK__Stocks__ProductI__4CA06362]
GO
ALTER TABLE [dbo].[Stocks]  WITH CHECK ADD  CONSTRAINT [FK__Stocks__StoreId__4BAC3F29] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([StoreId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Stocks] CHECK CONSTRAINT [FK__Stocks__StoreId__4BAC3F29]
GO
USE [master]
GO
ALTER DATABASE [PSSDb] SET  READ_WRITE 
GO
