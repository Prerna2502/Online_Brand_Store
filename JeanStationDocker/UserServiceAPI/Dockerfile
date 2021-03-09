#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["UserServiceAPI/UserServiceAPI.csproj", "UserServiceAPI/"]
COPY ["UserModels/UserModels.csproj", "UserModels/"]
COPY ["UserInterface/UserInterface.csproj", "UserInterface/"]
COPY ["UserService/UserService.csproj", "UserService/"]
COPY ["UserRepository/UserRepository.csproj", "UserRepository/"]
COPY ["UserException/UserException.csproj", "UserException/"]
RUN dotnet restore "UserServiceAPI/UserServiceAPI.csproj"
COPY . .
WORKDIR "/src/UserServiceAPI"
RUN dotnet build "UserServiceAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UserServiceAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UserServiceAPI.dll"]