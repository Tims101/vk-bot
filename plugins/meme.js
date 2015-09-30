var request = require('./../request-wrapper');
var levenshtein = require('levenshtein')

module.exports = function(vk, fileService) {

	var memes = [  
	   {  
	      "link":"/generator/kogda-uvidel-chto-sosedskogo-kota-otnesli-v-cheburechnuyu_1650771",
	      "title":" Когда увидел что соседского кота отнесли в чебуречную"
	   },
	   {  
	      "link":"/generator/megan-foks_1649769",
	      "title":" Меган Фокс"
	   },
	   {  
	      "link":"/generator/vezhlivyy-olen_1648471",
	      "title":"Вежливый олень"
	   },
	   {  
	      "link":"/generator/fihter_1647943",
	      "title":" Фихтер"
	   },
	   {  
	      "link":"/generator/ispanec_1647644",
	      "title":" Испанец"
	   },
	   {  
	      "link":"/generator/ya-chelovek-prostoy_1647631",
	      "title":"Я человек простой"
	   },
	   {  
	      "link":"/generator/peppa_1645841",
	      "title":"Пеппа"
	   },
	   {  
	      "link":"/generator/on_1645361",
	      "title":" Он"
	   },
	   {  
	      "link":"/generator/ty-vtiraesh-mne-kakuyu-to-dich_1638842",
	      "title":" Ты втираешь мне какую то дичь"
	   },
	   {  
	      "link":"/generator/nichosi_1628578",
	      "title":" Ничоси"
	   },
	   {  
	      "link":"/generator/skayp-fayloobmennik_1628362",
	      "title":"   Скайп файлообменник"
	   },
	   {  
	      "link":"/generator/kot-v-shoke_1624730",
	      "title":" Кот в шоке"
	   },
	   {  
	      "link":"/generator/pacan-s-krestom_1624354",
	      "title":" Пацан с крестом"
	   },
	   {  
	      "link":"/generator/kogda-s-dedom_1622501",
	      "title":"  Когда с дедом"
	   },
	   {  
	      "link":"/generator/nedovolnyy-pacan_1618525",
	      "title":"  Недовольный пацан"
	   },
	   {  
	      "link":"/generator/babka_1586424",
	      "title":"Бабушки на скамейке"
	   },
	   {  
	      "link":"/generator/putin-pokazivaet-kulak_1501943",
	      "title":"Путин показывает кулак"
	   },
	   {  
	      "link":"/generator/chuvak-eto-repchik_1423005",
	      "title":"Чувак это рэпчик"
	   },
	   {  
	      "link":"/generator/podozritelnyy-olen_1422513",
	      "title":" Подозрительный олень"
	   },
	   {  
	      "link":"/generator/supernatural_1421811",
	      "title":" Supernatural"
	   },
	   {  
	      "link":"/generator/naivnyy-olen-v2_1421434",
	      "title":"Наивный Олень v2"
	   },
	   {  
	      "link":"/generator/kotyaka-ulibaka_1412385",
	      "title":"     Котяка-улыбака"
	   },
	   {  
	      "link":"/generator/chuma_1340321",
	      "title":" Чума"
	   },
	   {  
	      "link":"/generator/zla-boginya_1335656",
	      "title":"Зла Богиня"
	   },
	   {  
	      "link":"/generator/hitriy-getsbi_1335507",
	      "title":"Хитрый Гэтсби"
	   },
	   {  
	      "link":"/generator/kori-teylor-v-shoke_1315097",
	      "title":"Кори Тейлор в шоке"
	   },
	   {  
	      "link":"/generator/akademiya-stannisa_1310317",
	      "title":" Академия Станниса"
	   },
	   {  
	      "link":"/generator/moe-lico-kogda_1284363",
	      "title":"Мое лицо когда"
	   },
	   {  
	      "link":"/generator/frodo_1277637",
	      "title":" Фродо"
	   },
	   {  
	      "link":"/generator/lico-volnova-kogda-emu-govoryat_1241204",
	      "title":"Лицо Вольнова когда ему говорят"
	   },
		{  
		   "link":"/generator/malchik-v-pizhame_1240287",
		   "title":"Мальчик в пижаме"
		},
		{  
		   "link":"/generator/prost-neudachnik_1238173",
		   "title":"Прост Неудачник"
		},
		{  
		   "link":"/generator/klichko_1226206",
		   "title":"Кличко"
		},
		{  
		   "link":"/generator/etot-moment-kogda_1221187",
		   "title":"Этот момент когда"
		},
		{  
		   "link":"/generator/hogvarts_1210712",
		   "title":"Хогвартс"
		},
		{  
		   "link":"/generator/kislolicyy0_1206574",
		   "title":"Кислолицый0"
		},
		{  
		   "link":"/generator/terebonka-car_1175551",
		   "title":"Теребонька Царь"
		},
		{  
		   "link":"/generator/agnes-gru_1163265",
		   "title":"   Агнес Грю"
		},
		{  
		   "link":"/generator/zloy-niger_1143262",
		   "title":"Злой нигер"
		},
		{  
		   "link":"/generator/to-chuvstvo-kogda_1129633",
		   "title":"То чувство когда"
		},
		{  
		   "link":"/generator/tipichnyy-rolevik_1128994",
		   "title":"ТИПИЧНЫЙ РОЛЕВИК"
		},
		{  
		   "link":"/generator/ukraina---edinaya_1125381",
		   "title":"Украина - Единая"
		},
		{  
		   "link":"/generator/tipichnyy-negr_1120027",
		   "title":" ТИПИЧНЫЙ НЕГР"
		},
		{  
		   "link":"/generator/zlaya-ovca_1110416",
		   "title":"Злая Овца"
		},
		{  
		   "link":"/generator/priv-che-delaesh_1107336",
		   "title":"прив че делаешь"
		},
		{  
		   "link":"/generator/kogda-kto-to-govorit_1106475",
		   "title":"Когда кто-то говорит"
		},
		{  
		   "link":"/generator/agressivnyy-dzheykob_1106455",
		   "title":"Агрессивный Джейкоб"
		},
		{  
		   "link":"/generator/agressivnyy-roker_1103297",
		   "title":"Агрессивный рокер"
		},
		{  
		   "link":"/generator/rogatik_1094982",
		   "title":"Рогатик"
		},
		{  
		   "link":"/generator/terebonkay_1068673",
		   "title":" Теребонька замерз"
		},
		{  
		   "link":"/generator/babki-u-podezda_1066805",
		   "title":"бабки у подъезда"
		},
		{  
		   "link":"/generator/nelepyy-medved_1059186",
		   "title":"Нелепый медведь"
		},
		{  
		   "link":"/generator/zloy-olen_1058019",
		   "title":"ЗЛОЙ ОЛЕНЬ"
		},
		{  
		   "link":"/generator/chotka-mala_1053600",
		   "title":"Чотка мала"
		},
		{  
		   "link":"/generator/kurochki_1049666",
		   "title":"Курочки"
		},
		{  
		   "link":"/generator/evrey_1049467",
		   "title":"Еврей"
		},
		{  
		   "link":"/generator/zhenskaya-logika_1042926",
		   "title":"женская логика"
		},
		{  
		   "link":"/generator/tipichnyy-milliarder-3_1033728",
		   "title":" Типичный Миллиардер (Дуров)"
		},
		{  
		   "link":"/generator/matrashka_1033272",
		   "title":"Матрашка"
		},
		{  
		   "link":"/generator/bandit_1031937",
		   "title":"БАНДИТ"
		},
   {  
      "link":"/generator/tipichnyy-milliarder-2_1030513",
      "title":"Типичный Миллиардер (Билл Гейст)"
   },
   {  
      "link":"/generator/tipichnyy-milliarder_1030507",
      "title":" Типичный Миллиардер (Абрамович)"
   },
   {  
      "link":"/generator/terebonka-dib-hlebushek_1022707",
      "title":"Теребонька (Диб Хлебушек)"
   },
   {  
      "link":"/generator/naivnyy-olen-shablon-5_1019692",
      "title":"Наивный Олень шаблон 5"
   },
   {  
      "link":"/generator/tipichnyy-shkolnik_1017127",
      "title":"Типичный школьник"
   },
   {  
      "link":"/generator/tipichnyy-rayter_1013457",
      "title":"ТИПИЧНЫЙ РАЙТЕР"
   },
   {  
      "link":"/generator/cinichnyy-shkolnik_995799",
      "title":"Циничный школьник"
   },
   {  
      "link":"/generator/cinichnyy-shkolnik_981657",
      "title":"Циничный Школьник"
   },
   {  
      "link":"/generator/naivnyy-olen_979070",
      "title":"Наивный олень"
   },
   {  
      "link":"/generator/edinorog_962336",
      "title":"Единорог"
   },
   {  
      "link":"/generator/natalya-ivanovna_960435",
      "title":"Наталья Ивановна"
   },
   {  
      "link":"/generator/edinorog-sociofob_954129",
      "title":"Единорог Социофоб"
   },
   {  
      "link":"/generator/zloy-gorec_946591",
      "title":"злой горец"
   },
   {  
      "link":"/generator/amerikos_945779",
      "title":"АМЕРИКОС"
   },
   {  
      "link":"/generator/bydlo-russkiy_945770",
      "title":"БЫДЛО РУССКИЙ"
   },
   {  
      "link":"/generator/gorec_945767",
      "title":"ГОРЕЦ"
   },
   {  
      "link":"/generator/kitaec_945748",
      "title":"КИТАЕЦ"
   },
   {  
      "link":"/generator/naivnyy-olen_943045",
      "title":"Наивный Олень вк"
   },
   {  
      "link":"/generator/pacancho_940687",
      "title":" пацанчо"
   },
   {  
      "link":"/generator/vata_940621",
      "title":"Вата"
   },
   {  
      "link":"/generator/agressivnyy-roker_937522",
      "title":"Агрессивный Рокер"
   },
   {  
      "link":"/generator/agressivnyy-roker-moe-lico-kogda_936983",
      "title":"Агрессивный Рокер Мое лицо когда"
   },
   {  
      "link":"/generator/vkcomarptypical_936928",
      "title":"Vkcomarptypical"
   },
   {  
      "link":"/generator/cinichnyy-shkolnik_935506",
      "title":"ЦИНИЧНЫЙ ШКОЛЬНИК"
   },
   {  
      "link":"/generator/tipichnaya-mama_932916",
      "title":"типичная мама"
   },
   {  
      "link":"/generator/sad-doge_931209",
      "title":"SAD DOGE"
   },
   {  
      "link":"/generator/evro-paca_930301",
      "title":"Евро паца"
   },
   {  
      "link":"/generator/veselyy-student_928974",
      "title":"Веселый студент"
   },
   {  
      "link":"/generator/zloy-gorec_918770",
      "title":"ЗЛОЙ ГОРЕЦ"
   },
   {  
      "link":"/generator/tipichnyy-batya_907796",
      "title":" Типичный Батя вк"
   },
   {  
      "link":"/generator/tipichnaya-mama_901672",
      "title":"Типичная мама"
   },
   {  
      "link":"/generator/naivehole_898090",
      "title":"naivehole"
   },
   {  
      "link":"/generator/derzkiy-bydlomyot_897971",
      "title":"ДЕРЗКИЙ БЫДЛОМЁТ"
   },
   {  
      "link":"/generator/ostriy-perec_896541",
      "title":"острий перец"
   },
   {  
      "link":"/generator/kiselyov-2014_888519",
      "title":"Киселёв 2014"
   },
   {  
      "link":"/generator/naivnyy-olen_877340",
      "title":"Наивный олень с девушкой"
   },
   {  
      "link":"/generator/tipichnaya-tupaya-pizda_873533",
      "title":"Типичная Тупая Пизда"
   },
   {  
      "link":"/generator/zadumchiviy-griffin_863998",
      "title":"Задумчивый Гриффин"
   },
   {  
      "link":"/generator/tipichnyy-pisatel_857867",
      "title":"Типичный писатель"
   },
   {  
      "link":"/generator/chotka-mala_857315",
      "title":"чотка мала"
   },
   {  
      "link":"/generator/naivnyy-olen_854732",
      "title":"Наивный олень v3"
   },
   {  
      "link":"/generator/chotkiy-paca-gorbachevskogo_848203",
      "title":"Чоткий Паца Горбачевського"
   },
   {  
      "link":"/generator/zloy-basketbolist_844598",
      "title":"ЗЛОЙ БАСКЕТБОЛИСТ"
   },
   {  
      "link":"/generator/zloy-basketbolist_844558",
      "title":"ЗЛОЙ БАСКЕТБОЛИСТ"
   },
   {  
      "link":"/generator/chotka-tola-new-2_842266",
      "title":"Чотка тьола NEW 2"
   },
   {  
      "link":"/generator/malyy-paca_836778",
      "title":"малый паца"
   },
   {  
      "link":"/generator/brutalna_833208",
      "title":"Брутальна"
   },
   {  
      "link":"/generator/cinichnyy-shkolnik-1_830663",
      "title":"Циничный школьник 1"
   },
   {  
      "link":"/generator/shkolyar-tolyan_830653",
      "title":"Школяр Толян"
   },
   {  
      "link":"/generator/zloy-basketbolist_830354",
      "title":"ЗЛОЙ БАСКЕТБОЛИСТ"
   },
   {  
      "link":"/generator/zloy-basketbolist_830340",
      "title":"ЗЛОЙ БАСКЕТБОЛИСТ"
   },
   {  
      "link":"/generator/tipichnaya-ovca_822000",
      "title":"Типичная овца"
   },
   {  
      "link":"/generator/zloy-basketbolist_820492",
      "title":"ЗЛОЙ БАСКЕТБОЛИСТ"
   },
   {  
      "link":"/generator/alfa_820020",
      "title":"альфа"
   },
   {  
      "link":"/generator/zloy-basketbolist_815879",
      "title":"Злой Баскетболист"
   },
   {  
      "link":"/generator/stolbnyak_814054",
      "title":" Волк с Уолтстрит"
   },
   {  
      "link":"/generator/tipoviy-yanik_810991",
      "title":"Типовий Яник"
   },
   {  
      "link":"/generator/mudriy-vitalka_808355",
      "title":"Мудрий Виталька"
   },
   {  
      "link":"/generator/vtalka_797288",
      "title":"Вталька"
   },
   {  
      "link":"/generator/shablon-dlya-pablika-tipichnyy-olen_796952",
      "title":"Паблик Типичный олень"
   },
   {  
      "link":"/generator/naivnaya-ovca_796422",
      "title":"Наивная Овца"
   },
   {  
      "link":"/generator/naivnyy-olen_795660",
      "title":"Наивный Олень vk"
   },
   {  
      "link":"/generator/naivnyy-olen_795622",
      "title":"Наивный Олень vk2"
   },
   {  
      "link":"/generator/tipoviy-titushka_789183",
      "title":"Типовий Титушка"
   },
   {  
      "link":"/generator/chotka-tola-sozdat-mem_773817",
      "title":"Чьотка тьола создать мем"
   },
   {  
      "link":"/generator/pacanska-filosofiya_772340",
      "title":"Пацанська философия"
   },
   {  
      "link":"/generator/igra-slov_753839",
      "title":"Игра слов 2"
   },
   {  
      "link":"/generator/chotka-mala_749777",
      "title":"Чотка мала"
   },
   {  
      "link":"/generator/ketsvill_748251",
      "title":"  Кэтсвилл"
   },
   {  
      "link":"/generator/naivnaya-oleniha_748093",
      "title":"Наивная олениха"
   },
   {  
      "link":"/generator/amerikanskiy-psihopat_747246",
      "title":"Американский психопат"
   },
   {  
      "link":"/generator/ariel-sharon-umer-izrail_745781",
      "title":"Ариэль Шарон-умер-ИЗРАИЛЬ"
   },
   {  
      "link":"/generator/magdalena-carmen-frieda-kahlo-ca_741999",
      "title":"Magdalena Carmen Frieda Kahlo Ca"
   },
   {  
      "link":"/generator/derzkiy-tigr_741708",
      "title":"ДЕРЗКИЙ ТИГР"
   },
   {  
      "link":"/generator/ded_733067",
      "title":"ДЕД"
   },
   {  
      "link":"/generator/mudriy-paca_730269",
      "title":"Мудрий паца"
   },
   {  
      "link":"/generator/derzkiy-tigr_729800",
      "title":"ДЕРЗКИЙ ТИГР"
   },
   {  
      "link":"/generator/vesyolyy-cement_729362",
      "title":"Весёлый цемент"
   },
   {  
      "link":"/generator/tipichnyy-igrok-kisekae_722896",
      "title":"Типичный игрок кисекае"
   },
   {  
      "link":"/generator/dk_715442",
      "title":"дк"
   },
   {  
      "link":"/generator/zloy-negr_709476",
      "title":" Злой Негр"
   },
   {  
      "link":"/generator/nedovolnyy-albinos_708971",
      "title":"НЕДОВОЛЬНЫЙ АЛЬБИНОС"
   },
   {  
      "link":"/generator/prazdnchniy-paca_696430",
      "title":"Празднчний паца"
   },
   {  
      "link":"/generator/paskuda-tvar_693777",
      "title":"Паскуда тварь"
   },
   {  
      "link":"/generator/artur-vladimirovich_681906",
      "title":"Артур Владимирович"
   },
   {  
      "link":"/generator/chotkiy-edik_664573",
      "title":"Чоткий Едик"
   },
   {  
      "link":"/generator/novogodny-chotkiy-edk_664554",
      "title":"Новогоднй Чоткий Едк"
   },
   {  
      "link":"/generator/v-mire-grustit-odin-kotik_664083",
      "title":"  В мире грустит один котик"
   },
   {  
      "link":"/generator/chotka-mala_663837",
      "title":"чотка мала"
   },
   {  
      "link":"/generator/mala_653319",
      "title":"мала"
   },
   {  
      "link":"/generator/tipichnyy-negr_633573",
      "title":" Типичный Негр"
   },
   {  
      "link":"/generator/pizdabol_620889",
      "title":"Пиздабол типичный вк"
   },
   {  
      "link":"/generator/chotkiy-paca-7_620395",
      "title":"Чоткий паца 7"
   },
   {  
      "link":"/generator/shuchu_617735",
      "title":"Шучу"
   },
   {  
      "link":"/generator/veseliy-student_611677",
      "title":"Веселий Студент"
   },
   {  
      "link":"/generator/chotka-tola-new_610374",
      "title":"Чотка тьола NEW"
   },
   {  
      "link":"/generator/dark-esenin_602621",
      "title":"Дарк Есенин"
   },
   {  
      "link":"/generator/tipichnyy-esenin_602580",
      "title":"Типичный Есенин"
   },
   {  
      "link":"/generator/brutalna-devka_590604",
      "title":"Брутальна девка"
   },
   {  
      "link":"/generator/chotkiy-pacan_589616",
      "title":"Чоткий пацан"
   },
   {  
      "link":"/generator/chotkiy-cmk_588539",
      "title":"chotkiy-CMK"
   },
   {  
      "link":"/generator/bud-muzhikom_576443",
      "title":"Будь мужиком"
   },
   {  
      "link":"/generator/tipichnyy-balnik1_572333",
      "title":"Типичный бальник1"
   },
   {  
      "link":"/generator/uzbagoisya_572099",
      "title":"Я збагоен"
   },
   {  
      "link":"/generator/dyadya-fyodor-kopaet-klad_571718",
      "title":" Дядя Фёдор копает клад"
   },
   {  
      "link":"/generator/ti-govorish-devochka-vozmucshaetsya_556490",
      "title":" Ты говоришь (девочка возмущается)"
   },
   {  
      "link":"/generator/dzheyson-stethem_554413",
      "title":"Джейсон Стэтхэм"
   },
   {  
      "link":"/generator/foksanyan_534054",
      "title":"фоксанян"
   },
   {  
      "link":"/generator/pizdec-tvoim-vsemu-hristos-prishyo_530191",
      "title":"ПИЗДЕЦ ТВОИМ ВСЕМУ ХРИСТОС ПРИШЁ"
   },
   {  
      "link":"/generator/realniy-muzhichyara_508103",
      "title":"реальний мужичяра"
   },
   {  
      "link":"/generator/tipichnyy-sutenyor_506298",
      "title":"Типичный Сутенёр"
   },
   {  
      "link":"/generator/yobnuta-podruga-yop_505622",
      "title":"Йобнута Подруга ЙоП"
   },
   {  
      "link":"/generator/chotkiy-medik_505365",
      "title":"чоткий медик"
   },
   {  
      "link":"/generator/v-mire-grustit-odin-kotik_503771",
      "title":" В мире грустит один котик"
   },
   {  
      "link":"/generator/yura_500448",
      "title":"Юра"
   },
   {  
      "link":"/generator/parn-na-sel_493822",
      "title":"Парнь на сел"
   },
   {  
      "link":"/generator/chotka-mala_490280",
      "title":"Чотка мала"
   },
   {  
      "link":"/generator/parn-na-sel_489229",
      "title":"Парнь на сел"
   },
   {  
      "link":"/generator/seychas-etot-pidor-napishet-huynyu_486920",
      "title":"Сейчас этот пидор напишет хуйню"
   },
   {  
      "link":"/generator/vchitel_486607",
      "title":"Вчитель"
   },
   {  
      "link":"/generator/mama_486603",
      "title":"Мама"
   },
   {  
      "link":"/generator/petro-bamper_485599",
      "title":"Петро Бампер"
   },
   {  
      "link":"/generator/pershiy-parn-na-sel_482246",
      "title":"Перший парнь на сел"
   },
   {  
      "link":"/generator/typical-balzac_480954",
      "title":"Typical Balzac"
   },
   {  
      "link":"/generator/tipichnyy-balzak_480786",
      "title":"Типичный Бальзак"
   },
   {  
      "link":"/generator/chotka-dvka_463443",
      "title":"Чотка Двка"
   },
   {  
      "link":"/generator/pss-paren_447738",
      "title":"псс парень"
   },
   {  
      "link":"/generator/bomzh-flosof_442154",
      "title":"Бомж флософ"
   },
   {  
      "link":"/generator/osel-iz-shreka_441944",
      "title":"Осел из Шрека"
   },
   {  
      "link":"/generator/pacan-z-dvorka_436310",
      "title":"пацан з дворка"
   },
   {  
      "link":"/generator/kamkin_418410",
      "title":"Камкин"
   },
   {  
      "link":"/generator/prosto-kosmos_413884",
      "title":"Просто космос"
   },
   {  
      "link":"/generator/u-kazhdoy-ksyushi-dolzhen-byt-svoy-_408519",
      "title":"у каждой Ксюши должен быть свой "
   },
   {  
      "link":"/generator/stolbnyak_397814",
      "title":"Столбняк"
   },
   {  
      "link":"/generator/uzbagoyzya_396539",
      "title":"Узбагойзя"
   },
   {  
      "link":"/generator/autlast_389341",
      "title":"Аутласт"
   },
   {  
      "link":"/generator/don-kihot-socionika_387309",
      "title":"Дон Кихот Соционика"
   },
   {  
      "link":"/generator/slushay-ya-tozhe-lyublyu-delat-podpi_382230",
      "title":"Слушай я тоже люблю делать подпи"
   },
   {  
      "link":"/generator/uzbagoysya_381716",
      "title":"узбагойся"
   },
   {  
      "link":"/generator/minony_374492",
      "title":"миньоны"
   },
   {  
      "link":"/generator/dzheyson-stethem_370059",
      "title":" Джейсон Стэтхэм"
   },
   {  
      "link":"/generator/trudnyy-rebenok_360593",
      "title":" Трудный Ребенок"
   },
   {  
      "link":"/generator/ya-zbagoen_350827",
      "title":"Я збагоен"
   },
   {  
      "link":"/generator/geroi-3_347003",
      "title":"Герои 3"
   },
   {  
      "link":"/generator/tipichnyy-dolboslav_325392",
      "title":"Типичный долбослав"
   },
   {  
      "link":"/generator/tola-masha_324730",
      "title":"Тьола Маша"
   },
   {  
      "link":"/generator/klapan_324724",
      "title":"Клапан"
   },
   {  
      "link":"/generator/derzkiy_324712",
      "title":"Дерзкий"
   },
   {  
      "link":"/generator/tipoviy-desyatiklasnik_324512",
      "title":"Типовий десятикласник"
   },
   {  
      "link":"/generator/tipichnyy-ebrovod_321464",
      "title":"Типичный ебровод"
   },
   {  
      "link":"/generator/a-ti-tochno_321362",
      "title":"А ты точно"
   },
   {  
      "link":"/generator/tut-apasna_320452",
      "title":"Тут Апасна"
   },
   {  
      "link":"/generator/ne-uzbagoyus_320127",
      "title":"не узбагоюсь"
   },
   {  
      "link":"/generator/grek_308585",
      "title":"Грек"
   },
   {  
      "link":"/generator/a-teper-predstav_305175",
      "title":" А теперь представь"
   },
   {  
      "link":"/generator/ne-nado-tak_299617",
      "title":"не надо так (мем)"
   },
   {  
      "link":"/generator/argumentnyy-argument_296884",
      "title":" Аргументный аргумент"
   },
   {  
      "link":"/generator/amerikanskiyxlopak_287718",
      "title":"amerikanskiyxlopak"
   },
   {  
      "link":"/generator/zadrot-south-park_280783",
      "title":"  Задрот south park"
   },
   {  
      "link":"/generator/olen-iz-podslushano_274029",
      "title":"олень из подслушано"
   },
   {  
      "link":"/generator/chotkiy-paca_257998",
      "title":"Чоткий паца"
   },
   {  
      "link":"/generator/sergey-kuryakin_254779",
      "title":"Сергей Курякин"
   },
   {  
      "link":"/generator/pikap-master_254030",
      "title":" Пикап мастер"
   },
   {  
      "link":"/generator/velikiy-getsbi-bokal-za-teh_236113",
      "title":"Великий Гэтсби (бокал за тех)"
   },
   {  
      "link":"/generator/dzheff-ubiyca_233992",
      "title":"Джефф убийца"
   },
   {  
      "link":"/generator/kazan1_225049",
      "title":"Казань1"
   },
   {  
      "link":"/generator/milonov_211934",
      "title":"Милонов"
   },
   {  
      "link":"/generator/griffiny--blyuyut_211644",
      "title":"Гриффины блюют"
   },
   {  
      "link":"/generator/signa_205583",
      "title":"Сигна"
   },
   {  
      "link":"/generator/nevyspavshiysya_203263",
      "title":"Невыспавшийся"
   },
   {  
      "link":"/generator/lenin-pamyatnik_202674",
      "title":" Ленин за углом (пс, парень)"
   },
   {  
      "link":"/generator/vinni-puh_199395",
      "title":"Винни пух чешет затылок"
   },
   {  
      "link":"/generator/tvitter_195738",
      "title":"   твиттер"
   },
   {  
      "link":"/generator/nikomu-konechno_185207",
      "title":"Никому конечно"
   },
   {  
      "link":"/generator/tipichnyy-bul_177577",
      "title":"типичный буль"
   },
   {  
      "link":"/generator/spudi_170337",
      "title":"Спуди"
   },
   {  
      "link":"/generator/odnako-zdravstvuyte_170130",
      "title":"Однако Здравствуйте"
   },
   {  
      "link":"/generator/starina_157238",
      "title":" старина Гэтсби"
   },
   {  
      "link":"/generator/spudi_155756",
      "title":"Спудик"
   },
   {  
      "link":"/generator/kolin-farrell_155561",
      "title":"колин фаррелл удивлен"
   },
   {  
      "link":"/generator/rendi-marsh_154231",
      "title":"   Рэнди Марш"
   },
   {  
      "link":"/generator/di-kaprio_147676",
      "title":"ди каприо"
   },
   {  
      "link":"/generator/grustnyy-svarlivyy-kot_146502",
      "title":"Грустный (сварливый) кот"
   },
   {  
      "link":"/generator/nifigase_138238",
      "title":"   нифигасе"
   },
   {  
      "link":"/generator/tipichnaya-aktimel_136397",
      "title":"типичная актимель"
   },
   {  
      "link":"/generator/minony_131183",
      "title":"Миньоны"
   },
   {  
      "link":"/generator/yandere_129899",
      "title":"Яндере"
   },
   {  
      "link":"/generator/achievement-unlocked_126388",
      "title":"achievement unlocked"
   },
   {  
      "link":"/generator/begite-glupcy_125647",
      "title":"бегите глупцы"
   },
   {  
      "link":"/generator/laughing-jack_124603",
      "title":"Laughing Jack"
   },
   {  
      "link":"/generator/jeff-the-killer_124593",
      "title":"Jeff the killer"
   },
   {  
      "link":"/generator/ne-rasstraivay-leonida-arkadevicha_121440",
      "title":"Не огорчай Леонида Аркадьевича"
   },
   {  
      "link":"/generator/udivlyonnyy-kot_121217",
      "title":" удивлённый кот"
   },
   {  
      "link":"/generator/typicalesenin_117879",
      "title":" typicalesenin"
   },
   {  
      "link":"/generator/rodina-mat_113125",
      "title":"Родина Мать"
   },
   {  
      "link":"/generator/kanevskiy-no-eto-uzhe-sovsem-drugaya-istoriya_113008",
      "title":"Каневский (Но это уже совсем другая история)"
   },
   {  
      "link":"/generator/marshrutka_111411",
      "title":"Маршрутка"
   },
   {  
      "link":"/generator/keep-calm-and-love-dean_109236",
      "title":" KEEP CALM AND LOVE DEAN"
   },
   {  
      "link":"/generator/tipichnyy-chelovek-bezyshodnost_105869",
      "title":"типичный человек безысходность"
   },
   {  
      "link":"/generator/typical-scavenger_104487",
      "title":"Typical Scavenger"
   },
   {  
      "link":"/generator/tipichnyy-chelovek_101304",
      "title":"типичный человек"
   },
   {  
      "link":"/generator/ey-paren_100104",
      "title":"Эй, парень (Ленин выглядывает)"
   },
   {  
      "link":"/generator/ty-byl-mne-kak-brat_96467",
      "title":"ты был мне как брат"
   },
   {  
      "link":"/generator/stevaner_95461",
      "title":"stevaner"
   },
   {  
      "link":"/generator/synhen_94004",
      "title":"Сынхен"
   },
   {  
      "link":"/generator/podslushano_90040",
      "title":"подслушано"
   },
   {  
      "link":"/generator/tipichnyy-balnik_88906",
      "title":"Типичный бальник"
   },
   {  
      "link":"/generator/tipichnyy-tresher_88758",
      "title":"Типичный Трэшер"
   },
   {  
      "link":"/generator/ne-rasstraivay-leonida-arkadevicha_88110",
      "title":"Не расстраивай Леонида Аркадьевича"
   },
   {  
      "link":"/generator/ukurennyy-lemur_87078",
      "title":"укуренный лемур"
   },
   {  
      "link":"/generator/vou-vou-palehche_82462",
      "title":"  воу воу палехче"
   },
   {  
      "link":"/generator/grustnyy-kot_81654",
      "title":" Грустный кот"
   },
   {  
      "link":"/generator/zima-blizko-ned-stark_79919",
      "title":"Зима близко крепитесь (Нед Старк)"
   },
   {  
      "link":"/generator/zadrot_76607",
      "title":" Задрот"
   },
   {  
      "link":"/generator/chelkastye-parni-ofigenny_75296",
      "title":" челкастые парни офигенны"
   },
   {  
      "link":"/generator/natalya-morskaya-pehota_70420",
      "title":"Наталья морская пехота"
   },
   {  
      "link":"/generator/moe-lico-kogda_70174",
      "title":"мое лицо когда"
   },
   {  
      "link":"/generator/fire-time_69250",
      "title":"fire time"
   },
   {  
      "link":"/generator/polegchep_69069",
      "title":"полегчеп"
   },
   {  
      "link":"/generator/intelligent_68374",
      "title":"Интеллигент"
   },
   {  
      "link":"/generator/tayler_67988",
      "title":"Тайлер"
   },
   {  
      "link":"/generator/freyd_63791",
      "title":"   Фрейд"
   },
   {  
      "link":"/generator/skubi-du_58938",
      "title":"Скуби ду"
   },
   {  
      "link":"/generator/medved-shlyuha_58853",
      "title":"Медведь-шлюха"
   },
   {  
      "link":"/generator/bezyshodnost_57959",
      "title":"безысходность"
   },
   {  
      "link":"/generator/filologicheskaya-deva_57461",
      "title":"ФИLOLОГИЧЕСКАЯ ДЕВА"
   },
   {  
      "link":"/generator/neudachnik-brayan_57201",
      "title":"Неудачник Брайан"
   },
   {  
      "link":"/generator/ebat-ty-loh_56515",
      "title":"Ебать ты лох"
   },
   {  
      "link":"/generator/ustanavlivat-igry_54982",
      "title":" Сашок Фокин"
   },
   {  
      "link":"/generator/chasodei_53901",
      "title":"Часодеи"
   },
   {  
      "link":"/generator/medved-v-kustah_53880",
      "title":"Медведь в кустах"
   },
   {  
      "link":"/generator/bomzh-samp-rp_53738",
      "title":"Бомж самп рп"
   },
   {  
      "link":"/generator/s-ng-karoch_51072",
      "title":"  С нг кароч"
   },
   {  
      "link":"/generator/zapadenec---tuhloe-salo_50058",
      "title":"Западенец - тухлое сало"
   },
   {  
      "link":"/generator/dasha-sledopyt_49952",
      "title":"Даша следопыт"
   },
   {  
      "link":"/generator/tvoe-vyrazhenie-lica_49049",
      "title":"твое выражение лица"
   },
   {  
      "link":"/generator/pedoded_48972",
      "title":"педодед"
   },
   {  
      "link":"/generator/hatiko_46658",
      "title":" Хатико ждет"
   },
   {  
      "link":"/generator/eto-normalno_44849",
      "title":"ЭТО НОРМАЛЬНО"
   },
   {  
      "link":"/generator/moy-akkaunt-v-warface_43487",
      "title":"Мой аккаунт в Warface"
   },
   {  
      "link":"/generator/hatiko_42514",
      "title":"  Хатико"
   },
   {  
      "link":"/generator/vatnik_35669",
      "title":"Ватник"
   },
   {  
      "link":"/generator/ya-piratka-bumz_35031",
      "title":"Я пиратка бумз"
   },
   {  
      "link":"/generator/stethem_34899",
      "title":" стетхем"
   },
   {  
      "link":"/generator/lemur_33885",
      "title":"лемур"
   },
   {  
      "link":"/generator/morfeus_30943",
      "title":" морфеус"
   },
   {  
      "link":"/generator/risovat_30042",
      "title":"Рисовать"
   },
   {  
      "link":"/generator/dart-veyder_28777",
      "title":"Дарт Вейдер"
   },
   {  
      "link":"/generator/nikogda-ecshe-tak-ne-oshibalsya_28414",
      "title":"никогда еще так не ошибался"
   },
   {  
      "link":"/generator/ne-hochu-ne-budu_27966",
      "title":"не хочу не буду"
   },
   {  
      "link":"/generator/blin_27172",
      "title":"Блин"
   },
   {  
      "link":"/generator/vatnik_26510",
      "title":"ватник"
   },
   {  
      "link":"/generator/tom-kruz_25851",
      "title":"том круз"
   },
   {  
      "link":"/generator/kot-iz-shreka_25568",
      "title":"кот из шрека"
   },
   {  
      "link":"/generator/nu-davay-rasskazhi_25080",
      "title":"Ну давай расскажи (Вилли Вонка)"
   },
   {  
      "link":"/generator/utka_24607",
      "title":"Утка"
   },
   {  
      "link":"/generator/bloodthirsty_24200",
      "title":"bloodthirsty"
   },
   {  
      "link":"/generator/dzhensen-eklz_23760",
      "title":"Дженсен Эклз"
   },
   {  
      "link":"/generator/my-little-pony_23462",
      "title":"My little pony"
   },
   {  
      "link":"/generator/vinni-puh_23430",
      "title":"Винни Пух Пятачок и Иа"
   },
   {  
      "link":"/generator/mikki_23158",
      "title":"микки"
   },
   {  
      "link":"/generator/voenkom-polkovnik_21353",
      "title":"Военком (полковник)"
   },
   {  
      "link":"/generator/tom-kruz_20566",
      "title":"Том Круз"
   },
   {  
      "link":"/generator/a-chto-esli-ya-skazhu-tebe_19594",
      "title":" а что если я скажу тебе"
   },
   {  
      "link":"/generator/vse-ochen-ploho_19005",
      "title":"ВСЕ ОЧЕНЬ ПЛОХО"
   },
   {  
      "link":"/generator/foto_18772",
      "title":"фото"
   },
   {  
      "link":"/generator/aragorn-no-tolko-ne-segodnya_18532",
      "title":" Арагорн (Но только не сегодня)"
   },
   {  
      "link":"/generator/byt-leroy_18337",
      "title":" быть Лерой"
   },
   {  
      "link":"/generator/dobbi_17941",
      "title":"добби"
   },
   {  
      "link":"/generator/olen_17734",
      "title":" олень наивный"
   },
   {  
      "link":"/generator/car_17582",
      "title":"Царь"
   },
   {  
      "link":"/generator/pila_16960",
      "title":"Пила"
   },
   {  
      "link":"/generator/tipichnaya-anoreksichka_16692",
      "title":"Типичная анорексичка"
   },
   {  
      "link":"/generator/voobrazhenie-spanch-bob_15431",
      "title":"Воображение (Спанч Боб)"
   },
   {  
      "link":"/generator/kosmos_15346",
      "title":"Ты просто космос"
   },
   {  
      "link":"/generator/rainbow-factory-dash_14931",
      "title":"RAINBOW FACTORY DASH"
   },
   {  
      "link":"/generator/moy-klass_14908",
      "title":" Мой класс"
   },
   {  
      "link":"/generator/petuh_14291",
      "title":"петух"
   },
   {  
      "link":"/generator/druzhit-s-toboy-afigenno_14262",
      "title":" Дружить с тобой офигенно"
   },
   {  
      "link":"/generator/ozhidanie-realnost_13641",
      "title":"Ожидание реальность"
   },
   {  
      "link":"/generator/tipichnaya-aptechnica_13476",
      "title":"Типичная аптечница"
   },
   {  
      "link":"/generator/ty-delaesh-eto-bez-uvazheniya_12325",
      "title":"ты делаешь это без уважения"
   },
   {  
      "link":"/generator/zhencshiny-aliens_12176",
      "title":"Женщины (aliens)"
   },
   {  
      "link":"/generator/shurik-ptichku-zhalko_11946",
      "title":"Шурик (птичку жалко)"
   },
   {  
      "link":"/generator/ugryumyy-kot_11846",
      "title":"Угрюмый кот"
   },
   {  
      "link":"/generator/podzhigatelnica_11579",
      "title":"Поджигательница"
   },
   {  
      "link":"/generator/prikol_11566",
      "title":"прикол"
   },
   {  
      "link":"/generator/idi-obnimu_11474",
      "title":"Иди обниму"
   },
   {  
      "link":"/generator/pacan-narkoman_11114",
      "title":"Пацан наркоман"
   },
   {  
      "link":"/generator/10-guy_10901",
      "title":"10 guy (Stoner Stanley really high guy укуренный парень)"
   },
   {  
      "link":"/generator/tipichnyy-ohlobystin_9630",
      "title":" Типичный Охлобыстин"
   },
   {  
      "link":"/generator/babka-wat-shta_8875",
      "title":"Шта (Бабка wat)"
   },
   {  
      "link":"/generator/davayte-pohlopaem-tem-kto-sdal-n_8531",
      "title":"Давайте похлопаем тем кто сдал н"
   },
   {  
      "link":"/generator/fotki_7944",
      "title":"фотки"
   },
   {  
      "link":"/generator/vot-eto-povorot_7889",
      "title":"Вот это поворот"
   },
   {  
      "link":"/generator/citaty-velikih-lyudey_7884",
      "title":"цитаты великих людей"
   },
   {  
      "link":"/generator/mdk_7657",
      "title":"мдк"
   },
   {  
      "link":"/generator/love-is_7237",
      "title":"Love is"
   },
   {  
      "link":"/generator/spanch-bob-plachet_6877",
      "title":"Спанч Боб плачет"
   },
   {  
      "link":"/generator/frai-v-panike_6212",
      "title":"Фрай в панике"
   },
   {  
      "link":"/generator/koshernyy-ashotik_6153",
      "title":"Кошерный Ашотик"
   },
   {  
      "link":"/generator/ashotik-car_6152",
      "title":"Ашотик царь"
   },
   {  
      "link":"/generator/ashotik-mladshaya-sestra_6151",
      "title":"Ашотик младшая сестра"
   },
   {  
      "link":"/generator/ashotik-vlyublennyy_6150",
      "title":"Ашотик влюбленный"
   },
   {  
      "link":"/generator/klichko_6102",
      "title":"кличко философ"
   },
   {  
      "link":"/generator/uporotyy-lis-kurit-kalyan_6067",
      "title":"Упоротый лис курит кальян"
   },
   {  
      "link":"/generator/babka_5963",
      "title":"Бабка"
   },
   {  
      "link":"/generator/azarov_5808",
      "title":"азаров"
   },
   {  
      "link":"/generator/orlov_5769",
      "title":"Орлов"
   },
   {  
      "link":"/generator/kakoy-pacan_5591",
      "title":" Какой пацан (негритенок)"
   },
   {  
      "link":"/generator/bud-muzhikom-bleat_5581",
      "title":"Будь мужиком в маске блеать"
   },
   {  
      "link":"/generator/tipichnaya-baba_5416",
      "title":"типичная баба"
   },
   {  
      "link":"/generator/zheleznyy-chelovek_5292",
      "title":"железный человек"
   },
   {  
      "link":"/generator/oy-nu-perestan_5115",
      "title":"Ой ну перестань"
   },
   {  
      "link":"/generator/ahuenno_5082",
      "title":"офигенно"
   },
   {  
      "link":"/generator/ya-tebya-lublu_5050",
      "title":" Я тебя люблю"
   },
   {  
      "link":"/generator/prist-anded_4965",
      "title":"прист андед"
   },
   {  
      "link":"/generator/don-vito-korleone_4683",
      "title":"Дон Вито Корлеоне"
   },
   {  
      "link":"/generator/professor-preobrazhenskiy_4596",
      "title":"Профессор Преображенский"
   },
   {  
      "link":"/generator/moe-lico_4428",
      "title":"мое лицо"
   },
   {  
      "link":"/generator/advokat_4388",
      "title":"Адвокат"
   },
   {  
      "link":"/generator/da-ladno_4275",
      "title":" Да ладно"
   },
   {  
      "link":"/generator/kosmos-ohuenno_4262",
      "title":" Космос (офигенно)"
   },
   {  
      "link":"/generator/toni-stark_4244",
      "title":"Тони Старк (Роберт Дауни младший)"
   },
   {  
      "link":"/generator/naberyom-50-laykov_4089",
      "title":"наберём 50 лайков"
   },
   {  
      "link":"/generator/sasha-grey_4036",
      "title":" Саша Грей улыбается"
   },
   {  
      "link":"/generator/ekspert-v-sporah_4016",
      "title":"Эксперт в спорах"
   },
   {  
      "link":"/generator/krestnyy-otec_3956",
      "title":"крестный отец"
   },
   {  
      "link":"/generator/uporotaya-lisa_3812",
      "title":"Упоротая лиса"
   },
   {  
      "link":"/generator/tumannost_3769",
      "title":"Туманность"
   },
   {  
      "link":"/generator/gomer_3723",
      "title":" Гомер"
   },
   {  
      "link":"/generator/vselennaya_3712",
      "title":"Вселенная"
   },
   {  
      "link":"/generator/vanga_3701",
      "title":"Ванга (цвет)"
   },
   {  
      "link":"/generator/kosmos_3683",
      "title":"Космос"
   },
   {  
      "link":"/generator/vanga_3669",
      "title":"Ванга"
   },
   {  
      "link":"/generator/omskaya-ptica_3627",
      "title":"Омская птица в балахоне"
   },
   {  
      "link":"/generator/pidrila-ebanaya-kotik_3599",
      "title":"Пидрила ебаная котик"
   },
   {  
      "link":"/generator/pidrila-ebanaya_3598",
      "title":"Пидрила Ебаная"
   },
   {  
      "link":"/generator/frodum_3581",
      "title":"фродум"
   },
   {  
      "link":"/generator/a-chto-esli_3544",
      "title":"А что если (Киану Ривз)"
   },
   {  
      "link":"/generator/patrik_3501",
      "title":"Радостный Патрик"
   },
   {  
      "link":"/generator/chakke_3367",
      "title":"Чакке"
   },
   {  
      "link":"/generator/alkogolik-kadr_3359",
      "title":"Алкоголик-кадр"
   },
   {  
      "link":"/generator/mne-kazhetsya-ili-lila_3278",
      "title":"Мне кажется или (с Лилой)"
   },
   {  
      "link":"/generator/yanukovich_3125",
      "title":"Янукович"
   },
   {  
      "link":"/generator/putin_3074",
      "title":"Ухмыляющийся Путин"
   },
   {  
      "link":"/generator/ofigela_2989",
      "title":"Офигела"
   },
   {  
      "link":"/generator/petrosyanych_2938",
      "title":"Петросяныч"
   },
   {  
      "link":"/generator/matroskin_2907",
      "title":"Грустный Матроскин с гитарой"
   },
   {  
      "link":"/generator/kot-shrek_2853",
      "title":"Котик из Шрека"
   },
   {  
      "link":"/generator/nu-cho_2813",
      "title":"Ну чо"
   },
   {  
      "link":"/generator/pshel-von-2_2810",
      "title":"Пшел вон 2"
   },
   {  
      "link":"/generator/muzhik_2768",
      "title":"мужик"
   },
   {  
      "link":"/generator/rpeprp_2754",
      "title":"Психопат с топором"
   },
   {  
      "link":"/generator/bud-plohim-parnem_2752",
      "title":"Будь плохим парнем"
   },
   {  
      "link":"/generator/tipichnyj-gopnik_2701",
      "title":"Типичный гопник"
   },
   {  
      "link":"/generator/fuck-yea_2669",
      "title":"fuck yea"
   },
   {  
      "link":"/generator/ha-ha-ha_2661",
      "title":"Злая училка"
   },
   {  
      "link":"/generator/mne-kazhetsya-ili-frai-futurama_2616",
      "title":"Мне кажется или (Фрай Футурама)"
   },
   {  
      "link":"/generator/subzeromem_2577",
      "title":"Саб-Зиро"
   },
   {  
      "link":"/generator/zapisalsya-dobrovolcem_2575",
      "title":"Записался добровольцем"
   },
   {  
      "link":"/generator/a-ty_2556",
      "title":"а ты"
   },
   {  
      "link":"/generator/bud-baboj-blead_2511",
      "title":"Будь бабой-блеадь"
   },
   {  
      "link":"/generator/a-ty-zapisalsya-dobrovolcem_2506",
      "title":"А ты записался добровольцем"
   },
   {  
      "link":"/generator/belka_2471",
      "title":"   белка молится"
   },
   {  
      "link":"/generator/zakryvaet-lico_2439",
      "title":"Закрывает лицо"
   },
   {  
      "link":"/generator/nejtan-iz-otbrosov_2426",
      "title":"Нейтан из Отбросов"
   },
   {  
      "link":"/generator/jozef1_2408",
      "title":"Йозеф1"
   },
   {  
      "link":"/generator/lomaj-menya-polnostyu_2389",
      "title":"Ломай меня полностью"
   },
   {  
      "link":"/generator/sashok-radostniy_2383",
      "title":"Сашок (радостный)"
   },
   {  
      "link":"/generator/alyonka_2381",
      "title":"Алёнка"
   },
   {  
      "link":"/generator/botan_2362",
      "title":"Ботан"
   },
   {  
      "link":"/generator/malysheva_2323",
      "title":"Елена Малышева"
   },
   {  
      "link":"/generator/sashok_2322",
      "title":"сашок"
   },
   {  
      "link":"/generator/troll-boromir_2318",
      "title":"Тролль Боромир"
   },
   {  
      "link":"/generator/lol_2278",
      "title":"LOL"
   },
   {  
      "link":"/generator/zhopa_2268",
      "title":"жопа"
   },
   {  
      "link":"/generator/nu-pozhaluysta-nyasha_2214",
      "title":" ну пожалуйста (please)"
   },
   {  
      "link":"/generator/ochki-nnada-a-chyotki-nnada_2169",
      "title":"Очки ннада А чётки ннада"
   },
   {  
      "link":"/generator/tovaricsh-advokat_2148",
      "title":"Адвокат рисунок"
   },
   {  
      "link":"/generator/boevoi-muzhik-bleat_2144",
      "title":"Боевой мужик блеать"
   },
   {  
      "link":"/generator/eto-sparta_2132",
      "title":"Это Спарта"
   },
   {  
      "link":"/generator/forever-alone_2114",
      "title":"Forever Alone"
   },
   {  
      "link":"/generator/please--s-vytyanutoj-rukoj_2107",
      "title":" please  с вытянутой рукой"
   },
   {  
      "link":"/generator/davaj-do-svidaniya_2087",
      "title":"Давай до свидания"
   },
   {  
      "link":"/generator/ne-carskoe-eto-delo_2056",
      "title":"Не царское это дело"
   },
   {  
      "link":"/generator/nelzya-prosto-tak-vzyat-i-boromir-mem_2029",
      "title":"Нельзя просто так взять и (Боромир мем)"
   },
   {  
      "link":"/generator/putin_2024",
      "title":"Путин"
   },
   {  
      "link":"/generator/minikrafter_2015",
      "title":"Миникрафтер"
   },
   {  
      "link":"/generator/nelzya-prosto-vzyat_2011",
      "title":"Нельзя просто взять"
   },
   {  
      "link":"/generator/radost_1990",
      "title":"радость"
   },
   {  
      "link":"/generator/stiv_1938",
      "title":"стив"
   },
   {  
      "link":"/generator/nu-pochemu_1937",
      "title":"Ну почему (белый фон)"
   },
   {  
      "link":"/generator/poker-fejs_1923",
      "title":"покер фейс"
   },
   {  
      "link":"/generator/vyzov-prinyat_1852",
      "title":"вызов принят"
   },
   {  
      "link":"/generator/fak-e_1847",
      "title":"фак е"
   },
   {  
      "link":"/generator/futbol_1776",
      "title":"футбол"
   },
   {  
      "link":"/generator/daaa_1737",
      "title":"Дааа"
   },
   {  
      "link":"/generator/chernyj-vlastelin_1721",
      "title":"Черный властелин"
   },
   {  
      "link":"/generator/pochemu_1696",
      "title":" почему мем"
   },
   {  
      "link":"/generator/lomaj-menya-polnostu_1693",
      "title":"Ломай меня полностью"
   },
   {  
      "link":"/generator/davaj-dosvidaniya_1655",
      "title":"Давай досвидания"
   },
   {  
      "link":"/generator/zloj-tipichnyj-botan_1624",
      "title":"Злой Типичный Ботан"
   },
   {  
      "link":"/generator/gomer_1610",
      "title":"Разъяренный Гомер"
   },
   {  
      "link":"/generator/patrik_1559",
      "title":"Патрик (берешь и делаешь)"
   },
   {  
      "link":"/generator/tp_1554",
      "title":"тп"
   },
   {  
      "link":"/generator/kote_1550",
      "title":" котенок"
   },
   {  
      "link":"/generator/zhirinovskij-ty_1538",
      "title":"жириновский ты"
   },
   {  
      "link":"/generator/iisus_1514",
      "title":"Иисус"
   },
   {  
      "link":"/generator/petrosyan_1506",
      "title":"петросян"
   },
   {  
      "link":"/generator/kote_1480",
      "title":" котэ молится"
   },
   {  
      "link":"/generator/ser-nadmennost_1434",
      "title":"Сэр Надменность"
   },
   {  
      "link":"/generator/biber_1346",
      "title":"Бибер"
   },
   {  
      "link":"/generator/tipichyy-botan_1327",
      "title":"Типичный ботан"
   },
   {  
      "link":"/generator/spsb-pdrchl_1319",
      "title":"СПСБ ПДРЧЛ"
   },
   {  
      "link":"/generator/malyshka_1248",
      "title":"  малышка"
   },
   {  
      "link":"/generator/adolf-i-deti_1243",
      "title":"Адольф и дети"
   },
   {  
      "link":"/generator/gusi_1200",
      "title":"гуси"
   },
   {  
      "link":"/generator/potomu-chto-ya-modnik_1130",
      "title":"Потому что я модник"
   },
   {  
      "link":"/generator/creeper_1128",
      "title":"Creeper"
   },
   {  
      "link":"/generator/nu-pochemu-devushka_1126",
      "title":"Ну почему (девушка)"
   },
   {  
      "link":"/generator/kote-tankist_1105",
      "title":"Котэ танкист"
   },
   {  
      "link":"/generator/derzkij-kote_1078",
      "title":"Дерзкий котэ"
   },
   {  
      "link":"/generator/pustoj-list_1052",
      "title":"Пустой лист"
   },
   {  
      "link":"/generator/mrazish_1044",
      "title":"Мразиш"
   },
   {  
      "link":"/generator/omskaya-zagadka_952",
      "title":"Омская загадка"
   },
   {  
      "link":"/generator/mne-kazetsya-ili_912",
      "title":"Мне кажется или"
   },
   {  
      "link":"/generator/babulya_911",
      "title":" бабуля"
   },
   {  
      "link":"/generator/fraj-mne-kazhetca-ili_910",
      "title":" Фрай (мне кажется или)"
   },
   {  
      "link":"/generator/borat_882",
      "title":"Борат"
   },
   {  
      "link":"/generator/oldskul_852",
      "title":"олдскул"
   },
   {  
      "link":"/generator/patrik_850",
      "title":"Патрик"
   },
   {  
      "link":"/generator/ashot-frimen_847",
      "title":"Ашот Фримэн"
   },
   {  
      "link":"/generator/spanch-bob_815",
      "title":"спанч боб"
   },
   {  
      "link":"/generator/skvidvard_813",
      "title":"Сквидвард в полный рост"
   },
   {  
      "link":"/generator/guf_795",
      "title":"Гуф"
   },
   {  
      "link":"/generator/gta_760",
      "title":"GTA"
   },
   {  
      "link":"/generator/tipichnyj-nedosypayucshij_757",
      "title":"типичный недосыпающий"
   },
   {  
      "link":"/generator/orbit_742",
      "title":"орбит"
   },
   {  
      "link":"/generator/nyasha_726",
      "title":"Влюбленный"
   },
   {  
      "link":"/generator/yao-min_724",
      "title":"Яо Мин"
   },
   {  
      "link":"/generator/troll-advice_723",
      "title":"Тролль Адвайс"
   },
   {  
      "link":"/generator/aaaa_720",
      "title":" аааа"
   },
   {  
      "link":"/generator/blyat_714",
      "title":"блять"
   },
   {  
      "link":"/generator/hokkeist_683",
      "title":"Хоккеист"
   },
   {  
      "link":"/generator/tupaya-vagina_647",
      "title":" Тупая Вагина"
   },
   {  
      "link":"/generator/gitler_634",
      "title":"Гитлер"
   },
   {  
      "link":"/generator/buratino_615",
      "title":"буратино"
   },
   {  
      "link":"/generator/trollface-lol_614",
      "title":" Trollface LOL"
   },
   {  
      "link":"/generator/spanch-bob_613",
      "title":"Спанч боб"
   },
   {  
      "link":"/generator/veselyj-pedobil_610",
      "title":"ВЕСЕЛЫЙ ПЕДОБИЛ"
   },
   {  
      "link":"/generator/vsegda-odin_609",
      "title":"всегда один"
   },
   {  
      "link":"/generator/dzheki-chan_586",
      "title":"ДЖЕКИ ЧАН"
   },
   {  
      "link":"/generator/apro_581",
      "title":"Это самый"
   },
   {  
      "link":"/generator/chetko_550",
      "title":"Четко"
   },
   {  
      "link":"/generator/nu-pochemu_548",
      "title":"Ну почему"
   },
   {  
      "link":"/generator/tipichnyj-igrok-minecraft_540",
      "title":"Типичный игрок Minecraft"
   },
   {  
      "link":"/generator/pochemu_520",
      "title":"Почему"
   },
   {  
      "link":"/generator/stalin_504",
      "title":" иосиф сталин"
   },
   {  
      "link":"/generator/nadoedlivyj-apelsin_501",
      "title":"Надоедливый апельсин"
   },
   {  
      "link":"/generator/yao-ming_500",
      "title":"Яо минг"
   },
   {  
      "link":"/generator/zeleniy-slonik_492",
      "title":"Зеленый слоник"
   },
   {  
      "link":"/generator/krasavchik_490",
      "title":"красавчик"
   },
   {  
      "link":"/generator/sloupok_477",
      "title":"слоупок"
   },
   {  
      "link":"/generator/evrej-sovetchik_459",
      "title":"Еврей советчик"
   },
   {  
      "link":"/generator/chak-norris_452",
      "title":"чак норрис"
   },
   {  
      "link":"/generator/borodach_447",
      "title":"Бородач"
   },
   {  
      "link":"/generator/lego_444",
      "title":"Лего"
   },
   {  
      "link":"/generator/dajver_415",
      "title":"Дайвер"
   },
   {  
      "link":"/generator/dovolnaya-obezyana_414",
      "title":" Довольная обезьяна"
   },
   {  
      "link":"/generator/bender_382",
      "title":"Бендер"
   },
   {  
      "link":"/generator/medvedev-spok-bro_373",
      "title":"Медведев спок бро"
   },
   {  
      "link":"/generator/student-praktikant_370",
      "title":"  Студент практикант"
   },
   {  
      "link":"/generator/yurij-bojko_368",
      "title":"Юрий БОЙКО"
   },
   {  
      "link":"/generator/tupaya-pizda_367",
      "title":"тупая пизда"
   },
   {  
      "link":"/generator/master-joda_366",
      "title":"Мастер Йода"
   },
   {  
      "link":"/generator/dver-mne-zapili_365",
      "title":"Дверь мне запили"
   },
   {  
      "link":"/generator/zapili_364",
      "title":"Запили"
   },
   {  
      "link":"/generator/hvatit-eto-terpet-zhirinovskij_356",
      "title":"Хватит это терпеть (Жириновский)"
   },
   {  
      "link":"/generator/lol_348",
      "title":"Покерфэйс"
   },
   {  
      "link":"/generator/kote_309",
      "title":" Два котэ"
   },
   {  
      "link":"/generator/tipichnyj-voditel-vaz-2121_288",
      "title":"типичный водитель ВАЗ-2121"
   },
   {  
      "link":"/generator/hitryj-lenin_287",
      "title":"хитрый ленин"
   },
   {  
      "link":"/generator/paladin_283",
      "title":"паладин"
   },
   {  
      "link":"/generator/sudya-egorova_278",
      "title":"Судья Егорова"
   },
   {  
      "link":"/generator/psiholog-lejla_273",
      "title":"Психолог Лейла"
   },
   {  
      "link":"/generator/stalin_246",
      "title":" сталин цветной"
   },
   {  
      "link":"/generator/gost_234",
      "title":"Ночной гость"
   },
   {  
      "link":"/generator/arshavin_229",
      "title":"Аршавин"
   },
   {  
      "link":"/generator/da-vsem-nasrat-griffin_209",
      "title":" Да всем насрать (Гриффин)"
   },
   {  
      "link":"/generator/putin_208",
      "title":"путин"
   },
   {  
      "link":"/generator/ukurennyj-shkolnik_192",
      "title":"Укуренный школьник"
   },
   {  
      "link":"/generator/lenin_190",
      "title":"  Ленин удивлен"
   },
   {  
      "link":"/generator/trollface_184",
      "title":"Троллфейс"
   },
   {  
      "link":"/generator/koshecka_180",
      "title":" Кошечка"
   },
   {  
      "link":"/generator/airsoft_179",
      "title":"airsoft"
   },
   {  
      "link":"/generator/volk_175",
      "title":"Волк"
   },
   {  
      "link":"/generator/golub_172",
      "title":"голубь"
   },
   {  
      "link":"/generator/medvedev_169",
      "title":" Медведев advice"
   },
   {  
      "link":"/generator/popugaj-paranoik_163",
      "title":"Попугай параноик"
   },
   {  
      "link":"/generator/tolstaya-amerikanka_162",
      "title":"Толстая американка"
   },
   {  
      "link":"/generator/okay-face_161",
      "title":"Okay face"
   },
   {  
      "link":"/generator/umnyj-gopnik_156",
      "title":"умный гопник"
   },
   {  
      "link":"/generator/enot-kalamburist_117",
      "title":"Енот-Каламбурист"
   },
   {  
      "link":"/generator/yoda_113",
      "title":"Мастер Йода"
   },
   {  
      "link":"/generator/pedobir_97",
      "title":"Педобир"
   },
   {  
      "link":"/generator/plohoj-paren_96",
      "title":"Плохой парень"
   },
   {  
      "link":"/generator/plohaya-muzyka_85",
      "title":"Плохая музыка"
   },
   {  
      "link":"/generator/tipichnye-podruzhki_74",
      "title":"Типичные подружки"
   },
   {  
      "link":"/generator/china_71",
      "title":"China"
   },
   {  
      "link":"/generator/ya-tvoi-dom-truba-shatal_69",
      "title":"Я твой дом труба шатал"
   },
   {  
      "link":"/generator/zlye-roditeli_67",
      "title":" Злые родители"
   },
   {  
      "link":"/generator/kamennaya-golova_63",
      "title":"каменная голова"
   },
   {  
      "link":"/generator/uchilka_57",
      "title":"Типичная училка"
   },
   {  
      "link":"/generator/homyak_53",
      "title":"Хомяк"
   },
   {  
      "link":"/generator/merzkaya-zhaba_12",
      "title":"Мерзкая жаба"
   },
   {  
      "link":"/generator/forever-alone_8",
      "title":"Forever Alone"
   },
   {  
      "link":"/generator/zloy-shkolnik_7",
      "title":"Злой школьник"
   },
   {  
      "link":"/generator/lenivec_6",
      "title":"Ленивец"
   },
   {  
      "link":"/generator/sumasshedshij-volk_5",
      "title":"Сумасшедший волк"
   },
   {  
      "link":"/generator/socialno-neuklyuzhij-pingvin_4",
      "title":" Социально-неуклюжий пингвин"
   },
   {  
      "link":"/generator/filosoraptor_3",
      "title":"Филосораптор"
   },
   {  
      "link":"/generator/omskaya-ptica_2",
      "title":"Омская птица"
   },
   {  
      "link":"/generator/advice-dog_1",
      "title":"Advice Dog"
   }
	];

	var BASE_URL = 'http://risovach.ru';

	return function(message, meme, title, text) {
		if (text === undefined) {
			text = title;
			title = meme;
		}

		console.log('[Meme Plugin] Execute', message, meme, title, text);

		var appropriateMemes = memes.filter(function(item) {
			return item.title.toLowerCase().indexOf(meme.toLowerCase()) !== -1 || meme.toLowerCase().indexOf(item.title.toLowerCase()) !== -1;
		});

		// var resultMeme = memes.reduce(function(accum, item) {
		// 	var distance = new levenshtein(meme.toLowerCase(), item.title.toLowerCase()).distance;
		// 	if (distance < accum.distance) {
		// 		return {
		// 			meme: item,
		// 			distance: distance
		// 		};
		// 	}

		// 	return accum;
		// }, {meme: undefined, distance: 1000000});

		console.log(appropriateMemes);

		if (!appropriateMemes.length) {
			return;
		}


		var resultMeme = appropriateMemes[Math.floor((Math.random() * 100) % appropriateMemes.length)];

		var filename;

		fileService
			.downloadAndSaveFile({ 
				url: BASE_URL + resultMeme.link,
				method: 'POST',
				formData: {
					zdata1: title,
					zdata2: text,
					download: 'Скачать'
				} 
			}, 'jpg')
			.then(function(file) {
				filename = file;
				return vk.messages.getImageAttachmentId(file);
			})
			.then(function(attachment) {
				return vk.messages.send({
					chat_id: message.chat_id,
					user_id: message.chat_id ? undefined : message.user_id,
					attachment: attachment
				});
			})
			.catch(function(error) {
				console.log('[plugin][meme] Error while sending image');
			})
			.done(function() {
				fileService.deleteFile(filename);
			});
	};
};