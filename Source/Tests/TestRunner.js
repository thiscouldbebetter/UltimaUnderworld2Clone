"use strict";
class TestRunner {
    runThen(complete) {
        var testSuite = TestSuite.fromNameAndTestFixtures("TestsAll", [
            new SampleTests(),
            new SystemTests()
        ]);
        testSuite.runThen(complete);
    }
}
