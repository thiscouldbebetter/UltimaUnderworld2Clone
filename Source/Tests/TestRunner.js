"use strict";
class TestRunner {
    run() {
        var testSuite = new TestSuite("TestsAll", [
            new SampleTests()
        ]);
        testSuite.run();
    }
}
