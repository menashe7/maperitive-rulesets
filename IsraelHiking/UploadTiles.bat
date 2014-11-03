SET ZIPFILE="%~nx1"

IF %ZIPFILE%=="" SET ZIPFILE=TileUpdate.zip
%~d0
cd %~dp0

@ECHO off
REM If needed, start Pageant: an SSH authentication agent for WinSCP and Plink
IF EXIST .\PuTTYOSM.ppk (
  tasklist | find /i "pageant.exe" > NUL
  IF ERRORLEVEL 1 (
    start .\PuTTYOSM.ppk
    echo.
    echo =================================
    echo Please enter the upload passowrd, 
    echo and then...
    pause
    echo.
  )
)
ECHO on

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
