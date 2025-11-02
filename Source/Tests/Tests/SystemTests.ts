
class SystemTests extends TestFixture
{
	constructor()
	{
		super(SystemTests.name);
	}

	tests(): Test[]
	{
		var returnTests =
		[
			Test.fromNameAndRunThen
			(
				"PlayFromStart",
				this.playFromStart.bind(this)
			)
		];

		return returnTests;
	}

	// Tests.

	playFromStart(testComplete: (testCompleted: Test) => void): void
	{
		var environment = new EnvironmentMock();
		environment.universeBuild
		(
			(u: Universe) =>
			{
				u.initialize
				(
					() => this.playFromStart_UniverseInitialized(u, testComplete)
				)
			}
		);
	}

	playFromStart_UniverseInitialized
	(
		universe: Universe,
		testComplete: (testCompleted: Test) => void
	): void
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

		testComplete(null);
	}

	playFromStart_1(universe: Universe): void
	{
		Assert.isNotNull(universe);

		var world = universe.world as WorldGame;
		var venueWorld = world.toVenue();
		universe.venueNextSet(venueWorld);

		var talker = Talker.fromConversationDefnName("Talk_ConversationsAll");
		this.talkToTalker
		(
			universe,
			talker,
			[
				// "Choose a world."
				"1: Castle.",
				// "Choose a level."
				"1: Main Floor.",
				// "Choose a character."
				"Bard.",
				// "Let's let the king speak first."
			]
		);

		universe.stop();
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
