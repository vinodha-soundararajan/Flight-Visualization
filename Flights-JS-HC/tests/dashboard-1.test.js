
// Test methods to test dashboard-1.js
describe('dashboard-1.js', function () {

    // Test methods to test GetCategories()
    describe('Categories', function () {
        let dist;
        beforeEach(function () {
            dict = {};
        });
        it('should get the categories of chart', function () {
            dict.key1 = "value1";
            dict.key2 = "value2";
            var result = GetCategories(dict);
            expect(result[0]).toBe("key1");
            expect(result[1]).toBe("key2");
        });
        it('should handle defined input', function () {
            dict.key1 = "value1";
            var result = GetCategories(dict);
            expect(result).toBeTruthy();
            expect(result).toBeDefined();
        });
        it('should handle empty input', function () {
            var result = GetCategories(dict);
            expect(result).toBeFalsy();
            expect(result).toBeUndefined();
        });
    });

    // Test methods to test CalculateSeriesData()
    describe('Calculate Series', function () {
        let airlinesMap;
        let data;
        beforeEach(function () {
            airlinesMap = {};
            data = [
                ["AIRLINE", "DAY_OF_WEEK"],
                ["AirCanada", 4],
                ["AirCanada", 6],
                ["Lufthansa", 1],
                ["Lufthansa", 2],
                ["Lufthansa", 3],
                ["Lufthansa", 4]
            ];
        });
        it('should return the correct length of series', function () {
            var result = CalculateSeriesData(data, airlinesMap);
            expect(result.length).toBe(5);
        });
        it('should return the series of chart', function () {
            var result = CalculateSeriesData(data, airlinesMap);
            expect(result).toBeTruthy();
            expect(result).toBeDefined();
        });
        it('should slice the first index of the data input', function () {
            var result = CalculateSeriesData(data, airlinesMap);
            expect(data[0][0]).not.toEqual("AIRLINE");
            expect(data[0][0]).toBe("AirCanada");
        });
        it('should return the correct series', function () {
            var result = CalculateSeriesData(data, airlinesMap);
            var filteredResult = result.filter(x => x.name == "4");
            expect(filteredResult[0].data.length).toBe(2);
        });
    });
});
