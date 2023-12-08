import time

# solution = 34039469

start_time = time.time_ns()

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
result = []

# def search_category_old(values: [range], name: str):
#     result = []
#     for map in categories[name]:        
#         destination = range(map[0][0], map[0][0] + map[0][1])
#         source = range(map[1][0], map[1][0] + map[1][1])

#         # print("pouet", source, value)
#         # print(value, source, list(zip(value, source)))

#         # print(value, source, destination)
        

#         for value in values:
#             intersect = range(max(value.start, source.start), min(value.stop, source.stop))
#             # print(intersect)
#             # print(set(source).intersection(value))
#             if (intersect.start < intersect.stop):
#                 new_start_index = source.index(intersect.start)
#                 new_stop_index = source.index(intersect.stop - 1) + 1

#                 # new_range = range(destination[new_start_index], destination[new_stop_index - 1] + 1)
                
#                 if (intersect.start > value.start):
#                     result.append(range(value.start, intersect.start))

#                 result.append(range(destination[new_start_index], destination[new_stop_index - 1] + 1))

#                 if (intersect.stop < value.stop):
#                     result.append(range(intersect.stop, value.stop))

#                 # source_start_index = source.index(intersect.start)
#                 # source_stop_index = source.index(intersect.stop) if intersect.stop < source.stop else source.stop

#                 # if (source_start_index > source.start):
#                 #     result.append(range(source.start, source_start_index))
                
#                 # result.append(range(destination[source_start_index], destination[source_stop_index]))

#                 # if (source_stop_index < source.stop):
#                 #     result.append(range(source_stop_index, source.stop))

#             # result.append(range(destination[source.index(intersect.start)], destination[source.index(intersect.stop)]))

#     if (len(result) > 0):
#         return result
    
#     return [value]
#     # return result if len(result) > 0 else [value]


def search_category(values: [range], name: str):
    result = []

    # toutes les valeurs source à tester
    for index_value, value in enumerate(values):

        # les range à tester
        # ils sont mis à jour avec les valeur qui n'ont pas été testé dans une map de categorie
        current_ranges = [value]
        left_ranges = []
        found = False

        # les range de valeur sont testé dans toutes les map des catégories
        for index_category, map in enumerate(categories[name]):

            # les range de value à tester dans chaque map
            for current_range in current_ranges:

                # destination / source => crado mais fait le taf
                destination = range(map[0][0], map[0][0] + map[0][1])
                source = range(map[1][0], map[1][0] + map[1][1])
                    
                # les ranges restant qui seront mis dans current_ranges

                # l'intersection avec la map courante
                intersect = range(max(current_range.start, source.start), min(current_range.stop, source.stop))

                # le range est dans la map
                if (intersect.start < intersect.stop):
                    found = True
                    new_destination_start = source.index(intersect.start)
                    new_destination_stop = source.index(intersect.stop - 1) + 1

                    # sauvegarde de la destination
                    result.append(range(destination[new_destination_start], destination[new_destination_stop - 1] + 1))

                    # si un range avant il est mis dans left_ranges
                    if (intersect.start > value.start and len(intersect) < len(current_range)):
                        left_ranges.append(range(current_range.start, intersect.start))

                    # si un range après il est mis dans left_ranges
                    if (intersect.stop < value.stop and len(intersect) < len(current_range)):
                        left_ranges.append(range(intersect.stop, current_range.stop))

                    if (len(intersect) == len(current_range)):
                        left_ranges = []
                        
                    current_ranges = left_ranges
                    break
                
            if (len(categories[name]) == index_category + 1):
                if (len(left_ranges) > 0):
                    for left_range in left_ranges:
                        result.append(left_range)
                # else:
                #     result.append(current_range)

        if (found is False):
            result.append(value)
            # print(value)
            # print("not found bro", name)


        # if len(left_ranges) > 0:
        #     for left_range in left_ranges:
        #         result.append(left_range)
        #     # result.insert(left_ranges)

    # if (len(result) > 0):
        return result
    
    # return [value]


with open("5-test.in", "r") as input:
    for line in input.read().splitlines():
        if "seeds" in line:
            seeds_range = [int(seed) for seed in line.split(":")[1].split()]
            categories[current_category] = [range(seed[0], seed[0] + seed[1]) for seed in list(zip(seeds_range[0::2], seeds_range[1::2]))]
        elif "map" in line:
            current_category = line.split()[0]
        elif len(line) > 0:
            category_range = [int(value) for value in line.split()]
            categories[current_category].append((category_range[0::2], category_range[1::1]))


for seed_range in categories["seeds"]:
    # value = [range(seed_range[0], seed_range[0] + seed_range[1])]
    value = [seed_range]
    value = search_category(value, "seed-to-soil")
    value = search_category(value, "soil-to-fertilizer")
    value = search_category(value, "fertilizer-to-water")
    value = search_category(value, "water-to-light")
    value = search_category(value, "light-to-temperature")
    value = search_category(value, "temperature-to-humidity")
    value = search_category(value, "humidity-to-location")

    print(value)

#     for v in value:
#         result.append(v)
        
# solution = 34039469
# my_solution = min(*[r.start for r in result])

# if (my_solution == solution):
#     print("OH YEAH !!!", my_solution)
# else:
#     print(":'(", my_solution)

# print(min(*[r.start for r in result]))
# print(min())
print(f"Duration: {(time.time_ns() - start_time) / 10 ** 6} ms")