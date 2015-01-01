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
rem Generate temporary script to upload %ZIPFILE%
echo option batch abort > script.tmp
echo option confirm off >> script.tmp
echo option reconnect 15 >> script.tmp
echo open Upload-osm.org.il >> script.tmp
echo put -resume -preservetime -transfer=binary "%~dp0Output\%ZIPFILE%" >> script.tmp
echo call unzip -d ~/public_html/IsraelHiking -o ~/temp/%ZIPFILE% >> script.tmp
echo call rm ~/temp/%ZIPFILE% >> script.tmp
echo exit >> script.tmp

rem Execute script
"%~dp0\..\..\WinSCP\WinSCP.com" /script=script.tmp

IF NOT ERRORLEVEL 1 echo. 2> "%~dp0\Output\%ZIPFILE%"

rem Delete temporary script
del script.tmp

@echo %DATE% %TIME%
pause
