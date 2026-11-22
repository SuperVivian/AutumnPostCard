import type { Profile } from "../src/profile/schema";

/*
 * 秋天明信片册 —— 这个站点的全部内容都在这一个文件里。
 *
 *   PHOTOS  图库：11 张秋景，页面内的「换图」选择器从这里挑。
 *   TEXTS   文案库：25 首秋诗 + 9 段名家秋日散文，页面内的「换词」选择器从这里挑。
 *   profile 站点内容：明信片册的默认 11 张（每张 = 一张图 + 一段词）。
 *
 * 想换内容，改这里就行；页面上临时换的图与词存在浏览器 localStorage 里，不动这个文件。
 */

/** 图库的一项。`file` 是相对页面根的路径（不带前导斜杠）。 */
export type PhotoEntry = { id: string; file: string; label: string; alt: string };

/** 文案库的一项。古诗与名家散文都收在这里。 */
export type TextEntry = { id: string; kind: "poem" | "prose"; title: string; author: string; body: string };

export const PHOTOS: readonly PhotoEntry[] = [
  { id: "p01", file: "photos/autumn-01.jpg", label: "枫叶猫", alt: "枫叶背景上的小白猫" },
  { id: "p02", file: "photos/autumn-02.jpg", label: "落叶野餐", alt: "小动物在红叶地砖上野餐" },
  { id: "p03", file: "photos/autumn-03.jpg", label: "秋日面包店", alt: "面包店里倒咖啡的女孩" },
  { id: "p04", file: "photos/autumn-04.jpg", label: "银杏咖啡馆", alt: "银杏树下咖啡馆外摆" },
  { id: "p05", file: "photos/autumn-05.jpg", label: "河畔牧羊", alt: "河边草地羊群与桥" },
  { id: "p06", file: "photos/autumn-06.jpg", label: "金色田野", alt: "金色麦田中的小路" },
  { id: "p07", file: "photos/autumn-07.jpg", label: "湖畔独坐", alt: "湖畔长椅独坐" },
  { id: "p08", file: "photos/autumn-08.jpg", label: "枫庭石径", alt: "红叶林中的日式庭院" },
  { id: "p09", file: "photos/autumn-09.jpg", label: "仰望秋空", alt: "仰望秋树树冠与蓝天" },
  { id: "p10", file: "photos/autumn-10.jpg", label: "红叶山门", alt: "红叶林中的日式山门" },
  { id: "p11", file: "photos/autumn-11.jpg", label: "银杏画作", alt: "林间银杏叶拼成的画" },
  { id: "p12", file: "photos/autumn-12.jpg", label: "秋林落叶", alt: "秋日树林落叶" },
  { id: "p13", file: "photos/autumn-13.jpg", label: "红叶舟游", alt: "红叶垂枝下的小舟" },
  { id: "p14", file: "photos/autumn-14.jpg", label: "花间跃猫", alt: "花丛中跳跃的白猫" },
  { id: "p15", file: "photos/autumn-15.jpg", label: "秋夜灯笼", alt: "日式灯笼与红叶" },
  { id: "p16", file: "photos/autumn-16.jpg", label: "屋檐猫眠", alt: "银杏叶下瓦片上的猫" },
  { id: "p17", file: "photos/autumn-17.jpg", label: "银杏小熊", alt: "金色银杏叶上的两只小熊" },
  { id: "p18", file: "photos/autumn-18.jpg", label: "窗边读书", alt: "秋日窗边读书的女孩" },
  { id: "p19", file: "photos/autumn-19.jpg", label: "枫叶小猫", alt: "枫叶林中的小白猫" },
];

