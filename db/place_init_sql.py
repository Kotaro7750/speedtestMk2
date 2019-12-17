with open('./db/init_sql/1_place_init.sql', 'w') as new_f:
    with open('./db/place_list.txt', 'r') as f:
        for line in f:
            if line != '\n':
                new_f.write('INSERT INTO place(place) VALUES ("{}");\n'.format(line.strip()))

