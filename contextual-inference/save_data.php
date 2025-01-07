<?php

$data_array = json_decode(file_get_contents('php://input'), true);
$keys = array_keys($data_array); 
//$fname = "data.json"; // generates random name
echo print_r($keys);
$subid = $data_array["subid"];
echo $subid;
if ($data_array != null)
{
    $file = fopen("data/" . $subid . ".json", "w") or die("Unable to open file!");
    fwrite($file, $data_array["data"]);
    fclose($file);
}
else
{

}

?>
