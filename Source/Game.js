"use strict";
class Game {
    constructor(name, contentDirectoryPath) {
        this.name = name;
        this.contentDirectoryPath = contentDirectoryPath;
    }
    static fromNameAndContentDirectoryPath(name, contentDirectoryPath) {
        return new Game(name, contentDirectoryPath);
    }
    start() {
        var mediaLibrary = this.mediaLibraryBuild();
        var worldCreator = WorldCreator.fromWorldCreate(() => new WorldGame(this.name));
        var universe = Universe.fromNameMediaLibraryAndWorldCreator("UltimaUnderworld2Clone", mediaLibrary, worldCreator);
        universe.initializeAndStart();
    }
    mediaLibraryBuild() {
        var mediaFilePaths = this.mediaLibraryBuild_FilePaths();
        var mediaLibrary = MediaLibrary.fromContentDirectoryPathAndMediaFilePaths(this.contentDirectoryPath, mediaFilePaths);
        return mediaLibrary;
    }
    mediaLibraryBuild_FilePaths() {
        var contentDirectoryPath = this.contentDirectoryPath;
        // Use built-in content from the Framework.
        //contentDirectoryPath = "../Source/Framework/Content/" + contentDirectoryPath;
        var fontDirectoryPath = contentDirectoryPath + "Fonts/";
        var imageDirectoryPath = contentDirectoryPath + "Images/";
        var imageTitlesDirectoryPath = imageDirectoryPath + "Titles/";
        var soundEffectDirectoryPath = contentDirectoryPath + "Audio/Effects/";
        var soundMusicDirectoryPath = contentDirectoryPath + "Audio/Music/";
        var textStringDirectoryPath = contentDirectoryPath + "Text/";
        var videoDirectoryPath = contentDirectoryPath + "Video/";
        var title = (a) => imageTitlesDirectoryPath + a;
        var image = (a) => imageDirectoryPath + a;
        var effect = (a) => soundEffectDirectoryPath + a;
        var music = (a) => soundMusicDirectoryPath + a;
        var video = (a) => videoDirectoryPath + a;
        var font = (a) => fontDirectoryPath + a;
        var text = (a) => textStringDirectoryPath + a;
        var mediaFilePaths = [
            title("Opening.png"),
            title("Producer.png"),
            title("Title.png"),
            image("Friendly.png"),
            effect("_Default.wav"),
            effect("Producer.wav"),
            music("_Default.mp3"),
            music("Title.mp3"),
            video("Movie.webm"),
            font("Font.ttf"),
            text("Instructions.txt"),
            text("ConversationsAllByWorldLevelAndCharacter-psv.txt")
        ];
        return mediaFilePaths;
    }
}
