# Adding length tags

from maperipy import *
from maperipy.osm import *
import math

# Create a sorted list of main roads / nodes
# osmWayList = OsmData.load_pbf_file("D:\Tiles\OSM\israel_and_palestine.osm.pbf")

#this function will calculate the distance between two nodes
def getLength(node1, node2):
	startx = node1.location.x
	starty = node1.location.y
	endx = node2.location.x
	endy = node2.location.y
	midx = (startx+endx)/2
	midy = (starty+endy)/2
	# Earth's circumference is about 40,000 km.
	# So 1 degree of longitude at the equator, or 1 degree of latitude, is about 40,000/360 = 110 km.
	distx = 40000*(endx-startx)/360 * math.cos(math.radians(midy))
	disty = 40000*(endy-starty)/360
	length = math.sqrt(distx*distx+disty*disty)
	return length

# Look at all OSM map sources.
for layer in Map.layers:
    if layer.layer_type == "OsmLayer":
        osmWayList = layer.osm

	#adding length to highways
	for way in osmWayList.find_ways(lambda x : x.has_tag("highway")):
	    if way.nodes[0]!=way.nodes[way.nodes_count-1]:
			length = getLength(osmWayList.node(way.nodes[0]), osmWayList.node(way.nodes[way.nodes_count-1]))
			osmWayList.way(way.id).set_tag("length", str(length))
	
	#adding perimeter to forests area
	for way in osmWayList.find_ways(lambda x : (x.has_tag("landuse") or x.has_tag("natural")) ):
	    #if way.nodes[0]==way.nodes[way.nodes_count-1] : 
		osmWay = osmWayList.way(way.id)
		if osmWay.has_tag("landuse") and osmWay.get_tag("landuse")=="forest" :
			perimeter = 0
			for i in range(way.nodes_count-1) :
				length = getLength(osmWayList.node(way.nodes[i]), osmWayList.node(way.nodes[i+1]))
				perimeter = perimeter + length
			osmWay.set_tag("length", str(perimeter))
		if osmWay.has_tag("natural") and osmWay.get_tag("natural")=="wood" :
			perimeter = 0
			for i in range(way.nodes_count-1) :
				length = getLength(osmWayList.node(way.nodes[i]), osmWayList.node(way.nodes[i+1]))
				perimeter = perimeter + length
			osmWay.set_tag("length", str(perimeter))

# If there are no OSM map sources, report an error...
if osmWayList == None:
    raise AssertionError("There are no OSM map souces.")

# osmWayList.save_xml_file("D:\Tiles\OSM\israel_and_palestine_with_lengths.osm")
