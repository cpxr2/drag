<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
    </head>

    <body>
        <?php
        if(!isset($_POST['go'])){
        ?>
        <form id="form1" action="<?php $_SERVER['PHP_SELF']?>" method="post" >
            <input type='file' name="imgInp" />
            <input type="submit" name="go" value="go" />
            
        </form>
        <?php
        }
        else
        {    
          //echo $_POST['imgInp'];
            
            echo "touche a ton cul";
        }
        ?>
    </body>
</html>
