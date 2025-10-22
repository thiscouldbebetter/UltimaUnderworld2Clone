
class Game
{
	name: string;
	contentDirectoryPath: string;

	constructor(name: string, contentDirectoryPath: string)
	{
		this.name = name;
		this.contentDirectoryPath = contentDirectoryPath;
	}

	static fromNameAndContentDirectoryPath
	(
		name: string, contentDirectoryPath: string
	): Game
	{
		return new Game(name, contentDirectoryPath);
	}

	start(): void
	{
		var mediaLibrary = this.mediaLibraryBuild()

		var worldCreator = WorldCreator.fromWorldCreate
		(
			() => new WorldGame(this.name)
		);

		var universe = Universe.fromNameMediaLibraryAndWorldCreator
		(
			"UltimaUnderworld2Clone",
			mediaLibrary,
			worldCreator
		);

		universe.initializeAndStart();
	}

	mediaLibraryBuild() : MediaLibrary
	{
		var mediaFilePaths = this.mediaLibraryBuild_FilePaths();

		var mediaLibrary = MediaLibrary.fromContentDirectoryPathAndMediaFilePaths
		(
			this.contentDirectoryPath, mediaFilePaths
		);

		return mediaLibrary;
	}

	mediaLibraryBuild_FilePaths(): string[]
	{
		var contentDirectoryPath = this.contentDirectoryPath;

		// Use built-in content from the Framework.
		//contentDirectoryPath = "../Source/Framework/Content/" + contentDirectoryPath;

		var fontDirectoryPath = contentDirectoryPath + "Fonts/";
		var imageDirectoryPath = contentDirectoryPath + "Images/";
		var imagePortraitsDirectoryPath = imageDirectoryPath + "Portraits/";
		var imageTitlesDirectoryPath = imageDirectoryPath + "Titles/";
		var soundEffectDirectoryPath = contentDirectoryPath + "Audio/Effects/";
		var soundMusicDirectoryPath = contentDirectoryPath + "Audio/Music/";
		var textStringDirectoryPath = contentDirectoryPath + "Text/";
		var videoDirectoryPath = contentDirectoryPath + "Video/";

		var dotPng = ".png";
		var image = (a: string) => imageDirectoryPath + a + dotPng;
		var imagePortrait = (a: string) => imagePortraitsDirectoryPath + a + dotPng;
		var imageTitle = (a: string) => imageTitlesDirectoryPath + a + dotPng;
		var effect = (a: string) => soundEffectDirectoryPath + a;
		var music = (a: string) => soundMusicDirectoryPath + a;
		var video = (a: string) => videoDirectoryPath + a;
		var font = (a: string) => fontDirectoryPath + a;
		var text = (a: string) => textStringDirectoryPath + a;

		var mediaFilePaths =
		[
			image("Friendly"),

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
