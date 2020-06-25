//Test methods to test "dashboard-2.js"
describe('dashboard-2.js', function () {
  xit('should slice the first index of the data input', function () {
    var delays = [
      ["DEPARTURE_DELAY", "ARRIVAL_DELAY"],
      [7, 8],
      [6, 6],
      [2, 8],
      [7, 8],
    ];
    GetDataSets(delays);
    expect(dataSets.length).toEqual(4);
  });
  it('should return the correct data set', function () {
    var data = [
      ["DEPARTURE_DELAY", "ARRIVAL_DELAY"],
      [3, 5],
      [6, 6],
      [5, 1]
    ];
    GetDataSets(data);
    expect(data[0][0]).not.toEqual("DEPARTURE_DELAY");
    expect(data[0][0]).toBe(3);
  });
  it('should return the series of chart', function () {
    dataSets = [];
    var data = [
      ["DEPARTURE_DELAY", "ARRIVAL_DELAY"],
      [3, 5],
      [6, 6],
      [5, 1]
    ];
    GetDataSets(data);
    expect(dataSets).toBeTruthy();
    expect(dataSets).toBeDefined();
  });
});