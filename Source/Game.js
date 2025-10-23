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
        var imageLevelMapsDirectoryPath = imageDirectoryPath + "Maps/";
        var imagePortraitsDirectoryPath = imageDirectoryPath + "Portraits/";
        var imageTitlesDirectoryPath = imageDirectoryPath + "Titles/";
        var soundEffectDirectoryPath = contentDirectoryPath + "Audio/Effects/";
        var soundMusicDirectoryPath = contentDirectoryPath + "Audio/Music/";
        var textStringDirectoryPath = contentDirectoryPath + "Text/";
        var videoDirectoryPath = contentDirectoryPath + "Video/";
        var dotPng = ".png";
        var image = (a) => imageDirectoryPath + a + dotPng;
        var imageLevelMap = (a, b) => imageLevelMapsDirectoryPath + a + "/" + b + dotPng;
        var imagePortrait = (a) => imagePortraitsDirectoryPath + a + dotPng;
        var imageTitle = (a) => imageTitlesDirectoryPath + a + dotPng;
        var effect = (a) => soundEffectDirectoryPath + a;
        var music = (a) => soundMusicDirectoryPath + a;
        var video = (a) => videoDirectoryPath + a;
        var font = (a) => fontDirectoryPath + a;
        var text = (a) => textStringDirectoryPath + a;
        var mediaFilePaths = [
            image("Friendly"),
            imageLevelMap(1, 1),
            imageLevelMap(1, 2),
            imageLevelMap(1, 3),
            imageLevelMap(1, 4),
            imageLevelMap(1, 5),
            imagePortrait("Bard"),
            imagePortrait("Chambermaid"),
            imagePortrait("Empath"),
            imagePortrait("Guardswoman"),
            imagePortrait("Housekeeper"),
            imagePortrait("King"),
            imagePortrait("Knight"),
            imagePortrait("Mayor"),
            imagePortrait("Paladin"),
            imagePortrait("Philanthropist"),
            imagePortrait("Scholar"),
            imagePortrait("Tinker"),
            imagePortrait("Valet"),
            imagePortrait("Wizard"),
            imageTitle("BoxArt"),
            imageTitle("Opening"),
            imageTitle("Producer"),
            imageTitle("Title"),
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
