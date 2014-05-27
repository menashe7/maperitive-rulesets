SET ZIPFILE="%~nx1"

IF %ZIPFILE%=="" SET ZIPFILE=TileUpdate.zip
%~d0
cd %~dp0

@echo %DATE% %TIME%
"%~dp0\..\..\WinSCP\WinSCP.com" /command "open ""Upload-osm.org.il""" "option reconnect 15" "option batch abort" "put -resume -preservetime -transfer=binary ""%~dp0\Output\%ZIPFILE%""" "exit" 

echo ERRORLEVEL: %ERRORLEVEL%

REM unzip
@echo %DATE% %TIME%
"%~dp0\..\..\PuTTY\plink.exe" osm.org.il -l osm unzip -d ~/public_html/Israel\ Hiking -o ~/temp/%ZIPFILE% "&&" rm ~/temp/%ZIPFILE%

@echo %DATE% %TIME%

IF NOT ERRORLEVEL 1 echo. 2> "%~dp0\Output\%ZIPFILE%"

@echo %DATE% %TIME%
pause
