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

        myHtml+="<p>Your birth country will be: <strong>"+finalData.countryName+"</strong>.</br>";
        myHtml+="On average, you will have: <strong>"+finalData.monthly_income.toFixed(2)+" $ paid per month (gross)</strong></br>";
        myHtml+="On average, you will live up to: <strong>"+finalData.lifeExpectancy+"</strong> years</p>";

        $("#resultsRebirth").html(myHtml);

        return false;
    });

    $("#goIteration").on("click", function()
    {
//        var annualValue = aux.clean.cleanUserIncome($("#annualIncome").val());

        var annualValue = numeral().unformat($("#annualIncome").val());

        if(!isNaN(annualValue))
        {
            var finalData = aux.randoms.getIterationData(self.data, annualValue);

            console.log(finalData);

            var myHtml = "";

            if(finalData.surpassed==true)
            {
                myHtml+="<p>After <strong>"+finalData.tries+" random lifes</strong>, ";
                myHtml+="and a total of <strong>"+finalData.number_of_years.toFixed(0)+" years lived</strong>, ";
                myHtml+="you arrived at <strong>"+finalData.country+"</strong>, ";
                myHtml+="with an annual gross income of <strong>"+finalData.gross_income+"</strong> $";
            }
            else
            {
                myHtml+="<p>After <strong>"+finalData.tries+" random lifes</strong>, ";
                myHtml+="there was <strong>no country with an annual gross income superior to "+ annualValue + "</strong></p>";
            }

            $("#resultsIteration").html(myHtml);

        }



        return false;
    });
});