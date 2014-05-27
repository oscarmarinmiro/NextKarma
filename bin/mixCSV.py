__author__ = 'Oscar'

import sys
import csv
import json
import pprint
import os

ASSETS_DIR = "../assets"
CONF_FILE = "conf.json"

def main():

    # Load json conf

    with open(CONF_FILE,"rb") as config:
        confData = json.load(config)

    pprint.pprint(confData)

    myStruct = {}

    # For each file: Add data to struct

    for fileName, config in confData['files'].items():

        # Build final path

        fileName = os.path.join(ASSETS_DIR, fileName)

        # Open as csv

        with open(fileName,"rb") as inputFile:

            reader = csv.reader(inputFile, delimiter=",", quotechar='"')

            # Read headers and put them in a dict for easy access

            header = reader.next()

            headerDict = {}

            for i in range(0,len(header)):
                headerDict[header[i]] = i

            # For each row: insert config fields, and 'fields' if do not exist

            for row in reader:

                # WORKAROUND: to avoid partial data coming from regions, that
                # WORKAROUND: UNDP lists as a row with first field removed
                # WORKAROUND: see 'pop.csv' last rows...

                if row[0] != config['nullValue']:

                    key = row[headerDict[config['key']]]

                    if key not in myStruct:
                        myStruct[key] = {}

                    for auxField, rowName in config['fields'].items():
                        if auxField not in myStruct[key]:
                            myStruct[key][auxField] = row[headerDict[rowName]]


        pprint.pprint(myStruct)
    # Dump struct to CSV

    # Dump struct to JSON












if __name__ == '__main__':

    main()