export const TEXTS: readonly TextEntry[] = [
  // —— 古诗 25 首 ——
  { id: "poem-shanxing", kind: "poem", title: "山行", author: "唐 · 杜牧", body: "远上寒山石径斜，白云深处有人家。\n停车坐爱枫林晚，霜叶红于二月花。" },
  { id: "poem-qiuci", kind: "poem", title: "秋词", author: "唐 · 刘禹锡", body: "自古逢秋悲寂寥，我言秋日胜春潮。\n晴空一鹤排云上，便引诗情到碧霄。" },
  { id: "poem-shanjuqiuming", kind: "poem", title: "山居秋暝", author: "唐 · 王维", body: "空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。" },
  { id: "poem-tianjingshaqiu", kind: "poem", title: "天净沙 · 秋", author: "元 · 白朴", body: "孤村落日残霞，轻烟老树寒鸦，一点飞鸿影下。\n青山绿水，白草红叶黄花。" },
  { id: "poem-fengqiaoyebo", kind: "poem", title: "枫桥夜泊", author: "唐 · 张继", body: "月落乌啼霜满天，江枫渔火对愁眠。\n姑苏城外寒山寺，夜半钟声到客船。" },
  { id: "poem-qiusi", kind: "poem", title: "秋思", author: "唐 · 张籍", body: "洛阳城里见秋风，欲作家书意万重。\n复恐匆匆说不尽，行人临发又开封。" },
  { id: "poem-qiuxi", kind: "poem", title: "秋夕", author: "唐 · 杜牧", body: "银烛秋光冷画屏，轻罗小扇扑流萤。\n天阶夜色凉如水，坐看牵牛织女星。" },
  { id: "poem-denggao", kind: "poem", title: "登高", author: "唐 · 杜甫", body: "风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。" },
  { id: "poem-sumuge", kind: "poem", title: "苏幕遮 · 碧云天", author: "宋 · 范仲淹", body: "碧云天，黄叶地，秋色连波，波上寒烟翠。\n山映斜阳天接水，芳草无情，更在斜阳外。" },
  { id: "poem-yeyujibei", kind: "poem", title: "夜雨寄北", author: "唐 · 李商隐", body: "君问归期未有期，巴山夜雨涨秋池。\n何当共剪西窗烛，却话巴山夜雨时。" },
  { id: "poem-zhongqiyue", kind: "poem", title: "中秋月", author: "宋 · 苏轼", body: "暮云收尽溢清寒，银汉无声转玉盘。\n此生此夜不长好，明月明年何处看。" },
  { id: "poem-yeshusuojian", kind: "poem", title: "夜书所见", author: "宋 · 叶绍翁", body: "萧萧梧叶送寒声，江上秋风动客情。\n知有儿童挑促织，夜深篱落一灯明。" },
  { id: "poem-qiufengyin", kind: "poem", title: "秋风引", author: "唐 · 刘禹锡", body: "何处秋风至？萧萧送雁群。\n朝来入庭树，孤客最先闻。" },
  { id: "poem-tianjingshaqiusi", kind: "poem", title: "天净沙 · 秋思", author: "元 · 马致远", body: "枯藤老树昏鸦，小桥流水人家。\n古道西风瘦马，夕阳西下，断肠人在天涯。" },
  { id: "poem-suoluoshiting", kind: "poem", title: "宿骆氏亭寄怀崔雍崔衮", author: "唐 · 李商隐", body: "秋阴不散霜飞晚，留得枯荷听雨声。" },
  { id: "poem-qingpingyue", kind: "poem", title: "清平乐", author: "宋 · 张炎", body: "只有一枝梧叶，不知多少秋声！" },
  { id: "poem-qiufengqing", kind: "poem", title: "秋风词", author: "唐 · 李白", body: "秋风清，秋月明，落叶聚还散，寒鸦栖复惊。" },
  { id: "poem-shanzhong", kind: "poem", title: "山中", author: "唐 · 王维", body: "荆溪白石出，天寒红叶稀。\n山路元无雨，空翠湿人衣。" },
  { id: "poem-changqiuwang", kind: "poem", title: "长安秋望", author: "唐 · 杜牧", body: "楼倚霜树外，镜天无一毫。\n南山与秋色，气势两相高。" },
  { id: "poem-changxiangsi", kind: "poem", title: "长相思 · 一重山", author: "五代 · 李煜", body: "一重山，两重山。山远天高烟水寒，相思枫叶丹。\n菊花开，菊花残。" },
  { id: "poem-yewang", kind: "poem", title: "野望", author: "唐 · 王绩", body: "东皋薄暮望，徙倚欲何依。\n树树皆秋色，山山唯落晖。" },
  { id: "poem-cunxing", kind: "poem", title: "村行", author: "宋 · 王禹偁", body: "马穿山径菊初黄，信马悠悠野兴长。\n棠梨叶落胭脂色，荞麦花开白雪香。" },
  { id: "poem-mujianyin", kind: "poem", title: "暮江吟", author: "唐 · 白居易", body: "一道残阳铺水中，半江瑟瑟半江红。\n可怜九月初三夜，露似真珠月似弓。" },
  { id: "poem-qiuriwengcheng", kind: "poem", title: "秋日偶成", author: "宋 · 程颢", body: "闲来无事不从容，睡觉东窗日已红。\n万物静观皆自得，四时佳兴与人同。" },
  // —— 名家散文 9 段 ——
  { id: "prose-yudaofu", kind: "prose", title: "故都的秋", author: "郁达夫", body: "早晨起来，泡一碗浓茶，向院子一坐，你也能看得到很高很高的碧绿的天色。" },
  { id: "prose-zhailing", kind: "prose", title: "秋雨", author: "张爱玲", body: "雨静悄悄地下着，只有一点细细的淅沥沥的声音。" },
  { id: "prose-linyutang", kind: "prose", title: "秋天的况味", author: "林语堂", body: "大概我所爱的不是晚秋，是初秋，那时暄气初消，月正圆，蟹正肥，桂花皎洁。" },
  { id: "prose-laoshe", kind: "prose", title: "济南的秋天", author: "老舍", body: "在秋天，水和蓝天一样的清凉。天上微微有些白云，水上微微有些波皱。" },
  { id: "prose-muxin", kind: "prose", title: "佐治亚州小镇之秋", author: "木心", body: "那年秋天／一段欢乐时光／路边菊花金黄／甘蔗熟了／透出尊严紫红／橘色的月亮扁而大。" },
  { id: "prose-rieker", kind: "prose", title: "秋日", author: "里尔克", body: "在林荫路上不停地／徘徊，落叶纷飞。" },
  { id: "prose-haizi", kind: "prose", title: "秋", author: "海子", body: "秋天深了／神的家中鹰在集合／该得到的尚未得到／该丧失的早已丧失。" },
  { id: "prose-murakami", kind: "prose", title: "有餐车多好", author: "村上春树", body: "秋天的阳光醇厚柔润，在建筑物顶端闪闪发光。" },
  { id: "prose-wangxiaobo", kind: "prose", title: "三十而立", author: "王小波", body: "路边全是高高的杨树，风过处无数落叶就如一场黄金雨从天顶飘落。" },
];

