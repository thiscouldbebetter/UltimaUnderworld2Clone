
class Program
{
	start()
	{
		var name = "UltimaUnderworld2Clone";
		var configuration =
			Configuration.Instance();
		var game = Game.fromNameAndConfiguration
		(
			name, configuration
		);
		game.start();
	}
}

new TestRunner().runThen
(
	() => new Program().start()
);
