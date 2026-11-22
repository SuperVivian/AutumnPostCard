import type { Folio } from "../src/profile/folio";
import { profile } from "./autumn";

/*
 * 这个站点的内容在 `profile/autumn.ts`（图库、文案库、明信片册都在那一个文件里）。
 *
 * 这里只列一种语言：访客看不到语言切换。sasshi 原来的 en.ts / zh.ts 留作测试夹具，未被引用时不会打包。
 */
export const folio: Folio = {
  primary: "zh",
  profiles: {
    zh: profile,
  },
};
