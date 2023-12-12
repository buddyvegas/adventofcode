import re

directions = []
steps = {}

with open('8.in', 'r') as input:
    for line in input.read().splitlines():
        if (re.fullmatch(r'(L|R)+', line)):
            directions = [*line]

        if (re.search(r'=', line) != None):
            step = re.search(r'(.*)=(.*)', line)
            next_steps = re.search(r"\((.*), (.*)\)", step.group(2).strip())
            steps[step.group(1).strip()] = {
                "L": next_steps.group(1),
                "R": next_steps.group(2)
            }

current_step = "AAA"
direction_index = 0
number_of_steps = 0
while current_step != "ZZZ":
  number_of_steps += 1
  direction = directions[direction_index]
  current_step = steps[current_step][direction]
  direction_index += 1 
  if direction_index >= len(directions):
      direction_index = 0

print(number_of_steps)
