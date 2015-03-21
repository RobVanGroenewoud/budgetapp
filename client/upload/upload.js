Template.upload.events({
    'change .file-upload': function (event) {
        var files = event.target.files;

        if (files.length > 0) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var text = reader.result;

                console.log(text);
            };

            reader.readAsText(file);
        }
    }
});
