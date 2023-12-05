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

min_value = 1
max_value = None

with open("5-test.in", "r") as input:
    for line in input.read().splitlines():
        if "seeds" in line:
            categories[current_category] = [int(seed) for seed in line.split(":")[1].split()]
        elif "map" in line:
            current_category = line.split()[0]
        elif len(line) > 0:
            values = [int(value) for value in line.split()]
            if (max_value is None or max_value < max(values)):
                max_value = max(values)
            categories[current_category].append(values)

result = None
print(min_value, max_value)

start = min_value
for index in range(min_value, max_value):
    value = min_value + index
    value = search_category(value, "humidity-to-location")

    if (result is None or value < result):
        result = value
        # print(result)

print(result)

# for index in range(0, len(categories["seeds"]), 2):
#     start_seed = categories["seeds"][index]
#     range_length = categories["seeds"][index + 1]

#     for seed in range(start_seed, start_seed + (range_length - 1)):
#         path = []
#         value = seed
#         path.append(value)
#         value = search_category(value, "seed-to-soil")
#         path.append(value)
#         value = search_category(value, "soil-to-fertilizer")
#         path.append(value)
#         value = search_category(value, "fertilizer-to-water")
#         path.append(value)
#         value = search_category(value, "water-to-light")
#         path.append(value)
#         value = search_category(value, "light-to-temperature")
#         path.append(value)
#         value = search_category(value, "temperature-to-humidity")
#         path.append(value)
#         value = search_category(value, "humidity-to-location")
#         path.append(value)

#         if (result is None or value < result):
#             result = value
#             # print(result)

#         print(path)

# print(result)