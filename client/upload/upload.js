Template.upload.events({
    'change .file-upload': function (event) {
        var files = event.target.files;

        if (files.length > 0) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var fileContents = reader.result;

                var lines = fileContents.split('\n');
                for (var i = 1; i < lines.length-1; i++) {
                    var line = lines[i].trim().substr(1).slice(0,-1);
                    var dateIndex = 0;
                    var descriptionIndex = 1;
                    var plusMinusIndex = 5;
                    var amountIndex = 6;
                    var messageIndex = 8;

                    var re = /\",\"/;
                    var values = line.split(re);
                    var amountString = values[amountIndex].replace(',', '.');
                    var amount = parseFloat(amountString);

                    if (values[plusMinusIndex] === "Af") {
                        amount *= -1;
                    }

                    var transaction = new Transaction(null, 
                        values[dateIndex],
                        values[descriptionIndex],
                        amount
                        );
                    
                    transaction.save();
                }

            };

            reader.readAsText(file);
        }
    }
});
