const TEAMS = {
  Mexico: { zh: "墨西哥", group: "A", rank: 15, confed: "CONCACAF", host: true, coach: "Javier Aguirre", formation: "4-2-3-1", stars: "Raul Jimenez / Edson Alvarez", squad: 7.4, form: 6.8, coachScore: 7.4, tactics: 7.1, experience: 7.8, note: "东道主加成明显，但首战压力也高。" },
  "South Africa": { zh: "南非", group: "A", rank: 61, confed: "CAF", coach: "Hugo Broos", formation: "4-2-3-1", stars: "Ronwen Williams / Oswin Appollis", squad: 5.5, form: 6.2, coachScore: 6.8, tactics: 6.1, experience: 5.8, note: "防守韧性好，客场强度是核心变量。" },
  "South Korea": { zh: "韩国", group: "A", rank: 22, confed: "AFC", coach: "Hong Myung-bo", formation: "4-3-3", stars: "Son Heung-min / Lee Kang-in", squad: 7.3, form: 6.5, coachScore: 6.0, tactics: 6.4, experience: 7.2, note: "球星质量高，阵型调整稳定性要观察。" },
  "Czech Republic": { zh: "捷克", group: "A", rank: 44, confed: "UEFA", coach: "Miroslav Koubek", formation: "3-4-2-1", stars: "Patrik Schick / Tomas Soucek", squad: 6.7, form: 6.1, coachScore: 6.3, tactics: 6.6, experience: 6.5, note: "定位球和身体对抗有优势。" },

  Canada: { zh: "加拿大", group: "B", rank: 27, confed: "CONCACAF", host: true, coach: "Jesse Marsch", formation: "4-4-2", stars: "Jonathan David / Alphonso Davies", squad: 7.0, form: 6.0, coachScore: 6.8, tactics: 6.7, experience: 5.9, note: "主场与速度加分，伤病恢复情况会放大波动。" },
  "Bosnia and Herzegovina": { zh: "波黑", group: "B", rank: 71, confed: "UEFA", coach: "Sergej Barbarez", formation: "4-4-2", stars: "Edin Dzeko / Esmir Bajraktarevic", squad: 5.8, form: 6.7, coachScore: 6.0, tactics: 5.9, experience: 6.0, note: "附加赛冲出后士气强，年龄结构偏两极。" },
  Qatar: { zh: "卡塔尔", group: "B", rank: 51, confed: "AFC", coach: "Julen Lopetegui", formation: "5-3-2", stars: "Akram Afif", squad: 5.9, form: 5.7, coachScore: 6.8, tactics: 6.0, experience: 6.1, note: "亚洲杯经验足，但离开主场环境后强度打折。" },
  Switzerland: { zh: "瑞士", group: "B", rank: 17, confed: "UEFA", coach: "Murat Yakin", formation: "3-4-2-1", stars: "Granit Xhaka / Manuel Akanji", squad: 7.5, form: 7.0, coachScore: 7.1, tactics: 7.5, experience: 7.9, note: "体系成熟，低失误率是小组赛优势。" },

  Brazil: { zh: "巴西", group: "C", rank: 5, confed: "CONMEBOL", coach: "Carlo Ancelotti", formation: "4-3-3", stars: "Vinicius Junior / Rodrygo", squad: 9.1, form: 7.1, coachScore: 9.0, tactics: 8.2, experience: 8.6, note: "阵容上限高，教练临场和边锋爆点是主轴。" },
  Morocco: { zh: "摩洛哥", group: "C", rank: 11, confed: "CAF", coach: "Mohamed Ouahbi", formation: "4-1-4-1", stars: "Achraf Hakimi / Hakim Ziyech", squad: 8.0, form: 7.4, coachScore: 6.7, tactics: 7.6, experience: 7.7, note: "2022 红利仍在，换帅后的执行力是关键。" },
  Haiti: { zh: "海地", group: "C", rank: 84, confed: "CONCACAF", coach: "Sebastien Migne", formation: "5-4-1", stars: "Wilson Isidor / Johny Placide", squad: 4.9, form: 5.8, coachScore: 5.7, tactics: 5.4, experience: 4.8, note: "备战条件和阵容深度会影响稳定性。" },
  Scotland: { zh: "苏格兰", group: "C", rank: 36, confed: "UEFA", coach: "Steve Clarke", formation: "3-4-2-1", stars: "Scott McTominay / Andy Robertson", squad: 6.9, form: 6.9, coachScore: 7.2, tactics: 7.0, experience: 6.4, note: "中场硬度强，反击和定位球很适合杯赛。" },

  "United States": { zh: "美国", group: "D", rank: 14, confed: "CONCACAF", host: true, coach: "Mauricio Pochettino", formation: "4-2-3-1", stars: "Christian Pulisic / Folarin Balogun", squad: 7.6, form: 6.3, coachScore: 7.6, tactics: 7.0, experience: 6.5, note: "主场与人才池加分，外界期待会带来压力。" },
  Paraguay: { zh: "巴拉圭", group: "D", rank: 39, confed: "CONMEBOL", coach: "Gustavo Alfaro", formation: "4-4-2", stars: "Julio Enciso / Miguel Almiron", squad: 6.8, form: 6.8, coachScore: 7.0, tactics: 6.7, experience: 6.3, note: "防守优先，适合拖低节奏制造冷门。" },
  Australia: { zh: "澳大利亚", group: "D", rank: 26, confed: "AFC", coach: "Tony Popovic", formation: "4-4-2", stars: "Mathew Ryan / Jordan Bos", squad: 6.7, form: 6.6, coachScore: 6.6, tactics: 6.8, experience: 7.1, note: "大赛经验好，进攻天花板略受限。" },
  Turkey: { zh: "土耳其", group: "D", rank: 25, confed: "UEFA", coach: "Vincenzo Montella", formation: "4-2-3-1", stars: "Hakan Calhanoglu / Arda Guler", squad: 7.5, form: 7.0, coachScore: 7.0, tactics: 7.2, experience: 6.4, note: "技术天赋强，情绪波动可能放大比赛方差。" },

  Germany: { zh: "德国", group: "E", rank: 9, confed: "UEFA", coach: "Julian Nagelsmann", formation: "4-2-3-1", stars: "Jamal Musiala / Florian Wirtz", squad: 8.6, form: 7.3, coachScore: 8.1, tactics: 8.3, experience: 8.0, note: "压迫与控球成熟，需修复连续世界杯小组赛失意的心理包袱。" },
  Curacao: { zh: "库拉索", group: "E", rank: 82, confed: "CONCACAF", coach: "Dick Advocaat", formation: "4-2-3-1", stars: "Leandro Bacuna", squad: 5.1, form: 6.1, coachScore: 6.8, tactics: 5.8, experience: 4.6, note: "首次参赛带来冲劲，也带来未知波动。" },
  "Ivory Coast": { zh: "科特迪瓦", group: "E", rank: 42, confed: "CAF", coach: "Emerse Fae", formation: "4-3-3", stars: "Franck Kessie / Simon Adingra", squad: 7.0, form: 7.2, coachScore: 7.1, tactics: 6.9, experience: 6.4, note: "非洲杯冠军气质加分，转换速度有威胁。" },
  Ecuador: { zh: "厄瓜多尔", group: "E", rank: 23, confed: "CONMEBOL", coach: "Sebastian Beccacece", formation: "3-4-2-1", stars: "Moises Caicedo / Enner Valencia", squad: 7.2, form: 7.0, coachScore: 6.9, tactics: 7.1, experience: 6.6, note: "防守韧性好，进攻效率是最大问号。" },

  Netherlands: { zh: "荷兰", group: "F", rank: 7, confed: "UEFA", coach: "Ronald Koeman", formation: "3-4-1-2", stars: "Virgil van Dijk / Xavi Simons", squad: 8.4, form: 7.2, coachScore: 7.2, tactics: 7.8, experience: 8.0, note: "中后场质量强，边翼卫推进决定上限。" },
  Japan: { zh: "日本", group: "F", rank: 18, confed: "AFC", coach: "Hajime Moriyasu", formation: "4-2-3-1", stars: "Takefusa Kubo / Kaoru Mitoma", squad: 7.7, form: 7.8, coachScore: 7.4, tactics: 7.7, experience: 7.4, note: "整体速度与传控压迫平衡，是最有爆冷潜质的亚洲队之一。" },
  Sweden: { zh: "瑞典", group: "F", rank: 43, confed: "UEFA", coach: "Jon Dahl Tomasson", formation: "4-2-3-1", stars: "Alexander Isak / Viktor Gyokeres", squad: 7.1, form: 6.6, coachScore: 6.5, tactics: 6.6, experience: 6.2, note: "锋线效率高，防线速度保护要观察。" },
  Tunisia: { zh: "突尼斯", group: "F", rank: 40, confed: "CAF", coach: "Montasser Louhichi", formation: "4-3-3", stars: "Ellyes Skhiri / Hannibal Mejbri", squad: 6.4, form: 6.5, coachScore: 6.1, tactics: 6.4, experience: 6.8, note: "杯赛纪律性不错，进攻创造力偏低。" },

  Belgium: { zh: "比利时", group: "G", rank: 8, confed: "UEFA", coach: "Domenico Tedesco", formation: "4-3-3", stars: "Kevin De Bruyne / Jeremy Doku", squad: 8.1, form: 7.0, coachScore: 7.0, tactics: 7.5, experience: 8.0, note: "黄金一代后期与新边锋并存，转换防守是隐患。" },
  Egypt: { zh: "埃及", group: "G", rank: 34, confed: "CAF", coach: "Hossam Hassan", formation: "4-3-3", stars: "Mohamed Salah / Omar Marmoush", squad: 7.1, form: 6.7, coachScore: 6.4, tactics: 6.5, experience: 7.0, note: "锋线个人能力强，比赛心态和节奏控制很关键。" },
  Iran: { zh: "伊朗", group: "G", rank: 20, confed: "AFC", coach: "Amir Ghalenoei", formation: "4-2-3-1", stars: "Mehdi Taremi / Sardar Azmoun", squad: 7.0, form: 6.8, coachScore: 6.7, tactics: 6.8, experience: 7.7, note: "经验足，锋线默契和临场节奏是主要观察点。" },
  "New Zealand": { zh: "新西兰", group: "G", rank: 86, confed: "OFC", coach: "Darren Bazeley", formation: "4-4-2", stars: "Chris Wood", squad: 5.2, form: 5.8, coachScore: 5.9, tactics: 5.7, experience: 5.3, note: "定位球和身体对抗是主要得分路径。" },

  Spain: { zh: "西班牙", group: "H", rank: 1, confed: "UEFA", coach: "Luis de la Fuente", formation: "4-3-3", stars: "Lamine Yamal / Rodri", squad: 9.2, form: 8.4, coachScore: 8.4, tactics: 9.0, experience: 8.0, note: "控球、边路与高压完整度最高。" },
  "Cape Verde": { zh: "佛得角", group: "H", rank: 68, confed: "CAF", coach: "Bubista", formation: "4-3-3", stars: "Steven Moreira", squad: 5.4, form: 6.5, coachScore: 6.4, tactics: 6.0, experience: 4.7, note: "首次参赛士气很强，经验不足。" },
  "Saudi Arabia": { zh: "沙特", group: "H", rank: 60, confed: "AFC", coach: "Herve Renard", formation: "4-2-3-1", stars: "Salem Al-Dawsari", squad: 5.8, form: 6.0, coachScore: 7.1, tactics: 6.2, experience: 6.9, note: "熟人体系与 2022 冷门经验加分。" },
  Uruguay: { zh: "乌拉圭", group: "H", rank: 16, confed: "CONMEBOL", coach: "Marcelo Bielsa", formation: "4-3-3", stars: "Federico Valverde / Darwin Nunez", squad: 8.0, form: 6.8, coachScore: 7.6, tactics: 7.8, experience: 8.0, note: "强度极高但波动也高，内部压力需要观察。" },

  France: { zh: "法国", group: "I", rank: 3, confed: "UEFA", coach: "Didier Deschamps", formation: "4-2-3-1", stars: "Kylian Mbappe / Ousmane Dembele", squad: 9.3, form: 8.0, coachScore: 8.7, tactics: 8.2, experience: 9.0, note: "深度、经验和球星解决问题能力都在第一档。" },
  Senegal: { zh: "塞内加尔", group: "I", rank: 19, confed: "CAF", coach: "Aliou Cisse", formation: "4-3-3", stars: "Sadio Mane / Kalidou Koulibaly", squad: 7.7, form: 7.0, coachScore: 7.2, tactics: 7.0, experience: 7.6, note: "身体、速度、防线经验全面，强强对话不怵。" },
  Iraq: { zh: "伊拉克", group: "I", rank: 58, confed: "AFC", coach: "Graham Arnold", formation: "5-4-1", stars: "Aymen Hussein", squad: 5.7, form: 6.3, coachScore: 6.7, tactics: 6.0, experience: 5.8, note: "资格赛消耗大，低位反击是主线。" },
  Norway: { zh: "挪威", group: "I", rank: 29, confed: "UEFA", coach: "Stale Solbakken", formation: "4-3-3", stars: "Erling Haaland / Martin Odegaard", squad: 7.6, form: 7.5, coachScore: 6.9, tactics: 7.0, experience: 6.0, note: "前场巨星决定上限，防线深度决定下限。" },

  Argentina: { zh: "阿根廷", group: "J", rank: 2, confed: "CONMEBOL", coach: "Lionel Scaloni", formation: "4-3-3", stars: "Lionel Messi / Julian Alvarez", squad: 9.0, form: 8.0, coachScore: 8.8, tactics: 8.4, experience: 9.2, note: "冠军班底与体系稳定，老将体能管理是变量。" },
  Algeria: { zh: "阿尔及利亚", group: "J", rank: 35, confed: "CAF", coach: "Vladimir Petkovic", formation: "4-2-3-1", stars: "Riyad Mahrez / Amine Gouiri", squad: 6.9, form: 6.8, coachScore: 6.9, tactics: 6.7, experience: 6.8, note: "边路创造力不错，防守集中度决定成绩。" },
  Austria: { zh: "奥地利", group: "J", rank: 24, confed: "UEFA", coach: "Ralf Rangnick", formation: "4-2-2-2", stars: "David Alaba / Marcel Sabitzer", squad: 7.3, form: 7.2, coachScore: 8.0, tactics: 8.0, experience: 7.0, note: "高压体系成熟，但伤病会削弱连续冲刺能力。" },
  Jordan: { zh: "约旦", group: "J", rank: 66, confed: "AFC", coach: "Jamal Sellami", formation: "5-3-2", stars: "Musa Al-Taamari", squad: 5.6, form: 6.7, coachScore: 6.2, tactics: 6.0, experience: 4.7, note: "首次参赛，反击速度是主要威胁。" },

  Portugal: { zh: "葡萄牙", group: "K", rank: 6, confed: "UEFA", coach: "Roberto Martinez", formation: "4-3-3", stars: "Bruno Fernandes / Cristiano Ronaldo", squad: 8.8, form: 7.6, coachScore: 7.5, tactics: 7.9, experience: 8.7, note: "阵容豪华，C 罗话题带来流量也带来战术讨论。" },
  "DR Congo": { zh: "刚果民主共和国", group: "K", rank: 56, confed: "CAF", coach: "Sebastien Desabre", formation: "4-2-3-1", stars: "Yoane Wissa / Chancel Mbemba", squad: 6.2, form: 6.8, coachScore: 6.9, tactics: 6.4, experience: 5.5, note: "欧洲联赛球员不少，整体默契是考点。" },
  Uzbekistan: { zh: "乌兹别克斯坦", group: "K", rank: 50, confed: "AFC", coach: "Fabio Cannavaro", formation: "5-3-2", stars: "Abdukodir Khusanov", squad: 6.1, form: 6.9, coachScore: 6.8, tactics: 6.4, experience: 4.8, note: "首次参赛，防守反击与中卫质量值得看。" },
  Colombia: { zh: "哥伦比亚", group: "K", rank: 13, confed: "CONMEBOL", coach: "Nestor Lorenzo", formation: "4-2-3-1", stars: "Luis Diaz / James Rodriguez", squad: 8.0, form: 7.4, coachScore: 7.3, tactics: 7.2, experience: 7.4, note: "进攻天赋强，防线失误是风险点。" },

  England: { zh: "英格兰", group: "L", rank: 4, confed: "UEFA", coach: "Thomas Tuchel", formation: "4-2-3-1", stars: "Harry Kane / Jude Bellingham", squad: 9.0, form: 7.8, coachScore: 8.2, tactics: 8.0, experience: 8.0, note: "阵容厚度顶级，新帅整合是最大变量。" },
  Croatia: { zh: "克罗地亚", group: "L", rank: 10, confed: "UEFA", coach: "Zlatko Dalic", formation: "4-3-3", stars: "Luka Modric / Josko Gvardiol", squad: 7.9, form: 6.9, coachScore: 7.7, tactics: 7.5, experience: 9.0, note: "大赛经验极强，老化与体能是主要折损。" },
  Ghana: { zh: "加纳", group: "L", rank: 72, confed: "CAF", coach: "Carlos Queiroz", formation: "4-2-3-1", stars: "Mohammed Kudus / Thomas Partey", squad: 6.6, form: 5.8, coachScore: 7.1, tactics: 6.5, experience: 6.4, note: "球员天赋不低，近况与管理稳定性拖后腿。" },
  Panama: { zh: "巴拿马", group: "L", rank: 30, confed: "CONCACAF", coach: "Thomas Christiansen", formation: "5-4-1", stars: "Adalberto Carrasquilla", squad: 6.1, form: 6.6, coachScore: 6.8, tactics: 6.5, experience: 5.9, note: "组织纪律强，适合低比分缠斗。" }
};

