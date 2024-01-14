export function getServiceUrl(env?: string) {
    switch (env) {
      case "dev":
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "http://localhost:4000/api/auth",
        };
      case "prod":
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "https://authservice-402805.et.r.appspot.com/api/auth",
        };
      default:
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "https://authservice-402805.et.r.appspot.com/api/auth",
        };
    }

   
}