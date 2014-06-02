/**
 * Created by Oscar on 28/05/14.
 */

var aux = aux || {'randoms': {}, 'constants': {} , 'clean': {} };

aux.constants.grossAdjust = 1.0;
aux.constants.numberOfMonths = 12;
aux.constants.maximumIterations = 5000;
aux.constants.averageLifeExpectancy = 60.0;

aux.randoms.getCountry = function(countryData)
{
    // get total population

    var maxPop = 0.0;
    var randomArray = [];

    for (var country in countryData)
    {
        if(countryData[country].population)
        {
            maxPop += parseFloat(countryData[country].population);
            randomArray.push({'name': country, 'addedPop': maxPop});
        }
    }

    var randomPop = chance.floating({min: 0, max: maxPop});

    var chosenCountry = "";
    var chosen = false;

    for(var i = 0; i < randomArray.length ; i++)
    {
        if (randomArray[i].addedPop > randomPop && !chosen)
        {
            chosenCountry = randomArray[i].name;
            chosen = true;
        }
    }

    return(chosenCountry);
};

aux.randoms.getAllData = function(countryData)
{
    var data = {};

    data.countryName = aux.randoms.getCountry(countryData);
    data.lifeExpectancy = countryData[data.countryName].life_expectancy;
    data.gross_income = countryData[data.countryName].gross_income;
    data.gross_adjusted = (data.gross_income * aux.constants.grossAdjust);
    data.monthly_income = (data.gross_adjusted / aux.constants.numberOfMonths);

    return data;
};

aux.randoms.getIterationData = function(countryData, annualValue)
{
    var tries = 0;
    var surpassed = false;
    var country = null;
    var gross_income = 0;
    var accumulated_years = 0;

    while(tries < aux.constants.maximumIterations && !surpassed)
    {
        country = aux.randoms.getCountry(countryData);
        gross_income = countryData[country].gross_income;

        var life_expectancy = parseFloat(countryData[country].life_expectancy);

        if(!isNaN(life_expectancy))
        {
            accumulated_years += life_expectancy;
        }
        else
        {
            accumulated_years += aux.constants.averageLifeExpectancy;
        }

        if(gross_income > annualValue) surpassed = true;

        tries++;
    }

    return {'country': country, 'gross_income': gross_income, 'number_of_years': accumulated_years, 'tries': tries, 'surpassed': surpassed};

};

aux.clean.cleanUserIncome = function(string)
{
    string = string.replace(",","");
    string = string.replace(".","");

    return string;
};