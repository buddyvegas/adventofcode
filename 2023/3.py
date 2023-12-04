import re

total = 0

def get_matches(line: str, regex: str): 
   return [matches.span() for matches in re.finditer(regex, line)]

number_coordinates = []
symbol_coordinates = []

with open('3-test.in', 'r') as input:
    for line in input.read().splitlines():
      symbol_coordinates.append(get_matches(line, '[^0-9.]'))
      number_coordinates.append(get_matches(line, '\d+'))

# for index, number_coordinate in enumerate(number_coordinates):
#    print(index, number_coordinate)


print(number_coordinates)
print(symbol_coordinates)
