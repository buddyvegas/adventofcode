categories = {
    "seeds": [],
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": []
}

current_category = "seeds"

def search_category(value: int, name: str):
    result = value
    for category in categories[name]:
        destination = category[0]
        source = category[1]
        range = category[2]
        if (value >= source and value < source + range):
            result += destination - source
    return result

with open("5.in", "r") as input:
    for line in input.read().splitlines():
        if "seeds" in line:
            categories[current_category] = [int(seed) for seed in line.split(":")[1].split()]
        elif "map" in line:
            current_category = line.split()[0]
        elif len(line) > 0:            
            categories[current_category].append([int(value) for value in line.split()])

result = []
for seed in categories["seeds"]:
    value = seed
    value = search_category(value, "seed-to-soil")
    value = search_category(value, "soil-to-fertilizer")
    value = search_category(value, "fertilizer-to-water")
    value = search_category(value, "water-to-light")
    value = search_category(value, "light-to-temperature")
    value = search_category(value, "temperature-to-humidity")
    value = search_category(value, "humidity-to-location")

    result.append(value)
        
print(min(result))