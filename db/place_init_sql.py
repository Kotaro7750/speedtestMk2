import sys

args = sys.argv

with open('./db/init_sql/1_place_init.sql', 'w') as new_f:
    with open('./db/place_list.txt', 'r') as f:
        for line in f:
            if line != '\n':
                new_f.write('INSERT INTO place(place) VALUES ("{}");\n'.format(line.strip()))

if len(args) >= 2 and args[1] == "DEBUG":
    with open('./db/init_sql/2_telemetry_init_DEBUG.sql', 'w') as new_f:
        with open('./db/telemetry_init_DEBUG.txt', 'r') as f:
            for line in f:
                if line != '\n':
                    splitted_line = line.strip().split(',')
                    place = splitted_line[0]
                    ping = splitted_line[1]
                    jitter = splitted_line[2]
                    upload = splitted_line[3]
                    download = splitted_line[4]
                    new_f.write('INSERT INTO telemetry(place,ping,jitter,upload,download) VALUES ("{}","{}","{}","{}","{}");\n'.format(place,ping,jitter,upload,download))
