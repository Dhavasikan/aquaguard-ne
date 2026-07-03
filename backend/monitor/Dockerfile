FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY backend/monitor/.mvn/ .mvn
COPY backend/monitor/mvnw .
COPY backend/monitor/pom.xml .
RUN ./mvnw dependency:go-offline
COPY backend/monitor/src ./src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
