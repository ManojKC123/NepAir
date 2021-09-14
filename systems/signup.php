<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-signin-client_id"
        content="724077778480-rclm656n8s87b20t1vp89s078kfo1aqk.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <title>SignUp AQI of Nepal </title>
</head>

<body>
    <div class="container">
        <div class="box">
            <form action="" autocomplete="none">
                <div class="form-group">
                    <label for="name">Your Name : </label>
                    <input type="text" name="Name" id="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="name">Your Email : </label>
                    <input type="email" name="email" id="email" required class="form-control">
                </div>
                <div class="form-group">
                    <label for="name">Username : </label>
                    <input type="text" name="Name" id="name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="name">Password : </label>
                    <input type="password" name="password" id="password" class="form-control">
                    <input type="text" id="showpassword" hidden>
                </div>
                <div class="form-group">
                    <div class="g-signin2" data-onsuccess="gmailLogIn"></div>
                </div>
            </form>
        </div>
    </div>

    <script>
    function gmaillogin() {
        console.log("logged in");

    }
    </script>

</body>

</html>