foreach($art in $(Get-Content c:\inetpub\wwwroot\Apexzero.com\Blurbs\Game.txt)) { 
    $a = $art.Split("~"); 
    Invoke-Sqlcmd -ServerInstance "localhost\sqlexpress" `
        -Query "update [PsychOfSleep].dbo.tblGame set message='$($a[1])' where id='$($a[0])'" 
} 