from operator import itemgetter
import re
import time


directions = []
steps = {
    "L": {},
    "R": {}
}
start_number = 1
all_starts = []

with open('8.2-test.in', 'r') as input:
    for line in input.read().splitlines():
        if (re.fullmatch(r'(L|R)+', line)):
            directions = [*line]

        if (re.search(r'=', line) != None):
            step = re.search(r'(.*)=(.*)', line)
            next_steps = re.search(r"\((.*), (.*)\)", step.group(2).strip())
            path_name = step.group(1).strip()

            if path_name.endswith("A"):
                path_name = f"{start_number}{start_number}A"
                all_starts.append(path_name)
                start_number += 1

            steps["L"][path_name] = next_steps.group(1)
            steps["R"][path_name] = next_steps.group(2)

# print(steps)

start_time = time.time_ns()

all_current_steps = all_starts
direction_index = 0
direction = directions[direction_index]
number_of_steps = 0

while any(not step.endswith('Z') for step in all_current_steps):
    all_current_steps = [*itemgetter(*all_current_steps)(steps[direction])]
    print(all_current_steps)
    direction_index += 1
    if direction_index >= len(directions):
        direction_index = 0
    direction = directions[direction_index]
    number_of_steps += 1
    
    # if (number_of_steps % 1000000 == 0):
    #     print(f"Duration: {(time.time_ns() - start_time) / 10 ** 9} s")
    #     start_time = time.time_ns()
    #     print(number_of_steps)

print(number_of_steps)
print(f"Duration: {(time.time_ns() - start_time) / 10 ** 6} ms")
