
import { Model, Document, Types, DocumentQuery, Query, Connection } from 'mongoose';
import { pick, PartialDeep, uniq } from 'lodash';
export const pinyinlite = require('pinyinlite');

export class Helper {

    /**
     * 生成用于模糊查询的关键词字段
     * @param val 原始字符串
     */
    static genPinyinKeywords(val: string) {
        if (!val) {
            return [];
        }

        let arrResult = pinyinlite(val).filter((item: any) => {
            return item && item.length > 0;
        });

        const fullResult = Helper.cartesianProductOf(arrResult).map((item: any) => {
            return item.join('');
        });

        const simplifyResult = Helper.cartesianProductOf(arrResult.map((item: any) => {
            return item.map((child: any) => {
                return child.substr(0, 1);
            });
        })).map((item: any) => {
            return item.join('');
        });

        return uniq(fullResult.concat(simplifyResult));
    }

    static cartesianProductOf(elements: Array<any>): Array<any> {
        if (!Array.isArray(elements)) {
            throw new TypeError();
        }

        let end = elements.length - 1, result: Array<any> = [];
        function addTo(curr: any, start: any) {
            var first = elements[start],
                last = (start === end);

            for (var i = 0; i < first.length; ++i) {
                var copy = curr.slice();
                copy.push(first[i]);

                if (last) {
                    result.push(copy);
                } else {
                    addTo(copy, start + 1);
                }
            }
        }

        if (elements.length) {
            addTo([], 0);
        } else {
            result.push([]);
        }
        return result;
    }
}