
class Game
{
	name: string;
	configuration: Configuration;

	constructor(name: string, configuration: Configuration)
	{
		this.name = name;
		this.configuration = configuration;
	}

	static fromNameAndConfiguration
	(
		name: string, configuration: Configuration
	): Game
	{
		return new Game(name, configuration);
	}

	start(): void
	{
		var contentDirectoryPath = this.configuration.contentDirectoryPath;
		var manifestFileName = "Manifest.txt";
		var game = this;
		MediaLibrary.mediaFilePathsReadFromContentDirectoryPathAndManifestFileNameThen
		(
			contentDirectoryPath,
			manifestFileName,
			(mediaFilePaths: string[] ) => game.start_MediaFilePathsLoaded(mediaFilePaths)
		);
	}

	start_MediaFilePathsLoaded(mediaFilePaths: string[])
	{
		var displaySize = Coords.fromXY
		(
			// 320, 240
			400, 300
		);
		displaySize.z = displaySize.x * 6; // hack
		var display = Display3D.fromViewSizeInPixels(displaySize);

		var mediaLibrary = MediaLibrary.fromMediaFilePaths(mediaFilePaths);

		var worldCreator = WorldCreator.fromWorldCreate
		(
			() => WorldGame.fromName(this.name)
		);

		var universe = Universe.fromNameDisplayMediaLibraryAndWorldCreator
		(
			"UltimaUnderworld2Clone",
			display,
			mediaLibrary,
			worldCreator
		);

		universe.profileHelper
			.profilesMultipleAreAllowedSet(true)
			.gameCanBeSavedSet(true);

		universe.initializeAndStart();
	}

}
