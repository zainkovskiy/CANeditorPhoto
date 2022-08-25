<?php
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "/dealincom/class/crest.php");

CJSCore::Init();
$APPLICATION->ShowHead();

$placement = $_REQUEST;
$placementOptions = isset($_REQUEST['PLACEMENT_OPTIONS']) ? json_decode($_REQUEST['PLACEMENT_OPTIONS'], true) : array();
//$placementOptions['ENTITY_VALUE_ID'] = 39849;



if (isset($placementOptions['ID'])) {
    $dealId = $placementOptions['ID'];
    try {
        $arrReqNumber = CRest::call('crm.deal.get', ['id' => $dealId]);

        if ($arrReqNumber['result']['UF_CURRENTOBJ'] > 0) {
            // ВОТ ЭТО в КОД
            $reqNumber = $arrReqNumber['result']['UF_CURRENTOBJ'];
            $userId = CUser::GetID();
            $userLogin = CUser::GetLogin();
        } else {
            header("Location: https://crm.centralnoe.ru/dealincom/404.php");
        }
    } catch (\Exception $e) {
    }
} else {
    $dealId = 48057;
    $reqNumber = 57772000046;
    $userId = CUser::GetID();
    $userLogin = CUser::GetLogin();
}

?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <script src="//api.bitrix24.com/api/v1/"></script>
    <script>
        BX24.ready(async () => {
            const h = window.screen.availHeight;
            BX24.resizeWindow(window.innerWidth, h, () => {});
        })
    </script>
    <script>
        let reqNumber = '<? echo ($reqNumber); ?>';
        let userId = '<? echo ($userId); ?>';
        let dealId = '<? echo ($dealId); ?>';
        console.log(reqNumber)
        console.log(userId)
        console.log(dealId)
    </script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>photo</title>
    <?php echo ('<script defer src="bundle-v1.0.js?' . chr(rand(65, 90)) . chr(rand(65, 90)) . '=' . rand(0, 1000000) . '"></script>'); ?>
    <link href="main-v1.0.css?s=<?= rand(0, 1000000) ?>" rel="stylesheet">
</head>

<body>
    <?php echo ('<div id="root"></div>'); ?>
</body>

</html>