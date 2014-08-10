foreach($art in $(Get-Content c:\inetpub\wwwroot\Apexzero.com\Blurbs\Articles.txt)) { 
    $a = $art.Split("~"); 
    Invoke-Sqlcmd -ServerInstance "localhost\sqlexpress" `
        -Query "update [PsychOfSleep].dbo.tblArticles set contents='$($a[1])' where id='$($a[0])'" 
} 