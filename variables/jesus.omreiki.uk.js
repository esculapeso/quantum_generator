let customSideText = "JESUS";
let sideTextsOptions = ["JESUS", "HOLY"];
let randomBackgroundMiddle = "calc(50vh + 50px)";

let liveTransmissions = [
	{"page": "Jesus", "type": "embedLink", "name": "Faustyna", "url": "https://www.youtube.com/embed/Q_wF0dNeUHc"},
	{"page": "Jesus", "type": "embedLink", "name": "Niepokalanów", "url": "https://www.youtube.com/embed/J8NzgrmGH_Q"},
	{"page": "Jesus", "type": "embedLink", "name": "Lourdes", "url": "https://www.youtube.com/embed/Zz2lqOMiBeo"},
]

let defaultSession = [
	
	{"page": "Jesus", "name":"Jesus Lungs", "Session time":"Sat, 06 Jan 2024 19:06:22 GMT","Focus Text":"Χριστός σε εμπιστεύομαι","videoId":"yT6D7U9T1rY","videoMode":"undefined","imageData":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2023/01/Jesus-Healthy-Lungs.webp\")","ImageCaption":"άγιος άγιος","sideText":"Χριστός","people":[{"role":"therapist","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/shroudgif.gif\")"},{"role":"person1","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/JesusLungs.png\")"},{"role":"person2","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2022/12/la.jpg\")"},{"role":"person3","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/ImageToStl.com_orto_xl_jesus_gold_up.gif\")"},{"role":"person4","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2023/01/Jesus-Healthy-Mikkel.webp\")"},{"role":"person5","data":"none"},{"role":"person6","data":"none"}],"qrngInterval":938,"isPyramid":true,"callClip":"quad","callClipSize":"90","innerBgColorLeft":"","innerBgColorRight":""},
	
	{"page": "Jesus", "name":"Jesus Faustyna", "Session time":"Fri, 05 Jan 2024 16:50:13 GMT","Focus Text":"Jezu ufam Tobie","imageData":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/jesus_bevel.png\")","ImageCaption":"HOLY HOLY","sideText":"JESUS","people":[{"role":"therapist","data":"url(\"/wp-content/uploads/2024/01/shroudgif.gif\")"},{"role":"person1","data":"url(\"/wp-content/uploads/2024/01/JesusLungs.png\")"},{"role":"person2","data":"url(\"/wp-content/uploads/2022/12/la.jpg\")"},{"role":"person3","data":"url(\"/wp-content/uploads/2024/01/ImageToStl.com_orto_xl_jesus_gold_up.gif\")"},{"role":"person4","data":"url(\"/wp-content/uploads/2023/01/Jesus-Healthy-Mikkel.webp\")"},{"role":"person5","data":"none"},{"role":"person6","data":"none"}],"qrngInterval":938,"isPyramid":false,"callClip":"quad","callClipSize":"90","innerBgColorLeft":"","innerBgColorRight":""},
	
	{"page": "Angeloi", "name":"285 Hz", "Session time":"Sun, 07 Jan 2024 12:17:34 GMT","Focus Text":"Jesus I trust in You","videoId":"2pB1yzdU8JU","videoMode":"undefined","imageData":"none","ImageCaption":"Quantum","sideText":"ANGELOI","people":[{"role":"therapist","data":"none"},{"role":"person1","data":"none"},{"role":"person2","data":"none"},{"role":"person3","data":"none"},{"role":"person4","data":"none"},{"role":"person5","data":"none"},{"role":"person6","data":"none"}],"qrngInterval":938,"isPyramid":false,"callClip":"quad","callClipSize":"90","innerBgColorLeft":"","innerBgColorRight":""},
	
	{"page": "Jesus", "name":"Holy Grail", "Session time":"Thu, 11 Jan 2024 22:14:21 GMT","Focus Text":"Jezu ufam Tobie","imageData":"none","image3dData":"https://raw.githubusercontent.com/esculapeso/3dmodels/main/grail.glb","ImageCaption":"Holy Grail","sideText":"JESUS","people":[{"role":"therapist","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/shroudgif.gif\")"},{"role":"person1","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/JesusLungs.png\")"},{"role":"person2","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2022/12/la.jpg\")"},{"role":"person3","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2024/01/ImageToStl.com_orto_xl_jesus_gold_up.gif\")"},{"role":"person4","data":"url(\"https://jesus.omreiki.uk/wp-content/uploads/2023/01/Jesus-Healthy-Mikkel.webp\")"},{"role":"person5","data":"none"},{"role":"person6","data":"none"}],"qrngInterval":938,"isPyramid":true,"callClip":"quad","callClipSize":"90","innerBgColorLeft":"","innerBgColorRight":""},
	
	{"page": "rede", "name":"Ich rede Deutsch", "Session time":"Tue, 30 Jan 2024 13:00:38 GMT","Focus Text":"Ich rede Deutsch","imageData":"none","ImageCaption":"Täglich","sideText":"REDE","people":[{"role":"therapist","data":"none"},{"role":"person1","data":"none"},{"role":"person2","data":"none"},{"role":"person3","data":"none"},{"role":"person4","data":"none"},{"role":"person5","data":"none"},{"role":"person6","data":"none"}],"qrngInterval":938,"isPyramid":false,"callClip":"quad","callClipSize":"90","innerBgColorLeft":"","innerBgColorRight":""}
	
]



let focusText = "Jesus I trust in You";

let generatorsNumber = 10;

