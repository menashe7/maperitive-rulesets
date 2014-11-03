from maperipy import App
import os.path, datetime

App.log('script-dir: ' + App.script_dir)
App.run_command('change-dir dir="' + App.script_dir +'"')

ProgramFiles = os.path.dirname(os.path.dirname(App.script_dir))

if not os.path.exists(App.script_dir +'\output\TileUpdate.zip') and not os.path.exists(App.script_dir +'\output\TileUpdate16.zip'):
    App.log("=== Update israel-and-palestine-latest.osm.pbf ===")
    # wget for Windows: http://gnuwin32.sourceforge.net/packages/wget.htm
    App.run_program(ProgramFiles + '\wget\\bin\wget.exe', 1200,
                    ["--timestamping",
                     "--no-directories", "--no-verbose",
                     '--directory-prefix="' + App.script_dir +'"',
                     "http://download.geofabrik.de/asia/israel-and-palestine-latest.osm.pbf"])
    LastModified = datetime.datetime.fromtimestamp(os.path.getmtime('israel-and-palestine-latest.osm.pbf'))
    if LastModified + datetime.timedelta(1) < datetime.datetime.today():
	    App.log("=== pbf file not updated ===");
	    App.run_command("pause 15000")
    # Create LastModified.js file and add it to zip file
    App.log("=== Create Last Update info:" + LastModified.strftime("%d-%m-%Y") + " ===")
    jsFile = open(App.script_dir + '\Site\js\LastModified.js', 'w')
    jsFile.write("function getLastModifiedDate() { return '"
                 + LastModified.strftime("%d-%m-%Y")
                 + "'; }")
    jsFile.close()
    App.run_command('zip base-dir="' + App.script_dir + '\Site" files="' + App.script_dir + '\Site\js\LastModified.js" zip-file="' + App.script_dir +'\output\LastModified.zip"')
else :
    App.log('=== Continueing execution of the previous build ===')  
    App.run_command("pause 15000")

App.run_command("run-script file=IsraelHiking.mscript")
# Map Created

if not os.path.exists(App.script_dir +'\output\TileUpdate.zip') :
    App.run_command("generate-tiles minzoom=7 maxzoom=15 tilesdir=Site\Tiles use-fprint=true")
    App.collect_garbage()

    App.log("=== Launch creation of Oruxmap IsraelHiking map ===")
    App.log('App.start_program(ProgramFiles + "\Mobile Atlas Creator\Create Israel Hiking.bat", [])')
    App.start_program(ProgramFiles + "\Mobile Atlas Creator\Create Israel Hiking.bat", [])

    if os.path.exists(App.script_dir + "\UploadTiles.bat"):
        App.log("=== Create a Zip file with new tiles ===")
        App.run_command('zip base-dir=Site zip-file="' + App.script_dir +'\output\TileUpdate.zip"')
        App.log("=== Upload tiles for zoom 15 and below ===")
        App.log('App.start_program("' + App.script_dir + '\UploadTiles.bat")')
        App.start_program(App.script_dir + "\UploadTiles.bat")

    App.log('==============================================================================')  
    App.log('=== Restarting Maperitive and run the script again to create zoom level 16 ===')  
    App.log('==============================================================================')  
    App.start_program("cmd.exe", ["/C", 'Title Creating Israel Hiking zoom level 16 tiles & echo Restarting Maperitive with creation of Zoom level 16 tiles ... & ping -n 90 127.0.0.1 > nul & "' + ProgramFiles +'\Maperitive\Maperitive.exe" "' + App.script_dir + '\CreateOruxMap.py"'])
    App.run_command("exit")

elif not os.path.exists(App.script_dir +'\output\TileUpdate16.zip') :
    App.log("=== Create tiles for zoom 16 ===")
    App.collect_garbage()
    App.run_command("generate-tiles minzoom=16 maxzoom=16 tilesdir=Site\Tiles use-fprint=true")
    if os.path.exists(App.script_dir + "\UploadTiles.bat"):
        App.log("=== Create a Zip file with new tiles ===")
        App.run_command('zip base-dir=Site zip-file="' + App.script_dir +'\output\TileUpdate16.zip"')
        App.log("=== Upload tiles for zoom 16 ===")
        App.log('App.start_program("' + App.script_dir + '\UploadTiles.bat", "TileUpdate16.zip"])')
        App.start_program(App.script_dir + "\UploadTiles.bat", ["TileUpdate16.zip"])

if os.path.exists(App.script_dir +'\output\LastModified.zip') and os.path.exists(App.script_dir +'\output\TileUpdate.zip') and os.path.exists(App.script_dir +'\output\TileUpdate16.zip'):
    if os.path.exists(App.script_dir + "\UploadTiles.bat"):
        App.log("=== Upload Last Update info ===")
        App.log('App.start_program("' + App.script_dir + '\UploadTiles.bat", "LastModified.zip"])')
        App.start_program(App.script_dir + "\UploadTiles.bat", ["LastModified.zip"])

    App.log("=== Create Trails Overlay tiles ===")
    App.run_command("run-script file=IsraelHikingOverlay.mscript")
    if os.path.exists(App.script_dir + "\UploadTiles.bat"):
        App.log("=== Upload Trails Overlay tiles ===")
        App.log('App.start_program("' + App.script_dir + '\UploadTiles.bat", "OverlayTiles.zip"])')
        App.start_program(App.script_dir + "\UploadTiles.bat", ["OverlayTiles.zip"])
    if os.path.exists(ProgramFiles + "\Mobile Atlas Creator\All IsraelHikingOverlay Maps.bat"):
        App.log("=== Launch creation of All IsraelHikingOverlay Maps ===")
        App.log('App.start_program(ProgramFiles + "\Mobile Atlas Creator\All IsraelHikingOverlay Maps.bat", [])')
        App.start_program(ProgramFiles + "\Mobile Atlas Creator\All IsraelHikingOverlay Maps.bat", [])

App.collect_garbage()

# vim: set shiftwidth=4 expandtab
