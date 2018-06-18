export declare const pinyinlite: any;
export declare class Helper {
    /**
     * 生成用于模糊查询的关键词字段, 长标题勿用
     * @param val 原始字符串
     */
    static genPinyinKeywords(val: string, cartesian?: boolean): any;
    static cartesianProductOf(elements: Array<any>): Array<any>;
}
