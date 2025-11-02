
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
		var ticksPerSecond = 20;

		var worldCreator = WorldCreator.fromWorldCreate
		(
			() => WorldGame.fromName(this.name)
		);

		var universe = Universe.fromNameTicksPerSecondMediaFilePathsAndWorldCreator
		(
			"UltimaUnderworld2Clone",
			ticksPerSecond,
			mediaFilePaths,
			worldCreator
		);

		universe.profileHelper
			.profilesMultipleAreAllowedSet(true)
			.gameCanBeSavedSet(true);

		universe.initializeAndStart();
	}

}
