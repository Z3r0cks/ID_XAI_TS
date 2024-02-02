#good appartment

#rooms      1,2,3
#village    Furtwangen=1, Donaueschingen=2, Schwennignen=3
#price      250-1000

#if furtwangen      room=1 && price < 400 || room>1 && price < 600
#if Donau           room=1 && price < 350 || room>1 && price < 500
#if Schwenningen    room=1 && price < 300 || room>1 && price < 450

import random

# Funktion zum Generieren von Wohnungsdaten
def generate_apartment_data(city_code):
    rooms = random.randint(1, 3)
    price = random.randint(250, 1000)
    
    if city_code == 1:  # Furtwangen
        is_good_apartment = (rooms == 1 and price < 400) or (rooms > 1 and price < 600)
    elif city_code == 2:  # Donaueschingen
        is_good_apartment = (rooms == 1 and price < 350) or (rooms > 1 and price < 500)
    elif city_code == 3:  # Schwenningen
        is_good_apartment = (rooms == 1 and price < 300) or (rooms > 1 and price < 450)
    else:
        raise ValueError("Ungültiger Stadtcodex")

    return f"{rooms},{city_code},{price};{int(is_good_apartment)}\n"

# Funktion zum Schreiben der Daten in eine TXT-Datei
def write_to_file(data, filename):
    with open(filename, 'w') as file:
        file.writelines(data)

# Hauptprogramm
if __name__ == "__main__":
    cities = {
        1: "Furtwangen",
        2: "Donaueschingen",
        3: "Schwenningen",
    }

    num_apartments = 500
    apartment_data = []

    for _ in range(num_apartments):
        city_code = random.choice(list(cities.keys()))
        apartment_data.append(generate_apartment_data(city_code))

    output_file = "wohnungen.txt"
    write_to_file(apartment_data, output_file)

    print(f"Daten wurden erfolgreich in {output_file} gespeichert.")