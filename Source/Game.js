"use strict";
class Game {
    constructor(name, configuration) {
        this.name = name;
        this.configuration = configuration;
    }
    static fromNameAndConfiguration(name, configuration) {
        return new Game(name, configuration);
    }
    start() {
        var contentDirectoryPath = this.configuration.contentDirectoryPath;
        var manifestFileName = "Manifest.txt";
        var game = this;
        MediaLibrary.mediaFilePathsReadFromContentDirectoryPathAndManifestFileNameThen(contentDirectoryPath, manifestFileName, (mediaFilePaths) => game.start_MediaFilePathsLoaded(mediaFilePaths));
    }
    start_MediaFilePathsLoaded(mediaFilePaths) {
        var ticksPerSecond = 20;
        var worldCreator = WorldCreator.fromWorldCreate(() => WorldGame.fromName(this.name));
        var universe = Universe.fromNameTicksPerSecondMediaFilePathsAndWorldCreator("UltimaUnderworld2Clone", ticksPerSecond, mediaFilePaths, worldCreator);
        universe.profileHelper
            .profilesMultipleAreAllowedSet(true)
            .gameCanBeSavedSet(true);
        universe.initializeAndStart();
    }
}