const FIXTURES = [
  ["2026-06-11", "A", "Mexico", "South Africa", "Mexico City"],
  ["2026-06-11", "A", "South Korea", "Czech Republic", "Guadalajara"],
  ["2026-06-12", "B", "Canada", "Bosnia and Herzegovina", "Toronto"],
  ["2026-06-12", "D", "United States", "Paraguay", "Los Angeles"],
  ["2026-06-13", "B", "Qatar", "Switzerland", "San Francisco Bay Area"],
  ["2026-06-13", "C", "Brazil", "Morocco", "New York New Jersey"],
  ["2026-06-13", "C", "Haiti", "Scotland", "Boston"],
  ["2026-06-13", "D", "Australia", "Turkey", "Vancouver"],
  ["2026-06-14", "E", "Germany", "Curacao", "Houston"],
  ["2026-06-14", "E", "Ivory Coast", "Ecuador", "Philadelphia"],
  ["2026-06-14", "F", "Netherlands", "Japan", "Dallas"],
  ["2026-06-14", "F", "Sweden", "Tunisia", "Monterrey"],
  ["2026-06-15", "G", "Belgium", "Egypt", "Seattle"],
  ["2026-06-15", "G", "Iran", "New Zealand", "Los Angeles"],
  ["2026-06-15", "H", "Spain", "Cape Verde", "Atlanta"],
  ["2026-06-15", "H", "Saudi Arabia", "Uruguay", "Miami"],
  ["2026-06-16", "I", "France", "Senegal", "New York New Jersey"],
  ["2026-06-16", "I", "Iraq", "Norway", "Boston"],
  ["2026-06-16", "J", "Argentina", "Algeria", "Kansas City"],
  ["2026-06-16", "J", "Austria", "Jordan", "San Francisco Bay Area"],
  ["2026-06-17", "K", "Portugal", "DR Congo", "Houston"],
  ["2026-06-17", "K", "Uzbekistan", "Colombia", "Mexico City"],
  ["2026-06-17", "L", "England", "Croatia", "Dallas"],
  ["2026-06-17", "L", "Ghana", "Panama", "Toronto"],
  ["2026-06-18", "A", "Czech Republic", "South Africa", "Atlanta"],
  ["2026-06-18", "B", "Switzerland", "Bosnia and Herzegovina", "Los Angeles"],
  ["2026-06-18", "B", "Canada", "Qatar", "Vancouver"],
  ["2026-06-18", "A", "Mexico", "South Korea", "Guadalajara"],
  ["2026-06-19", "C", "Scotland", "Morocco", "Boston"],
  ["2026-06-19", "C", "Brazil", "Haiti", "Philadelphia"],
  ["2026-06-19", "D", "United States", "Australia", "Seattle"],
  ["2026-06-19", "D", "Turkey", "Paraguay", "San Francisco Bay Area"],
  ["2026-06-20", "E", "Germany", "Ivory Coast", "Toronto"],
  ["2026-06-20", "E", "Ecuador", "Curacao", "Kansas City"],
  ["2026-06-20", "F", "Netherlands", "Sweden", "Houston"],
  ["2026-06-20", "F", "Tunisia", "Japan", "Monterrey"],
  ["2026-06-21", "G", "Belgium", "Iran", "Los Angeles"],
  ["2026-06-21", "G", "New Zealand", "Egypt", "Vancouver"],
  ["2026-06-21", "H", "Spain", "Saudi Arabia", "Atlanta"],
  ["2026-06-21", "H", "Uruguay", "Cape Verde", "Miami"],
  ["2026-06-22", "I", "Norway", "Senegal", "New York New Jersey"],
  ["2026-06-22", "I", "France", "Iraq", "Philadelphia"],
  ["2026-06-22", "J", "Argentina", "Austria", "Dallas"],
  ["2026-06-22", "J", "Jordan", "Algeria", "San Francisco Bay Area"],
  ["2026-06-23", "L", "England", "Ghana", "Boston"],
  ["2026-06-23", "L", "Panama", "Croatia", "Toronto"],
  ["2026-06-23", "K", "Portugal", "Uzbekistan", "Houston"],
  ["2026-06-23", "K", "Colombia", "DR Congo", "Guadalajara"],
  ["2026-06-24", "C", "Scotland", "Brazil", "Miami"],
  ["2026-06-24", "C", "Morocco", "Haiti", "Atlanta"],
  ["2026-06-24", "B", "Switzerland", "Canada", "Vancouver"],
  ["2026-06-24", "B", "Bosnia and Herzegovina", "Qatar", "Seattle"],
  ["2026-06-24", "A", "Czech Republic", "Mexico", "Mexico City"],
  ["2026-06-24", "A", "South Africa", "South Korea", "Monterrey"],
  ["2026-06-25", "E", "Curacao", "Ivory Coast", "Philadelphia"],
  ["2026-06-25", "E", "Ecuador", "Germany", "New York New Jersey"],
  ["2026-06-25", "F", "Japan", "Sweden", "Dallas"],
  ["2026-06-25", "F", "Tunisia", "Netherlands", "Kansas City"],
  ["2026-06-25", "D", "Turkey", "United States", "Los Angeles"],
  ["2026-06-25", "D", "Paraguay", "Australia", "San Francisco Bay Area"],
  ["2026-06-26", "I", "Norway", "France", "Boston"],
  ["2026-06-26", "I", "Senegal", "Iraq", "Toronto"],
  ["2026-06-26", "G", "Egypt", "Iran", "Seattle"],
  ["2026-06-26", "G", "New Zealand", "Belgium", "Vancouver"],
  ["2026-06-26", "H", "Cape Verde", "Saudi Arabia", "Houston"],
  ["2026-06-26", "H", "Uruguay", "Spain", "Guadalajara"],
  ["2026-06-27", "L", "Panama", "England", "New York New Jersey"],
  ["2026-06-27", "L", "Croatia", "Ghana", "Philadelphia"],
  ["2026-06-27", "J", "Algeria", "Austria", "Kansas City"],
  ["2026-06-27", "J", "Jordan", "Argentina", "Dallas"],
  ["2026-06-27", "K", "Colombia", "Portugal", "Miami"],
  ["2026-06-27", "K", "DR Congo", "Uzbekistan", "Atlanta"]
].map(([date, group, home, away, venue], index) => ({ id: index + 1, date, group, home, away, venue }));

