"use strict";
class SystemTests extends TestFixture {
    constructor() {
        super(SystemTests.name);
    }
    tests() {
        var returnTests = [
            Test.fromNameAndRunThen("PlayFromStart", this.playFromStart.bind(this))
        ];
        return returnTests;
    }
    // Tests.
    playFromStart(testComplete) {
        var environment = new EnvironmentMock();
        environment.universeBuild((u) => {
            u.initialize(() => this.playFromStart_UniverseInitialized(u, testComplete));
        });
    }
    playFromStart_UniverseInitialized(universe, testComplete) {
        var methodsToRun = [
            this.playFromStart_1_CastleStaffWontTalkToYouUntilKingSpeaks
        ];
        methodsToRun.forEach(x => {
            console.log(x.name);
            x.call(this, universe);
        });
        testComplete(null);
    }
    playFromStart_1_CastleStaffWontTalkToYouUntilKingSpeaks(universe) {
        Assert.isNotNull(universe);
        var world = universe.world;
        var venueWorld = world.toVenue();
        universe.venueNextSet(venueWorld);
        var talker = Talker.fromConversationDefnName("Talk_ConversationsAll");
        this.talkToTalker(universe, talker, [
            // "Choose a world."
            "1: Castle.",
            // "Choose a level."
            "1: Main Floor.",
            // "Choose a character."
            "Administrator.",
            // "Let's let the king speak first."
            "Bard.",
            // "Let's let the king speak first," again.
            // Run through the rest of the starting characters, except for the king.
            // They'll all dismiss you, waiting for the king to speek.
            "Chambermaid.",
            "Empath.",
            "Housekeeper.",
            "Knight.",
            "Mayor.",
            "Paladin.",
            "Philanthropist.",
            "Scholar.",
            "Tinker.",
            "Valet.",
            "Wizard.",
            // Now speak to the king.
            "King."
        ]);
        universe.stop();
    }
    talkToTalker(universe, talker, optionsToSelect) {
        var uwpe = UniverseWorldPlaceEntities.fromUniverse(universe);
        talker.talk(uwpe);
        this.waitUntilVenueCurrentIsConversation(universe);
        var conversationRun = talker.conversationRun;
        conversationRun.nextUntilPrompt(universe);
        for (var i = 0; i < optionsToSelect.length; i++) {
            var optionToSelect = optionsToSelect[i];
            if (optionToSelect == null) {
                conversationRun.optionSelectNext();
            }
            else {
                var optionFound = conversationRun.optionSelectByName(optionToSelect);
                if (optionFound == null) {
                    throw new Error("No option found with name: " + optionToSelect);
                }
            }
            conversationRun.nextUntilPrompt(universe);
        }
        universe.updateForTimerTick();
    }
    waitForTicks(universe, ticksToWait) {
        for (var i = 0; i < ticksToWait; i++) {
            universe.updateForTimerTick();
            universe.timerHelper.ticksSoFar++; // hack
        }
    }
    waitUntilVenueCurrentIsConversation(universe) {
        while (universe.venue().constructor.name != VenueConversationRun.name) {
            this.waitForTicks(universe, 1);
        }
    }
}
