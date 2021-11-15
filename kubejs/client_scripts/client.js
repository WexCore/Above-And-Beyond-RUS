// priority: 0

onEvent('jei.hide.items', event => {
	event.hide('appliedenergistics2:facade')
	event.hide(`#buddycards:cards`)
})

onEvent('jei.subtypes', event => {
	event.useNBT('advancedrocketry:planet_id_chip')
})

onEvent('jei.hide.fluids', event => {
})

onEvent('jei.add.items', event => {
	event.add('thermal:ruby')
	event.add('thermal:ruby_dust')
	event.add('thermal:ruby_ore')
	event.add('thermal:apatite_ore')
	event.add('thermal:sapphire')
	event.add('thermal:sapphire_dust')
	event.add('thermal:sapphire_ore')

	event.add(Item.of("advancedrocketry:planet_id_chip", { dimId: "custommoon:moon", DimensionName: " The Moon " }))
	event.add(Item.of("advancedrocketry:planet_id_chip", { dimId: "minecraft:overworld", DimensionName: " Earth " }))

})

onEvent('jei.remove.categories', event => {
	event.yeetIf(element => {
		let name = (element.getUid() + "")
		return name.startsWith('advancedrocketry:') || name.startsWith("thermal:centrifuge")
	});
})

onEvent('item.tooltip', tooltip => {
	let holds = (id, slots) => tooltip.add("metalbarrels:" + id + "_barrel", [`§7${slots} Слотов`])
	let main_assembly = (id, stage) => tooltip.add(id, [`§7Основная сборка: ${stage == "4" ? "§6Финал" : "§6Глава " + stage}`, '§8Подумайте над автоматизацией',  '§8производства этого предмета'])
	let bonus_assembly = (id, stage) => tooltip.add(id, [`§7Бонусная сборка: §6Глава ${stage}`])
	let not_consumed = (id, stage) => tooltip.add(id, [`§7Не тратится в процессе сборки`])
	let ore = (id, y1, y2) => tooltip.add(id, [`§o§7Находится на высоте от §6${y1} §7до §6${y2}`])

	tooltip.add("minecraft:redstone_ore", [`§7Не генерируется в мире, для получения редстоуна нужно измельчить киноварь.`]);

	ore("forbidden_arcanus:arcane_crystal_ore", 1, 9)
	ore("appliedenergistics2:charged_quartz_ore", 1, 30)
	ore("forbidden_arcanus:xpetrified_ore", 1, 30)
	ore("appliedenergistics2:quartz_ore", 1, 30)
	ore("thermal:apatite_ore", 1, 30)
	ore("thermal:cinnabar_ore", 1, 30)
	ore("thermal:niter_ore", 1, 30)
	ore("thermal:nickel_ore", 1, 40)
	ore("thermal:ruby_ore", 1, 30)
	ore("thermal:sapphire_ore", 1, 30)
	ore("thermal:lead_ore", 1, 20)
	ore("minecraft:emerald_ore", 1, 30)
	ore("thermal:sulfur_ore", 12, 36)
	ore("create:zinc_ore", 15, 70)
	ore("create:copper_ore", 40, 85)

	ore("minecraft:coal_ore", 1, 128)
	ore("minecraft:iron_ore", 1, 64)
	ore("minecraft:lapis_ore", 1, 32)
	ore("minecraft:gold_ore", 1, 32)
	ore("minecraft:diamond_ore", 1, 16)

	tooltip.add("advancedrocketry:planet_id_chip", [`§3Как использовать:`, `1. §7Используйте рецепты крафта чтобы их получить`, `2. §7Откройте интерфейс вашей ракеты`, `3. §7Щелкните по отображаемому элементу Guidance Computer`, `4. §7Вставьте чип в пустую ячейку`, "§8§o(Использование меню выбора планеты приводит к крашу)"]);

	holds('copper', 5 * 9)
	holds('iron', 6 * 9)
	holds('silver', 8 * 9)
	holds('gold', 9 * 9)

	main_assembly('kubejs:kinetic_mechanism', "1")
	bonus_assembly('kubejs:sealed_mechanism', "1A")
	main_assembly('create:precision_mechanism', "2")
	bonus_assembly('kubejs:infernal_mechanism', "2A")
	main_assembly('kubejs:inductive_mechanism', "3")
	bonus_assembly('kubejs:abstruse_mechanism', "3A")
	main_assembly('kubejs:calculation_mechanism', "4")

	not_consumed('cb_microblock:stone_saw')
	not_consumed('cb_microblock:iron_saw')
	not_consumed('cb_microblock:diamond_saw')
	not_consumed('projectred-core:screwdriver')
	// not_consumed('create:super_glue')
	not_consumed('kubejs:chromatic_resonator')
	not_consumed('kubejs:flash_drive')
	// not_consumed('xreliquary:mercy_cross')
	// not_consumed('xreliquary:ender_staff')

	global.substrates[0].forEach(e => tooltip.add(e.id, [`§8Категория: §7Магматические`]));
	global.substrates[1].forEach(e => tooltip.add(e.id, [`§8Категория: §7Травяные`]));
	global.substrates[2].forEach(e => tooltip.add(e.id, [`§8Категория: §7Нестабильные`]));
	global.substrates[3].forEach(e => tooltip.add(e.id, [`§8Категория: §7Кристалические`]));
	global.substrates[4].forEach(e => tooltip.add(e.id, [`§8Категория: §7Металлургические`]));
	global.substrates[5].forEach(e => tooltip.add(e.id, [`§8Категория: §7Самоцветные`]));
	global.substrates[6].forEach(e => tooltip.add(e.id, [`§8Категория: §7Катализаторы`]));

	tooltip.add("structurescompass:structures_compass", [`§7ПКМ для активации`]);

	tooltip.add("kubejs:accellerator_redstone", ["§7При использовании в алхимическом исследовании:", "  §6Один из §eправильных §6реагентов",
		"  §6в §eнеправильном §6слоте не будет потрачен"]);
	tooltip.add("kubejs:accellerator_glowstone", ["§7При использовании в алхимическом исследовании:", "  §6Один из §eправильных §6реагентов",
		"  §6в §eправильном §6слоте не будет потрачен"]);

	for (i = 0; i < 15; i++)
		tooltip.add(`kubejs:failed_alchemy_${i}`, [
			`§7Поместите в центробежный разделитель для анализа.`,
			"",
			"§6Даёт:",
			"- Пепел §7за каждый неправильный ингридиент",
			"- Редстоун §7за каждый правильный ингридиент",
			"   §7в неправильном слоте",
			"- Глоустоун §7за каждый правильный ингридиент",
			"   §7в правильном слоте"
		])
})

