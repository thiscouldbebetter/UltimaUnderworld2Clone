
class SampleTests extends TestFixture
{
	constructor()
	{
		super(SampleTests.name);
	}

	tests(): Test[]
	{
		var returnValues =
		[
			Test.fromNameAndRunThen(SampleTests.name, this.alwaysPass)
		];

		return returnValues;
	}

	alwaysPass(testComplete: (testCompleted: Test) => void): void
	{
		var expected = "todo";
		var actual = "todo";
		Assert.areStringsEqual(expected, actual);
		testComplete(null);
	}
}
