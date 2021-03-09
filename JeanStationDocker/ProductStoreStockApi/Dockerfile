#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ProductStoreStockApi/ProductStoreStockApi.csproj", "ProductStoreStockApi/"]
COPY ["BaseModels/BaseModels.csproj", "BaseModels/"]
COPY ["BaseInterfaces/BaseInterfaces.csproj", "BaseInterfaces/"]
COPY ["BaseServices/BaseServices.csproj", "BaseServices/"]
COPY ["BaseRepository/BaseRepository.csproj", "BaseRepository/"]
COPY ["BaseException/BaseExceptions.csproj", "BaseException/"]
RUN dotnet restore "ProductStoreStockApi/ProductStoreStockApi.csproj"
COPY . .
WORKDIR "/src/ProductStoreStockApi"
RUN dotnet build "ProductStoreStockApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProductStoreStockApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductStoreStockApi.dll"]