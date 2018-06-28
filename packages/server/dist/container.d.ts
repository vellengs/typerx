import { Appearance } from "./types/appearance";
export declare class ContainerService {
    private static appearances;
    static getAppearance(name: string): Appearance;
    static registerAppearance(name: string, appearance: Appearance): void;
}