let roundViewImages =  [
		{ caption: "Head inwards" , text: 'Divine Mercy Chapel', filepath: "/wp-content/uploads/2023/03/jut_circle_rev_xs-1.png" },
		{ caption: "Head inwards 80" , text: 'Divine Mercy Chapel', filepath: "/wp-content/uploads/2023/03/jut_circle_rev_80_xs.png" },
		{ caption: "Head inwards 120" , text: 'Divine Mercy Chapel', filepath: "/wp-content/uploads/2023/03/jut_circle_rev_120_xs.png" },
		{ caption: "Head outwards" , text: 'Divine Mercy Chapel', filepath: "/wp-content/uploads/2023/03/jut_circle_xs.png" },
]

let jesusMantras = [
	{lang:"ar", mantra:"انا أومن بك ايها المسيح", image:"/wp-content/uploads/2022/12/ar.jpg"},
	{lang:"cn", mantra:"耶穌我信賴祢", image:"/wp-content/uploads/2022/12/cn.jpg"},
	{lang:"cz", mantra:"Ježíši důvěřuji Ti", image:"/wp-content/uploads/2022/12/cz.jpg"},
	{lang:"de", mantra:"Jesus ich vertraue auf Dich", default:true, image:"/wp-content/uploads/2022/12/de.jpg"},
	{lang:"dk", mantra:"Jesus jeg stoler på Dig", image:"/wp-content/uploads/2022/12/dk.jpg"},
	{lang:"fr", mantra:"Jésus j'ai confiance en toi", image:"/wp-content/uploads/2022/12/fr.jpg"},
	{lang:"gb", mantra:"Jesus I trust in You", default:true, image:"/wp-content/uploads/2022/12/gb.jpg"},
	{lang:"hu", mantra:"Jézusom bízom benned", image:"/wp-content/uploads/2022/12/hu.jpg"},
	{lang:"id", mantra:"Yesus aku percaya kepadamu", image:"/wp-content/uploads/2022/12/id.jpg"},
	{lang:"ir", mantra:"عیسی من اعتماد شما در", image:"/wp-content/uploads/2022/12/ir.jpg"},
	{lang:"it", mantra:"Gesù io credo in te", image:"/wp-content/uploads/2022/12/it.jpg"},
	{lang:"jv", mantra:"Gusti Yesus kawula pitados dhumateng Paduka", image:"/wp-content/uploads/2022/12/jv.jpg"},
	{lang:"kr", mantra:"예수님, 저는 당신께 의탁합니다", image:"/wp-content/uploads/2022/12/kr.jpg"},
	{lang:"la", mantra:"Jesu in Te confido", default:true, image:"/wp-content/uploads/2022/12/la.jpg"},
	{lang:"lt", mantra:"Jėzau pasitikiu Tavimi", image:"/wp-content/uploads/2022/12/lt.jpg"},
	{lang:"pl", mantra:"Jezu ufam Tobie", default:true, image:"/wp-content/uploads/2022/12/pl.jpg"},
	{lang:"pt", mantra:"Jesus eu confio em vós", image:"/wp-content/uploads/2022/12/pt.jpg"},
	{lang:"ru", mantra:"Иисус я уповаю на Тебя", image:"/wp-content/uploads/2022/12/ru.jpg"},
	{lang:"rw", mantra:"Yezu Nyirimpuhwe", image:"/wp-content/uploads/2022/12/rw.jpg"},
	{lang:"rwb", mantra:"Yezu Ndakwizera", image:"/wp-content/uploads/2022/12/rwb.jpg"},
	{lang:"sk", mantra:"Ježišu dôverujem ti", image:"/wp-content/uploads/2022/12/sk.jpg"},
	{lang:"sr", mantra:"Исус, верујем ти", image:"/wp-content/uploads/2022/12/sr.jpg"},
	{lang:"us", mantra:"In Jesus we trust", image:"/wp-content/uploads/2022/12/us.jpg"},
]

let videosForFocus = [
	{ id: "RfopVeAih9k", name: "285 Hz Pure Tone", only: ["Angeloi"] },
	{ id: "2pB1yzdU8JU", name: "285 Hz Marimba", only: ["Angeloi"] },
	{ id: "xHPFm46Hyek", name: "Bee Hive Hex" },
	{ id: "yT6D7U9T1rY", name: "Bee Noises" },
	{ id: "HduDtC7meZo", name: "Arrival to Hive" },
	{ id: "Fq4Aul-i4C8", name: "Clean Energy" },
	{ id: "xphwtv6N_nk", name: "Clean Energy" },
	{ id: "0alWwLqDKBg", name: "Angelina", only: ["Jesus", "Angeloi"]  },
	{ id: "6f0y1Iaorug", name: "Waves 1" },
	{ id: "LTmXmskEMas", name: "Waves 2" },
	{ id: "5Lzi4T6mu0U", name: "Meditation" },
	{ id: "fiSowadSS-E", name: "Tropical Beach" },
	{ id: "uWfwDnroMEA", name: "Relax Fire" },
	{ id: "mRlat5h_GTM", name: "Chills from Fireplace" },
	{ id: "WHPEKLQID4U", name: "Soothing Waves" },
	{ id: "YIElwQiqMQ4", name: "Calming Ocean" },
	{ id: "WmYgr8zwJmI", name: "Jungle River" },
	{ id: "jkLRith2wcc", name: "Water Sounds" },
	{ id: "R4QvFu9tn98", name: "SUN Wave" },
	{ id: "bz9YoyEXC38", name: "Solar Flare" },
	{ id: "-CeafZpw_kw", name: "Om Reiki Mandalas" },
	{ id: "t0BdKM1dkos", name: "Mireille Healy" },
	{ id: "-PSo-c2oByo", name: "Sun Quan" },
	{ id: "eKFTSSKCzWA", name: "Nature" },
	{ id: "3co7V1xdthA", name: "Quantum Holopedia" },
	{ id: "4XT5PsazYcM", name: "House build" },
];

