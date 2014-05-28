/**
 * Created by Oscar on 28/05/14.
 */

var aux = aux || {'randoms': {}, 'constants': {} };

aux.constants.grossAdjust = 1.0;
aux.constants.numberOfMonths = 12;

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