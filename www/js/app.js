$(document).foundation();




$(function()
{

    var self = {};
    // Load countries data

    d3.json("data/countriesData.json", function(myData)
    {
        if(myData!=null)
        {
            self.data = myData;
        }
        else
        {
            console.log("Could not load main data file");
        }
    });

    $("#goMetrics").on("click", function()
    {
        var finalData = aux.randoms.getAllData(self.data);

        console.log(finalData);

        var myHtml = "";

        myHtml+="<p>Your birth country will be: "+finalData.countryName+"</p>";
        myHtml+="<p>On average, you will have : "+finalData.monthly_income.toFixed(2)+" $ paid per month (gross)</p>";
        myHtml+="<p>On average, you will live up to : "+finalData.lifeExpectancy+" years</p>";

        $("#results").html(myHtml);

        return false;
    });
});