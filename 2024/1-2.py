left_list = []
right_list = []

with open('1.in', 'r') as input:
    for line in input.read().splitlines():
        left, right = line.split()
        left_list.append(int(left))
        right_list.append(int(right))

left_list.sort()
right_list.sort()

positions = {}

for _, left_position in enumerate(left_list):
    for _, right_position in enumerate(right_list):
      if (left_position == right_position):
        positions[left_position] = positions[left_position] + 1 if left_position in positions else 1

result = 0

for position, total in positions.items():
    result += position * total

print(result)