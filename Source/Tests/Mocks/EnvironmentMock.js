"use strict";
class EnvironmentMock {
    universeBuild(callback) {
        var timerHelper = new TimerHelper(25);
        timerHelper.ticksSoFar = 0; // hack
        var display = DisplayTest.default();
        var soundHelper = new SoundHelperMock();
        var contentDirectoryPath = "../Content/";
        var game = Game.fromNameAndContentDirectoryPath(Game.name, contentDirectoryPath);
        var mediaLibrary = game.mediaLibraryBuild();
        var controlBuilder = ControlBuilder.default();
        var worldCreator = new WorldCreator((u, wc) => new WorldGame(WorldGame.name), null, // ?
        {
        // todo
        } // settings
        );
        var universe = new Universe("TestUniverse", "[version]", timerHelper, display, soundHelper, mediaLibrary, controlBuilder, ProfileHelper.minimal(), worldCreator);
        universe.initialize(() => {
            var uwpe = UniverseWorldPlaceEntities.fromUniverse(universe);
            universe.worldCreate().initialize(uwpe);
            universe.updateForTimerTick();
            callback(universe);
        });
    }
}
