<!DOCTYPE = html>
<html>

<head>
    <title>Bile colorate</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="index.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</head>

<body>
    <div class='container'>
        <div id='app' class="row">
            <div class="col-md-3">
                <div id='inputContainer'>
                    <label for="input">Enter a number: 1 - 10</label>
                    <input id="input" type="text" placeholder="Input a number" name="userInput">
                    <div id="buttonContainer">
                        <button id="go" type="submit" class="btn btn-primary">
                        Go!
                      </button>
                    </div>
                    <div id='possible' class="alert alert-primary" role="alert">
                         Let's see...
                    </div>
                </div>
                
            </div>
            <div id='content' class="col-sm-8">
            </div>
        </div>
    </div>
    <script type="text/javascript" src="index.js">
    </script>
</body>

</html>