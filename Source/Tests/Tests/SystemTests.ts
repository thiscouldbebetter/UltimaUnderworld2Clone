
class SystemTests extends TestFixture
{
	constructor()
	{
		super(SystemTests.name);
	}

	tests(): ( (callback: () => void) => void )[]
	{
		var returnTests =
		[
			this.playFromStart
		];

		return returnTests;
	}

	// Tests.

	playFromStart(callback: () => void ): void
	{
		var environment = new EnvironmentMock();
		environment.universeBuild
		(
			(u: Universe) =>
			{
				u.initialize
				(
					() => this.playFromStart_UniverseInitialized(callback, u)
				)
			}
		);
	}

	playFromStart_UniverseInitialized(callback: () => void, universe: Universe): void
	{
		var methodsToRun =
		[
			this.playFromStart_1
		];

		methodsToRun.forEach
		(
			x =>
			{
				console.log(x.name);
				x.call(this, universe);
			}
		);

		callback();
	}

	playFromStart_1(universe: Universe): void
	{
		Assert.isNotNull(universe);

		var world = universe.world as WorldGame;
		var venueWorld = world.toVenue();
		universe.venueNextSet(venueWorld);

		var talker = Talker.fromConversationDefnName("ConversationsAll");
		this.talkToTalker
		(
			universe,
			talker,
			[
				"todo"
			]
		);
	}

	talkToTalker(universe: Universe, talker: Talker, optionsToSelect: string[] ): void
	{
		var uwpe = UniverseWorldPlaceEntities.fromUniverse(universe);
		talker.talk(uwpe);

		this.waitUntilVenueCurrentIsConversation(universe);

		var conversationRun = talker.conversationRun;
		conversationRun.nextUntilPrompt(universe);

		for (var i = 0; i < optionsToSelect.length; i++)
		{
			var optionToSelect = optionsToSelect[i];
			if (optionToSelect == null)
			{
				conversationRun.optionSelectNext();
			}
			else
			{
				var optionFound = conversationRun.optionSelectByName(optionToSelect);
				if (optionFound == null)
				{
					throw new Error("No option found with name: " + optionToSelect);
				}
			}
			conversationRun.nextUntilPrompt(universe);
		}

		universe.updateForTimerTick();
	}

	waitForTicks(universe: Universe, ticksToWait: number): void
	{
		for (var i = 0; i < ticksToWait; i++)
		{
			universe.updateForTimerTick();
			universe.timerHelper.ticksSoFar++; // hack
		}
	}

	waitUntilVenueCurrentIsConversation(universe: Universe): void
	{
		while (universe.venue().constructor.name != VenueConversationRun.name)
		{
			this.waitForTicks(universe, 1);
		}
	}
}
