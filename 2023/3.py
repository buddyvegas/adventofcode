import re
import math

total = 0

def get_matches(line: str, regex: str, index: int): 
   return [(matches.start(), index, matches.group()) for matches in re.finditer(regex, line)]

def flat(array):
   return [item for sub_array in array for item in sub_array]

def get_distance(a, b):
   xa = a[0]
   ya = a[1]
   xb = b[0]
   yb = b[1]

   return abs(math.sqrt(math.pow(xb - xa, 2) + math.pow(yb - ya, 2)))

parts = []
number_coordinates = []
symbol_coordinates = []

with open('3.in', 'r') as input:
    for index, line in enumerate(input.read().splitlines()):
      symbol_coordinates.append(get_matches(line, r'[^0-9.]', index))
      number_coordinates.append(get_matches(line, r'\d+', index))

number_coordinates = flat(number_coordinates)
symbol_coordinates = flat(symbol_coordinates)

for number_coordinate in number_coordinates:
   y_number = number_coordinate[1]
   number = number_coordinate[2]
   is_found = False
   
   for index in range(len(number)):
      if is_found:
         is_found = False
         break
      
      x_number = number_coordinate[0] + index

      for symbol_coordinate in symbol_coordinates:
         distance = get_distance((x_number, y_number), (symbol_coordinate[0], symbol_coordinate[1]))
         if (distance <= math.sqrt(2)):
            parts.append(int(number))
            is_found = True
            break

print(sum(parts))