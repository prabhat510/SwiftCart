export function getServiceUrl(env?: string) {
    switch (env) {
      case "dev":
        return {
          swiftCartApiEndpoint: "https://swiftcart-production.up.railway.app/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
      case "prod":
        return {
          swiftCartApiEndpoint: "https://swiftcart-production.up.railway.app/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
      default:
        return {
          swiftCartApiEndpoint: "https://swiftcart-production.up.railway.app/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
    }

   
}