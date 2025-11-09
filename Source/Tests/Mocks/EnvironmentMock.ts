
class EnvironmentMock
{
	universeBuild
	(
		callback: (u: Universe) => void
	): void
	{
		var configuration = Configuration.Instance();

		MediaLibrary.mediaFilePathsReadFromContentDirectoryPathAndManifestFileNameThen
		(
			configuration.contentDirectoryPath,
			"Manifest.txt",
			(mediaFilePaths: string[] ) =>
				this.universeBuild_MediaFilePathsLoaded(mediaFilePaths, callback)
		);
	}

	universeBuild_MediaFilePathsLoaded
	(
		mediaFilePaths: string[],
		callback: (u: Universe) => void
	): void
	{
		var mediaLibrary = MediaLibrary.fromMediaFilePaths(mediaFilePaths);

		var timerHelper = new TimerHelper(25);
		timerHelper.ticksSoFar = 0; // hack

		var display = DisplayMock.default();
		var soundHelper = new SoundHelperMock();

		var controlBuilder = ControlBuilder.default();
		var worldCreator = new WorldCreator
		(
			(u: Universe, wc: WorldCreator) => new WorldGame(WorldGame.name),
			null, // ?
			{
				// todo
			} // settings
		);

		var universe = new Universe
		(
			"TestUniverse",
			"[version]",
			timerHelper,
			display,
			soundHelper,
			mediaLibrary,
			controlBuilder,
			ProfileHelper.minimal(),
			worldCreator
		);

		universe.initialize
		(
			() =>
			{
				var uwpe = UniverseWorldPlaceEntities.fromUniverse(universe);
				universe.worldCreate().initialize(uwpe);
				universe.updateForTimerTick();

				callback(universe);
			}
		);

	}
}
