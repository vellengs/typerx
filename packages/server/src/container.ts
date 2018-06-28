import { Appearance } from "./types/appearance";

export class ContainerService {
    private static appearances: {
        [k: string]: Appearance
    } = {};

    public static getAppearance(name: string): Appearance {
        return ContainerService.appearances[name];
    }

    public registerAppearance(name: string, appearance: Appearance) {
        ContainerService.appearances[name] = appearance;
    }

}