#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["OrderDiscountApi/OrderDiscountApi.csproj", "OrderDiscountApi/"]
COPY ["OrderDiscountInterfaces/OrderDiscountInterfaces.csproj", "OrderDiscountInterfaces/"]
COPY ["OrderDiscountModels/OrderDiscountModels.csproj", "OrderDiscountModels/"]
COPY ["OrderDiscountRepository/OrderDiscountRepository.csproj", "OrderDiscountRepository/"]
COPY ["OrderDiscountService/OrderDiscountService.csproj", "OrderDiscountService/"]
COPY ["OrderDiscountException/OrderDiscountException.csproj", "OrderDiscountException/"]
RUN dotnet restore "OrderDiscountApi/OrderDiscountApi.csproj"
COPY . .
WORKDIR "/src/OrderDiscountApi"
RUN dotnet build "OrderDiscountApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "OrderDiscountApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OrderDiscountApi.dll"]