let imagesForFocus =  [
	{ category:"John Paul II", caption: "JP II", filepath: "https://jesus.omreiki.uk/wp-content/uploads/2024/01/jp2_narrow.jpg" },
	{ category:"John Paul II", caption: "JP II", filepath: "https://jesus.omreiki.uk/wp-content/uploads/2024/01/jp2_wide.jpg" },
	{ category:"Scriptures", caption: "Papyri", filepath: "https://jesus.omreiki.uk/wp-content/uploads/2023/07/PapyriGenesisJohn.png" },
	{ category:"3D", caption: "Holy Grail", country: "British" , text: 'Holy Grail', filepath: "https://raw.githubusercontent.com/esculapeso/3dmodels/main/grail.glb", preview: "https://raw.githubusercontent.com/esculapeso/3dmodels/main/grail.glb" },
	{ category:"3D", caption: "Jesus Trust", country: "British" , text: 'Jesus I trust in You', filepath: "https://raw.githubusercontent.com/esculapeso/3dmodels/main/jesus_gold_up.glb", preview: "https://raw.githubusercontent.com/esculapeso/3dmodels/main/jesus_gold_up_mini.glb" },
	{ category:"3D", caption: "Jesus Heart", country: "British" , text: 'Jesus Heart', filepath: "https://raw.githubusercontent.com/esculapeso/3dmodels/main/jesus_heart_opt.glb", preview: "https://raw.githubusercontent.com/esculapeso/3dmodels/main/jesus_heart_mini.glb" },
	{ category:"JUT", caption: "JUT HD", country: "Polish" , text: 'Jezu ufam Tobie Łagiewniki', filepath: "/wp-content/uploads/2024/01/jesus_bevel.png" },
	{ category:"JUT", caption: "First JUT", country: "Polish" , text: 'Jezu ufam Tobie', filepath: "/wp-content/uploads/2023/04/Kazimirowski_Eugeniusz_Divine_Mercy_1934_pos.jpg" },
	{ category:"Scriptures", caption: "Lungs", country: "Phoenician" , text: 'Jesus Healthy Lungs', filepath: "/wp-content/uploads/2023/01/Jesus-Healthy-Lungs.webp" },
		{ category:"Scriptures", caption: "Healthy", country: "Phoenician" , text: 'Jesus Healthy Mikkel', filepath: "/wp-content/uploads/2023/01/Jesus-Healthy-Mikkel.webp" },
		{ category:"JUT", caption: "cn", country: "Chinese" , text: '耶穌我信賴祢', filepath: "/wp-content/uploads/2022/12/cn.jpg" },
		{ category:"JUT", caption: "cz", country: "Czech" , text: 'Ježíši důvěřuji Ti', filepath: "/wp-content/uploads/2022/12/cz.jpg" },
		{ category:"JUT", caption: "de", country: "German" , text: 'Jesus ich vertraue auf Dich', filepath: "/wp-content/uploads/2022/12/de.jpg" },
		{ category:"JUT", caption: "dk", country: "Danish" , text: 'Jesus jeg stoler på Dig', filepath: "/wp-content/uploads/2022/12/dk.jpg" },
		{ category:"JUT", caption: "fr", country: "French" , text: 'Jésus j\'ai confiance en toi', filepath: "/wp-content/uploads/2022/12/fr.jpg" },
		{ category:"JUT", caption: "gb", country: "British" , text: 'Jesus I trust in You', filepath: "/wp-content/uploads/2022/12/gb.jpg" },
		{ category:"JUT", caption: "hu", country: "Hungarian" , text: 'Jézusom bízom benned', filepath: "/wp-content/uploads/2022/12/hu.jpg" },
		{ category:"JUT", caption: "id", country: "Indonesian" , text: 'Yesus aku percaya kepadamu', filepath: "/wp-content/uploads/2022/12/id.jpg" },
		{ category:"JUT", caption: "ir", country: "Iranian" , text: 'عیسی من اعتماد شما در', filepath: "/wp-content/uploads/2022/12/ir.jpg" },
		{ category:"JUT", caption: "it", country: "Italian" , text: 'Gesù io credo in te', filepath: "/wp-content/uploads/2022/12/it.jpg" },
		{ category:"JUT", caption: "kr", country: "Korean" , text: '예수님, 저는 당신께 의탁합니다', filepath: "/wp-content/uploads/2022/12/kr.jpg" },
		{ category:"JUT", caption: "la", country: "Latin" , text: 'Jesu in Te confido', filepath: "/wp-content/uploads/2022/12/la.jpg" },
		{ category:"JUT", caption: "lt", country: "Lithuanian" , text: 'Jėzau pasitikiu Tavimi', filepath: "/wp-content/uploads/2022/12/lt.jpg" },
		{ category:"JUT", caption: "pl", country: "Polish" , text: 'Jezu ufam Tobie', filepath: "/wp-content/uploads/2022/12/pl.jpg" },
		{ category:"JUT", caption: "pt", country: "Portuguese" , text: 'Jesus eu confio em vós', filepath: "/wp-content/uploads/2022/12/pt.jpg" },
		{ category:"JUT", caption: "ru", country: "Russian" , text: 'Иисус я уповаю на Тебя', filepath: "/wp-content/uploads/2022/12/ru.jpg" },
		{ category:"JUT", caption: "rw", country: "Rwandan" , text: 'Yezu Nyirimpuhwe', filepath: "/wp-content/uploads/2022/12/rw.jpg" },
		{ category:"JUT", caption: "wb", country: "Rwandan2" , text: 'Yezu Ndakwizera', filepath: "/wp-content/uploads/2022/12/rwb.jpg" },
		{ category:"JUT", caption: "sk", country: "Slovak" , text: 'Ježišu dôverujem ti', filepath: "/wp-content/uploads/2022/12/sk.jpg" },
		{ category:"JUT", caption: "sr", country: "Serbian" , text: 'Исус, верујем ти', filepath: "/wp-content/uploads/2022/12/sr.jpg" },
		{ category:"JUT", caption: "us", country: "American" , text: 'In Jesus we trust', filepath: "/wp-content/uploads/2022/12/us.jpg" },
	{ category:"Reiki Symbols", caption: "Cho Ku Rei", filepath: "https://omreiki.uk/wp-content/uploads/2022/07/chokurei.gif" },
	{ category:"Reiki Symbols", caption: "Sei He Ki", filepath: "https://omreiki.uk/wp-content/uploads/2022/07/seiheki.gif" },
	{ category:"Reiki Symbols", caption: "Li Nga", filepath: "https://omreiki.uk/wp-content/uploads/2022/12/linga.gif" },
        ];

