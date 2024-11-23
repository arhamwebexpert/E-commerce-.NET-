# Use the .NET 8 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5091

# Use the .NET 8 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy and restore the project
COPY *.sln ./
COPY E-commerce/*.csproj ./E-commerce/
RUN dotnet restore

# Build and publish the app
COPY . .
WORKDIR /src/E-commerce
RUN dotnet publish -c Release -o /app/publish

# Use the runtime image to host the app
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "E-commerce.dll"]
