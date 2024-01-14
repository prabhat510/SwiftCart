import { Injectable } from "@angular/core";
import { getServiceUrl } from "./api.config";

@Injectable({
    providedIn: 'any'
})
export class GlobalUtil {
    getImageSrc(id: string) {
        return getServiceUrl().swiftCartApiEndpoint + '/images/' + id + '.jpg';
    }
}