/** 一张明信片的默认图与默认词。 */
const card = (id: string, photoId: string, textId: string, label: string, place: string, date: string, color: string) => {
  const photo = PHOTOS.find((p) => p.id === photoId)!;
  const text = TEXTS.find((t) => t.id === textId)!;
  return {
    id,
    label,
    src: photo.file,
    color,
    message: text.body.replace(/\n/g, " "),
    from: text.author.split(" · ").pop() ?? text.author,
    place,
    placeLocal: text.title,
    credit: "照片：自摄",
    date,
  };
};

export const profile: Profile = {
  lang: "zh-CN",
  name: "Autumn",
  nameLocal: "秋",
  handle: "autumn",
  role: "秋天的拾遗者",
  location: "中国",
  timezone: "Asia/Shanghai",
  bio: "秋天是一年最好的季节：光变短了，颜色变浓了，风也学会了慢下来。这个小站收集了十九个秋天，和十九首可以慢慢读的诗。",
  links: [],
  coverTitle: "秋信",
  items: [],
  albums: {
    cards: [],
    postcards: [
      card("c1",  "p01", "poem-shanxing",       "枫叶猫",     "山间",       "2025-10-05", "#b5492f"),
      card("c2",  "p02", "poem-tianjingshaqiu", "落叶野餐",   "村落",       "2025-10-08", "#c06a3c"),
      card("c3",  "p03", "prose-yudaofu",       "秋日面包店", "故都",       "2025-10-12", "#c99a55"),
      card("c4",  "p04", "prose-murakami",      "银杏咖啡馆", "窗边",       "2025-10-15", "#e0c9a6"),
      card("c5",  "p05", "poem-fengqiaoyebo",   "河畔牧羊",   "枫桥",       "2025-10-18", "#a8452c"),
      card("c6",  "p06", "poem-cunxing",        "金色田野",   "村行",       "2025-10-20", "#d8a24a"),
      card("c7",  "p07", "poem-yewang",         "湖畔独坐",   "东皋",       "2025-10-23", "#8f7a35"),
      card("c8",  "p08", "poem-tianjingshaqiusi","枫庭石径",   "古道",       "2025-10-26", "#b5492f"),
      card("c9",  "p09", "poem-qiuci",          "仰望秋空",   "晴空",       "2025-10-28", "#c9a227"),
      card("c10", "p10", "poem-shanjuqiuming",  "红叶山门",   "空山",       "2025-10-30", "#8f7a35"),
      card("c11", "p11", "poem-qiuriwengcheng", "银杏画作",   "东窗",       "2025-11-02", "#b7a03f"),
      card("c12", "p12", "poem-yeshusuojian",   "秋林落叶",   "篱落",       "2025-11-05", "#b5492f"),
      card("c13", "p13", "poem-mujianyin",      "红叶舟游",   "江畔",       "2025-11-08", "#a95f3a"),
      card("c14", "p14", "prose-linyutang",     "花间跃猫",   "初秋",       "2025-11-11", "#b9884f"),
      card("c15", "p15", "poem-yeyujibei",      "秋夜灯笼",   "巴山",       "2025-11-14", "#c99a55"),
      card("c16", "p16", "poem-qingpingyue",    "屋檐猫眠",   "梧叶",       "2025-11-16", "#b7a03f"),
      card("c17", "p17", "poem-qiufengqing",    "银杏小熊",   "月下",       "2025-11-19", "#c9a227"),
      card("c18", "p18", "prose-laoshe",        "窗边读书",   "济南",       "2025-11-22", "#8f7a35"),
      card("c19", "p19", "prose-wangxiaobo",    "枫叶小猫",   "路边",       "2025-11-25", "#b5492f"),
    ],
  },
};