onEvent('jei.information', event => {
	// event.add('thermal:blitz_rod', ["Obtain by running a §9Charged Staff§0 (with Charge) and any amount of §9Tiny Smoke Clouds§0 through an §5Alchemical Laser§0."])
	event.add('thermal:blizz_rod', ["Можно получить, если §9Манипулятор энтропии§0 (заряженный) и любое количество §9снежков§0 прогнать через §5Алхимический лазер§0. "])
	event.add('thermal:basalz_rod', ["Можно получить, если §9Потоковый магнит§0 (заряженный) и любое количество §9базальта§0 прогнать через §5Алхимический лазер§0. "])
	event.add('kubejs:substrate_silicon', ["Можно получить, если §9Катализатор хаоса§0 и любое количество §9определённого реагента§0 прогнать через §5Алхимический лазер§0.", " ", "Реагент под вопросом §9меняется от мира к миру§0."])

	event.add('kubejs:alchemical_laser', ["Этот предмет представляет §5Алхимический лазер§0. Используйте §9Размышление§0 (зажмите w) на этом предмете, чтобы узнать, как он создается."])

	let catalyst = (name, me) =>
		[
			`Получается путём нахождения §9правильной комбинации§0 четырёх §9${me ? name : name + " §0реагентов"}§0 используя §5Алхимический лазер§0.`, " ",
			`§81.§0 Поместите в первые четыре слота вагонетки с воронкой четыре §9${me ? name : name + " §0реагента"}§0`,
			`§82.§0 Запустите §5Алхимический лазер§0 на содержимое и получите §9катализатор§0, или §9подсказку§0 к правильной комбинации`, " ",
			"§8PS:§0 В правильной комбинации могут быть §9дубликаты§0",
			"§8PS:§0 Правильная комбинация §9разнится от мира к миру§0",
			"§8Опционально:§0 Поместите §9Редстоун ускоритель§0 или §9Глоустоун ускоритель§0 в пятый слот для §9дополнительных подсказок§0",
		]

	event.add('kubejs:substrate_igneous', catalyst("Магматических"))
	event.add('kubejs:substrate_herbal', catalyst("Травяных"))
	event.add('kubejs:substrate_volatile', catalyst("Нестабильных"))
	event.add('kubejs:substrate_crystal', catalyst("Кристальных"))
	event.add('kubejs:substrate_metal', catalyst("Металлургических"))
	event.add('kubejs:substrate_gem', catalyst("Самоцветных"))

	let beer = (id, igs) =>
		event.add('drinkbeer:beer_mug' + id, ["Поместите 4 пустые пивные кружки, " + igs + " в бочонок для создания этого напитка."])

	beer("", "3 пшеницы и ведро воды")
	beer("_blaze_stout", "2 пшеницы, 1 огненный порошок и ведро воды")
	beer("_blaze_milk_stout", "1 пшеница, 1 сахар, 1 огненный порошок и ведро воды") //wtf are these drinks
	beer("_apple_lambic", "2 пшеницы, яблоко и ведро воды")
	beer("_sweet_berry_kriek", "2 пшеницы, 1 сладкая ягода и ведро воды")
	beer("_haars_icey_pale_lager", "3 пшеницы и блок синего льда")
	beer("_pumpkin_kvass", "2 хлеба, тыква и ведро воды")

	event.add('kubejs:substrate_chaos', catalyst("катализаторов", "Chaos Catalyst").concat([
		" ", "§8Использование:§0", "Прокат вагонетки с §9Катализатором Хаоса§0 и любым количеством §9реагента§0 через §5алхимический лазер§0 произведёт §9трансмутацию§0 одного реагента в другой. Трансмутационные пары §9уникальны для каждого мира§0."
	]))
})