"use strict";
class SampleTests extends TestFixture {
    constructor() {
        super(SampleTests.name);
    }
    tests() {
        var returnValues = [
            Test.fromNameAndRunThen(SampleTests.name, this.alwaysPass)
        ];
        return returnValues;
    }
    alwaysPass(testComplete) {
        var expected = "todo";
        var actual = "todo";
        Assert.areStringsEqual(expected, actual);
        testComplete(null);
    }
}