let emotionsList = [
    { name: "Happy", value: 4 },
    { name: "Joyful", value: 3 },
    { name: "Proud", value: 4 },
    { name: "Satisfied", value: 1 },
    { name: "Sad", value: 0 },
    { name: "Angry", value: 0 },
    { name: "Anxious", value: 0 },
    { name: "Worried", value: 2 },
  ];

 let energiesList = [
    { name: "Energy", value: 4 },
    { name: "Power", value: 3 },
    { name: "Strength", value: 4 },
    { name: "Willpower", value: 1 },
  ];

 let healthList = [
    { name: "Heart", value: 4, link: "https://en.wikipedia.org/wiki/Heart" },
    { name: "Lungs", value: 3, link: "https://en.wikipedia.org/wiki/Lungs" },
    { name: "Vagus", value: 4, link: "https://en.wikipedia.org/wiki/Vagus" },
    { name: "Liver", value: 1, link: "https://en.wikipedia.org/wiki/Liver" },
    { name: "Intestine", value: 1, link: "https://en.wikipedia.org/wiki/Gastrointestinal_tract" },
    { name: "Lymph", value: 1, link: "https://en.wikipedia.org/wiki/Lymph" },
    { name: "Blood", value: 1, link: "https://en.wikipedia.org/wiki/Blood" },
    { name: "Memory", value: 1, link: "https://en.wikipedia.org/wiki/Memory" },
    { name: "Neurons", value: 1, link: "https://en.wikipedia.org/wiki/Neuron" },
  ];
 
 let psalmVideo = [{
		lang: "en",
	 	flag: "🇬🇧",
	 	speaker: "♀",
		psalms: [{
				name: "Psalm 1",
				youtube: "5N2u1u-FOK8",
				text: "1 Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,\n\n2 but whose delight is in the law of the Lord, and who meditates on his law day and night.\n\n3 That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither, whatever they do prospers.\n\n4 Not so the wicked! They are like chaff that the wind blows away.\n\n5 Therefore the wicked will not stand in the judgment, nor sinners in the assembly of the righteous.\n\n6 For the Lord watches over the way of the righteous, but the way of the wicked leads to destruction."
			},
			{
				name: "Psalm 2",
				youtube: "04rwEVJs6Xc",
				text: "1 Why do the nations conspire and the peoples plot in vain?\n\n2 The kings of the earth rise up and the rulers band together against the Lord and against his anointed, saying,\n\n3 “Let us break their chains and throw off their shackles.” \n\n4 The One enthroned in heaven laughs; the Lord scoffs at them.\n\n5 He rebukes them in his anger and terrifies them in his wrath, saying,\n\n6 “I have installed my king on Zion, my holy mountain.” \n\n7 I will proclaim the Lord’s decree:  He said to me, “You are my son; today I have become your father.\n\n8 Ask me, and I will make the nations your inheritance, the ends of the earth your possession.\n\n9 You will break them with a rod of iron[b]; you will dash them to pieces like pottery.” \n\n10 Therefore, you kings, be wise; be warned, you rulers of the earth.\n\n11 Serve the Lord with fear and celebrate his rule with trembling.\n\n12 Kiss his son, or he will be angry and your way will lead to your destruction, for his wrath can flare up in a moment. Blessed are all who take refuge in him."
			},
			{
				name: "Psalm 3",
				youtube: "LEVgL-s9u7M"
			},
			{
				name: "Psalm 4",
				youtube: "nZHD6qljddY"
			},
			{
				name: "Psalm 5",
				youtube: "2b2UjguZF-8"
			},
			{
				name: "Psalm 6",
				youtube: "zKb2LTpkMSU"
			},
			{
				name: "Psalm 7",
				youtube: "kDCdraYa70g"
			},
			{
				name: "Psalm 8",
				youtube: "5jLsc-ygOEM"
			},
			{
				name: "Psalm 9",
				youtube: "2V3Ca4LX50s"
			},
			{
				name: "Psalm 10",
				youtube: "r32q9ETd41Y"
			},
			{
				name: "Psalm 11",
				youtube: "A0wVlFuqB_g"
			},
			{
				name: "Psalm 12",
				youtube: "IMYX_yw7ksc"
			},
			{
				name: "Psalm 13",
				youtube: "niGrwC7gN6c"
			},
			{
				name: "Psalm 14",
				youtube: "02EymZSvFpU"
			},
			{
				name: "Psalm 15",
				youtube: "Q4C5t7KK_nU"
			},
			{
				name: "Psalm 16",
				youtube: "UC1MK7GgAls"
			},
			{
				name: "Psalm 17",
				youtube: "z1rFKSeeAhI"
			},
			{
				name: "Psalm 18",
				youtube: "gqp8urEImMM"
			},
			{
				name: "Psalm 19",
				youtube: "SIMVh-pvERw"
			},
			{
				name: "Psalm 20",
				youtube: "7aA-Tf1WRv4"
			},
			{
				name: "Psalm 21",
				youtube: "Yf7A_aVSZZE"
			},
			{
				name: "Psalm 22",
				youtube: "qSklmkg9pWU"
			},
			{
				name: "Psalm 23",
				youtube: "XBtyYkGU3DU"
			},
			{
				name: "Psalm 24",
				youtube: "pQB-biT9CwQ"
			},
			{
				name: "Psalm 25",
				youtube: "hcyqB8-kLQ8"
			},
			{
				name: "Psalm 26",
				youtube: "EOzuQ77p8OY"
			},
			{
				name: "Psalm 27",
				youtube: "utSFzvIUY5k"
			},
			{
				name: "Psalm 28",
				youtube: "0yYhDeykbfw"
			},
			{
				name: "Psalm 29",
				youtube: "wxHOpApaxKQ"
			},
			{
				name: "Psalm 30",
				youtube: "hozi9YM0OYU"
			}
		]
	},

	{
		lang: "de",
	 	flag: " 🇩🇪",
	 	speaker: "♀♂",
		psalms: [{
				name: "Psalm 1",
				youtube: "jvzVFsy99Gk",
				text: "Wohl dem Mann, der nicht dem Rat der Frevler folgt, nicht auf dem Weg der Sünder geht, nicht im Kreis der Spötter sitzt, sondern Freude hat an der Weisung des Herrn, über seine Weisung nachsinnt bei Tag und bei Nacht.\n\nEr ist wie ein Baum, der an Wasserbächen gepflanzt ist, der zur rechten Zeit seine Frucht bringt und dessen Blätter nicht welken.\n\nAlles, was er tut, wird ihm gut gelingen. Nicht so die Frevler: Sie sind wie Spreu, die der Wind verweht. Darum werden die Frevler im Gericht nicht bestehen noch die Sünder in der Gemeinde der Gerechten. Denn der Herr kennt den Weg der Gerechten, der Weg der Frevler aber führt in den Abgrund. "
			},
			{
				name: "Psalm 2",
				youtube: "pDQ_1bT1vSM"
			},
			{
				name: "Psalm 3",
				youtube: "0GDPo_WoAOU"
			},
			{
				name: "Psalm 4",
				youtube: "3fWcoX1jnng"
			},
			{
				name: "Psalm 5",
				youtube: "F8UCBNmyIjo"
			},
			{
				name: "Psalm 6",
				youtube: "tLi3U5_LyeU"
			},
			{
				name: "Psalm 7",
				youtube: "v7jAeUkmgO8"
			},
			{
				name: "Psalm 8",
				youtube: "H-o9FG9GL0g"
			},
			{
				name: "Psalm 9",
				youtube: "vlUbNQFvjzE"
			},
			{
				name: "Psalm 10",
				youtube: "rfx11dD-TmQ"
			},
			{
				name: "Psalm 11",
				youtube: "J72Bz7Ggk3Q"
			},
			{
				name: "Psalm 12",
				youtube: "mFzqdVB7Xvs"
			},
			{
				name: "Psalm 13",
				youtube: "mcVbtTBwDhE"
			},
			{
				name: "Psalm 14",
				youtube: "ACbGX2nzUDU"
			},
			{
				name: "Psalm 15",
				youtube: "xwX3c6P9_ts"
			},
			{
				name: "Psalm 16",
				youtube: "vQPhX-Yi_yk"
			},
			{
				name: "Psalm 19",
				youtube: "938yObmv6D8"
			},
			{
				name: "Psalm 20",
				youtube: "eIPYo_ae8U4"
			},
			{
				name: "Psalm 21",
				youtube: "eWdfP-fn45E"
			},
			{
				name: "Psalm 23",
				youtube: "wHIb14bCCoM"
			},
			{
				name: "Psalm 24",
				youtube: "BY72farhceM"
			},
			{
				name: "Psalm 26",
				youtube: "FYgs_uZIL3E"
			},
			{
				name: "Psalm 28",
				youtube: "7Sd8N73Y6uo"
			},
			{
				name: "Psalm 29",
				youtube: "XPZXXmi20jM"
			},
			{
				name: "Psalm 30",
				youtube: "n0J-OGwOVWU"
			},
			{
				name: "Psalm 32",
				youtube: "aCTJVdwzzhw"
			},
			{
				name: "Psalm 36",
				youtube: "8CH2v2X8_Hc"
			},
			{
				name: "Psalm 41",
				youtube: "tiUMmwCOW7A"
			},
			{
				name: "Psalm 43",
				youtube: "6XvNDaoRIsQ"
			},
			{
				name: "Psalm 47",
				youtube: "KUnMCFmiNdo"
			},
			{
				name: "Psalm 53",
				youtube: "qMf5H4hyGgs"
			},
			{
				name: "Psalm 54",
				youtube: "kAQYR-7rP3o"
			},
			{
				name: "Psalm 58",
				youtube: "ljKxJcs6wsg"
			},
			{
				name: "Psalm 61",
				youtube: "EhCbd_8xJQE"
			},
			{
				name: "Psalm 62",
				youtube: "xkCWEBF2wmk"
			},
			{
				name: "Psalm 63",
				youtube: "JRd0oUw57jQ"
			},
			{
				name: "Psalm 67",
				youtube: "xjp1yVoV1p0"
			},
			{
				name: "Psalm 70",
				youtube: "_Iuqc0c99jo"
			},
			{
				name: "Psalm 82",
				youtube: "bjoKv086QOM"
			},
			{
				name: "Psalm 85",
				youtube: "Oyllpw7kMtY"
			},
			{
				name: "Psalm 87",
				youtube: "wrCs64BScxQ"
			},
			{
				name: "Psalm 92",
				youtube: "AUl4BYV8UbA"
			},
			{
				name: "Psalm 93",
				youtube: "rU10ZvDDiys"
			},
			{
				name: "Psalm 100",
				youtube: "cslEXOxzd5Q"
			},
			{
				name: "Psalm 101",
				youtube: "uf5Cvde0O20"
			},
			{
				name: "Psalm 111",
				youtube: "yeQQAlqNswM"
			},
			{
				name: "Psalm 112",
				youtube: "k7aAXODLzUg"
			},
			{
				name: "Psalm 113",
				youtube: "3riJlNwVBK4"
			},
			{
				name: "Psalm 117",
				youtube: "HCfBTvrY854"
			},
			{
				name: "Psalm 121",
				youtube: "oEdrQ95SMsQ"
			},
			{
				name: "Psalm 122",
				youtube: "yw4p7NQdSXw"
			},
			{
				name: "Psalm 123",
				youtube: "3wo0RA6BVtM"
			},
			{
				name: "Psalm 126",
				youtube: "gpOuUWlatUo"
			},
			{
				name: "Psalm 127",
				youtube: "IvJsJNZxOVA"
			},
			{
				name: "Psalm 128",
				youtube: "ATom-k89FrI"
			},
			{
				name: "Psalm 130",
				youtube: "rqH22N4aAkE"
			},
			{
				name: "Psalm 131",
				youtube: "-8nyYxQyX08"
			},
			{
				name: "Psalm 133",
				youtube: "z5mwCdz77M4"
			},
			{
				name: "Psalm 134",
				youtube: "EuYtwM_WFy0"
			},
			{
				name: "Psalm 137",
				youtube: "iwL3mNlwPJc"
			},
			{
				name: "Psalm 138",
				youtube: "WU-2J-PcQfo"
			},
			{
				name: "Psalm 140",
				youtube: "x8hnQJvjyyE"
			},
			{
				name: "Psalm 141",
				youtube: "1VOs941qqU8"
			},
			{
				name: "Psalm 142",
				youtube: "kemQPW-sLrg"
			},
			{
				name: "Psalm 146",
				youtube: "YmkkCGtJ584"
			},
			{
				name: "Psalm 147",
				youtube: "bKClARAPLOg"
			},
			{
				name: "Psalm 148",
				youtube: "7GCtFC6K5yo"
			},
			{
				name: "Psalm 149",
				youtube: "jSYOINR183c"
			},
			{
				name: "Psalm 150",
				youtube: "UegwUZqmifQ"
			}
		]
	},
	{
		lang: "pl_f",
		flag: "🇵🇱",
		speaker: "♀",
		psalms: [
		{ name : "Psalm 1", youtube : "QfEM0ulvDhg" },
{ name : "Psalm 3", youtube : "wxZN1pWfzMo" },
{ name : "Psalm 5", youtube : "e1SmvSfdoLY" },
{ name : "Psalm 7", youtube : "WvbiSMut85Y" },
{ name : "Psalm 8", youtube : "AXeY_ezXSN0" },
{ name : "Psalm 9", youtube : "s8L24HOihzI" },
{ name : "Psalm 11", youtube : "aveP1QoUqE8" },
{ name : "Psalm 12", youtube : "VnlpPzefJRE" },
{ name : "Psalm 13", youtube : "srUoDmbr6o4" },
{ name : "Psalm 14", youtube : "ZFRSGUOiHoc" },
{ name : "Psalm 15", youtube : "-oqav8h54U8" },
{ name : "Psalm 17", youtube : "YTo18lko2s4" },
{ name : "Psalm 25", youtube : "-jittWVle6I" },
{ name : "Psalm 24", youtube : "cYOFXsD44HU" },
{ name : "Psalm 26", youtube : "DXqpytJvUds" },
{ name : "Psalm 27", youtube : "2hV6SyiG6-A" },
{ name : "Psalm 28", youtube : "Awpn94Mtxwg" },
{ name : "Psalm 31", youtube : "Xmyow2tf25Q" },
{ name : "Psalm 32", youtube : "uT3cjPoiNNw" },
{ name : "Psalm 33", youtube : "sYGALofrdUg" },
{ name : "Psalm 34", youtube : "_Cp8L9kymMA" },
{ name : "Psalm 39", youtube : "xtgnagKQpd8" },
{ name : "Psalm 41", youtube : "hALXzgYX4xE" },
{ name : "Psalm 42", youtube : "kagoNklzatQ" },
{ name : "Psalm 43", youtube : "SelOgbmYhJs" },
{ name : "Psalm 44", youtube : "D_aodyxSPAU" },
{ name : "Psalm 45", youtube : "CEZjba-0CXg" },
{ name : "Psalm 46", youtube : "I1NU3I4TUek" },
{ name : "Psalm 47", youtube : "dy0fefeJIAg" },
{ name : "Psalm 48", youtube : "pp_rqEoszgA" },
{ name : "Psalm 57", youtube : "TeogkiudLzY" },
{ name : "Psalm 63", youtube : "mcwvPBrKHzQ" },
{ name : "Psalm 66", youtube : "dIhu22rgVEc" },
{ name : "Psalm 67", youtube : "iqwUYMHNX2U" },
{ name : "Psalm 97", youtube : "c_r6lrhcw68" },
{ name : "Psalm 99", youtube : "163XEuPSxAc" },
{ name : "Psalm 101", youtube : "Ufq7FD0FhKQ" },
{ name : "Psalm 103", youtube : "KkPHDy59hDM" },
{ name : "Psalm 104", youtube : "jjj7hzldTSU" },
{ name : "Psalm 121", youtube : "XywgUzMhJnE" },
{ name : "Psalm 151", youtube : "U1dZEocDPqM" }
			
		]
	},
				   {
		lang: "pl_m",
		flag: "🇵🇱",
		speaker: "♂",
		psalms: [
			{ name : "Psalm 1", youtube : "wnPPnMSRoAE" },
{ name : "Psalm 2", youtube : "hJCvIRKrG7I" },
{ name : "Psalm 3", youtube : "2Rpzaid8WjU" },
{ name : "Psalm 4", youtube : "q0ijq-I5NEc" },
{ name : "Psalm 5", youtube : "oXYm5mfwJ2k" },
{ name : "Psalm 6", youtube : "vPxVURo5V8s" },
{ name : "Psalm 7", youtube : "WYPLdMBGc6I" },
{ name : "Psalm 8", youtube : "85TT2oX_H9I" },
{ name : "Psalm 9", youtube : "HpVZn-f0irE" },
{ name : "Psalm 10", youtube : "I1oZSDCs5M0" },
{ name : "Psalm 11", youtube : "6JZ1d4NO05A" },
{ name : "Psalm 12", youtube : "ZsLSfvkgfvo" },
{ name : "Psalm 13", youtube : "3c5dVd-g6GM" },
{ name : "Psalm 14", youtube : "YG1BMm339s8" },
{ name : "Psalm 15", youtube : "ygG1HN7BJZ8" },
{ name : "Psalm 16", youtube : "t7OyDHVRrFI" },
{ name : "Psalm 17", youtube : "QWx2utrOTGI" },
{ name : "Psalm 18", youtube : "0671m4qBrgo" },
{ name : "Psalm 19", youtube : "PYnS-wptcpc" },
{ name : "Psalm 20", youtube : "_Pq3a5MGPRs" },
{ name : "Psalm 21", youtube : "zAQh01bgVxI" },
{ name : "Psalm 22", youtube : "SWlP4D93gh4" },
{ name : "Psalm 23", youtube : "Dpyy2XbPhwo" },
{ name : "Psalm 24", youtube : "rzqVa0ov3YY" },
{ name : "Psalm 25", youtube : "GkZwWG_0U8c" },
{ name : "Psalm 26", youtube : "c6537CvqZ8s" },
{ name : "Psalm 27", youtube : "Z4evBOMU-1g" },
{ name : "Psalm 28", youtube : "J0nSpL54RMw" },
{ name : "Psalm 29", youtube : "8jnQi-OIAsk" },
{ name : "Psalm 30", youtube : "F46ZXFfjIl0" },
{ name : "Psalm 31", youtube : "p1v-Yc3tYfc" },
{ name : "Psalm 32", youtube : "T4cL9qKIfjY" },
{ name : "Psalm 33", youtube : "3ca87bVlVIo" },
{ name : "Psalm 34", youtube : "zo7_l4Dg1c0" },
{ name : "Psalm 35", youtube : "aNTiNhbMe8A" },
{ name : "Psalm 36", youtube : "UmIvnXo9Qis" },
{ name : "Psalm 37", youtube : "v9jwL3HzPP8" },
{ name : "Psalm 38", youtube : "ZaubU-_T-_g" },
{ name : "Psalm 39", youtube : "vHRBNgEra-E" },
{ name : "Psalm 40", youtube : "-hgP0jds63Y" },
{ name : "Psalm 41", youtube : "x6j3i207MJU" },
{ name : "Psalm 42", youtube : "K9mTjoacqu4" },
{ name : "Psalm 43", youtube : "32Qtv62gCoA" },
{ name : "Psalm 44", youtube : "2JJTqZlLrGE" },
{ name : "Psalm 45", youtube : "JexRXoXwaC0" },
{ name : "Psalm 46", youtube : "fqdq-i7JGwY" },
{ name : "Psalm 47", youtube : "eAz4gJTCoMw" },
{ name : "Psalm 48", youtube : "hx1x3GBjtuw" },
{ name : "Psalm 49", youtube : "9x4hMKhCaAo" },
{ name : "Psalm 50", youtube : "Pz-P3D9V8Cg" },
{ name : "Psalm 51", youtube : "s5BXiI6zndY" },
{ name : "Psalm 52", youtube : "C4juf3tV-Z0" },
{ name : "Psalm 55", youtube : "pJHCuMjPSc8" },
{ name : "Psalm 56", youtube : "m5_Ott8aAys" },
{ name : "Psalm 57", youtube : "q8Mgf5IO4vI" },
{ name : "Psalm 58", youtube : "NCCsRMxJrFg" },
{ name : "Psalm 59", youtube : "M6Iw4tvy6uQ" },
{ name : "Psalm 60", youtube : "5n10HL8w-Kw" },
{ name : "Psalm 61", youtube : "q2adVEvlyds" },
{ name : "Psalm 64", youtube : "QnmOV_-j6V0" },
{ name : "Psalm 65", youtube : "bOY88szMrEs" },
{ name : "Psalm 66", youtube : "E4OuHo2X4DQ" },
{ name : "Psalm 67", youtube : "Z7Cda-8u8R4" },
{ name : "Psalm 68", youtube : "5gqN-Mm9q08" },
{ name : "Psalm 69", youtube : "Enbt41nKDJ0" },
{ name : "Psalm 70", youtube : "GAGIb-3c_Qo" },
{ name : "Psalm 71", youtube : "dSLXujNQ94M" },
{ name : "Psalm 72", youtube : "MqKtCBIThk8" },
{ name : "Psalm 73", youtube : "XsIh6Rjlapw" },
{ name : "Psalm 74", youtube : "fnpayQuAOLc" },
{ name : "Psalm 75", youtube : "RYrfEU7_vXk" },
{ name : "Psalm 76", youtube : "AegXLqZ0sic" },
{ name : "Psalm 77", youtube : "c5MJs6b1Nt0" },
{ name : "Psalm 78", youtube : "XBj18KEApAM" },
{ name : "Psalm 79", youtube : "HBu9LzV-CSM" },
{ name : "Psalm 80", youtube : "0nUzqrFXQR4" },
{ name : "Psalm 81", youtube : "jxq5ndTTGVM" },
{ name : "Psalm 82", youtube : "JrhgiiO236w" },
{ name : "Psalm 83", youtube : "5JqPKnZD-Ds" },
{ name : "Psalm 84", youtube : "gsCDrOG8eKQ" },
{ name : "Psalm 85", youtube : "gRlorJwfAmA" },
{ name : "Psalm 86", youtube : "ECzxEyLP70U" },
{ name : "Psalm 87", youtube : "HjmlPEEj07w" },
{ name : "Psalm 88", youtube : "DFo3gdimj84" },
{ name : "Psalm 89", youtube : "J6uQZbXASgU" },
{ name : "Psalm 90", youtube : "ofAgJ8cdaAg" },
{ name : "Psalm 91", youtube : "0d-ZEvTJ_30" },
{ name : "Psalm 92", youtube : "PqfYbVul0WA" },
{ name : "Psalm 93", youtube : "K9fQRNeSlqI" },
{ name : "Psalm 94", youtube : "y8mOcqwKpI8" },
{ name : "Psalm 98", youtube : "4qRlDTky0ZU" },
{ name : "Psalm 99", youtube : "mLNbvkDxKk0" },
{ name : "Psalm 100", youtube : "4FlC5sWJuvU" },
{ name : "Psalm 101", youtube : "uCf588wMg0o" },
{ name : "Psalm 102", youtube : "5S-3xcoQFBE" },
{ name : "Psalm 103", youtube : "0f23LvVNfkE" },
{ name : "Psalm 104", youtube : "a--o4TYy3o4" },
{ name : "Psalm 105", youtube : "MU20RzZcmfs" },
{ name : "Psalm 106", youtube : "m6aehOfSVDA" },
{ name : "Psalm 107", youtube : "dD_LoNjBfU0" },
{ name : "Psalm 108", youtube : "XilNfFjc4LI" },
{ name : "Psalm 109", youtube : "892bDL1-H8E" },
{ name : "Psalm 110", youtube : "S_lplFyWIk8" },
{ name : "Psalm 111", youtube : "AXve21sPwsw" },
{ name : "Psalm 112", youtube : "buIMa46ybOk" },
{ name : "Psalm 113", youtube : "ZbB5M68fliI" },
{ name : "Psalm 114", youtube : "dyLc0jcyQLo" },
{ name : "Psalm 115", youtube : "LhBcAFDVH50" },
{ name : "Psalm 116", youtube : "kkebTSCVMDQ" },
{ name : "Psalm 117", youtube : "51QrvV0XcQ8" },
{ name : "Psalm 118", youtube : "gkr5iezYLjo" },
{ name : "Psalm 119", youtube : "iB6mQ9Ausu8" },
{ name : "Psalm 120", youtube : "CgRw7x8Ipp4" },
{ name : "Psalm 121", youtube : "OUf9h89uvFw" },
{ name : "Psalm 122", youtube : "DQGmMMYW1T0" },
{ name : "Psalm 123", youtube : "V_AkpTUYN1A" },
{ name : "Psalm 124", youtube : "iF5QTgzHqj8" },
{ name : "Psalm 125", youtube : "ihuGz6jYxb4" },
{ name : "Psalm 126", youtube : "NR37OnM4Mec" },
{ name : "Psalm 127", youtube : "R8FlVS2I-b4" },
{ name : "Psalm 128", youtube : "cWHm1xodI6k" },
{ name : "Psalm 130", youtube : "pYgj2W7G20w" },
{ name : "Psalm 131", youtube : "tbxt92pCktg" },
{ name : "Psalm 132", youtube : "ezxIbUAUTS0" },
{ name : "Psalm 133", youtube : "a3GC86Ahrqs" },
{ name : "Psalm 134", youtube : "gu1IXYemTDY" },
{ name : "Psalm 135", youtube : "F2xcUipBGHA" },
{ name : "Psalm 136", youtube : "JnrFZEUmsQw" },
{ name : "Psalm 138", youtube : "U17DSrhmkn8" },
{ name : "Psalm 139", youtube : "erTIbSyy1rE" },
{ name : "Psalm 140", youtube : "ic33bhkndjQ" },
{ name : "Psalm 141", youtube : "-gkWdAhu6fg" },
{ name : "Psalm 142", youtube : "EbfjhowUjBY" },
{ name : "Psalm 143", youtube : "A9tq5-Edxqs" },
{ name : "Psalm 144", youtube : "v9un0AS2osU" },
{ name : "Psalm 145", youtube : "1PdzL1bC8WA" },
{ name : "Psalm 146", youtube : "ysPGO2hU_-Y" },
{ name : "Psalm 147", youtube : "0U815waS3tk" },
{ name : "Psalm 148", youtube : "Tp5XyiolM-A" },
{ name : "Psalm 149", youtube : "ENcKcKia5xw" },
{ name : "Psalm 150", youtube : "UZ6dKvQZ76o" }
		]
	}
];