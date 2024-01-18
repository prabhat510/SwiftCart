export function getServiceUrl(env?: string) {
    switch (env) {
      case "dev":
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
      case "prod":
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
      default:
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
    }

   
}