const MODEL_WEIGHTS = [
  ["FIFA排名/历史 Elo 代理", 38],
  ["阵容深度与球星", 16],
  ["近期状态/伤病", 14],
  ["教练与临场", 10],
  ["队形/战术匹配", 10],
  ["大赛经验", 6],
  ["主场/旅行", 4],
  ["热度/公众反应", 2]
];

const BEIJING_TIMES = {
  "2026-06-11|Mexico|South Africa": {
    local: "2026-06-11 14:00 墨西哥城",
    beijing: "2026-06-12 03:00",
    beijingDate: "2026-06-12"
  },
  "2026-06-11|South Korea|Czech Republic": {
    local: "2026-06-11 20:00 瓜达拉哈拉",
    beijing: "2026-06-12 10:00",
    beijingDate: "2026-06-12"
  },
  "2026-06-12|Canada|Bosnia and Herzegovina": {
    local: "2026-06-12 15:00 多伦多",
    beijing: "2026-06-13 03:00",
    beijingDate: "2026-06-13"
  },
  "2026-06-12|United States|Paraguay": {
    local: "2026-06-12 18:00 洛杉矶",
    beijing: "2026-06-13 09:00",
    beijingDate: "2026-06-13"
  },
  "2026-06-13|Qatar|Switzerland": {
    local: "2026-06-13 12:00 旧金山湾区",
    beijing: "2026-06-14 03:00",
    beijingDate: "2026-06-14"
  },
  "2026-06-13|Brazil|Morocco": {
    local: "2026-06-13 18:00 纽约/新泽西",
    beijing: "2026-06-14 06:00",
    beijingDate: "2026-06-14"
  },
  "2026-06-13|Haiti|Scotland": {
    local: "2026-06-13 21:00 波士顿",
    beijing: "2026-06-14 09:00",
    beijingDate: "2026-06-14"
  },
  "2026-06-13|Australia|Turkey": {
    local: "2026-06-13 21:00 温哥华",
    beijing: "2026-06-14 12:00",
    beijingDate: "2026-06-14"
  },
  "2026-06-14|Germany|Curacao": {
    local: "2026-06-14 12:00 休斯敦",
    beijing: "2026-06-15 01:00",
    beijingDate: "2026-06-15"
  },
  "2026-06-14|Netherlands|Japan": {
    local: "2026-06-14 15:00 达拉斯",
    beijing: "2026-06-15 04:00",
    beijingDate: "2026-06-15"
  },
  "2026-06-14|Ivory Coast|Ecuador": {
    local: "2026-06-14 19:00 费城",
    beijing: "2026-06-15 07:00",
    beijingDate: "2026-06-15"
  },
  "2026-06-14|Sweden|Tunisia": {
    local: "2026-06-14 20:00 蒙特雷",
    beijing: "2026-06-15 10:00",
    beijingDate: "2026-06-15"
  },
  "2026-06-15|Spain|Cape Verde": {
    local: "2026-06-15 12:00 亚特兰大",
    beijing: "2026-06-16 00:00",
    beijingDate: "2026-06-16"
  },
  "2026-06-15|Belgium|Egypt": {
    local: "2026-06-15 12:00 西雅图",
    beijing: "2026-06-16 03:00",
    beijingDate: "2026-06-16"
  },
  "2026-06-15|Saudi Arabia|Uruguay": {
    local: "2026-06-15 18:00 迈阿密",
    beijing: "2026-06-16 06:00",
    beijingDate: "2026-06-16"
  },
  "2026-06-15|Iran|New Zealand": {
    local: "2026-06-15 18:00 洛杉矶",
    beijing: "2026-06-16 09:00",
    beijingDate: "2026-06-16"
  },
  "2026-06-16|France|Senegal": {
    local: "2026-06-16 15:00 纽约/新泽西",
    beijing: "2026-06-17 03:00",
    beijingDate: "2026-06-17"
  },
  "2026-06-16|Iraq|Norway": {
    local: "2026-06-16 18:00 波士顿",
    beijing: "2026-06-17 06:00",
    beijingDate: "2026-06-17"
  },
  "2026-06-16|Argentina|Algeria": {
    local: "2026-06-16 20:00 堪萨斯城",
    beijing: "2026-06-17 09:00",
    beijingDate: "2026-06-17"
  },
  "2026-06-16|Austria|Jordan": {
    local: "2026-06-16 21:00 旧金山湾区",
    beijing: "2026-06-17 12:00",
    beijingDate: "2026-06-17"
  },
  "2026-06-17|Portugal|DR Congo": {
    local: "2026-06-17 12:00 休斯敦",
    beijing: "2026-06-18 01:00",
    beijingDate: "2026-06-18"
  },
  "2026-06-17|England|Croatia": {
    local: "2026-06-17 15:00 达拉斯",
    beijing: "2026-06-18 04:00",
    beijingDate: "2026-06-18"
  },
  "2026-06-17|Ghana|Panama": {
    local: "2026-06-17 19:00 多伦多",
    beijing: "2026-06-18 07:00",
    beijingDate: "2026-06-18"
  },
  "2026-06-17|Uzbekistan|Colombia": {
    local: "2026-06-17 20:00 墨西哥城",
    beijing: "2026-06-18 10:00",
    beijingDate: "2026-06-18"
  },
  "2026-06-18|Czech Republic|South Africa": {
    local: "2026-06-18 12:00 亚特兰大",
    beijing: "2026-06-19 00:00",
    beijingDate: "2026-06-19"
  },
  "2026-06-18|Switzerland|Bosnia and Herzegovina": {
    local: "2026-06-18 12:00 洛杉矶",
    beijing: "2026-06-19 03:00",
    beijingDate: "2026-06-19"
  },
  "2026-06-18|Canada|Qatar": {
    local: "2026-06-18 15:00 温哥华",
    beijing: "2026-06-19 06:00",
    beijingDate: "2026-06-19"
  },
  "2026-06-18|Mexico|South Korea": {
    local: "2026-06-18 19:00 瓜达拉哈拉",
    beijing: "2026-06-19 09:00",
    beijingDate: "2026-06-19"
  },
  "2026-06-19|Brazil|Haiti": {
    local: "2026-06-19 12:00 费城",
    beijing: "2026-06-20 00:00",
    beijingDate: "2026-06-20"
  },
  "2026-06-19|United States|Australia": {
    local: "2026-06-19 12:00 西雅图",
    beijing: "2026-06-20 03:00",
    beijingDate: "2026-06-20"
  },
  "2026-06-19|Scotland|Morocco": {
    local: "2026-06-19 18:00 波士顿",
    beijing: "2026-06-20 06:00",
    beijingDate: "2026-06-20"
  },
  "2026-06-19|Turkey|Paraguay": {
    local: "2026-06-19 18:00 旧金山湾区",
    beijing: "2026-06-20 09:00",
    beijingDate: "2026-06-20"
  },
  "2026-06-20|Germany|Ivory Coast": {
    local: "2026-06-20 16:00 多伦多",
    beijing: "2026-06-21 04:00",
    beijingDate: "2026-06-21"
  },
  "2026-06-20|Netherlands|Sweden": {
    local: "2026-06-20 12:00 休斯敦",
    beijing: "2026-06-21 01:00",
    beijingDate: "2026-06-21"
  },
  "2026-06-20|Ecuador|Curacao": {
    local: "2026-06-20 19:00 堪萨斯城",
    beijing: "2026-06-21 08:00",
    beijingDate: "2026-06-21"
  },
  "2026-06-20|Tunisia|Japan": {
    local: "2026-06-20 22:00 蒙特雷",
    beijing: "2026-06-21 12:00",
    beijingDate: "2026-06-21"
  },
  "2026-06-21|Spain|Saudi Arabia": {
    local: "2026-06-21 12:00 亚特兰大",
    beijing: "2026-06-22 00:00",
    beijingDate: "2026-06-22"
  },
  "2026-06-21|Belgium|Iran": {
    local: "2026-06-21 12:00 洛杉矶",
    beijing: "2026-06-22 03:00",
    beijingDate: "2026-06-22"
  },
  "2026-06-21|Uruguay|Cape Verde": {
    local: "2026-06-21 18:00 迈阿密",
    beijing: "2026-06-22 06:00",
    beijingDate: "2026-06-22"
  },
  "2026-06-21|New Zealand|Egypt": {
    local: "2026-06-21 18:00 温哥华",
    beijing: "2026-06-22 09:00",
    beijingDate: "2026-06-22"
  },
  "2026-06-22|Argentina|Austria": {
    local: "2026-06-22 12:00 达拉斯",
    beijing: "2026-06-23 01:00",
    beijingDate: "2026-06-23"
  },
  "2026-06-22|France|Iraq": {
    local: "2026-06-22 17:00 费城",
    beijing: "2026-06-23 05:00",
    beijingDate: "2026-06-23"
  },
  "2026-06-22|Norway|Senegal": {
    local: "2026-06-22 20:00 纽约/新泽西",
    beijing: "2026-06-23 08:00",
    beijingDate: "2026-06-23"
  },
  "2026-06-22|Jordan|Algeria": {
    local: "2026-06-22 20:00 旧金山湾区",
    beijing: "2026-06-23 11:00",
    beijingDate: "2026-06-23"
  }
};


