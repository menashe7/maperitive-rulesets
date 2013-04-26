Create Israel Hiking Map similar to Israel Trails Committee (ITC)
================================

The output of the map can be [seen here](http://osm.org.il/Israel%20Hiking/IsraelHikingMap.html)

Ready-to-use maps are available for:
* [OruxMaps](http://www.oruxmaps.com/index_en.html): 
    * Download the ["Israel Hiking" folder](https://googledrive.com/host/0B-qrsEBJWXhQUGVBM3lHZTF2eXc/) with both files it.
    * Place the directoryt under the oruxmaps/mapfiles directory on your device.
    * Re-generate the maps database using _"Maps -> Switch map -> offline -> Refresh (the counter-clockwise arrow)"_
* [OziExplorer](http://www.oziexplorer.com/): _Based on [this thread](http://www.jeepolog.com/forums/showthread.php?t=74909&p=508197)._
    * Download [the 6 files here](https://www.dropbox.com/sh/h8ye52ahotghta1/tTeUkbTspw).
    * Place them in the _MAPS_ sub-directory of the OziExplorer installation.
    * Re-index the maps using _"MAP -> Re-Index map files"_. 


Abstract
* The first part of following manual will explain how to create an Israel hiking style map (256x256 PNG tiles).
Note that this might be tricky on PCs that has windows 32bit and 4GB RAM (I managed to do it but i had to close all other running applications).
* The second part of the following manual will explain how to convert the map for offline use on an android device.


Maperitive
----------

Maperitive runs on Windows, Linux and MAC.

1. Download [Maperitive](http://maperitive.net/) and extract it to a desired location.
    On Linux and MacOS, Maperitive requires the use of (Mono)[http://www.mono-project.com/Main%5fPage].
2. Go to [Israel Hiking on GitHub](https://github.com/HarelM/maperitive-rulesets/tree/master/IsraelHiking) (this site if you read this file in github).
    * click on the Files tab.
    * click on the Zip with the cloud and arrow to download all the files.
3. The zip file will contain some unnecessary folders and files, the only folder needed from this zip is called IsraelHiking, place it inside your Maperitive installation folder.
    * you should now have a folder ...\<Maperitive Install folder\>\IsraelHiking\
4. Download [OSM Data for the region](http://download.geofabrik.de/asia/israel-and-palestine-latest.osm.pbf) and place it in the above folder.
5. Open Maperitive program, click _File -> Run Script_ ... and choose _IsraelHiking\IsraelHiking.mscript_

This should generate 256x256 png tile files inside IsraelHiking\Tiles directory and should take long (about 3 hours or more, I prefer to do it overnight, but you need to make sure you don't get out of memory).

MOBAC and Oruxmaps
-------------------------

[MOBAC - MOBile Atlas Creator](http://mobac.sourceforge.net/) is a JAVA program that runs on Windows, Linux, MAC, and more. It creates offline maps for many navigation applications.
Oruxmaps is an offline navigation application for Android.

1. In order to use an offline version of this map in an android device first install [Oruxmaps](http://www.oruxmaps.com/index_en.html) from the [play store](https://play.google.com/store/apps/details?id=com.orux.oruxmaps). Oruxmaps is free of charge and does not have ads. It was not created by any of us, yet we recommend you buy the [donate version](https://play.google.com/store/apps/details?id=com.orux.oruxmapsDonate).
2. Download [MOBAC - MOBile Atlas Creator](http://mobac.sourceforge.net/).
3. Open IsraelHiking.xml file and change the \<sourceFolder\> tag to where the tiles were created (...\<Maperitive Install folder>\IsraelHiking\Tiles - full path).
4. Place the IsraelHiking.xml file in \<MOBAC installtion folder\>\mapsources\
5. Open MOBAC (it takes some time since it runs on java) and choose oruxmaps sqlite.
6. On the left side under "Map Source" choose "Isreal Hiking".
7. Move zoom on the top of the screen to 7 and by mouse drag select the whole country (the selected area should be red)
   * Alternatively, you can select the required area using a polygon and avoid the sea and foreign countries.
8. Under "Zoom levels" check 7,8,..,15
9. Click "Settings" Chosse "Map size" tab and change the Maximum size of rectangular maps to 1048575.
10. Under "Atlas Content" set name to Israel Hiking and click on "Add Selection".
    this should result in adding the name to the tree, opening the tree should show the selected zoom levels (7 - 15).
11. Click "Create Atlas".
12. A window should pop up with progress, make sure to check "ignore download errors", the operation should take about 20 Minutes.
13. Once finished you should be able to find a folder under <MOBAC installation folder>\atlases\Israel Hiking\\\<Creation Date\>\ called "Israel Hiking".
14. Copy the "Israel Hiking" folder (not the one with the date) to your android device under /sdcard/oruxmaps/mapfiles
15. Enjoy, open a OSM account and add trails to make this map better :-)


-------------------------
Created by Harel Mazor and Zeev Stadler 31.3.13. Last Updated: 26.4.13
