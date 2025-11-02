
class TestRunner
{
	runThen(complete: () => void): void
	{
		var testSuite = TestSuite.fromNameAndTestFixtures
		(
			"TestsAll",

			[
				new SampleTests(),
				new SystemTests()
			]
		);

		testSuite.runThen(complete);
	}
}