const MATCH_INSIGHTS = [
  {
    date: "2026-06-13",
    home: "Qatar",
    away: "Switzerland",
    heat: 58,
    homeMood: 0.12,
    awayMood: 0.06,
    tempoModifier: -0.08,
    label: "高温变量",
    summary: "湾区午间高温成为主要讨论点，热度更多集中在体能、补水和比赛节奏。卡塔尔对炎热环境适应略占便宜，瑞士整体实力仍更稳。",
    source: "SF Chronicle 高温前瞻"
  },
  {
    date: "2026-06-13",
    home: "Brazil",
    away: "Morocco",
    heat: 94,
    homeMood: 0.18,
    awayMood: 0.22,
    tempoModifier: 0.08,
    label: "明日最高热度",
    summary: "巴西与摩洛哥是明日最强话题战。巴西明星与安切洛蒂关注度高，摩洛哥延续 2022 黑马记忆，公众期待强强对撞。",
    source: "Group C 前瞻与公开报道"
  },
  {
    date: "2026-06-13",
    home: "Haiti",
    away: "Scotland",
    heat: 90,
    homeMood: 0.28,
    awayMood: 0.32,
    tempoModifier: 0.03,
    label: "情绪热度很高",
    summary: "海地时隔 52 年回归世界杯，波士顿海地侨民关注度高；苏格兰球迷大规模抵达，28 年等待让这场具备强烈情绪价值。",
    source: "People 与 NY Post 球迷报道"
  },
  {
    date: "2026-06-13",
    home: "Australia",
    away: "Turkey",
    heat: 78,
    homeMood: 0.22,
    awayMood: 0.30,
    tempoModifier: 0.07,
    label: "年轻阵容话题",
    summary: "澳大利亚续约主帅带来稳定预期，土耳其年轻攻击群和居莱尔话题热度更高。公众反应更看好土耳其上限，但防线仍是风险。",
    source: "Guardian 土耳其前瞻与澳媒报道"
  },
  {
    date: "2026-06-14",
    home: "Germany",
    away: "Curacao",
    heat: 88,
    homeMood: 0.22,
    awayMood: 0.18,
    tempoModifier: 0.16,
    label: "强弱反差最高",
    summary: "德国首战关注度高，公众讨论集中在能否摆脱连续大赛小组赛阴影；库拉索首次参赛带来强烈故事性，但阵容深度和比赛强度差距明显。",
    source: "Houston Chronicle 与公开赛前报道"
  },
  {
    date: "2026-06-14",
    home: "Ivory Coast",
    away: "Ecuador",
    heat: 72,
    homeMood: 0.16,
    awayMood: -0.18,
    tempoModifier: -0.04,
    label: "核心缺席变量",
    summary: "科特迪瓦非洲杯冠军气质提升信心；厄瓜多尔中场核心凯塞多停赛使控场能力下修，公众反应更偏向谨慎低比分。",
    source: "FIFA纪律信息与赛前赛程报道"
  },
  {
    date: "2026-06-14",
    home: "Netherlands",
    away: "Japan",
    heat: 92,
    homeMood: 0.14,
    awayMood: 0.30,
    tempoModifier: 0.07,
    label: "爆冷讨论最高",
    summary: "荷兰纸面实力更高，但日本整体压迫、边路速度和近年大赛口碑带来很高讨论度；舆论普遍认为这是明日最有技术含量的一场。",
    source: "Group F 前瞻与公开讨论"
  },
  {
    date: "2026-06-14",
    home: "Sweden",
    away: "Tunisia",
    heat: 66,
    homeMood: 0.12,
    awayMood: 0.06,
    tempoModifier: 0.00,
    label: "锋线效率观察",
    summary: "瑞典锋线组合热度较高，突尼斯的纪律性和身体对抗会压低比赛节奏。公众预期偏向瑞典小胜或胶着低比分。",
    source: "赛程与赛前赔率/舆论观察"
  },
  {
    date: "2026-06-15",
    home: "Spain",
    away: "Cape Verde",
    heat: 96,
    homeMood: 0.28,
    awayMood: 0.18,
    tempoModifier: 0.14,
    label: "强队首秀热度最高",
    summary: "西班牙是明日最大流量强队，亚马尔状态话题持续升温；佛得角首次参赛带来故事性，但阵容深度和控球压迫承压明显。",
    source: "赛程与公开前瞻/球迷讨论"
  },
  {
    date: "2026-06-15",
    home: "Belgium",
    away: "Egypt",
    heat: 86,
    homeMood: 0.10,
    awayMood: 0.22,
    tempoModifier: 0.08,
    label: "球星对撞",
    summary: "比利时阵容仍有上限但转换防守受质疑；埃及围绕萨拉赫和马尔穆什的关注度高，舆论更期待反击制造进球。",
    source: "Group G 赛前报道与球迷讨论"
  },
  {
    date: "2026-06-15",
    home: "Saudi Arabia",
    away: "Uruguay",
    heat: 80,
    homeMood: 0.12,
    awayMood: 0.18,
    tempoModifier: 0.05,
    label: "强度差异明显",
    summary: "沙特有2022冷门记忆和熟悉体系，但乌拉圭在逼抢、对抗和前场冲击上更被看好。舆论倾向乌拉圭掌控高强度节奏。",
    source: "赛前赛程与公开讨论"
  },
  {
    date: "2026-06-15",
    home: "Iran",
    away: "New Zealand",
    heat: 70,
    homeMood: 0.06,
    awayMood: 0.08,
    tempoModifier: -0.04,
    label: "节奏控制战",
    summary: "伊朗经验与锋线默契更强，新西兰排名低但定位球和身体对抗清晰。公众预期偏向伊朗小胜，比赛节奏可能偏低。",
    source: "Group G 赛前报道与公开讨论"
  },
  {
    date: "2026-06-16",
    home: "France",
    away: "Senegal",
    heat: 94,
    homeMood: 0.22,
    awayMood: 0.20,
    tempoModifier: 0.10,
    label: "强强对话",
    summary: "法国阵容厚度和球星解决问题能力仍是第一档，塞内加尔身体强度、速度和防线经验让比赛不像普通强弱局。公众讨论集中在法国能否顶住高对抗。",
    source: "Group I 前瞻与公开讨论"
  },
  {
    date: "2026-06-16",
    home: "Iraq",
    away: "Norway",
    heat: 82,
    homeMood: 0.06,
    awayMood: 0.30,
    tempoModifier: 0.06,
    label: "巨星终结点",
    summary: "伊拉克会以低位和反击争取拖慢节奏，挪威围绕哈兰德与厄德高的热度很高。公众预期更看好挪威用前场质量打破密集防线。",
    source: "Group I 前瞻与公开讨论"
  },
  {
    date: "2026-06-16",
    home: "Argentina",
    away: "Algeria",
    heat: 98,
    homeMood: 0.30,
    awayMood: 0.14,
    tempoModifier: 0.08,
    label: "卫冕冠军首秀",
    summary: "阿根廷首秀热度最高，梅西状态和老将体能是核心话题；阿尔及利亚边路速度和反击有威胁，但整体稳定性仍低于卫冕冠军。",
    source: "Group J 前瞻与公开讨论"
  },
  {
    date: "2026-06-16",
    home: "Austria",
    away: "Jordan",
    heat: 76,
    homeMood: 0.18,
    awayMood: 0.20,
    tempoModifier: 0.03,
    label: "体系压迫对首次参赛",
    summary: "奥地利高压体系成熟，约旦首次参赛带来情绪加成和反击想象。公众预期倾向奥地利，但对约旦上半场韧性讨论不少。",
    source: "Group J 赛前报道与公开讨论"
  },
  {
    date: "2026-06-17",
    home: "Portugal",
    away: "DR Congo",
    heat: 96,
    homeMood: 0.20,
    awayMood: 0.14,
    tempoModifier: 0.10,
    label: "C罗第六届世界杯",
    summary: "葡萄牙阵容厚度和中场质量很强，C罗第六届世界杯带来最高流量之一；刚果民主共和国回归世界杯故事性强，但整体默契和防线承压。",
    source: "Guardian/TalkSPORT 赛前报道与公开讨论"
  },
  {
    date: "2026-06-17",
    home: "England",
    away: "Croatia",
    heat: 98,
    homeMood: 0.18,
    awayMood: 0.18,
    tempoModifier: 0.04,
    label: "强强首秀",
    summary: "英格兰首秀流量极高，凯恩和贝林厄姆状态受关注；克罗地亚大赛经验和莫德里奇最后一舞话题会抬高抗衡能力，英格兰伤病让后防稳定性略降。",
    source: "TalkSPORT 与 Guardian 赛前报道"
  },
  {
    date: "2026-06-17",
    home: "Ghana",
    away: "Panama",
    heat: 74,
    homeMood: -0.12,
    awayMood: 0.08,
    tempoModifier: -0.03,
    label: "签证/阵容变量",
    summary: "加纳围绕托马斯·帕尔特伊签证问题的讨论较多，阵容完整性存在不确定；巴拿马组织纪律强，适合把比赛拖进低比分。",
    source: "Guardian 赛前动态与公开讨论"
  },
  {
    date: "2026-06-17",
    home: "Uzbekistan",
    away: "Colombia",
    heat: 78,
    homeMood: 0.16,
    awayMood: 0.22,
    tempoModifier: 0.06,
    label: "首次参赛对南美火力",
    summary: "乌兹别克斯坦首次参赛有情绪加成，防守反击路径清晰；哥伦比亚进攻天赋更高，迪亚斯和J罗话题让公众更看好其上限。",
    source: "Group K 前瞻与公开讨论"
  },
  {
    date: "2026-06-18",
    home: "Czech Republic",
    away: "South Africa",
    heat: 68,
    homeMood: 0.04,
    awayMood: 0.02,
    tempoModifier: 0.02,
    label: "抢分压力战",
    summary: "两队首战都输球，本场容错率很低。捷克定位球和身体对抗更强，南非需要提升反击质量，公众预期偏向谨慎小比分。",
    source: "Group A 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-18",
    home: "Switzerland",
    away: "Bosnia and Herzegovina",
    heat: 72,
    homeMood: 0.14,
    awayMood: 0.10,
    tempoModifier: -0.01,
    label: "双平局后求稳",
    summary: "瑞士首轮被卡塔尔逼平，体系稳定但进攻效率要提高；波黑逼平加拿大后士气不错，哲科经验仍是关键。舆论更看重瑞士组织纪律。",
    source: "Group B 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-18",
    home: "Canada",
    away: "Qatar",
    heat: 88,
    homeMood: 0.22,
    awayMood: 0.14,
    tempoModifier: 0.04,
    label: "东道主压力战",
    summary: "加拿大首轮平局后需要在温哥华拿主动权，戴维和戴维斯仍是流量核心；卡塔尔逼平瑞士提升信心，但连续客场强度是变量。",
    source: "Group B 首轮赛果与球迷反应"
  },
  {
    date: "2026-06-18",
    home: "Mexico",
    away: "South Korea",
    heat: 94,
    homeMood: 0.26,
    awayMood: 0.18,
    tempoModifier: 0.08,
    label: "小组头名卡位",
    summary: "墨西哥和韩国首轮都赢球，本场直接影响A组头名。墨西哥主场情绪和防守反馈更好，韩国前场球星质量让比赛不会轻松。",
    source: "Group A 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-19",
    home: "Brazil",
    away: "Haiti",
    heat: 92,
    homeMood: 0.16,
    awayMood: 0.10,
    tempoModifier: 0.08,
    label: "强队修正战",
    summary: "巴西首轮被摩洛哥逼平后需要主动抢分，内马尔伤病管理仍是舆论焦点；海地首轮输给苏格兰后会更保守，公众预期偏向巴西压制。",
    source: "首轮赛果、伤病报道与公开讨论"
  },
  {
    date: "2026-06-19",
    home: "United States",
    away: "Australia",
    heat: 95,
    homeMood: 0.28,
    awayMood: 0.12,
    tempoModifier: 0.10,
    label: "东道主乘势",
    summary: "美国首轮4-1大胜后舆论明显升温，普利西奇健康状况仍需观察；澳大利亚首轮输给土耳其后压力上升，可能先求稳再反击。",
    source: "首轮赛果与美澳赛前报道"
  },
  {
    date: "2026-06-19",
    home: "Scotland",
    away: "Morocco",
    heat: 90,
    homeMood: 0.18,
    awayMood: 0.24,
    tempoModifier: 0.06,
    label: "C组关键卡位",
    summary: "苏格兰首轮小胜海地，士气稳定；摩洛哥逼平巴西后公众评价上调，球队防守组织和反击效率获得更多认可。",
    source: "首轮赛果与球迷反应"
  },
  {
    date: "2026-06-19",
    home: "Turkey",
    away: "Paraguay",
    heat: 80,
    homeMood: -0.06,
    awayMood: 0.04,
    tempoModifier: 0.02,
    label: "反弹压力战",
    summary: "土耳其首轮不敌澳大利亚后承压，年轻攻击群需要兑现天赋；巴拉圭首轮大败美国后也会更谨慎，比赛可能有较强身体对抗。",
    source: "Group D 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-20",
    home: "Germany",
    away: "Ivory Coast",
    heat: 88,
    homeMood: 0.30,
    awayMood: 0.16,
    tempoModifier: 0.12,
    label: "双胜强强战",
    summary: "德国首轮7-1释放强势信号，科特迪瓦首轮小胜后防守反馈不错。公众更看好德国延续压迫节奏，但科特迪瓦转换速度能制造压力。",
    source: "Group E 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-20",
    home: "Netherlands",
    away: "Sweden",
    heat: 90,
    homeMood: 0.12,
    awayMood: 0.26,
    tempoModifier: 0.10,
    label: "瑞典状态上修",
    summary: "荷兰首轮2-2日本暴露防线波动，瑞典4-1突尼斯让锋线效率被明显上修。舆论认为这是F组头名关键卡位。",
    source: "Group F 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-20",
    home: "Ecuador",
    away: "Curacao",
    heat: 64,
    homeMood: 0.10,
    awayMood: -0.10,
    tempoModifier: 0.04,
    label: "惨败后修正",
    summary: "厄瓜多尔首轮小负，仍保有防守底盘；库拉索首轮1-7惨败后信心和防线稳定性下修。公众预期偏向厄瓜多尔主动压制。",
    source: "Group E 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-20",
    home: "Tunisia",
    away: "Japan",
    heat: 82,
    homeMood: -0.06,
    awayMood: 0.26,
    tempoModifier: 0.08,
    label: "日本稳定性上修",
    summary: "突尼斯首轮1-4失利后防线压力很大，日本逼平荷兰后整体性和边路速度获得更高评价。公众更看好日本掌控节奏。",
    source: "Group F 首轮赛果与公开讨论"
  },
  {
    date: "2026-06-21",
    home: "Spain",
    away: "Saudi Arabia",
    heat: 94,
    homeMood: 0.18,
    awayMood: 0.08,
    tempoModifier: 0.10,
    label: "强队反弹战",
    summary: "西班牙首轮被佛得角逼平后需要提高终结效率，亚马尔回归首发讨论升温；沙特逼平乌拉圭后信心增加，但控球承压仍明显。",
    source: "首轮赛果、今日赛程与公开前瞻"
  },
  {
    date: "2026-06-21",
    home: "Belgium",
    away: "Iran",
    heat: 84,
    homeMood: 0.10,
    awayMood: 0.08,
    tempoModifier: 0.02,
    label: "双平局求胜",
    summary: "比利时首轮平埃及后需要把边路爆点转化为进球；伊朗首轮韧性较强，锋线经验会让比赛更胶着。",
    source: "首轮赛果与今日公开前瞻"
  },
  {
    date: "2026-06-21",
    home: "Uruguay",
    away: "Cape Verde",
    heat: 82,
    homeMood: 0.08,
    awayMood: 0.22,
    tempoModifier: -0.02,
    label: "佛得角信心上修",
    summary: "乌拉圭首轮进攻组织不够顺，仍有对抗和冲击优势；佛得角逼平西班牙后公众评价上调，低位防守会继续拖慢节奏。",
    source: "首轮赛果与今日公开前瞻"
  },
  {
    date: "2026-06-21",
    home: "New Zealand",
    away: "Egypt",
    heat: 74,
    homeMood: 0.06,
    awayMood: 0.16,
    tempoModifier: 0.05,
    label: "锋线个人能力",
    summary: "新西兰首轮拿到平局后会继续依靠身体对抗和定位球；埃及前场个人能力更强，萨拉赫和马尔穆什的反击效率是关键。",
    source: "首轮赛果与今日公开前瞻"
  },
  {
    date: "2026-06-22",
    home: "Argentina",
    away: "Austria",
    heat: 98,
    homeMood: 0.30,
    awayMood: 0.16,
    tempoModifier: 0.08,
    label: "卫冕冠军热度高",
    summary: "阿根廷首轮3-0后状态反馈很强，梅西话题与团队稳定性继续拉高关注；奥地利首轮取胜，高压体系会给阿根廷出球制造压力。",
    source: "首轮赛果、今日赛程与公开前瞻"
  },
  {
    date: "2026-06-22",
    home: "France",
    away: "Iraq",
    heat: 94,
    homeMood: 0.26,
    awayMood: -0.06,
    tempoModifier: 0.10,
    label: "强队延续性观察",
    summary: "法国首轮3-1击败塞内加尔，姆巴佩和前场深度是主要关注点；伊拉克首轮失球较多，需要压缩空间和降低转换风险。",
    source: "首轮赛果与今日公开前瞻"
  },
  {
    date: "2026-06-22",
    home: "Norway",
    away: "Senegal",
    heat: 88,
    homeMood: 0.28,
    awayMood: 0.10,
    tempoModifier: 0.08,
    label: "锋线与身体强度",
    summary: "挪威首轮4-1释放进攻效率，哈兰德和厄德高是讨论核心；塞内加尔虽首轮落败，但速度、对抗和防线经验仍具备拉扯能力。",
    source: "首轮赛果与今日公开前瞻"
  },
  {
    date: "2026-06-22",
    home: "Jordan",
    away: "Algeria",
    heat: 72,
    homeMood: 0.08,
    awayMood: -0.02,
    tempoModifier: 0.02,
    label: "首次参赛韧性战",
    summary: "约旦首轮虽失利但打入队史世界杯首球，情绪价值较强；阿尔及利亚首轮不敌阿根廷后需要提升边路效率和防守集中度。",
    source: "首轮赛果与今日公开前瞻"
  }
];
