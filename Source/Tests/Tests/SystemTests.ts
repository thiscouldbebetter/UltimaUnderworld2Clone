
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
			this.playFromStart_1_CastleStaffWontTalkToYouUntilKingSpeaks
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

	playFromStart_1_CastleStaffWontTalkToYouUntilKingSpeaks(universe: Universe): void
	{
		Assert.isNotNull(universe);

		var world = universe.world as WorldGame;

		var player = world.player;

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
				"Administrator",
				// "Let's let the king speak first."
				"Bard",
				// "Let's let the king speak first," again.
				// Run through the rest of the starting characters, except for the king.
				// They'll all dismiss you, waiting for the king to speek.
				"Chambermaid",
				"Empath",
				"Housekeeper",
				"Knight",
				"Mayor",
				"Paladin",
				"Philanthropist",
				"Scholar",
				"Tinker",
				"Valet",
				"Wizard",
				// Now speak to the king.
				"King",
				// "Shall we get started?"
				"0e8e.7:", // "By all means."
				// King gives speech, is interrupted by villain, conversation ends.
				// Talk to him again.
				"King",
				// "Sorry I brought you here."
				"0e8e.43:", // "I would not have my friends face danger alone!"
				// "You're right."
				// "Speak with the Paladin..."
				// "If there's nothing else, I must go."
				"0e8e.33:", // "I shall speak to thee later, then."
				// Talk to the king yet again.
				"King.",
				"0e8e.31:", // "Your pardon, sir, I must leave..."
				// Talk to the paladin.
				"Paladin",
				// "Do not tell the others, but..."
				"0e84.40:", // "What is it?",
				// "Iolo and I walked... into the sewers..."
				"0e84.44:", // "I shall look into it..."
				// "Take this key."
				"0e84.52:", // "I shall descend at once."
				"[Choose a different level.]",
				"0: [Select a different world.]",
				"[End conversation.]"
			]
		);

		var playerItemHolder = ItemHolder.of(player);
		Assert.isNotNull(playerItemHolder);
		var itemKeySewer = playerItemHolder.itemByDefnName("Key-Sewer");
		Assert.isNotNull(itemKeySewer);
		Assert.areNumbersEqual(1, itemKeySewer.quantity);

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
				var optionFound = conversationRun.optionSelectByContentPartial(optionToSelect);
				if (optionFound == null)
				{
					throw new Error("No option found with content: " + optionToSelect);
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
