SETLOCAL
SET ZIPFILE="%~nx1"

IF %ZIPFILE%=="" SET ZIPFILE=TileUpdate.zip
PUSHD %~dp0

@ECHO off
REM If needed, start Pageant: an SSH authentication agent for WinSCP and Plink
IF EXIST .\PuTTYOSM.ppk (
  TASKLIST | FIND /i "pageant.exe" > NUL
  IF ERRORLEVEL 1 (
    start .\PuTTYOSM.ppk
    ECHO.
    ECHO =================================
    ECHO Please enter the upload passowrd, 
    ECHO and then...
    PAUSE
    ECHO.
  )
)

@ECHO %DATE% %TIME%
REM Generate temporary script to upload %ZIPFILE%
ECHO  > %ZIPFILE%.scp	option batch abort
ECHO >> %ZIPFILE%.scp	option confirm off
ECHO >> %ZIPFILE%.scp	option reconnect 45
ECHO >> %ZIPFILE%.scp	open Upload-osm.org.il
ECHO >> %ZIPFILE%.scp	cd
ECHO >> %ZIPFILE%.scp	put -resume -preservetime -transfer=binary "%~dp0Output\%ZIPFILE%" temp/
ECHO >> %ZIPFILE%.scp	call unzip -q -d ~/public_html/IsraelHiking -o ~/temp/%ZIPFILE% ^&^& echo unzip Completed successfully ^|^| echo unzip Failed
ECHO >> %ZIPFILE%.scp	call rm ~/temp/%ZIPFILE% ^&^& echo Zip file deleted successfully ^|^| echo Zip file deletetion failed
ECHO >> %ZIPFILE%.scp	exit

REM Execute script
@ECHO on
"%~dp0\..\..\WinSCP\WinSCP.com" /timeout=360 /script=%ZIPFILE%.scp

@REM Save ERRORLEVEL in a variable
SET ERRORLEVEL=%ERRORLEVEL%

@REM Delete temporary script
DEL %ZIPFILE%.scp
@REM Delete Zip file if upload and extraction was successful
IF %ERRORLEVEL%==0 echo. 2> "%~dp0\Output\%ZIPFILE%"

POPD

@ECHO %DATE% %TIME%
IF DEFINED NOPAUSE (
  %NOPAUSE%
  @REM Check real ERRORLEVEL of the above command
  IF ERRORLEVEL 1 EXIT /B %ERRORLEVEL%
) ELSE (
  PAUSE
)

EXIT /B %ERRORLEVEL%

@REM vim:sw=2:ai
