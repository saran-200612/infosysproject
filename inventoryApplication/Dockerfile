FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update \
    && apt-get install -y maven \
    && rm -rf /var/lib/apt/lists/* \
    && mvn -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 9191

ENTRYPOINT ["java", "-jar", "app.jar"]
