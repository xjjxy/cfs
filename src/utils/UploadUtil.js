class UploadUtil {



    static uploadFile(file, formData, cb) {

        var address = Session.get("user.address");
        var path =
            address +
            "/" +
            file.name.substring(0, file.name.lastIndexOf(".")) +
            "$" +
            new Date().valueOf();
        console.log(path);
        formData.append("path", file);
        formData.append("arg", path);
        formData.append("recursive", true);
    
        let ajaxVideoUpload = {
            cache: false,
            contentType: false,
            data: formData,
            processData: false,
            type: "POST",
            xhr: function () {
                // listen for progress events on the upload
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener(
                    "progress",
                    function (evt) {
                        if (evt.lengthComputable) {
                            // console.log(evt)
                            // $(progressid).progress({ value: evt.loaded, total: evt.total });
                            var progessvalue = (evt.loaded / evt.total) * 698;
                            $("#red").css("width", progessvalue);
                            // console.log(progessvalue);
                            if (evt.loaded == evt.total) {
                                this.progessvalue = 698;
                            }
                        }
                    },
                    false
                );
                return xhr;
            },
            resolve: function (result) {
                // debugger;
                if (typeof result === "string")
                    result = JSON.parse(result.split("\n")[0]);
                // console.log(result);
                // Session.set("videoHash", result.Hash);
                cb(null, result);
            },
            reject: function (error) {
                // $(progressid).hide();
                cb(error, null);
            }
        };
        return ajaxVideoUpload;
    }
}

module.exports = UploadUtil;
